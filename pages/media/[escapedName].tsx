import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths } from "next";
import { getMedia } from "../api/ipm/media"; // Ensure this function fetches the correct year data
import Layout from "../../components/Layout";
import ToggleYear from "../../components/ToggleYear";
import PerCategoryDonut from "../../components/media/PerCategoryDonut";
import MediaHighlights from "../../components/media/MediaHighlights";
import Badges from "../../components/media/Badges";

const Media = ({ media, mediaList }) => {
  const router = useRouter();
  const { escapedName } = router.query;
  const [year, setYear] = useState("2024");

  // Effect to set the initial year based on media availability
  useEffect(() => {
    // Check if maxPoints for 2024 is 0 or not available
    const is2024Available = media.total2024 > 0;

    // If 2024 is not available, set the year to 2022
    if (!is2024Available) {
      setYear("2022");
    }
  }, [media]);

  // Effect to handle year changes and possibly fetch new media data if required
  useEffect(() => {
    // Logic to potentially fetch or update media data based on the selected year
  }, [year]);

  return (
    <Layout
      media={mediaList}
      title={`${media.name} - Indeks Privatnosti u Medijima`}
    >
      <style>
        {`
        #category-links {
          display: none;
        }
          .main-wrapper {
            padding: 111px 30px 111px 30px;
        }
        .media-info  {
            max-width: 545px;
        }
        .media-url {
            font-family: Foundry;
            font-style: normal;
            font-weight: bold;
            font-size: 23px;
            line-height: 31px;
            letter-spacing: -1px;
            text-transform: uppercase;
            margin: 36px 0;
        }
        .media-donut {
            margin: 10px auto;
        }
        .media-donut * {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;  
        }
        .media-donut .donut-chart {
            background-color: #F2F2F2;
            position: relative;
            width: 236px;
            height: 236px;
            margin: 0 0 0 auto;
            border-radius: 100%
        }
        .media-donut .center {background: #f5fbfd;
            position: absolute;
            text-align: center;
            font-size: 28px;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            width: 165px;
            height: 165px;
            margin: 35px auto;
            border-radius: 50%;
            line-height: 35px;
            padding: 15% 0 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: start;
        }
        .media-donut .portion-block {
            border-radius: 50%;
            clip: rect(0px, 236px, 236px, 118px);
            height: 100%;
            position: absolute;
            width: 100%;
          }
        .media-donut .circle {
            font-family: Foundry;
            border-radius: 50%;
            clip: rect(0px, 118px, 236px, 0px);
            height: 100%;
            position: absolute;
            width: 100%;
            font-family: monospace;
            font-size: 1.5rem;
        }
        .media-total-points {
            border-bottom: 3px solid black;
            line-height: 95%;
            font-family: Foundry;
            font-style: normal;
            font-weight: bold;
            font-size: 58px;
            text-align: center;
            letter-spacing: -0.5px;
            text-transform: uppercase;
            color: #000000;
        }
        .media-max-points {
            margin-top: 5px;
            font-family: Foundry;
            font-style: normal;
            font-weight: bold;
            font-size: 23px;
            line-height: 27px;
            text-align: right;
            text-transform: uppercase;
            color: #000000;
        }
        .media-category-breakdown {
            font-family: Foundry;
            display: grid;
            grid-template-columns: 1fr;
            grid-row-gap: 64px;
            margin: 90px auto;
            margin-top: 50px;
        }
        
        .per-category-wrapper {
            padding-top: 0;
            display: grid;
            grid-template-rows: 84px auto;
            grid-template-columns: 84px 1fr 84px;
        }
        .media-square {
            z-index: 1;
            border: 1px solid black;
            grid-row: 1 / 2;
            grid-column: 1 / 2;
            display: grid;
            grid-template-rows: 1.2fr 0.8fr;
            grid-template-columns: 1fr;
            align-content: center;
            justify-content: center;
            justify-items: center;
        }
        .media-category-points {
            align-self: end;
            font-style: normal;
            font-weight: bold;
            font-size: 33px;
            line-height: 38px;
            text-align: center;
            letter-spacing: -2px;
            text-transform: uppercase;
            border-bottom: 1px solid black;
        }
        .max-category-points {
            font-style: normal;
            font-weight: bold;
            font-size: 19px;
            line-height: 22px;
            text-align: right;
            letter-spacing: 0.15px;
            text-transform: uppercase;
        }
        .media-category-name {
            z-index: 1;
            border-top: 1px solid black;
            border-bottom: 1px solid black;
            grid-row: 1 / 2;
            grid-column: 2 / 3;
        }
        .media-category-name div {
            font-style: normal;
            font-weight: bold;
            font-size: 23px;
            line-height: 27px;
            text-align: center;
            text-transform: uppercase;
            width: 100%;
            height: 100%;
            background-color: rgba(250,250,250,0.85);
            display: grid;
            justify-content: center;
            align-content: center;
        }
        .breakdown-toggle-wrapper {
            border: 1px solid black;
            grid-row: 1 / 2;
            grid-column: 3 / 4;
            display: grid;
            grid-template-rows: 84px;
            grid-template-columns: 84px;
            justify-items: stretch;
            align-items: stretch;
            text-align: right; 
        }
        .breakdown-toggle-wrapper summary {
            display: block;
            width: 82px;
            height: 82px;
            text-align: center;
        }
        .breakdown-toggle, .breakdown-expand, .breakdown-collapse {
            text-align: center;
            font-size: 33px;
        }
        .breakdown-collapse {
            display: none;
        }
        .breakdown-toggle {
            display: block;
            padding-top: 20px;
        }
        .breakdown-toggle-wrapper[open] .breakdown-expand {
            display: none;
        }
        .breakdown-toggle-wrapper[open] .breakdown-collapse {
            display: block;
        }
        .media-category-indicators {
            display: none;
        }
        .breakdown-toggle-wrapper[open] + .media-category-indicators {
            display: block;
            grid-row: 2 / 3;
            grid-column: 2 / 4;
        }
        .indicator-wrapper {
            border: 1px solid black;
            border-top: 0px solid black;
            padding: 30px;
            display: grid;
            grid-template-rows: auto auto;
            grid-template-columns: auto 1fr;
            grid-gap: 11px 12px;
        }
        .indicator-label {
            grid-row: 1 / 2;
            grid-column: 1 / 2;
            font-weight: normal;
            font-size: 19px;
            line-height: 100%;
            text-align: right;
            text-transform: uppercase;
        }
        .indicator-text {
            grid-row: 1 / 2;
            grid-column: 2 / 3;
            font-family: FoundryBold;
            font-weight: bold;
            font-size: 19px;
            line-height: 22px;
            letter-spacing: 0.15px;
            text-transform: uppercase;
        }
        .response-label {
            grid-row: 2 / 3;
            grid-column: 1 / 2;
            font-weight: normal;
            font-size: 19px;
            line-height: 100%;
            text-align: right;
            text-transform: uppercase;
        }
        .indicator-response {
            grid-row: 2 / 3;
            grid-column: 2 / 3;
            font-family: FoundryBold;
            font-weight: bold;
            font-size: 19px;
            line-height: 22px;
            letter-spacing: 0.15px;
            text-transform: uppercase;
        }
        .response-points {
            padding-left:5px;
            padding-right:5px;
            display: block;
            float: right;
            margin-right: 150px;
        }
        .category-total-points {
            border-bottom: 1px solid black;
        }
        .category-max-points {
            margin-top: 2px;
            font-family: Foundry;
            font-style: normal;
            font-weight: bold;
            font-size: 16px;
            line-height: 120%;
            text-align: center;
        }
        
        @media (max-width: 900px) {
            .response-points {
                margin-right: 54px;
            }
        }
        @media (max-width: 600px) {
            .main-wrapper {
                padding: 50px 20px 100px 20px;
            }
            h1 {
                margin-bottom: 0;
            }
            .media-url {
                margin-top: 0;
            }
            .per-category-wrapper {
                grid-template-rows: 80px auto;
                grid-template-columns: 80px 1fr 80px;
            }
            .breakdown-toggle-wrapper {
                grid-template-rows: 80px;
                grid-template-columns: 80px;
            }
            
            .breakdown-toggle-wrapper summary {
                display: block;
                width: 78px;
                height: 78px;
            }
            .breakdown-toggle {
                padding-top: 18px;
            }
            .media-category-name div {
                font-size: 18px;
                line-height: 20px;
            }
            
            .indicator-wrapper {
                grid-template-rows: auto auto auto auto;
                grid-template-columns: auto;
                padding: 15px;
                grid-gap: 7px 10px;
            }
            .indicator-label {
                grid-row: 1 / 2;
                grid-column: 1 / 2;
                font-size: 16px;
                text-align: left;
            }
            .indicator-text {
                grid-row: 2 / 3;
                grid-column: 1 / 2;
                font-size: 16px;
                line-height: 100%;
            }
            .response-label {
                grid-row: 3 / 4;
                grid-column: 1 / 2;
                font-size: 16px;
                text-align: left;
            }
            .indicator-response {
                grid-row: 4 / 5;
                grid-column: 1 / 2;
                font-size: 16px;
            }
            .response-points {
                margin-right: 0;
            }
        }
        `}
      </style>
      <header className="flex justify-between flex-wrap relative">
        <div className="media-info">
          <h1 className="text-5xl md:text-6xl lg:text-6xl xl:text-6xl 2xl:text-6xl mb-8">
            {media.name}
          </h1>
          <ToggleYear year={year} setYear={setYear} media={media} />
          <p className="media-url">
            <a href={`//${media.url}`} target="_blank" rel="noreferrer">
              {media.url}
            </a>
          </p>
          <p>{media.about}</p>
        </div>
        <PerCategoryDonut media={media} year={year} />
      </header>
      <Badges
        year={year}
        badges={year === "2024" ? media.badges2024 : media.badges2022}
      />
      <div
        className="media-category-breakdown"
        style={{
          gridTemplateRows: media.perCategory
            .filter(row => (year === "2021" || year === "2024" || row.points2022 != null))
            .map(() => "auto")
            .join(" "),
        }}
      >
        {media.perCategory
          .filter(row => (year === "2021" || year === "2024" || row.points2022 != null))
          .map((row) => (
            <div key={`${year}${row.name}`} className="per-category-wrapper" id={row.handle}>
              <div className="media-square" style={{ backgroundColor: row.color }}>
                <span className="media-category-points">
                  {year === "2022" ? row.points2022 : year === "2024" ? row.points2024 : row.points}
                </span>
                <span className="max-category-points">{row.maxPoints}</span>
              </div>
              <div style={{ backgroundColor: row.color }} className="media-category-name">
                <div>{row.name}</div>
              </div>
              <details style={{ backgroundColor: row.color }} className="breakdown-toggle-wrapper">
                <summary>
                  <div className="breakdown-toggle">
                    <div className="breakdown-expand">+</div>
                    <div className="breakdown-collapse">-</div>
                  </div>
                </summary>
              </details>
              <div className="media-category-indicators">
                {row.indicators.map((indicator) => (
                  <div key={`${year}${indicator.name}`} className="indicator-wrapper">
                    <label className="indicator-label">INDIKATOR:</label>
                    <span className="indicator-text">{indicator.name}</span>
                    <label className="response-label">ODGOVOR:</label>
                    <span className="indicator-response">
                      <span className="response-text">
                        {year === "2022" ? indicator.response2022 : year === "2024" ? indicator.response2024 : indicator.response}
                      </span>
                      {/* Add more response handling here as per your existing logic */}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
      <MediaHighlights media={media} year={year} />
    </Layout>
  );
};

export default Media;

export const getStaticPaths: GetStaticPaths = async () => {
  const mediaList = getMedia();
  const paths = mediaList.map((user) => ({
    params: { escapedName: user.htmlFileName },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const mediaList = getMedia();
    const escapedName = params?.escapedName;
    const media = mediaList.find((data) => data.htmlFileName === escapedName);

    return { props: { media, mediaList } };
  } catch (err: any) {
    return { props: { errors: err.message } };
  }
};