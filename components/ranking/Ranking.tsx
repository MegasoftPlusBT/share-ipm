import React, { useState } from "react";
import RankingGridPerMediaBar from "./RankingGridPerMediaBar";

const Ranking = ({ media, categories }) => {
  const [isSortOrderAsc, setIsSortOrderAsc] = useState(false);
  const [rankingType, setRankingType] = useState("total");
  const [isCategoryMenuExpanded, setIsCategoryMenuExpanded] = useState(false);
  const [is2022, setIs2022] = useState(false);
  const [is2021, setIs2021] = useState(false);
  const [is2024, setIs2024] = useState(true); // New state for 2024

  let sortBy = "rank2022";
  
  if (rankingType === "diff") {
    sortBy = "diff";
  } else if (!is2022 && !is2021 && !is2024) {
    sortBy = "name";
  } else {
    sortBy = is2022 ? "rank2022" : is2024 ? "rank2024" : "rank";
  }
  console.log("sortBy",sortBy)
  const defaultCategorySelectors = {};
  categories.forEach((category) => {
    defaultCategorySelectors[category.title] = true;
  });
  const [rankingCategorySelectors, setRankingCategorySelectors] = useState(defaultCategorySelectors);

  function sorter() {
    const orderCoef = isSortOrderAsc ? -1 : 1;
    const attr = sortBy + (sortBy !== "name" && rankingType === "category" ? "_filtered" : "");
    return (a, b) => {
      if (a[attr] == null) return -1;
      if (b[attr] == null) return 1;

      const type = sortBy === "name" ? "string" : "number";
      const aVal = type === "number" ? +a[attr] : a[attr];
      const bVal = type === "number" ? +b[attr] : b[attr];

      if (aVal < bVal) return -1 * orderCoef;
      if (aVal > bVal) return 1 * orderCoef;
      return 0;
    };
  }

  const list = media.slice(0);
  list.forEach((m) => {
    m.filteredTotal = m.perCategory
      .filter((c) => rankingCategorySelectors[c.name])
      .reduce((sum, c) => sum + c.points, 0);
    m.filteredTotal2022 = m.perCategory
      .filter((c) => rankingCategorySelectors[c.name])
      .reduce((sum, c) => sum + c.points2022, 0);
    m.filteredTotal2024 = m.perCategory
      .filter((c) => rankingCategorySelectors[c.name])
      .reduce((sum, c) => sum + c.points2024, 0); // Added for 2024
    m.diff = m.perCategory.reduce((sum, c) => sum + c.points2022 - c.points, 0);
  });
console.log("list media", list)
  list.sort((a, b) => b.diff - a.diff).forEach((m, i) => {
    m.rankDiff = i + 1;
  });
  list.forEach((m, i) => {
    if (i > 0) {
      const prev = list[i - 1];
      if (m.diff === prev.diff) {
        m.rankDiff = prev.rankDiff;
      }
    }
  });

  list.sort((a, b) => b.filteredTotal - a.filteredTotal).forEach((m, i) => {
    m.rank_filtered = i + 1;
  });
  list.forEach((m, i) => {
    if (i > 0) {
      const prev = list[i - 1];
      if (m.filteredTotal === prev.filteredTotal) {
        m.rank_filtered = prev.rank_filtered;
      }
    }
  });

  list.sort((a, b) => b.filteredTotal2022 - a.filteredTotal2022).forEach((m, i) => {
    m.rank2022_filtered = i + 1;
  });
  list.forEach((m, i) => {
    if (i > 0) {
      const prev = list[i - 1];
      if (m.filteredTotal2022 === prev.filteredTotal2022) {
        m.rank2022_filtered = prev.rank2022_filtered;
      }
    }
  });

  list.sort((a, b) => b.filteredTotal2024 - a.filteredTotal2024).forEach((m, i) => {
    m.rank2024_filtered = i + 1; // Added for 2024
  });
  list.forEach((m, i) => {
    if (i > 0) {
      const prev = list[i - 1];
      if (m.filteredTotal2024 === prev.filteredTotal2024) {
        console.log("m.rank2024_filtered", m.rank2024_filtered)
        console.log("prev.rank2024_filtered", prev.rank2024_filtered)
        m.rank2024_filtered = prev.rank2024_filtered; // Added for 2024
      }
    }
  });

  list.sort(sorter());

  return (
    <section id="ranking">
      <style>
        {`
          #ranking header {
            display: flex;
            justify-content: space-between;
            text-align: right;
          }
          #ranking-grid {
            display: grid;
            grid-template-rows: 100%;
            grid-template-columns: auto 1fr;
          }
          #ranking-grid-table-header, #ranking-grid-bar-chart {
            height: 40px;
          }
          .ranking-grid-table-row, .ranking-grid-bar-item, .ranking-grid-bar-chart-header {
            height: 33px;
            display: grid;
            grid-template-rows: 100%;
            text-align: right;
          }
          .ranking-grid-table-row {
            margin-right: 25px;
            grid-template-rows: 100%;
            grid-template-columns: 1fr 25px;
            grid-column-gap: 25px;
            font-family: Foundry;
            font-style: normal;
            font-weight: bold;
            font-size: 16px;
            line-height: 100%;
            text-transform: uppercase;
            max-width: 40vw;
          }
          .ranking-name {
            align-self: end;
            transform: translateY(-16px);
            line-height: 80%;
          }
          .ranking-name > a {
            text-align: right;
            color: #000000;
            text-decoration: none;
          }
          .ranking-name a:hover, .ranking-name a:focus {
            color: #FA103A;
            border-bottom: 1px solid #FA103A;
          }
          .ranking-name a::after {
            content: "➜";
            display: inline-block;
            transform: translateX(4px) rotate(-45deg);
            color: #FA103A;
          }
          .ranking-rank {
            margin-top: -3px;
            padding-top: 3px;
            padding-bottom: 3px;
            align-self: start;
            color: white;
            background-color: black;
            text-align: center;
          }
          .ranking-rank-sort {
            background-color: white;
            filter: invert(100%);
          }
          .ranking-grid-bar-chart-header {
            margin-top: -8px;
          }
          .ranking-grid-bar-item {
            border-left: 1px solid #333333;
            grid-template-rows: 50% 50%;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            padding-left: 25px;
          }

          @media (max-width: 768px) {
                    .ranking-grid-bar-item {
                        padding-left: 5px;
                    }
                    .ranking-grid-table-row {
                        margin-right: 10px;
                        grid-template-columns: 1fr 20px;
                        grid-column-gap: 10px;
                        letter-spacing: -0.5px;
                    }
                }
          .ranking-total-wrapper-qtr1 {
            grid-row: 1 / 3;
            grid-column: 2 / 3;
            border-right: 1px solid #cccccc;
          }
          .ranking-total-wrapper-qtr2 {
            grid-row: 1 / 3;
            grid-column: 3 / 4;
            border-right: 1px solid #cccccc;
          }
          .ranking-total-wrapper-qtr3 {
            grid-row: 1 / 3;
            grid-column: 4 / 5;
            border-right: 1px solid #cccccc;
          }
          .ranking-total-wrapper-qtr4 {
            grid-row: 1 / 3;
            grid-column: 1 / 2;
            border-right: 1px solid #cccccc;
          }
          .ranking-total {
            position: relative;
            border-radius: 4px;
            margin-top: 2.5px;
            height: 8px;
            grid-column: 1 / 5;
            display: grid;
            grid-template-rows: auto;
          }
          .ranking-total::after {
            position: absolute;
            top: 0;
            right: 0;
            margin-top: -0.5px;
            margin-right: -22px;
            font-family: Foundry;
            font-style: normal;
            font-weight: bold;
            font-size: 12px;
            line-height: 100%;
            text-transform: uppercase;
          }
          .ranking-total2022 {
            position: relative;
            border-radius: 4px;
            margin-top: 5.5px;
            margin-bottom: -1.5px;
            height: 8px;
            grid-column: 1 / 5;
            display: grid;
            grid-template-rows: auto;
          }
          .ranking-total2022::after {
            position: absolute;
            top: 0;
            right: 0;
            margin-top: -0.5px;
            margin-bottom: -0.5px;
            margin-right: -22px;
            font-family: Foundry;
            font-style: normal;
            font-weight: bold;
            font-size: 12px;
            line-height: 100%;
            text-transform: uppercase;
          }
          .ranking-total2024 {
            position: relative;
            border-radius: 4px;
            margin-top: -15.5px;
            height: 8px;
            grid-column: 1 / 5;
            display: grid;
            grid-template-rows: auto;
          }
          .ranking-total2024::after {
            position: absolute;
            top: 0;
            right: 0;
            margin-top: -1.5px;
            margin-right: -22px;
            font-family: Foundry;
            font-style: normal;
            font-weight: bold;
            font-size: 12px;
            line-height: 100%;
            text-transform: uppercase;
          }
            .ranking-grid-bar-chart-header {
                    display: flex;
                    justify-content: space-between;
                }

                .ranking-diff {
                    position: relative;
                    border-radius: 4px;
                    grid-row: 1 / 3;
                    height: 10px;
                    grid-column: 3 / 5;
                    align-self: center;
                    display: grid;
                    grid-template-rows: auto;
                }

                .ranking-diff-negative {
                    position: relative;
                    border-radius: 4px;
                    grid-row: 1 / 3;
                    height: 10px;
                    grid-column: 1 / 3;
                    align-self: center;
                    display: grid;
                    grid-template-rows: auto;
                    justify-self: end;
                }
                .ranking-diff::after {
                    position: absolute;
                    top: 0;
                    right: 0;
                    margin-top: -2.5px;
                    margin-right: -22px;
                    font-family: Foundry;
                    font-style: normal;
                    font-weight: bold;
                    font-size: 14px;
                    line-height: 100%;
                    text-transform: uppercase;
                }
                .ranking-diff-negative::before {
                    position: absolute;
                    top: 0;
                    left: 0;
                    margin-top: -2.5px;
                    margin-left: -26px;
                    font-family: Foundry;
                    font-style: normal;
                    font-weight: bold;
                    font-size: 14px;
                    line-height: 100%;
                    text-transform: uppercase;
                }

                 @media (max-width: 768px) {}

        `}
      </style>
      <header className="ranking-header flex flex-wrap track">
        <div className="inline-flex mb-2 -translate-y-12 items-center">
          <span className="px-2 py-1 border-2 border-black font-bold text-xl text-white bg-black">
            TABELA
          </span>
        </div>
        <h2 className="" style={{ margin: "27.4px 0" }}>
          <span className="mx-2">SIROVI PODACI</span>
          <a
            className="mx-2 down-arrow-before"
            target="_blank"
            href="/documents/IPM_sirovi_podaci_2021.csv" // Added link for 2024
          >
            2021
          </a>
          <a
            className="mx-2 down-arrow-before2022"
            target="_blank"
            href="/documents/IPM_sirovi_podaci_2022.csv"
          >
            2022
          </a>
          <a
            className="mx-2 down-arrow-before2024"
            target="_blank"
            href="/documents/IPM_sirovi_podaci_2024.csv"
          >
            2024
          </a>
        </h2>
      </header>
      <div id="ranking-grid">
        <div id="ranking-grid-table">
          <div
            className="ranking-grid-table-header ranking-grid-table-row py-4"
            style={{ height: "60px" }}
          >
            <div className="ranking-name-sort ranking-name">
              <span
                className="sm:tracking-tight pr-3 bg-transparent text-right font-bold text-lg block"
              >
                MEDIJ
              </span>
              {}
            </div>
            <div
              className="ranking-rank-sort ranking-rank flex pb-4"
              style={{ marginTop: "-17px" }}
            >
              <img
                id="sort-rank"
                className="cursor-pointer block"
                onClick={(e) => {
                  setIsSortOrderAsc((order) => !order);
                }}
                src="/images/up-down.png"
                height="15"
              />
            </div>
          </div>
          {list.map((m) => (
  <div key={m.name} className="ranking-grid-table-row">
    <div className="ranking-name">
      <a href={"media/" + m.htmlFileName}>{m.name}</a>
    </div>
    <div className="ranking-rank">
      {
        {
          total: sortBy === "rank" ? (is2024 ? m.rank2024 : m.rank) : (is2024 ? m.rank2024 : m.rank2022),
          category: sortBy === "rank" 
            ? (is2024 ? m.rank2024_filtered : m.rank_filtered) 
            : (is2024 ? m.rank2024_filtered : m.rank2022_filtered),
          diff: m.rankDiff,
        }[rankingType]
      }
    </div>
  </div>
))}

        </div>
        <div id="ranking-grid-bar-chart">
          <div
          className="ml-2 relative z-[100] ranking-grid-bar-chart-header ranking-grid-bar flex-wrap"
          style={{ height: "60px", fontFamily: "FoundryBold" }}
        >
          <div className="ranking-type-selector relative z-[100] inline-flex items-start justify-center">
              <span
                onClick={(e) => {
                  setRankingType("total");
                  setIsSortOrderAsc(false);
                  if (!is2022 && !is2021 && !is2024) {
                    setIs2022(true);
                  }
                }}
                className={
                  (rankingType === "total" ? "" : "text-gray-400") +
                  " cursor-pointer sm:tracking-tight"
                }
              >
                UKUPNO
              </span>
              {}
              <div className={" relative inline z-[100] overflow-visible"}>
                <span
                  className={
                    (rankingType === "category" ? "" : "text-gray-400") +
                    " cursor-pointer sm:tracking-tight ml-2"
                  }
                  onClick={(e) => {
                    setRankingType("category");
                    setIsSortOrderAsc(false);
                    if (!is2022 && !is2021 && !is2024) {
                      setIs2024(true);
                    } else if (is2022) {
                      setIs2021(false);
                    }
                  }}
                >
                  KATEGORIJE
                </span>
                {rankingType === "category" && (
                  <span
                    className={
                      "absolute cursor-pointer ml-0.5 "
                    }
                    onClick={(e) => {
                      setIsCategoryMenuExpanded((v) => !v);
                    }}
                    style={{ fontFamily: "Foundry" }}
                  >
                    {isCategoryMenuExpanded ? "-" : "+"}
                  </span>
                )}
                {rankingType === "category" && isCategoryMenuExpanded && (
                  <div className="p-2 absolute bg-white z-[1000] block w-[250] text-left">
                    {categories.map((category) => (
                      <div key={category.title}>
                        <span
                          style={{
                            backgroundColor: category.color,
                            minWidth: "24px",
                            minHeight: "24px",
                          }}
                          className={`font-mono inline-block text-center cursor-pointer`}
                          onClick={(e) => {
                            setRankingCategorySelectors((prev) => {
                              const curr = { ...prev };
                              curr[category.title] = !curr[category.title];
                              return curr;
                            });
                          }}
                        >
                          {rankingCategorySelectors[category.title] ? (
                            <span>✓</span>
                          ) : (
                            <span> </span>
                          )}
                        </span>{" "}
                        {category.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="bg-transparent inline-flex text-right font-bold ">
       
              <span
                onClick={() =>
                  setIs2021((prevIs2021) => {
                    if (rankingType === "category" && (is2022 || is2024)) {
                      setIs2022(prevIs2021);
                    }
                    if (rankingType === "diff") {
                      setIsSortOrderAsc(false);
                      setRankingType("total");
                    }
                    return !prevIs2021;
                  })
                }
                style={{ fontFamily: "FoundryBold" }}
                className={
                  (is2021 ? "text-[#14A3DB]" : "text-gray-400") +
                  " p-1 cursor-pointer font-extrabold"
                }
              >
                <span className="scale-[0.78] inline-block toggle-circle">
                  ⬤
                </span>{" "}
                2021
              </span>
              <span
                onClick={() =>
                  setIs2022((prevIs2022) => {
                    if (rankingType === "category" && (is2021 || is2024)) {
                      setIs2021(prevIs2022);
                      setIs2024(false);
                    }
                    if (rankingType === "diff") {
                      setIsSortOrderAsc(false);
                      setRankingType("total");
                    }
                    return !prevIs2022;
                  })
                }
                style={{ fontFamily: "FoundryBold" }}
                className={
                  (is2022 ? "text-[#F0368F]" : "text-gray-400") +
                  " p-1 cursor-pointer font-extrabold"
                }
              >

                <span className="scale-[0.78] inline-block toggle-circle">
                  ⬤
                </span>{" "}
                2022
              </span>
              <span
                onClick={() =>
                  setIs2024((prevIs2024) => { // Added toggle for 2024
                    console.log("prevIs2024",prevIs2024)
                    if (rankingType === "category" && (is2021 || is2022)) {
                      setIs2021(false);
                      setIs2022(prevIs2024);
                    }
                    return !prevIs2024;
                  })
                }
                style={{ fontFamily: "FoundryBold" }}
                className={
                  (is2024 ? "text-[#219653]" : "text-gray-400") +
                  " p-1 cursor-pointer font-extrabold"
                }
              >
                <span className="scale-[0.78] inline-block toggle-circle">
                  ⬤
                </span>
                2024
              </span>
             
            
              {/* <span
                onClick={(e) => {
                  setRankingType((v) => {
                    if (v === "diff") {
                      setIsSortOrderAsc(false);
                      setIs2022(true);
                      setIs2021(false);
                      setIs2024(false); // Reset for 2024
                      return "total";
                    } else {
                      setIsSortOrderAsc(true);
                      setIs2022(false);
                      setIs2021(false);
                      setIs2024(false); // Reset for 2024
                      return "diff";
                    }
                  });
                }}
                style={{ fontFamily: "FoundryBold" }}
                className={
                  (rankingType === "diff"
                    ? "text-[#219653]"
                    : "text-gray-400") + " p-1 cursor-pointer "
                }
              >
                <span className="scale-[0.78] inline-block toggle-circle">
                  ⬤
                </span>
                RAZLIKE
              </span> */}
              <style>{`
              .ranking-type-selector {
                padding-top: 6px;
              }
              @media (max-width: 768px) {
                  .toggle-circle {
                    display: none;
                  }
              }
              @media (max-width: 538px) {
                  #ranking {
                    margin-left: -32px;
                  }
                  .ranking-header {margin-left: 32px;}
              }
              `}</style>
            </div>
          </div>
          {list.map((m) => (
            <RankingGridPerMediaBar
              key={m.name}
              media={m}
              rankingType={rankingType}
              rankingCategorySelectors={rankingCategorySelectors}
              is2021={is2021}
              is2022={is2022}
              is2024={is2024} // Pass 2024 to the bar component
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ranking;
