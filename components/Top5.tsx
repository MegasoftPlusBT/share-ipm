import React, { useState } from "react";

const Top5 = ({ media }) => {
  const [year, setYear] = useState("2024");

  const top5 = media
    .slice(0)
    .sort((a, b) => b.total - a.total)
    .filter((m) => m.rank <= 5);
  
  const top5for2022 = media
    .slice(0)
    .sort((a, b) => b.total2022 - a.total2022)
    .filter((m) => m.rank2022 <= 5);
  
  const top5for2024 = media
    .slice(0)
    .sort((a, b) => b.total2024 - a.total2024)
    .filter((m) => m.rank2024 <= 5);

  return (
    <section id="top5">
      <style>
        {`
        #top5 {
            font-family: FoundryBold;
            max-width: 700px;
            margin-top: 150px;
            margin-left: auto;
            margin-right: auto;
        }

        #top5 header {
            display: flex;
            flex-wrap: wrap;
        }
        #top5-grid {
            display: grid;
            grid-template-rows: repeat(5, 45px);
            grid-template-columns: 100%;
            grid-row-gap: 22px;
            align-items: center;
            text-align: center;
            font-family: Foundry;
            font-style: normal;
            font-weight: bold;
            font-size: 23px;
            line-height: 27px;
            text-transform: uppercase;
        }
        @media (max-width: 768px) {
            #top5-grid {
                font-size: 18px;
            }
        }
        .top5-grid-item {
            border: 1px solid black;
            display: grid;
            grid-template-rows: 100%;
            grid-template-columns: 45px 1fr 45px;
        }
        .top5-grid-item > * {
            padding-top: 10px;
            padding-bottom: 10px;
        }
        .top5-rank {
            color: white;
            background-color: black;
        }
        .top5-name {
            text-align: left;
            padding-left: 10px;
            justify-self: left;
        }
        .top5-name a {
            color: white;
            text-decoration: none;
        }
        .top5-name a:hover, .top5-name a:focus {
            color: black;
            text-decoration: underline;
        }
        .top5-total {
            background-color: white;
            border-left: 1px solid black;
        }
      `}
      </style>
      <header>
        <div className="inline-flex mb-2 items-center">
          <span className="px-2 py-1 border-2 border-black font-bold text-xl text-white bg-black">
            TOP 5
          </span>
          <span
            onClick={() => setYear("2021")}
            className={
              (year === "2021" ? "bg-[#14A3DB]" : "bg-white") +
              " " +
              (year === "2021" ? "text-white" : "text-[#aaaaaa]") +
              " " +
              ` cursor-pointer px-2 py-1 border-2 border-black font-bold text-xl`
            }
          >
            2021
          </span>
          <span
            onClick={() => setYear("2022")}
            className={
              (year === "2022" ? "bg-[#F0368F]" : "bg-white") +
              " " +
              (year === "2022" ? "text-white" : "text-[#aaaaaa]") +
              " " +
              ` cursor-pointer px-2 py-1 border-2 border-x-0 border-black font-bold text-xl`
            }
          >
            2022
          </span>

          <span
            onClick={() => setYear("2024")}
            className={
              (year === "2024" ? "bg-[#28A745]" : "bg-white") +
              " " +
              (year === "2024" ? "text-white" : "text-[#aaaaaa]") +
              " " +
              ` cursor-pointer px-2 py-1 border-2 border-black font-bold text-xl`
            }
          >
            2024
          </span>
     
        </div>
      </header>
      <header className="justify-end">
        <h2 className="text-right">ZBIR POENA</h2>
      </header>
      <div id="top5-grid">
        {(year === "2022" ? top5for2022 : year === "2024" ? top5for2024 : top5).map((m) => {
          return (
            <div key={m.name} className="top5-grid-item">
              <div className="top5-rank">
                {year === "2022" ? m.rank2022 : year === "2024" ? m.rank2024 : m.rank}
              </div>

              <div
                className={
                  (year === "2022" ? "bg-[#F0368F]" : year === "2024" ? "bg-[#28A745]" : "bg-[#14A3DB]") +
                  " top5-name"
                }
                style={{
                  width: (year === "2022" ? m.total2022 : year === "2024" ? m.total2024 : m.total) + "%",
                }}
              >
                <a href={"media/" + m.htmlFileName}>{m.name}</a>
              </div>
              <div className="top5-total">
                {year === "2022" ? m.total2022 : year === "2024" ? m.total2024 : m.total}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Top5;
