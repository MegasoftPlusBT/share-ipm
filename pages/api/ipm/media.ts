import { Media, MediaInfo, MediaOutputFormat } from "../../../interfaces/media";
import {
  getQuestions,
  getMaxTotalPoints,
  getMethodologyPerCategory,
} from "./methodology";
import {
  readMediaPointsFromJson,
  readMediaInfoFromJson,
  toOutputFormat,
} from "../../../lib/media/mapping";
import mediaData from "../../../data/path.json";
import mediaInfoData from "../../../data/raw-media-info.json";
import mediaHighlights2022 from "../../../data/media-highlights2022.json";
import mediaBadges2022 from "../../../data/media-badges2022.json";
import mediaHighlights2024 from "../../../data/media-highlights2024.json";
import mediaBadges2024 from "../../../data/media-badges2024.json";
import media2022 from "../../../data/media2022.json";
import media2024 from "../../../data/media2024.json";
import { NextApiRequest, NextApiResponse } from "next";

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const media = getMedia();
    if (!Array.isArray(getMedia())) {
      throw new Error("Cannot find media data");
    }

    res.status(200).json(media);
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;

export function getMediaInfo(): MediaInfo[] {
  const mediaInfoList = readMediaInfoFromJson(
    mediaInfoData,
    mediaHighlights2022,
    mediaBadges2022,
    mediaHighlights2024,
    mediaBadges2024,
  );
  return mediaInfoList;
}

export function getMediaPoints(): Media[] {
  const indicators = getQuestions();
  const mediaList = readMediaPointsFromJson(mediaData, media2022, media2024, indicators);
 
  return mediaList;
  
}



export function getMedia(): any[] {
  const mediaPoints = getMediaPoints();
  const mediaInfo = getMediaInfo();
  const maxTotalPoints = getMaxTotalPoints();
  const methodologyPerCategory = getMethodologyPerCategory();


  const media = toOutputFormat(
    mediaPoints,
    mediaInfo,
    maxTotalPoints,
    methodologyPerCategory
  );

  return media;
}
