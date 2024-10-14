const IndexIntro = () => {
  return (
    <>
      <p
        style={{
          textAlign: "center",
          maxWidth: "700px",
          display: "block",
          margin: "0 auto",
        }}
      >
        IPM je kompozitni indikator za analizu zaštite prava građana na
        privatnost u onlajn medijskoj sferi Srbije. Ovaj statistički alat
        razvija SHARE Fondacija kao sredstvo za javno zagovaranje i unapređenje
        standarda zaštite privatnosti u poslovanju medija na internetu.
      </p>
      <h2 style={{ textAlign: "center" }} className="mt-8">
        <span className="mx-2">VAŽNI NALAZI</span>
        <a className="key-findings-link mx-2" href="/key-findings?y=2021">
          {" "}
          2021
        </a>
        <a className="key-findings-link2022 mx-2" href="/key-findings?y=2022">
          {" "}
          2022
        </a>
        <a className="key-findings-link2024 mx-2" href="/key-findings?y=2024">
          {" "}
          2024
        </a>
      </h2>
      <style>
        {`
        a.key-findings-link2024::after {
                content: "➜";
                display: inline-block;
                transform: translateX(5px) rotate(-45deg);
                color: #219653;
            }
            a.key-findings-link2022::after {
                content: "➜";
                display: inline-block;
                transform: translateX(5px) rotate(-45deg);
                color: #F0368F;
            }
            a.key-findings-link::after {
                content: "➜";
                display: inline-block;
                transform: translateX(5px) rotate(-45deg);
                color: #14A3DB;
            }
        `}
      </style>
    </>
  );
};

export default IndexIntro;
