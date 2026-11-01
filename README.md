# Kegel Fit

*[English version](README.en.md)*

Web aplikacija za vođeno vežbanje mišića karličnog dna (Kegelove vežbe) u jednom HTML fajlu: tajmer sa stezanjem i opuštanjem, vibracija i zvuk, plan od 25 nedelja i praćenje napretka.

> **Napomena:** aplikacija je pomagalo za vežbanje, a ne medicinski savet. Ako imate zdravstvenih tegoba ili bol pri vežbanju, obratite se lekaru ili fizioterapeutu.

## Šta aplikacija radi

- **Plan od 25 nedelja**, svaka sa 7 dana, svaki dan sa 5 blokova. Trajanje raste od oko 2:39 (nedelja 1, dan 1) do oko 15:00 (nedelja 25, dan 7).
- **Slobodan izbor** bilo koje nedelje i bilo kog dana (bez zaključavanja).
- **Ekran za vežbanje preko celog ekrana** sa prstenom koji pokazuje napredak kroz seriju, oznakama STISNI / OPUSTI i odbrojavanjem.
- **Vibracija** koja radi neprekidno dok traje STISNI i staje na OPUSTI.
- **Zvučni signali** pri promeni faze.
- **Statistika**: niz dana, broj odrađenih treninga, ukupno vreme i istorija.
- **Dva jezika:** srpski (latinica) i engleski. Pri prvom otvaranju jezik se bira prema pregledaču (srpski, hrvatski i bosanski daju srpski, ostalo engleski), a izbor se menja u Podešavanjima, pamti se i sinhronizuje preko Firebase-a.
- **Rezervna kopija** podataka (izvoz i uvoz JSON fajla).
- Opciona **prijava preko Google naloga** i sinhronizacija u Firebase Firestore.

## Pokretanje

Aplikacija ne traži instalaciju ni build.

1. Otvorite `kegel_fit_web_app.html` u pregledaču (dvoklik ili `File → Open`).
2. Za korišćenje na telefonu postavite fajl na bilo koji statički hosting (npr. GitHub Pages) i otvorite adresu u pregledaču.

Potrebna je internet veza pri učitavanju, jer se sledeće biblioteke učitavaju sa CDN-a: Tailwind CSS, Font Awesome i Google Fonts (Inter). Podaci o vežbanju se čuvaju lokalno u pregledaču.

## Kako se koristi

1. Na početnom ekranu izaberite **nedelju** (horizontalna lista na vrhu), pa **dan** (7 dugmadi ispod).
2. Pregledajte strukturu treninga (blokovi, ponavljanja, trajanje) i pritisnite **Započni Trening**.
3. Posle uspešno završenog treninga aplikacija sama prelazi na sledeći dan. Posle 7. dana prelazi na 1. dan sledeće nedelje.

### Ekran za vežbanje

Gornja kartica pokazuje naziv bloka, sa pomoći (?) levo i dugmetom za odustajanje (X) desno. Iznad prstena je „Ponavljanje X od Y“, a prsten ima onoliko segmenata koliko ponavljanja ima trenutni blok. Kad završite ponavljanje, upali se sledeći segment. U prstenu su oznake STISNI i OPUSTI sa trajanjem, a između njih odbrojavanje. Donja traka pokazuje koja je vežba po redu (npr. 2/5) i koliko je vremena preostalo do kraja treninga.

Dugmad ispod prstena, redom:

| Dugme | Funkcija |
|---|---|
| Stealth | Sakriva prsten i boje i prelazi na tamni diskretni prikaz. Tekst i broj sekundi ostaju vidljivi. |
| Zvuk | Uključuje i isključuje zvučne signale. |
| Pauza / Nastavi | Zaustavlja i nastavlja trening (veliko dugme u sredini). |
| Vibracija | Uključuje i isključuje vibraciju, i usred stezanja. |
| Preskoči | Iz vežbe prelazi na odmor, a iz odmora na sledeću vežbu. Na poslednjoj vežbi pita da li da završi trening. |

### Podešavanja

- **Jezik:** srpski ili engleski.
- **Pauza između blokova:** 5, 10, 15, 20 ili 30 sekundi (podrazumevano 15 s).
- **Vibracija** i **zvuk**: uključivanje i isključivanje.
- **Rezervna kopija:** preuzimanje i učitavanje JSON fajla sa napretkom. Učitavanje **zamenjuje** trenutne podatke, a pre toga traži potvrdu i proverava ispravnost fajla.
- **Brisanje svih podataka.**

## Plan vežbanja

Svaki dan ima 5 bloka, a dva tipa bloka su:

- **Spori blokovi (Tension):** stezanje i opuštanje sa dužim držanjem. Držanje raste od 3 s / 3 s do 18 s / 8 s.
- **Brzi blokovi (Fast tension):** uvek 1 s stezanje i 1 s opuštanje, sa velikim brojem ponavljanja.

Raspored blokova:

- Nedelje 1–12: spori · brzi · spori · brzi · spori
- Nedelje 13–25: brzi · spori · brzi · spori · brzi (duža držanja, veliki brzi blokovi)

Izbor iz plana (ponavljanja po blokovima redom, trajanje računato sa pauzom od 15 s):

| Nedelja | Držanje | Dan 1 | Dan 7 | Trajanje |
|---|---|---|---|---|
| 1 | 3/3 | 4·6·4·6·4 | 5·8·5·7·5 | 2:39 → 3:03 |
| 4 | 4/4 | 6·13·5·12·6 | 7·14·6·13·7 | 4:09 → 4:37 |
| 8 | 4/4 → 5/4 | 10·20·9·18·10 | 10·21·8·20·10 | 6:11 → 6:37 |
| 12 | 6/5 → 7/5 | 10·28·9·25·10 | 10·29·8·27·10 | 8:08 → 8:31 |
| 13 | 7/5 → 8/5 | 25·13·22·13·22 | 25·13·22·13·21 | 8:33 → 8:57 |
| 18 | 10/7 → 11/7 | 31·13·27·13·27 | 34·12·31·12·31 | 11:15 → 11:27 |
| 22 | 14/7 → 15/8 | 39·12·35·12·35 | 37·12·33·12·33 | 13:05 → 13:41 |
| 25 | 17/8 → 18/8 | 40·12·36·12·36 | 48·11·42·11·42 | 14:47 → 14:59 |

Trajanje svakog dana je veće od trajanja prethodnog. Pri prelasku na duže držanje broj ponavljanja u sporim blokovima može malo da padne, dok ukupno trajanje i dalje raste.

### Izmena plana

Plan je u nizu `PLAN_DATA` u skripti, jedan red po nedelji, sedam unosa po redu. Svaki dan je zapisan kao:

```js
[držanje, opuštanje, ponavljanja_blok1, blok2, blok3, blok4, blok5]
```

Na primer, `[3,3,4,6,4,6,4]` je dan sa držanjem 3 s, opuštanjem 3 s i blokovima od 4, 6, 4, 6 i 4 ponavljanja. Redosled tipova blokova određuje konstanta `PLAN_SWITCH_DAY` (od 85. dana, tj. od nedelje 13, raspored je brzi · spori · brzi · spori · brzi). Brzi blokovi su uvek 1 s / 1 s.

## Prevodi

Svi tekstovi aplikacije su u objektu `I18N` na početku skripte, sa ključevima za `sr` i `en`. Statični tekstovi u HTML-u imaju atribut `data-i18n="ključ"`, a tekstovi koje piše JavaScript prolaze kroz funkciju `t('ključ', {parametri})`. Za reči sa množinom (npr. „1 dan“, „2 dana“) postoji `tp()`, koja zna srpska pravila (1 / 2–4 / 5 i više).

Za dodavanje novog jezika dodajte novi objekat pored `sr` i `en`, proširite funkciju `detectLang()` i dodajte opciju u izbor jezika u Podešavanjima. Svi ključevi moraju postojati u svim jezicima. Izbor jezika se čuva u `settings.lang` i ulazi u rezervnu kopiju.

## Čuvanje podataka

- **Lokalno:** u `localStorage` pregledača, pod ključem `kegel_fit_state`. Čuvaju se izabrana nedelja i dan, odrađeni dani, niz, istorija i podešavanja.
- **Redni broj dana:** odrađeni dani se pamte kao broj od 1 do 175 (nedelja 1 dan 1 je 1, nedelja 25 dan 7 je 175). Rezervne kopije iz starije verzije, koja je imala samo prvu nedelju, i dalje se ispravno učitavaju.
- **Cloud (opciono):** posle prijave Google nalogom podaci se sinhronizuju u Firebase Firestore, u dokument `users/{uid}`. Pri prvoj prijavi lokalni i oblak podaci se **spajaju** (odrađeni dani i istorija se objedine, niz je veći od dva), pa se ništa ne gubi.

### Podešavanje Firebase-a (prijava i cloud baza)

Dok se ne unese sopstvena konfiguracija, aplikacija radi u lokalnom režimu, a u prozoru za prijavu piše da cloud nije podešen.

1. **Napravite projekat** u [Firebase konzoli](https://console.firebase.google.com/) (Add project). Google Analytics nije potreban.
2. **Dodajte Web aplikaciju:** Project settings → Your apps → ikona `</>` → unesite naziv → Register app. Kopirajte objekat `firebaseConfig`.
3. **Zalepite konfiguraciju** u `kegel_fit_web_app.html`, u objekat `FIREBASE_CONFIG` na početku modula (`<script type="module">`). API ključ nije tajna: bezbednost obezbeđuju pravila i dozvoljeni domeni.
4. **Uključite Google prijavu:** Build → Authentication → Get started → Sign-in method → Google → Enable. Izaberite e-adresu za podršku i sačuvajte.
5. **Napravite Firestore bazu:** Build → Firestore Database → Create database. Izaberite lokaciju bliže sebi (npr. `eur3`) i počnite u production režimu.
6. **Postavite pravila:** Firestore → Rules → zalepite sadržaj fajla [`firestore.rules`](firestore.rules) → Publish. Pravila dozvoljavaju svakom korisniku samo njegov dokument `users/{uid}`, a sve ostalo zabranjuju.
7. **Dozvolite domene:** Authentication → Settings → Authorized domains. `localhost` je već tu. Dodajte domen na kojem aplikaciju objavljujete (npr. `korisnik.github.io`).

#### Testiranje na računaru

Google prijava **ne radi** kad se stranica otvori kao fajl (`file://`). Pokrenite lokalni server u folderu sa aplikacijom:

```bash
python3 -m http.server 8080
```

pa otvorite `http://localhost:8080/kegel_fit_web_app.html`.

#### Česte greške

| Poruka ili ponašanje | Uzrok |
|---|---|
| „Cloud prijava nije podešena“ | `FIREBASE_CONFIG` još sadrži `YOUR_...` vrednosti. |
| „Ova adresa nije dozvoljena u Firebase-u“ | Domen nije u Authorized domains (korak 7). |
| „Google prijava nije uključena“ | Nije izvršen korak 4. |
| „Prijava ne radi kad je stranica otvorena kao fajl“ | Otvorite je preko `http://localhost` ili GitHub Pages. |
| „Firestore pravila ne dozvoljavaju pristup“ | Pravila nisu postavljena ili nisu objavljena (korak 6). |
| Prozor za prijavu se ne otvara | Pregledač blokira iskačuće prozore za ovu stranicu. |

## Podrška pregledača

| Funkcija | Podrška |
|---|---|
| Plan, tajmer, statistika | Svi savremeni pregledači |
| Zvuk | Svi savremeni pregledači (Web Audio) |
| Vibracija | Chrome i Firefox na Androidu. **Ne radi na iPhone-u (Safari).** |

Zvuk i vibracija počinju tek posle dodira na ekran (npr. na dugme Započni), jer pregledači ne dozvoljavaju automatsko pokretanje.

## Struktura projekta

- `kegel_fit_web_app.html`: cela aplikacija (HTML, CSS i JavaScript), uz poseban modul unutar istog fajla za Firebase
- `README.md` i `README.en.md`: dokumentacija na srpskom i engleskom
- `firestore.rules`: pravila za Firestore bazu
- `LICENSE`: GNU GPL v3

## Licenca

Kegel Fit je slobodan softver pod licencom **GNU General Public License, verzija 3** (GPL-3.0). Možete ga slobodno koristiti, proučavati, menjati i deliti, pod uslovom da izmenjene verzije koje delite takođe ostanu pod GPL licencom i da im je dostupan izvorni kod.

Pun tekst licence je u fajlu [`LICENSE`](LICENSE), a obaveštenje o autorskim pravima je na početku fajla `kegel_fit_web_app.html`.

```
Copyright (C) 2026  Milan (milangru)

Ovaj program je slobodan softver: možete ga redistribuirati i/ili menjati
pod uslovima GNU General Public License kako ju je objavila Free Software
Foundation, bilo verzije 3 licence ili (po vašem izboru) bilo koje novije verzije.

Program se distribuira u nadi da će biti koristan, ali BEZ IKAKVE GARANCIJE,
čak i bez impliciranih garancija PRODAJNOSTI ili PRIKLADNOSTI ZA ODREĐENU SVRHU.
Pogledajte GNU General Public License za više detalja.
```

Napomena: biblioteke koje se učitavaju sa CDN-a (Tailwind CSS, Font Awesome, Firebase SDK, Google Fonts) imaju svoje licence i nisu deo ovog repozitorijuma.
