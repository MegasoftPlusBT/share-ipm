import { Category } from "../../../interfaces/category";

export const categories: Category[] = [
  {
    title: "Osnovni tehnički parametri",
    color: "#ffe600",
    about:
      ' <p>obuhvataju četiri pokazatelja. Sertifikat za siguran protokol povezivanja uređaja i sajta (HTTPS) vidljiv je iz adresnog polja (ikona katanca pre adrese) i neophodno je da se učitava automatski. Mrežni alati (<a href="https://www.howtogeek.com/355664/how-to-use-ping-to-test-your-network/">ping</a>, <a href="https://kb.intermedia.net/article/682">traceroute</a>, <a href="https://check-host.net/">Check Host</a>) korišćeni su za praćenje putanje podataka od korisničkog uređaja do servera, utvrđivanje lokacije servera i primene posredničkih servisa.</p><p>Dobijene informacije o putanji i lokaciji podataka vrednovane su prema pravnom režimu država koje učestvuju u saobraćaju, odnosno u kojima se nalaze hosting serveri i serveri kompanija koje pružaju usluge posredovanja sadržaja. <a href="https://pravno-informacioni-sistem.rs/SlGlasnikPortal/eli/rep/sgrs/vlada/odluka/2019/55/2">Republika Srbija</a> se rukovodi standardima zaštite podataka utvrđenim <a href="https://www.coe.int/en/web/conventions/full-list/-/conventions/treaty/108">Konvencijom 108 Saveta Evrope</a> ili Konvenciji ekvivalentnim standardima. Sjedinjene Američke Države se po ovim standardima smatraju za srednju vrednost između država sa adekvatnim i neadekvatnim režimom zaštite, usled pravne nesigurnosti izazvane raskidanjem <a href="https://www.sharefoundation.info/sr/oboren-privacy-shield-sta-to-znaci-za-kompanije-iz-srbije/">sporazuma </a>između EU i SAD 2020. godine. Imajući u vidu da je Rusija <a href="https://www.coe.int/en/web/portal/-/the-russian-federation-is-excluded-from-the-council-of-europe">isključena iz Saveta Evrope</a> 2022. godine, njen status adekvatnosti je takođe u srednjem režimu kao SAD i metodologija je u tom pogledu ažurirana. </p>',
  },
  {
    title: "Obaveštavanje korisnika",
    color: "#fbb82e",
    about:
      ' je kategorija sa najviše indikatora, sačinjenih prema obavezama izričito opisanim u <a href="https://www.paragraf.rs/propisi/zakon_o_zastiti_podataka_o_licnosti.html">Zakonu o zaštiti podataka o ličnosti</a> (članovi 23 i 24). Medijska organizacija se po zakonu smatra rukovaocem ličnim podacima građana, koji je dužan da svoje korisnike ili pretplatnike obavesti o čitavom procesu obrade podataka, uključujući svrhu i pravni osnov obrade, načine na koje se obrada vrši i nizu drugih detalja. Osim ovih kvantitativnih kriterijuma, zakon zahteva ispunjavanje i kvalitativnih kriterijuma - da se korisnici informišu jednostavnim i razumljivim jezikom, na javno i lako dostupan način.</p>\n',
  },
  {
    title: "Kolačići i trekeri",
    color: "#fa103a",
    about:
      ' pripadaju tehničkoj kategoriji gde se kroz pokazatelje vrednuju upotreba, broj i vrsta paketa podataka koje server preko sajta unosi u korisnički uređaj za vreme posete. Ove <a href="https://labs.rs/sr/nevidljiva-infrastruktura-onlajn-pratioci/">tehnologije</a> koriste se za praćenje aktivnosti posetilaca sajtova, u različite svrhe i različitih nivoa intruzivnosti. Kod upotrebe kolačića vrednuje se informisanje korisnika, kao i prisustvo vidljive i jednostavne opcije za kontrolu kolačića.</p>\n\n<p>Broj trekera se proverava uz pomoć tehničkog alata (<a href="https://themarkup.org/blacklight">Blacklight</a>) koji skenira sajtove i prikazuje trekere po vrstama. Najintruzivniji trekeri služe za izbegavanje blokera oglasa, beleženje sesija i praćenje korisničke tastature. Tehnologije praćenja ponašanja korisnika na internetu koje koriste tehno-giganti, Fejsbuk piksel i Gugl analitika, obrađene su kao posebni indikatori.</p>\n',
  },
  {
    title: "Mobilne aplikacije",
    color: "#f63db4",
    about:
      ' nemaju svi mediji, a njihovo odsustvo je iz perspektive zaštite privatnosti građana vrednovano kao jedna prilika manje za ugrožavanje ličnih podataka, maksimalnim brojem poena. Analizirane su mobilne aplikacije medija za Android i iOS operativne sisteme i to u odnosu na prikupljanje podataka i potencijalni uticaj na funkcionalnost mobilnih uređaja.</p>\n\n<p>Za analizu broja trekera unutar Android aplikacija i potencijalno opasnih <a href="https://labs.rs/sr/nevidljive-infrastrukture-dozvole-na-mobilnim-uredajima/">dozvola</a> koje aplikacije traže od uređaja, korišćena je platforma organizacije <a href="https://reports.exodus-privacy.eu.org/en/">Exodus Privacy</a>, koja generiše analitičke izveštaje o aplikacijama dostupnim na Google Play servisu. </p>\n\n<p>Kod iOS aplikacija (Apple uređaji) analizirano je šta prikupljaju od podataka korisnika prema napomeni o privatnosti (App Privacy) na <a href="https://apps.apple.com/story/id1539235847">Apple prodavnici</a>, npr. da li prikupljaju samo dijagnostičke i slične podatke ili osetljivije podatke poput lokacije. Posebno problematičnu praksu predstavlja odsustvo informacija o podacima koje prikuplja entitet koji je razvio aplikaciju.</p>\n',
  },
  {
    title: "Registracija korisnika",
    color: "#14a3db",
    about:
      ', ukoliko nije reč o naplati pristupa sadržajima (paywall), predstavlja praksu kojom mediji grade stabilnu publiku, a vernost korisnika nagrađuju posebnim pogodnostima, dodatnim sadržajima i slično. I plaćena i neplaćena pretplata podrazumevaju individualizovan odnos sa korisnicima i obradu određenih podataka prilikom registracije.</p>\n\n<p>Mediji koji se nisu odlučili za ovaj vid obrade podataka ocenjeni su maksimalnim brojem poena, jer nisu izložili podatke korisnika još jednom potencijalnom riziku. U vrednovanju pokazatelja koji meri odnos količine podataka prikupljenih registracijom i svrhe njihove obrade, oslonac je zakonski propis, tj. načelo minimizacije podataka (član 5 <a href="https://www.paragraf.rs/propisi/zakon_o_zastiti_podataka_o_licnosti.html">Zakona o zaštiti podataka o ličnosti</a>).</p>\n',
  },
  {
    title: "Etički kodeks",
    color: "#7dcee9",
    about:
      ' je kategorija sa samo jednim indikatorom, brojem odluka koje je protiv medija donela Komisija za žalbe Saveta za štampu, samoregulacionog tela koje prati poštovanje etičkih i profesionalnih standarda u štampanim i onlajn medijima.</p>\n\n<p>U obzir se uzimaju odluke koje se odnose na kršenje principa iz <a href="https://savetzastampu.rs/wp-content/uploads/2020/11/Kodeks_novinara_Srbije.pdf">Kodeksa novinara Srbije</a> koji se direktno ili posredno tiču prava na privatnost (IV Odgovornost novinara - stavovi 3 i 5; VII Poštovanje privatnosti - stavovi 1-4). Obuhvaćene su odluke protiv medija do 31.12.2021. koje se nalaze u pretraživoj <a href="http://zalbe.rs/">Bazi žalbi Saveta za štampu</a>. </p>\n',
  },
];
