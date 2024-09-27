import {
  Media,
  IndicatorSelection,
  MediaInfo,
} from "../../interfaces/media";
import {
  Indicator,
  MethodologyPerCategory,
} from "../../interfaces/questionnaire";
import { urlFormatName } from "../util";

// Updated function to handle 2024 data
export function readMediaPointsFromJson(
  mediaData: any[],
  media2022: any[],
  media2024: any[],  // Include 2024 data
  indicators: Indicator[]
): Media[] {
  let list: Media[] = [];
  const indicatorsTextShort: string[] = media2022[0];
  const indicatorsTextShort2024: string[] = media2024[0]; // New for 2024

  mediaData.forEach((data) => {
    const media: Media = {
      name: data.name,
      selections: [],
      total: 0,
      total2022: 0,
      total2024: 0,  // Include total for 2024
    };

    const media2022row: string[] = media2022.slice(1).find((m) => m[0] === data.name);
    const media2024row: string[] = media2024.slice(1).find((m) => m[0] === data.name); // Find the 2024 row

    data.points.forEach((mediaIndicator) => {
      const indicator = indicators.find((i) => i.textShort === mediaIndicator.indicator);
      const selected = indicator.options.find((o) => o.value === mediaIndicator.value);

      const media2022indicatorIndex = indicatorsTextShort.indexOf(indicator.textShort);
      const media2024indicatorIndex = indicatorsTextShort2024.indexOf(indicator.textShort);  // Get index for 2024

      let selected2022 = media2022row == null ? null : indicator.options.find(
        (o) => o.option.trim() === media2022row[media2022indicatorIndex]
      );

      let selected2024 = media2024row == null ? null : indicator.options.find(
        (o) => o.option.trim() === media2024row[media2024indicatorIndex]
      );

      if (selected2022 == null && media2022row != null) {
        selected2022 = findRangeValue(indicator, media2022row[media2022indicatorIndex]);
      }

      if (selected2024 == null && media2024row != null) {
        selected2024 = findRangeValue(indicator, media2024row[media2024indicatorIndex]);
      }

      media.total += selected.value;
      media.total2022 += selected2022 == null ? 0 : selected2022.value;
      media.total2024 += selected2024 == null ? 0 : selected2024.value;  // Add total for 2024
      
      media.selections.push({
        indicator: indicator,
        selected: selected,
        selected2022: selected2022,
        selected2024: selected2024,  // Include 2024 selection
      });
    });

    list.push(media);
  });
  return list;
}

export function readMediaInfoFromJson(
  mediaInfoData: any[],
  mediaHighlights2022: { [mediaName: string]: string },
  mediaBadges2022: { [mediaName: string]: string[] },
  mediaHighlights2024: { [mediaName: string]: string },  // Include highlights for 2024
  mediaBadges2024: { [mediaName: string]: string[] }    // Include badges for 2024
): MediaInfo[] {
  const mediaInfo = mediaInfoData.slice(1).reduce((acc, row) => {
    const media = row[0].trim();
    if (acc[media] == null) {
      acc[media] = {
        name: row[0],
        url: row[1],
        about: row[2],
        highlights: row[3],
        highlights2022: mediaHighlights2022[media] || null,
        badges2022: mediaBadges2022[media] || null,
        highlights2024: mediaHighlights2024[media] || null, // Add highlights for 2024
        badges2024: mediaBadges2024[media] || null                 // Add badges for 2024
      };
    }
    return acc;
  }, {});

  return mediaInfo;
}


// Utility function to find range values
function findRangeValue(indicator: Indicator, value: string) {
  return indicator.options.find((o) => {
    if (/[0-9]+-[0-9]+/.test(o.option.trim())) {
      const [range, start, end] = o.option.trim().match(/([0-9]+)-([0-9]+)/);
      const v = Number(value);
      return Number(start) <= v && Number(end) >= v;
    } else if (/[0-9]+\+/.test(o.option.trim())) {
      const [range, start] = o.option.trim().match(/([0-9]+)\+/);
      const v = Number(value);
      return Number(start) <= v;
    } else {
      return false;
    }
  });
}

// Updated toOutputFormat to handle 2024 data
export function toOutputFormat(
  mediaList: Media[],
  mediaInfo: MediaInfo[],
  maxTotalPoints: number,
  methodologyPerCategory: MethodologyPerCategory[]
): any[] {
  let mediaPoints = mediaList
    .sort((a, b) => b.total2022 - a.total2022)
    .map((media, i) => ({
      ...media,
      rank2022: i + 1,
      rank2024: 0,  // Add rank for 2024
      rank: 0,
      ...mediaInfo[media.name],
      maxTotalPoints: maxTotalPoints,
      htmlFileName: urlFormatName(media.name),
    }));

  // Rank for 2022
  mediaPoints = mediaPoints.map((media, i) => {
    if (i > 0) {
      const prev = mediaPoints[i - 1];
      if (media.total2022 === prev.total2022) {
        media.rank2022 = prev.rank2022;
      }
    }
    return media;
  });

  // Rank for 2024
  mediaPoints = mediaPoints
    .sort((a, b) => b.total2024 - a.total2024)  // Sort by 2024 points
    .map((media, i) => {
      media.rank2024 = i + 1;
      return media;
    });
    
  // Overall rank
  mediaPoints = mediaPoints
    .sort((a, b) => b.total - a.total)
    .map((media, i) => {
      media.rank = i + 1;
      return media;
    });

  // Handle per-category data for 2022 and 2024
  mediaPoints.forEach((media, i) => {
    if (i > 0) {
      const prev = mediaPoints[i - 1];
      if (media.total === prev.total) {
        media.rank = prev.rank;
      }
    }

    media.perCategory = [];
    methodologyPerCategory.forEach((category) => {
      const pointsPerCategory = media.selections.reduce((sum, s) => {
        return s.indicator.category.title === category.name
          ? sum + Number(s.selected.value)
          : sum;
      }, 0);
      const pointsPerCategory2022 = media.selections.reduce((sum, s) => {
        return s.indicator.category.title === category.name
          ? s.selected2022 == null
            ? null
            : sum + Number(s.selected2022.value)
          : sum;
      }, 0);
      const pointsPerCategory2024 = media.selections.reduce((sum, s) => {
        return s.indicator.category.title === category.name
          ? s.selected2024 == null
            ? null
            : sum + Number(s.selected2024.value)  // Points for 2024
          : sum;
      }, 0);

      let perCategory = {
        name: category.name,
        color: category.color,
        handle: category.handle,
        maxPoints: category.maxPoints,
        points: pointsPerCategory,
        points2022: pointsPerCategory2022,
        points2024: pointsPerCategory2024,  // Include points for 2024
        indicators: [],
      };

      // Add indicators details for 2022 and 2024
      category.indicators.forEach((indicator) => {
        const mediaIndicatorResponse: IndicatorSelection =
          media.selections.find(
            (response) => response.indicator.textShort === indicator.textShort
          );
        const selectedIndicatorResponse = mediaIndicatorResponse.selected;
        const selectedIndicatorResponse2022 =
          mediaIndicatorResponse.selected2022 || { option: null, value: null };
        const selectedIndicatorResponse2024 =
          mediaIndicatorResponse.selected2024 || { option: null, value: null };  // Add 2024 response

        const maxValue = Math.max(...indicator.options.map((x) => +x.value));
        const minValue = Math.min(...indicator.options.map((x) => +x.value));

        let responseIndicator = {
          name: indicator.text,
          nameShort: indicator.textShort,
          response: selectedIndicatorResponse.option,
          points: selectedIndicatorResponse.value,
          isMaxResponse: maxValue === +selectedIndicatorResponse.value,
          isMinResponse: minValue === +selectedIndicatorResponse.value,
          response2022: selectedIndicatorResponse2022.option,
          points2022: selectedIndicatorResponse2022.value,
          response2024: selectedIndicatorResponse2024.option,  // Add 2024 response
          points2024: selectedIndicatorResponse2024.value,  // Add 2024 points
          isMaxResponse2024: maxValue === +selectedIndicatorResponse2024.value,  // Max/min check for 2024
          isMinResponse2024: minValue === +selectedIndicatorResponse2024.value,
        };

        perCategory.indicators.push(responseIndicator);
      });

      media.perCategory.push(perCategory);
    });

    // Add angle calculations for 2022 and 2024 if needed...
    media.perCategory.reduce((angleStart, category, i) => {
      const angleEnd = angleStart + category.points * 3.6;
      media.perCategory[i].angleStart = angleStart;
      media.perCategory[i].angleEnd = angleEnd;
      return angleEnd;
    }, 0);
    
    media.perCategory.reduce((angleStart2022, category, i) => {
      const angleEnd2022 = angleStart2022 + category.points2022 * 3.6;
      media.perCategory[i].angleStart2022 = angleStart2022;
      media.perCategory[i].angleEnd2022 = angleEnd2022;
      return angleEnd2022;
    }, 0);

    media.perCategory.reduce((angleStart2024, category, i) => {
      const angleEnd2024 = angleStart2024 + category.points2024 * 3.6;  // Angle for 2024
      media.perCategory[i].angleStart2024 = angleStart2024;
      media.perCategory[i].angleEnd2024 = angleEnd2024;
      return angleEnd2024;
    }, 0);
  });

  return mediaPoints;
}
