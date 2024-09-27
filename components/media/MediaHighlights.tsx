const MediaHighlights = ({ media, year }) => {
  return (
    <>
      <h2 className="text-5xl mb-8">PREGLED</h2>
      <div
        dangerouslySetInnerHTML={{
          __html: year === "2022" 
            ? media.highlights2022 
            : year === "2024"
            ? media.highlights2024 
            : media.highlights,
        }}
      ></div>
    </>
  );
};

export default MediaHighlights;
