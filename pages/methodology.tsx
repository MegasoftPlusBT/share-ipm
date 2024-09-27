import Layout from "../components/Layout";
import { getMedia } from "./api/ipm/media";
import { getMethodologyPerCategory } from "./api/ipm/methodology";
import { MethodologyPerCategory } from "../interfaces/questionnaire";
import CategoriesAside from "../components/CategoriesAside";

type Props = {
  methodologyPerCategory: MethodologyPerCategory[];
  media: any[];
};

const Methodology = ({ methodologyPerCategory, media }: Props) => {
  return (
    <Layout media={media} title="IPM - Metodologija">
      <style>{`
        p {
          margin-bottom: 20px;
        }
      `}</style>
      <h1 className="text-4xl md:text-6xl lg:text-6xl xl:text-6xl 2xl:text-6xl  mb-16">
        METODOLOGIJA
      </h1>
      <div className="html-code-wrapper">
        <p>
          Procena zaštite privatnosti čitalaca onlajn medija u Srbiji oslanja se na standarde globalne tehničke i građanske zajednice čija se primena može meriti, zatim na izričite obaveze utvrđene Zakonom o zaštiti podataka o ličnosti i, konačno, na etička načela novinarske profesije. Indikatori su grupisani u šest kategorija: osnovni tehnički parametri, obaveštavanje korisnika, kolačići i trekeri, mobilne platforme, registracija korisnika i novinarski kodeks.
        </p>
        <p>
        Analizirano je 50 onlajn medija koji su u prvoj polovini 2024. godine poslovali na teritoriji Srbije, odnosno plasirali svoje sadržaje publici iz Srbije. Reč je isključivo o informativnim, uredničkim sajtovima posvećenim vestima i aktuelnostima, u formi redovnih ili periodičnih objava. Među njima, 20 medijskih sajtova su oni koji ostvaruju najveću posetu u Srbiji prema <a href="https://www.similarweb.com/">analitici</a> globalnog saobraćaja na internetu, dok ostalih 30 odražava medijski pejzaž u Srbiji prema kriterijumima specifičnog geografskog područja koje pokrivaju, uzrasne grupe kojoj su namenjeni, ili javnog interesa koji ostvaruju.
        </p>
        <p>
          Raspon indeksa je od 0 do 100, gde je 100 vrednost koja označava
          najbolji rezultat.
        </p>
      </div>

      {methodologyPerCategory.map((row) => (
        <div key={row.handle} className="per-category-wrapper" id={row.handle}>
          <h3 className="per-category-headline mt-4 mb-3">
            <div
              className="square-with-points"
              style={{ backgroundColor: row.color }}
            >
              <span className="category-max-points">{row.maxPoints}</span>
              <div>bodova</div>
            </div>
            {row.name}
          </h3>

          <div className="html-code-wrapper">
            <span
              dangerouslySetInnerHTML={{
                __html: `<p><strong style="display: inline;">${row.name}</strong> (${row.maxPoints} poena)${row.about} `,
              }}
            ></span>
          </div>

          <details>
            <summary style={{ listStyle: "revert" }}>
              <h4>Opis i vrednovanje indikatora</h4>
            </summary>
            <ol className="per-category-indicators list-decimal ml-9">
              {row.indicators.map((indicator) => (
                <li key={indicator.text}>
                  <p className="per-category-indicator-name">
                    {indicator.text}
                  </p>
                  <ul>
                    {indicator.options.map((option) => (
                      <li className="ml-6" key={option.option}>
                        {option.option}
                        {" (" +
                          option.value +
                          " poen" +
                          (option.value == 1 ? "" : "a") +
                          ")"}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </details>
        </div>
      ))}
    </Layout>
  );
};

export default Methodology;

export async function getStaticProps() {
  const methodologyPerCategory = getMethodologyPerCategory();
  const media = getMedia();
  return {
    props: {
      methodologyPerCategory,
      media,
    },
    revalidate: 300, // In seconds
  };
}
