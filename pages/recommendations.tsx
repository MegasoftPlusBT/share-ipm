import React from "react";
import CategoriesAside from "../components/CategoriesAside";
import Layout from "../components/Layout";
import { getMedia } from "./api/ipm/media";

const Recommendations = ({ media }) => {
  return (
    <Layout media={media} title="IPM - Preporuke">
      <h1 className="text-5xl md:text-6xl lg:text-6xl xl:text-6xl 2xl:text-6xl mb-8">
        Preporuke
      </h1>

      <h2 className="share-big-link text-4xl" style={{ marginLeft: "40px" }}>
        <a
          className="share-red down-arrow-after"
          target="_blank"
          href="/documents/Preporuke_2024.pdf"
        >
          PREUZMITE PDF
        </a>
      </h2>

      <div className="per-category-wrapper" id="osnovni-tehnički-parametri">
        <h3 className="per-category-headline">
          <div className="square" style={{ backgroundColor: "#ffe600" }}></div>
          Osnovni tehnički parametri
        </h3>
        <div className="html-code-wrapper">
          <ul> <li>Podešavanje HTTPS konekcije, tj. pribavljanje sertifikata (TLS) za sve domene koje medij koristi. Besplatni sertifikati se mogu nabaviti preko organizacije <a href="https://letsencrypt.org/" className="share-red">Let’s Encrypt</a>. Neophodno ih je pravilno konfigurisati uz pomoć alata kao što je <a href="https://certbot.eff.org/about" className="share-red">Certbot</a> i proveriti da li se ostvaruje HTTPS konekcija ka sajtu na svim popularnim brauzerima. Više informacija o tome kako podesiti HTTPS dostupno je u <a href="https://eff-certbot.readthedocs.io/en/latest/" className="share-red">Certbot dokumentaciji</a>.</li><li>Analiza trenutne tehničke infrastrukture medijske organizacije (hosting paketi, domeni...) kako bi se utvrdile potencijalno ranjive tačke.</li><li>Razmotriti hosting u Srbiji ili nekoj od država članica EU zbog visokih standarda zaštite ličnih podataka. Tehnička rešenja koja se tiču privatnosti korisnika, moraju se opisati u odgovarajućoj dokumentaciji, sve do politike privatnosti sajta.</li><li>Na svim sajtovima koje medij koristi podesiti zaštitu od DDoS napada, pri čemu treba razmotriti <a href="https://european-alternatives.eu/category/cdn-content-delivery-network" className="share-red">alternativne servise koje se nalaze u EU</a>. Cloudflare novinarima, aktivistima i zaštitnicima ljudskih prava nudi besplatne pakete zaštite (<a href="https://www.cloudflare.com/galileo/" className="share-red">Project Galileo</a>) ali svakako treba razmotriti i druge opcije (npr. <a href="https://deflect.ca/" className="share-red">Deflect</a>, <a href="https://www.qurium.org/secure-hosting/" className="share-red">Virtualroad.org</a>) u skladu sa kapacitetima i potrebama organizacije.</li></ul>
        </div>
      </div>

      <div className="per-category-wrapper" id="obaveštavanje-korisnika">
        <h3 className="per-category-headline">
          <div className="square" style={{ backgroundColor: "#F8BC49" }}></div>
          Obaveštavanje korisnika
        </h3>
        <div className="html-code-wrapper">
          <ul>
            <li>
              Tekst politike privatnosti treba da bude pregledno organizovan
              prema informacijama koje traži zakon i praksama obrade podataka
              koje konkretan medij zaista primenjuje. Besplatan alat{" "}
              <a
                href="https://gdpr.mojipodaci.rs/home"
                className="share-red"
                target="_blank"
              >
                SHARE Fondacije za generisanje politika privatnosti
              </a>{" "}
              može biti od velike pomoći medijima prilikom kreiranja preglednog,
              konkretnog i jasnog obaveštenja korisnicima.{" "}
            </li>
            <li>
              Prvi korak predstavlja precizna informacija o tome ko je
              rukovalac, sa svim neophodnim podacima o pravnom licu.
            </li>
            <li>
              Rok čuvanja je ispravno naveden kada su navedeni različiti rokovi,
              bilo zakonski, bilo oni koje određuje rukovalac, za čuvanje
              različitih vrsta podataka o ličnosti u odnosu na svaku svrhu
              obrade. Takođe je potrebno odrediti posebne pravne osnove za svaku
              svrhu obrade, jer prava koje građani mogu da ostvaruju u velikoj
              meri zavisi od pravnog osnova za obradu.
            </li>
            <li>
              Ukoliko se podaci dele sa nekim drugim, primaoci podataka treba da
              budu dovoljno jasno identifikovani. Česta fraza “pouzdani poslovni
              partneri“ po zakonu se ne smatra jasnom identifikacijom.
            </li>
            <li>
              Prava koja imaju građani čiji se lični podaci obrađuju, moraju
              biti izričito i taksativno navedena, kao i način na koji ta prava
              mogu da se ostvaruju pred rukovaocem.
            </li>
            <li>
              U slučaju nedoumica o načinu opisa i detaljima svake obrade
              podataka koju medij vrši, poželjno je potražiti pravni savet.
            </li>
            <li>
              Potrebno je izričito se odrediti spram svih zakonom propisanih
              parametara. Na primer, ukoliko se podaci ne ustupaju trećim
              licima, to treba navesti u politici privatnosti.
            </li>
          </ul>
        </div>
      </div>

      <div className="per-category-wrapper" id="kolačići-i-trekeri">
        <h3 className="per-category-headline">
          <div className="square" style={{ backgroundColor: "#F75F55" }}></div>
          Kolačići i trekeri
        </h3>
        <div className="html-code-wrapper">
          <ul>
            <li>
              Mediji treba da poseduju obaveštenje o korišćenju kolačića i
              tehnologija za praćenje na svom sajtu ili u okviru politike
              privatnosti ili kao nezavisni dokument.
            </li>
            <li>U najboljem slučaju, mediji bi trebalo odmah pri ulasku na sajt da traže korisnicima da se izjasne o obradi ličnih podataka, kao i da omoguće, u slučaju predomišljanja, u svakom trenutku jasnu i vidljivu opciju za povlačenje pristanka.</li>
            <li>
              Obaveštenje o kolačićima treba da sadrži jednostavnu opciju za
              korisnike koji ne žele da pristanu na korišćenje kolačića, odnosno
              da se korisnicima pruži vidljiva opcija za deaktiviranje kolačića
              na stranici (opt-out).
            </li>
            <li>
              Mediji moraju na razumljiv i transparentan način korisnicima da
              predstave na koji način se njihovi podaci obrađuju preko kolačića.
            </li>
            <li>
              Mediji moraju da usaglase svoja obaveštenja o kolačićima bez
              obzira da li su čitaoci iz Srbije ili iz zemalja članica EU.
            </li>
            <li>
              U slučaju korišćenja analitičkih alata, mediji mogu da pređu na
              servise kao što je{" "}
              <a
                href="https://matomo.org/"
                className="share-red"
                target="_blank"
              >
                Matomo
              </a>
              , softver koji je usklađen sa svim regulativama o zaštiti podataka
              o ličnosti i garantuje privatnost korisnika.
            </li>
          </ul>
        </div>
      </div>

      <div className="per-category-wrapper" id="mobilne-aplikacije">
        <h3 className="per-category-headline">
          <div className="square" style={{ backgroundColor: "#F0368F" }}></div>
          Mobilne aplikacije
        </h3>
        <div className="html-code-wrapper">
          <ul>
            <li>
              Mediji bi trebalo da se trude da kroz svoje aplikacije ne
              prikupljaju lične podatke koje se dele sa oglašivačima radi
              reklamiranja, a što može da ugrozi bezbednost korisnika.
            </li>
            <li>
              U prodavnicama aplikacija (Play store i App store) treba na jasan
              i precizan način opisati sve korisničke podatke koji se
              prikupljaju kroz aplikacije.
            </li>
            <li>
              Iako može biti dosta zahtevnije, interno kreiranje aplikacija
              mnogo je transparentnije jer na taj način mediji sami mogu da
              biraju dozvole i tehnologije za praćenje koje žele da koriste.
            </li>
            <li>
            Ako imaju aplikacije, mediji bi trebalo redovno da vrše provere i ažuriraju svoje aplikacije kao i da obaveštavaju korisnike o svim promenama.
            </li>
          </ul>
        </div>
      </div>

      <div className="per-category-wrapper" id="registracija-korisnika">
        <h3 className="per-category-headline">
          <div className="square" style={{ backgroundColor: "#14a3db" }}></div>
          Registracija korisnika
        </h3>
        <div className="html-code-wrapper">
          <ul>
            <li>
            Potrebno je poštovati princip minimizacije podataka prilikom registracije korisnika. {" "}
            </li>
            <li>
            Potrebno je ograničiti prikupljanje podataka samo na one koji su neophodni za konkretnu svrhu registracije, što su, kako se najčešće pokazuje, mejl/korisničko ime i lozinka.{" "}
            </li>
            <li>
            	Potrebno je uskladiti politike privatnosti sa registracijom, jer se u nekoliko navrata registracija u politici privatnosti pominje, dok je na samoj veb stranici nema. {" "}
            </li>
            <li>
              Ukoliko se opcija registracije pojavljuje na stranici, potrebno je
              omogućiti da ona bude funkcionalna i da bude jasno navedeno čemu
              ona služi.{" "}
            </li>
          </ul>
        </div>
      </div>

      <div className="per-category-wrapper" id="etički-kodeks">
        <h3 className="per-category-headline">
          <div className="square" style={{ backgroundColor: "#7dcee9" }}></div>
          Etički kodeks
        </h3>
        <div className="html-code-wrapper">
          <ul>
            <li>
            Prihvatanje nadležnosti Saveta za štampu bio bi pokazatelj uspostavljanja dobre prakse u radu onlajn medija. Mediji u svom izveštavanju treba da poštuju pravila iz Kodeksa novinara Srbije, a u kontekstu privatnosti posebno da obrate pažnju na odeljke koji se tiču odgovornosti novinara (IV) i poštovanja privatnosti (VII)
            </li>
            <li>
            Mediji treba da poštuju privatnost i identitet osumnjičenog ili počinioca krivičnog dela,  zaštite druge podatke koji bi mogli da upute na identitet osumnjičenog ili počinioca, a takođe treba da zaštite i identitet žrtava (stav 3 odeljka Odgovornost novinara Kodeksa novinara Srbije)
            </li>
            <li>
            	Novinari treba da poštuju štite prava i dostojanstvo dece, žrtava zločina, osoba sa hendikepom i drugih ugroženih grupa (stav 5 odeljka Odgovornost novinara Kodeksa)
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Recommendations;

export async function getStaticProps() {
  try {
    const media = getMedia();
    // By returning { props: item }, the StaticPropsDetail component
    // will receive `item` as a prop at build time
    return { props: { media }, revalidate: 300 };
  } catch (err: any) {
    return { props: { errors: err.message } };
  }
}
