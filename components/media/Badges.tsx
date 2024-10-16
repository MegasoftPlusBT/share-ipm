const Badges = ({ year, badges }) => {
  return (
    <>
      {(year === "2022" || year === "2024") && badges.length > 0 && (
        <div
          className={
            "mx-auto mt-5 text-center flex flex-wrap " +
            "2xl:absolute 2xl:right-0 2xl:top-0 2xl:-mr-[250px] 2xl:flex-col 2xl:mt-0 " +
            "xl:absolute xl:right-0 xl:top-0 xl:-mr-[150px] xl:flex-col xl:mt-0 "
          }
        >
          {badges.map((badge, i) => (
            <img
              key={badge}
              className={
                badge === "BIG Shampion 2024.png"
                  ? "h-[100px]  2xl:h-[180px]  2xl:mb-8 xl:h-[170px]  xl:mb-4"
                  : "h-[100px]  2xl:h-[150px]  2xl:mb-8 xl:h-[125px]  xl:mb-4"
              }
              src={`/images/${badge}`}
              alt={badge}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Badges;
