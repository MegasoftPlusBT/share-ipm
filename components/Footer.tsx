const Footer = () => {
  return (
    <footer>
      <style>
        {`
          /* start footer */
            footer {
                background-color: #1b1a18;
                color: white;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                padding: 40px;
            }
            footer > section.left {
                max-width: 388px;
            }
            footer > section.right {
                max-width: 699px;
            }
            footer p {
                font-family: Roboto;
                font-weight: normal;
                font-size: 16px;
                line-height: 24px;
            }
            footer h4 {
                font-family: Roboto;
                font-weight: bold;
                font-size: 18px;
                line-height: 150%;
            }
            footer .support-logo {
                padding-top: 5px;
                margin-right:18px;
            }
            @media (min-width: 1220px) {
                footer {
                    padding-left: 120px;
                }
            }

            /* end footer */
          `}
      </style>
      <section className="left">
        <a href="https://birn.rs/">
          <img
            src="/images/birn-logo.png"
            style={{ paddingTop: "5px", marginRight: "10px" }}
            width="80"
          />
        </a>
        <a href="https://www.sharefoundation.info/sr/o-nama/">
          <img
            src="/images/share-footer-logo.png"
            style={{ paddingTop: "5px" }}
            width="240"
          />
        </a>
        <h4 className="mt-2">Izjava o privatnosti</h4>
        <p className="mb-2">
        Sajtom na adresi indeks.onlajnmediji.rs upravlja Share Fondacija, Stojana Novakovića 23, Beograd. Prilikom vaše posete sajtu indeks.onlajnmediji.rs ne prikupljaju se podaci o ličnosti, niti se koriste kolačići (cookies).
        </p>
      </section>
      <section className="right">
        <h4>Projekat podržali:</h4>
        <img
          src="/images/kingdom-of-the-netherlands-logo.png"
          className="support-logo"
          height="88"
          style={{ height: "88px" }}
        />
        <p className="my-2">
        Indeks privatnosti u medijima je izrađen u okviru projekta Cena privatnosti koji partnerski sprovode BIRN Srbija, SHARE Fondacija i Partneri Srbija, uz finansijsku podršku MATRA programa.
        </p>
      </section>
    </footer>
  );
};

export default Footer;
