const RankingGridPerMediaBar = ({
  media,
  rankingType,
  rankingCategorySelectors,
  is2022,
  is2021,
  is2024,  // New state to check if 2024 is active
}) => {
  return (
    <div className="ranking-grid-bar ranking-grid-bar-item">
      <div className="ranking-total-wrapper-qtr1"></div>
      <div className="ranking-total-wrapper-qtr2"></div>
      <div className="ranking-total-wrapper-qtr3"></div>
      <div className="ranking-total-wrapper-qtr4"></div>

      {/* Handle 2022 data */}
      {media.total2022 != 0 && is2022 && rankingType !== "diff" && (
        <div
          className={
            (is2021
              ? "row-start-1 row-end-2 self-end mb-px"
              : "row-start-1 row-end-3 self-center") +
            " ranking-total2022 bg-[#F0368F] total" +
            (rankingType === "category"
              ? media.filteredTotal2022
              : media.total2022)
          }
          style={{
            width:
              (rankingType === "category"
                ? media.filteredTotal2022
                : media.total2022) + "%",
                display: 'flex', // Enables flexbox for alignment
                alignItems: 'center', // Vertically center the content
                fontSize: '0.5rem', // Smaller font size
                color: '#F0368F', // Color matching the bar
            gridTemplateColumns: media.perCategory
              .filter((c) => rankingCategorySelectors[c.name])
              .map((row) => row.points2022 + "fr")
              .join(" "),
          }}
        >
          {media.perCategory
            .filter((c) => rankingCategorySelectors[c.name])
            .map((row) => (
              <div
                key={row.name}
                className={
                  (rankingType === "category" ? "block" : "hidden") +
                  " ranking-total-per-category"
                }
                title={`${row.name}: ${row.points2022}/${row.maxPoints}`}
                style={{ backgroundColor: row.color, height: "100%" }}
              ></div>
            ))}
        </div>
      )}

      {/* Handle 2021 data */}
      {rankingType !== "diff" && is2021 && (
        <div
          className={
            (is2022
              ? "row-start-2 row-end-3 self-start mt-0.5"
              : "row-start-1 row-end-3 self-center") +
            " ranking-total bg-[#14A3DB] total" +
            (rankingType === "category" ? media.filteredTotal : media.total)
          }
          style={{
            width:
              (rankingType === "category" ? media.filteredTotal : media.total) +
              "%",
              display: 'flex', // Enables flexbox for alignment
              alignItems: 'center', // Vertically center the content
              fontSize: '0.5rem', // Smaller font size
              color: '#14A3DB', // Color matching the bar
            gridTemplateColumns: media.perCategory
              .filter((c) => rankingCategorySelectors[c.name])
              .map((row) => row.points + "fr")
              .join(" "),
          }}
        >
          {media.perCategory
            .filter((c) => rankingCategorySelectors[c.name])
            .map((row) => (
              <div
                key={row.name}
                className={
                  (rankingType === "category" ? "block" : "hidden") +
                  " ranking-total-per-category"
                }
                title={`${row.name}: ${row.points}/${row.maxPoints}`}
                style={{ backgroundColor: row.color, height: "100%" }}
              ></div>
            ))}
        </div>
      )}

      {/* Handle 2024 data */}
      {media.total2024 != 0 && is2024 && rankingType !== "diff" && (
        <div
          className={
            (is2021 || is2022
              ? "row-start-2 row-end-3 self-start "
              : "row-start-1 row-end-3 self-center") +
            " ranking-total2024 bg-[#28A745] total" +
            (rankingType === "category"
              ? media.filteredTotal2024
              : media.total2024)
          }
          style={{
            width: (rankingType === "category" ? media.filteredTotal2024 : media.total2024) + "%",
            display: 'flex', // Enables flexbox for alignment
            alignItems: 'center', // Vertically center the content
            fontSize: '0.5rem', // Smaller font size
            color: '#28A745', // Color matching the bar
            gridTemplateColumns: media.perCategory
                .filter((c) => rankingCategorySelectors[c.name])
                .map((row) => row.points2024 + "fr")
                .join(" "),
        }}
        >
          {media.perCategory
            .filter((c) => rankingCategorySelectors[c.name])
            .map((row) => (
              <div
                key={row.name}
                className={
                  (rankingType === "category" ? "block" : "hidden") +
                  " ranking-total-per-category"
                }
                title={`${row.name}: ${row.points2024}/${row.maxPoints}`}
                style={{ backgroundColor: row.color, height: "100%" }}
              ></div>
            ))}
        </div>
      )}

      {/* Show differences */}
      {media.total2022 != 0 && rankingType === "diff" && (
        <>
          <div
            className={
              media.diff >= 0
                ? "ranking-diff bg-[#219653] total" + media.diff
                : "ranking-diff-negative bg-[#F75F55] negative-total" +
                  Math.abs(media.diff)
            }
            style={{
              width: 2 * Math.max(Math.abs(media.diff), 0.05) + "%",
            }}
          ></div>
          {media.diff >= 0 && (
            <style>
              {`
                .total${media.diff}::after {
                    content: "${media.diff}";
                }
              `}
            </style>
          )}
          {media.diff < 0 && (
            <style>
              {`
                .negative-total${Math.abs(media.diff)}::before {
                    content: "${media.diff}";
                }
              `}
            </style>
          )}
        </>
      )}

      {/* CSS for displaying the totals */}
      <style>
        {`
          .total${
            rankingType === "category" ? media.filteredTotal : media.total
          }::after {
              content: "${
                rankingType === "category" ? media.filteredTotal : media.total
              }";
          }
          .total${
            rankingType === "category"
              ? media.filteredTotal2022
              : media.total2022
          }::after {
              content: "${
                rankingType === "category"
                  ? media.filteredTotal2022
                  : media.total2022
              }";
          }
          .total${
            rankingType === "category"
              ? media.filteredTotal2024
              : media.total2024
          }::after {
              content: "${
                rankingType === "category"
                  ? media.filteredTotal2024
                  : media.total2024
              }";
          }
        `}
      </style>
    </div>
  );
};

export default RankingGridPerMediaBar;
