const PerCategoryDonut = ({ media, year }) => {
  return (
    <div className="media-donut">
      <div className="donut-chart">
        {media.perCategory.map((row, i) => (
          <div
            key={year + row.name}
            className="portion-block"
            style={{
              transform: `rotate(${
                year === "2022" 
                  ? row.angleStart2022 
                  : year === "2024"
                  ? row.angleStart2024 
                  : row.angleStart
              }deg)`,
            }}
          >
            <div
              className="circle"
              title={`${row.name}: ${
                year === "2022"
                  ? row.points2022
                  : year === "2024"
                  ? row.points2024
                  : row.points
              }/${row.maxPoints}`}
              style={{
                backgroundColor: row.color,
                transform: `rotate(${
                  year === "2022"
                    ? row.angleEnd2022 - row.angleStart2022
                    : year === "2024"
                    ? row.angleEnd2024 - row.angleStart2024
                    : row.angleEnd - row.angleStart
                }deg)`,
              }}
            ></div>
          </div>
        ))}
        <div className="center">
          <span className="media-total-points">
            {year === "2022" 
              ? media.total2022 
              : year === "2024" 
              ? media.total2024 
              : media.total}
          </span>
          <span className="media-max-points">100</span>
        </div>
      </div>
    </div>
  );
};

export default PerCategoryDonut;
