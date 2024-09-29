const ToggleYear = ({ year, setYear, media }) => {
  // Define the years and their corresponding maxPoints based on media data
  const years = [
    { label: "2024", bgColor: "#219653", maxPoints: media.total2024 },
    { label: "2022", bgColor: "#F0368F", maxPoints: media.total2022 },
    { label: "2021", bgColor: "#14A3DB", maxPoints: media.total },
  ];

  // Filter out years where maxPoints is 0
  const availableYears = years.filter(year => year.maxPoints > 0);

  return (
    <div
      className="inline-flex text-2xl cursor-pointer"
      style={{ fontFamily: "FoundryBold" }}
    >
      {availableYears.map(({ label, bgColor }, index) => (
        <span
          key={label}
          onClick={() => setYear(label)}
          className={
            "p-2 border-2 " +
            (year === label
              ? `bg-[${bgColor}] text-white border-[${bgColor}]`
              : "text-[#828282] border-[#828282]") +
            (index > 0 ? " -ml-[2px]" : "")
          }
        >
          {label}
        </span>
      ))}
    </div>
  );
};

export default ToggleYear;
