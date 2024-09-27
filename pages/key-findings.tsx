import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import ToggleYear from "../components/ToggleYear";
import CategoriesAside from "../components/CategoriesAside";
import { getMedia } from "./api/ipm/media";
import { getKeyFindings } from "./api/ipm/keyFindings";
import { urlFormatName } from "../lib/util";
import { useRouter } from "next/router";

function addMediaLinks(media: any[], text: string): string {
  let processed = text;
  media.forEach((m) => {
    const regex = new RegExp(
      "\\b(" + m.name + "(.rs)?|" + m.name + "a?)\\b",
      "gu"
    );
    const link =
      '<a href="/media/' +
      urlFormatName(m.name) +
      '" target="_blank" class="share-red">$1</a>';
    processed = processed.replace(regex, link);
  });
  processed = processed.replace(
    /Magločistač/gu,
    '<a href="/media/magločistač" target="_blank" class="share-red">Magločistač</a>'
  );
  return processed;
}

const KeyFindings = ({ media, keyFindings }) => {
  const router = useRouter();
  const [year, setYear] = useState("2024");

  //console.log('keyFindings:', keyFindings); // Debugging


  useEffect(() => {
    if (!router.isReady) return;
    const { y } = router.query;
    setYear(y === "2021" ? "2021" : y === "2022" ? "2022" : "2024");
  }, [router.isReady, router.query]);

  return (
    <Layout media={media} title="IPM - Važni nalazi">
      <style>{`
        .html-code-wrapper h3 {
          margin-top: 20px;
          margin-bottom: 20px;
        }
        p {
          margin-top: 10px;
          margin-bottom: 10px;
        }
      `}</style>
      <h1 className="text-5xl md:text-6xl lg:text-6xl xl:text-6xl 2xl:text-6xl mb-8">
        Važni nalazi
      </h1>
      <ToggleYear year={year} setYear={setYear} />
      <div className="mt-8">
        {year === "2024" && (
          <>
            <p>Indeks privatnosti u medijima za 2024. ukazuje na neznatno unapređenje stanja. Naime, promena postoji, ali je ona spora i neravnomerna na nivou ukupnog medijskog sistema. Blago povećanje indeksa beleži se u većini praćenih onlajn medija. Najniže rangirani mediji polako se približavaju tek polovičnoj ispunjenosti standarda uvažavanja privatnosti posetilaca koji se na njihovim portalima informišu. Najzad, upozoravajući je nalaz da su na dnu tabele indeksa iz godine u godinu uglavnom mediji koji beleže izuzetno veliku posećenost, dok su lideri poštovanja standarda privatnosti mediji značajno manjeg dosega.</p>
          </>
        )}

        {year === "2022" && (
          <>
            <p>
              Mali onlajn mediji sa periferije centralnih tokova informacija
              napredovali su na tabeli krupnim koracima i pokazali više
              spremnosti da svoje poslovanje usklade sa zakonima Srbije nego
              neke od najvećih medijskih kuća. Tokom protekle godine zabeležene
              su mnoge promene: uzorak analize manji je za{" "}
              <strong>jedan</strong> sajt koji je u međuvremenu ugašen (
              <a
                href="/media/istočne-vesti"
                className="share-red"
                target="_blank"
              >
                Istočne vesti
              </a>
              ); <strong>jedan</strong> medij više je odlučio da svoje i podatke
              svojih korisnika skladišti u Srbiji; broj medija koji su
              narušavali principe poštovanja privatnosti iz Kodeksa novinara
              ostao je isti (<strong>9</strong>) ali se zbir njihovih opomena
              uvećao za trećinu.
            </p>
            <p>
              Najveći napredak ostvaren je kod jasnog i jednostavnog
              informisanja čitalaca o ličnim podacima koje sajtovi prikupljaju.
              Sledeći korak mogao bi da bude razumevanje medija da je zakon u
              Srbiji pisan po uzoru na evropski i da ista pravila važe za
              građane Srbije kao i za građane EU.
            </p>
          </>
        )}

        {year === "2021" && (
          <>
            <p>
              Od <b>50</b> ocenjenih onlajn medija, samo <b>devet</b> se
              opredelilo za hostovanje svog sajta u Srbiji. Najčešći izbor mesta
              za hosting server domaćih medija je Nemačka. Iako zakon propisuje
              jasan i pošten odnos prema ličnim podacima građana, onlajn mediji
              retko uspevaju da artikulišu svoj proces obrade podataka. U svetu
              metapodataka, situacija je još teža - opet na štetu građana.
              Mobilne aplikacije traže intruzivne dozvole, kolačići i trekeri
              neprimetno prate ponašanje korisnika na internetu, obezbeđujući
              profit od preprodaje privatnosti.
            </p>
            <p>
              Principe poštovanja privatnosti iz Kodeksa novinara narušilo je
              samo <b>devet</b> od <b>50</b> onlajn medija. Ali tih <b>devet</b>{" "}
              kršilo je privatnost za sve ostale, <b>52</b> puta.
            </p>
          </>
        )}
      </div>
      {keyFindings[year].map((row) => (
        <div
          key={year + urlFormatName(row.category.title)}
          className="per-category-wrapper"
          id={urlFormatName(row.category.title)}
        >
          <h3 className="per-category-headline my-8">
            <div
              className="square"
              style={{ backgroundColor: row.category.color }}
            ></div>
            {row.category.title}
          </h3>
          <div className={"key-findings" + year}>
            <span
              dangerouslySetInnerHTML={{
                __html: addMediaLinks(media, row.text),
              }}
            ></span>
          </div>
        </div>
      ))}
    </Layout>
  );
};

export default KeyFindings;

export async function getStaticProps() {
  try {
    const media = getMedia();
    const keyFindings = getKeyFindings();
    return { props: { media, keyFindings }, revalidate: 300 };
  } catch (err: any) {
    return { props: { errors: err.message } };
  }
}
