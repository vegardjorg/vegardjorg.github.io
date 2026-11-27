/* ============================================================
   vegardjorg.github.io · fig-artikkel-ki.js
   Figurene til artikkelen «Når KI-en bare får lov til det brukeren får lov til».
   Tegnet med fig-motor.js etter illustrasjonsplanen: marineblått håndhever, grønt er godkjent,
   rav reduserer risiko eller er mennesket i løkka, rødt er angrep og avslag. Farge bærer aldri
   betydningen alene: hake, kryss, lås og stiplet mot heltrukket sier det samme.
   ============================================================ */
(function () {
  "use strict";
  var F = window.FIG, I = F.ikon, T = F.tekst;
  var L = { klasse: "fig-liten" };
  function liten(o) { var r = { klasse: "fig-liten" }; for (var k in o) r[k] = o[k]; return r; }

  /* ---------- 0. Forsidebilde: modellen lures, databasen holder ---------- */
  F.FIGURER.forside = function (host, meta) {
    F.tegn(host, {
      bred: function (h) {
        var s = F.svg(h, { w: 760, h: 330, tittel: meta.tittel, desc: meta.desc });
        // Bruker
        I.person(s, 52, 160, 54, "graa");
        I.skjerm(s, 108, 160, 40, "graa");
        T(s, 80, 112, "Bruker", { fet: true });
        F.pil(s, [[132, 150], [190, 150]], { tone: "graa" });
        T(s, 160, 136, "Spørsmål", liten({}));
        // Plantet instruks
        I.konvolutt(s, 265, 40, 32, "rod", { utrop: true });
        T(s, 292, 40, "Plantet instruks i data", liten({ anker: "start", tone: "rod" }));
        F.pil(s, [[265, 60], [265, 112]], { tone: "rod", stiplet: true });
        // Modellen, litt skjev
        var m = F.g(s, null, "rotate(-4 265 165)");
        F.boks(m, 195, 122, 140, 86, "Modell\n(lurt)", { tone: "graa" });
        I.varsel(s, 332, 124, 26, "rod");
        // «Gi meg alt» mot veggen
        F.pil(s, [[342, 165], [450, 165]], { tone: "rod", bred: true });
        T(s, 396, 140, "«Gi meg alt»", { fet: true, tone: "rod" });
        I.kryss(s, 436, 165, 22, "rod");
        // Databasen som vegg
        F.boks(s, 460, 22, 34, 262, "", { tone: "navy", fyll: "solid", r: 3 });
        I.skjold(s, 477, 165, 64, "gronn");
        T(s, 477, 306, "Database: brukerens egne tilganger", { fet: true, tone: "navy" });
        // Andre virksomheter, urørt
        [["navy", 568], ["gronn", 636], ["rav", 704]].forEach(function (b) {
          I.bygg(s, b[1], 140, 52, b[0]);
          I.mappe(s, b[1], 192, 22, b[0]);
        });
        T(s, 636, 236, "Andre virksomheter:\nurørt", liten({}));
        // Svaret tilbake
        F.pil(s, [[454, 256], [80, 256], [80, 194]], { tone: "graa" });
        I.kort(s, 268, 256, 34, "graa", { linjer: 1 });
        T(s, 268, 292, "Bare det brukeren har lov til", liten({}));
      },
      smal: function (h) {
        var s = F.svg(h, { w: 380, h: 500, tittel: meta.tittel, desc: meta.desc });
        I.konvolutt(s, 200, 28, 28, "rod", { utrop: true });
        T(s, 224, 28, "Plantet instruks", liten({ anker: "start", tone: "rod" }));
        F.pil(s, [[200, 46], [200, 84]], { tone: "rod", stiplet: true });
        var m = F.g(s, null, "rotate(-4 200 124)");
        F.boks(m, 130, 88, 140, 72, "Modell (lurt)", { tone: "graa" });
        I.varsel(s, 268, 90, 24, "rod");
        I.person(s, 40, 112, 44, "graa");
        I.skjerm(s, 92, 116, 32, "graa");
        T(s, 62, 160, "Bruker", { fet: true });
        F.pil(s, [[110, 122], [128, 122]], { tone: "graa" });
        F.pil(s, [[200, 166], [200, 262]], { tone: "rod", bred: true });
        T(s, 212, 214, "«Gi meg alt»", { fet: true, tone: "rod", anker: "start" });
        I.kryss(s, 200, 250, 22, "rod");
        F.boks(s, 18, 270, 344, 30, "", { tone: "navy", fyll: "solid", r: 3 });
        I.skjold(s, 200, 285, 58, "gronn");
        T(s, 190, 334, "Database: brukerens egne tilganger", { fet: true, tone: "navy" });
        [["navy", 110], ["gronn", 190], ["rav", 270]].forEach(function (b) {
          I.bygg(s, b[1], 396, 48, b[0]);
          I.mappe(s, b[1], 442, 20, b[0]);
        });
        T(s, 190, 478, "Andre virksomheter: urørt", liten({}));
        F.pil(s, [[40, 266], [40, 144]], { tone: "graa" });
        I.kort(s, 40, 214, 30, "graa", { linjer: 1 });
        T(s, 62, 214, "Bare det brukeren\nhar lov til", liten({ anker: "start" }));
      }
    });
  };

  /* ---------- 1. Tre slags vern ---------- */
  F.FIGURER["tre-vern"] = function (host, meta) {
    var kol = [
      { tone: "navy", tittel: "Håndhever", ikon: function (s) { I.mur(s, 120, 50, 54, "navy"); I.las(s, 146, 66, 26, "navy"); },
        punkt: ["RLS i databasen", "Tilgangssjekk ved\nhvert verktøykall", "Residenskontroll\ni koden"], fot: "Brudd = sårbarhet" },
      { tone: "rav", tittel: "Reduserer risiko", ikon: function (s) { I.gjerde(s, 120, 50, 54, "rav"); },
        punkt: ["Instrukser til\nmodellen", "Innpakning og\nvasking av data", "Tak på lengde"], fot: "Avvik = svakhet som rettes" },
      { tone: "gronn", tittel: "Oppdager", ikon: function (s) { I.lupe(s, 120, 50, 54, "gronn"); },
        punkt: ["Tester", "Red teaming", "Overvåking og varsel"], fot: "Viser når noe ikke virker" }
    ];
    var celler = F.celler(host, 3);
    kol.forEach(function (k, i) {
      var s = F.svg(celler[i], { w: 240, h: 300, tittel: (i ? "" : meta.tittel + ": ") + k.tittel, desc: i ? k.tittel + ": " + k.punkt.join(", ").replace(/\n/g, " ") + ". " + k.fot + "." : meta.desc });
      s.setAttribute("viewBox", "14 0 212 300"); // skjær bort luft i kantene, så teksten blir større
      k.ikon(s);
      T(s, 120, 104, k.tittel, { fet: true, tone: k.tone, str: 17 });
      k.punkt.forEach(function (p, j) {
        var y = 146 + j * 40;
        F.boks(s, 18, y - 5, 10, 10, "", { tone: k.tone, fyll: "solid", r: 2 });
        T(s, 38, y, p, { anker: "start" });
      });
      F.linje(s, [[16, 262], [224, 262]], { tone: k.tone });
      T(s, 120, 282, k.fot, liten({ fet: true, tone: k.tone }));
    });
  };

  /* ---------- 2. Én inngang: tre ledd ---------- */
  F.FIGURER["en-inngang"] = function (host, meta) {
    F.tegn(host, {
      bred: function (h) {
        var s = F.svg(h, { w: 760, h: 350, tittel: meta.tittel, desc: meta.desc });
        // Snarveien finnes ikke
        var b = F.bue(s, 70, 122, 684, 122, 140, { tone: "rod", stiplet: true });
        I.kryss(s, b.mx, b.my, 26, "rod");
        T(s, b.mx, b.my - 26, "Ingen direkte vei", liten({ fet: true, tone: "rod" }));
        // Ledd
        F.boks(s, 10, 124, 120, 96, "", { tone: "graa" });
        I.telefon(s, 50, 158, 34, "graa"); I.skjerm(s, 94, 160, 28, "graa");
        T(s, 70, 198, "App", { fet: true });
        var k = F.boks(s, 168, 104, 172, 136, "", { tone: "navy" });
        T(k.g, 254, 126, "KI-funksjon", { fet: true });
        T(k.g, 254, 160, "identitet\nKI slått på?\nkvote reservert", L);
        F.boks(s, 368, 64, 208, 214, "", { tone: "graa", fyll: "ingen", stiplet: true, r: 12 });
        T(s, 472, 80, "ikke nåbar utenfra", liten({ tone: "graa" }));
        var g = F.boks(s, 382, 96, 180, 168, "", { tone: "navy", fyll: "solid" });
        T(g.g, 472, 120, "Intern gateway", { fet: true });
        T(g.g, 472, 182, "nøkler\nEU-rute\nkostvern\nlogging", L);
        F.boks(s, 624, 124, 126, 96, "Modell\n(upålitelig)", { tone: "graa", stiplet: true, fet: false });
        F.pil(s, [[132, 172], [166, 172]], { tone: "navy" });
        F.pil(s, [[342, 172], [380, 172]], { tone: "navy" });
        F.pil(s, [[564, 172], [622, 172]], { tone: "navy", start: true });
        // Databasen under KI-funksjonen
        F.linje(s, [[254, 242], [254, 282]], { tone: "navy" });
        I.db(s, 254, 308, 50, "navy");
        T(s, 290, 308, "Database: tilganger og isolasjon", liten({ anker: "start", fet: true, tone: "navy" }));
      },
      smal: function (h) {
        var s = F.svg(h, { w: 400, h: 540, tittel: meta.tittel, desc: meta.desc });
        F.boks(s, 135, 14, 160, 58, "", { tone: "graa" });
        I.telefon(s, 172, 43, 32, "graa");
        T(s, 228, 43, "App", { fet: true });
        F.pil(s, [[215, 74], [215, 102]], { tone: "navy" });
        var k = F.boks(s, 115, 104, 200, 108, "", { tone: "navy" });
        T(k.g, 215, 124, "KI-funksjon", { fet: true });
        T(k.g, 215, 170, "identitet\nKI slått på?\nkvote reservert", L);
        F.linje(s, [[82, 158], [113, 158]], { tone: "navy" });
        I.db(s, 54, 158, 44, "navy");
        T(s, 54, 202, "Database", liten({ fet: true, tone: "navy" }));
        T(s, 54, 228, "tilganger og\nisolasjon", L);
        F.pil(s, [[215, 214], [215, 246]], { tone: "navy" });
        F.boks(s, 100, 248, 230, 156, "", { tone: "graa", fyll: "ingen", stiplet: true, r: 12 });
        T(s, 215, 264, "ikke nåbar utenfra", liten({ tone: "graa" }));
        var g = F.boks(s, 112, 278, 206, 114, "", { tone: "navy", fyll: "solid" });
        T(g.g, 215, 298, "Intern gateway", { fet: true });
        T(g.g, 215, 346, "nøkler · EU-rute\nkostvern · logging", L);
        F.pil(s, [[215, 394], [215, 450]], { tone: "navy", start: true });
        F.boks(s, 145, 452, 140, 62, "Modell\n(upålitelig)", { tone: "graa", stiplet: true, fet: false });
        var b = F.bue(s, 297, 44, 287, 482, 150, { tone: "rod", stiplet: true });
        I.kryss(s, b.mx, b.my, 24, "rod");
        T(s, b.mx, b.my + 34, "Ingen\ndirekte\nvei", liten({ fet: true, tone: "rod" }));
      }
    });
  };

  /* ---------- 3. Verktøykallet kontrolleres fire ganger ---------- */
  F.FIGURER.verktoykall = function (host, meta) {
    var s = F.svg(host, { w: 480, h: 700, tittel: meta.tittel, desc: meta.desc, klasse: "fig-hoy" });
    // Klient
    I.telefon(s, 116, 44, 48, "graa");
    T(s, 146, 34, "Klient", { fet: true, anker: "start" });
    T(s, 146, 58, "historikk i minnet", liten({ anker: "start" }));
    F.pil(s, [[124, 72], [124, 110]], { tone: "navy" });
    // Forklaring
    F.linje(s, [[318, 30], [344, 30]], { tone: "navy" });
    T(s, 352, 30, "kontrollert kode", liten({ anker: "start" }));
    F.linje(s, [[318, 54], [344, 54]], { tone: "rod", stiplet: true });
    T(s, 352, 54, "modellens ønske", liten({ anker: "start", tone: "rod" }));
    // Assistenttjenesten med menyen
    var a = F.boks(s, 34, 112, 236, 166, "", { tone: "navy" });
    T(a.g, 152, 132, "Assistenttjenesten", { fet: true });
    F.boks(s, 50, 148, 204, 98, "", { tone: "graa", fyll: "flate", r: 4 });
    for (var i = 0; i < 5; i++) {
      var y = 164 + i * 17, ok = i < 3;
      var rad = F.g(s, ok ? null : "fig-dempet");
      if (ok) I.hake(rad, 72, y, 13, "gronn"); else I.las(rad, 72, y, 13, "graa");
      F.linje(rad, [[86, y], [ok ? 236 - i * 22 : 200 + i * 8, y]], { tone: ok ? "blekk" : "graa" });
    }
    T(a.g, 152, 262, "meny etter brukerens tilganger", L);
    // Gatewayen er eneste vei til modellen
    F.boks(s, 310, 102, 150, 42, "Gateway", { tone: "navy", fyll: "solid" });
    F.pil(s, [[272, 123], [308, 123]], { tone: "navy" });
    F.pil(s, [[385, 146], [385, 170]], { tone: "navy", start: true });
    // Modellen og ønsket
    F.boks(s, 321, 172, 128, 54, "Modell", { tone: "graa", stiplet: true });
    F.pil(s, [[319, 210], [274, 210]], { tone: "rod", stiplet: true });
    // Fire porter
    var porter = [["bok", "1  Register", "ble verktøyet tilbudt?"], ["klokke", "2  Autorisasjon", "tilganger per forespørsel"], ["trakt", "3  Argumenter", "form, område, lengde"]];
    porter.forEach(function (p, j) {
      var y0 = 300 + j * 70;
      F.boks(s, 34, y0, 436, 46, "", { tone: "navy", fyll: "flate" });
      I[p[0]](s, 62, y0 + 23, 26, "navy");
      T(s, 86, y0 + 23, p[1], { fet: true, anker: "start" });
      T(s, 226, y0 + 23, p[2], liten({ anker: "start", tone: "graa" }));
      I.hake(s, 452, y0 + 23, 16, "graa");
    });
    F.pil(s, [[250, 280], [250, 298]], { tone: "navy" });
    F.pil(s, [[250, 346], [250, 368]], { tone: "navy" });
    F.pil(s, [[250, 416], [250, 438]], { tone: "navy" });
    F.pil(s, [[250, 486], [250, 552]], { tone: "navy" });
    I.db(s, 250, 598, 88, "navy");
    T(s, 250, 660, "4  Database: RLS", { fet: true, tone: "navy" });
    T(s, 250, 684, "den primære grensen", liten({ tone: "navy" }));
    // Rødt 1: ukjent verktøy stoppes i registeret
    F.pil(s, [[352, 228], [352, 288]], { tone: "rod", stiplet: true });
    I.kryss(s, 352, 300, 24, "rod");
    T(s, 362, 258, "ukjent\nverktøy", liten({ anker: "start", tone: "rod" }));
    // Rødt 2: id fra en annen virksomhet går gjennom tre porter, stopper i databasen
    F.pil(s, [[432, 228], [432, 598], [304, 598]], { tone: "rod", stiplet: true });
    I.kryss(s, 294, 598, 24, "rod");
    T(s, 368, 628, "id fra en annen\nvirksomhet", liten({ tone: "rod" }));
    // Svaret tilbake
    F.pil(s, [[206, 610], [14, 610], [14, 196], [32, 196]], { tone: "gronn" });
    F.pil(s, [[104, 110], [104, 72]], { tone: "gronn" });
    T(s, 110, 628, "svar, lenker, utkast", liten({ fet: true, tone: "gronn" }));
  };

  /* ---------- 5. Den forvirrede stedfortrederen ---------- */
  F.FIGURER.stedfortreder = function (host, meta) {
    var c = F.celler(host, 3);
    function tittel(s, n, t) {
      F.boks(s, 10, 6, 26, 26, String(n), { tone: "blekk", fyll: "solid", r: 13, str: 14 });
      T(s, 44, 19, t, { fet: true, anker: "start" });
    }
    function nokler(s, x, y, n) { for (var i = 0; i < n; i++) I.nokkel(s, x + i * 22, y, 16, "graa"); }

    var s1 = F.svg(c[0], { w: 240, h: 270, tittel: meta.tittel + ": 1, A planter en instruks", desc: meta.desc });
    tittel(s1, 1, "A planter");
    I.person(s1, 58, 126, 72, "graa");
    nokler(s1, 48, 74, 1);
    I.kort(s1, 176, 126, 96, "graa");
    F.boks(s1, 160, 128, 44, 20, "", { tone: "rod", fyll: "solid", r: 3 });
    F.pil(s1, [[92, 140], [154, 140]], { tone: "rod", stiplet: true });
    T(s1, 120, 206, "Ansatt A: smal tilgang", liten({ fet: true }));
    T(s1, 120, 230, "Instruks i et vanlig felt", liten({ tone: "rod" }));

    var s2 = F.svg(c[1], { w: 240, h: 270, tittel: "2, B spør assistenten", desc: "Ansatt B med bred tilgang spør assistenten, som leser feltet med instruksen." });
    tittel(s2, 2, "B spør");
    I.mappe(s2, 40, 128, 48, "navy");
    F.boks(s2, 30, 124, 22, 12, "", { tone: "rod", fyll: "solid", r: 2 });
    var a = F.boks(s2, 82, 98, 76, 56, "Assistent", { tone: "navy", str: 13 });
    F.bue(s2, 46, 120, 84, 116, 16, { tone: "rod" });
    I.person(s2, 202, 132, 70, "graa");
    nokler(s2, 180, 76, 3);
    F.boks(s2, 150, 54, 30, 24, "?", { tone: "graa", fyll: "flate", r: 10 });
    F.pil(s2, [[166, 80], [154, 96]], { tone: "graa" });
    T(s2, 120, 206, "Ansatt B: bred tilgang", liten({ fet: true }));
    T(s2, 120, 230, "Med Bs rettigheter,", L);
    T(s2, 120, 250, "etter As instruks", liten({ tone: "rod" }));

    var s3 = F.svg(c[2], { w: 240, h: 270, tittel: "3, B bekrefter utkastet", desc: "Assistenten lager et utkast med utfylte felt. B ser det og kan rette før noe skrives." });
    tittel(s3, 3, "B bekrefter");
    var u = F.boks(s3, 22, 52, 128, 124, "", { tone: "rav" });
    T(u.g, 86, 70, "Utkast", liten({ fet: true }));
    [88, 110, 132].forEach(function (y) { F.boks(s3, 36, y - 7, 100, 14, "", { tone: "graa", fyll: "flate", r: 3 }); });
    F.boks(s3, 98, 105, 34, 10, "", { tone: "rod", fyll: "solid", r: 2 });
    I.hake(s3, 128, 158, 22, "gronn");
    I.blyant(s3, 150, 62, 26, "rav");
    I.person(s3, 202, 132, 70, "graa");
    nokler(s3, 180, 76, 3);
    T(s3, 120, 206, "Utkast: B ser og bekrefter", liten({ fet: true }));
    T(s3, 120, 230, "Ingenting skrives uten B", L);
  };

  /* ---------- 6. Den dødelige trekanten, brutt ---------- */
  F.FIGURER.trekant = function (host, meta) {
    var s = F.svg(host, { w: 480, h: 474, tittel: meta.tittel, desc: meta.desc, klasse: "fig-kvadrat" });
    var A = [240, 92], B = [78, 352], C = [402, 352];
    function pt(p, q, t) { return [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t]; }
    function brutt(p, q) {
      F.linje(s, [pt(p, q, 0.12), pt(p, q, 0.4)], { tone: "graa", bred: true });
      F.linje(s, [pt(p, q, 0.6), pt(p, q, 0.88)], { tone: "graa", bred: true });
      var m = pt(p, q, 0.5), ang = Math.atan2(q[1] - p[1], q[0] - p[0]) * 180 / Math.PI + 90;
      var g = F.g(s, null, "translate(" + m[0] + " " + m[1] + ") rotate(" + ang + ")");
      I.bom(g, -22, 0, 22, "navy");
    }
    F.linje(s, [pt(A, B, 0.12), pt(A, B, 0.88)], { tone: "navy", bred: true });
    var vm = pt(A, B, 0.5);
    T(s, vm[0] - 14, vm[1], "med vilje", liten({ anker: "end", tone: "navy", fet: true }));
    brutt(A, C);
    brutt(B, C);
    // Hjørnene
    I.mappe(s, A[0], A[1], 50, "navy"); I.las(s, A[0] + 22, A[1] + 14, 22, "navy");
    T(s, A[0], 36, "Private data", { fet: true, tone: "navy" });
    I.konvolutt(s, B[0], B[1], 42, "rav", { utrop: true });
    T(s, B[0], 396, "Upålitelig innhold", { fet: true, tone: "rav" });
    var dor = F.g(s, "fig-dempet");
    F.boks(dor, C[0] - 15, C[1] - 24, 30, 46, "", { tone: "rod", fyll: "tone", r: 2 });
    F.pil(dor, [[C[0] + 2, C[1]], [C[0] + 34, C[1]]], { tone: "rod" });
    T(s, C[0], 396, "Modellens vei ut:\nfjernet", { fet: true, tone: "rod" });
    T(s, C[0], 446, "ingen lenker, bilder\neller kall fra modellen", L);
    // Ingen lenker eller bilder fra modellen
    function overstrek(cx, cy) { F.linje(s, [[cx - 16, cy + 14], [cx + 16, cy - 14]], { tone: "rod", bred: true }); }
    var l = F.g(s, null, "translate(398 250) rotate(-35)");
    F.boks(l, -14, -6, 18, 12, "", { tone: "graa", fyll: "ingen", r: 6 });
    F.boks(l, -4, -6, 18, 12, "", { tone: "graa", fyll: "ingen", r: 6 });
    overstrek(398, 250);
    F.boks(s, 432, 238, 30, 24, "", { tone: "graa", fyll: "flate", r: 3 });
    F.linje(s, [[435, 259], [444, 248], [450, 254], [454, 250], [460, 259]], { tone: "graa" });
    overstrek(447, 250);
    T(s, 240, 262, "To av tre\ner ikke nok", { fet: true, str: 18 });
  };

  /* ---------- 8. Et flagg er ikke en kontroll ---------- */
  F.FIGURER.flagg = function (host, meta) {
    var c = F.celler(host, 2);
    function pakke(s, x, y) {
      F.boks(s, x - 16, y - 13, 32, 26, "", { tone: "graa", r: 3 });
      F.boks(s, x - 6, y - 26, 26, 14, "", { tone: "gronn", fyll: "solid", r: 3 });
      T(s, x + 7, y - 19, "EU", { fet: true, str: 10, klasse: "fig-paa-gronn" });
    }
    function grunn(s) {
      F.linje(s, [[14, 140], [120, 140]], { tone: "navy", bred: true });
      F.linje(s, [[120, 140], [200, 86]], { tone: "navy", bred: true });
      var eu = F.boks(s, 202, 60, 86, 52, "", { tone: "navy" });
      I.stjerner(s, 226, 86, 26, "navy");
      T(s, 262, 86, "EU", { fet: true, tone: "navy" });
      return eu;
    }
    var s1 = F.svg(c[0], { w: 300, h: 270, tittel: meta.tittel + ": før", desc: meta.desc });
    T(s1, 150, 20, "Før: merket EU", { fet: true });
    grunn(s1);
    F.linje(s1, [[120, 140], [212, 204]], { tone: "graa", bred: true, stiplet: true });
    var gl = F.g(s1);
    F.boks(gl, 218, 188, 52, 52, "", { tone: "graa", fyll: "flate", r: 26 });
    F.linje(gl, "M218 214 H270 M244 188 C230 200 230 228 244 240 C258 228 258 200 244 188", { tone: "graa" });
    T(s1, 244, 254, "globalt endepunkt", L);
    pakke(s1, 56, 126);
    pakke(s1, 170, 166);
    T(s1, 96, 186, "merket EU,\nmen går ut", liten({ tone: "rod" }));

    var s2 = F.svg(c[1], { w: 300, h: 270, tittel: meta.tittel + ": etter", desc: "Etter: koden sjekker den faktiske adressen. Reserveruten er sperret, og driften varsles." });
    T(s2, 150, 20, "Etter: adressen sjekkes i koden", { fet: true });
    grunn(s2);
    I.hake(s2, 286, 62, 20, "gronn");
    F.linje(s2, [[120, 140], [176, 179]], { tone: "graa", bred: true, stiplet: true });
    I.bom(s2, 160, 196, 224, "rod");
    I.kryss(s2, 236, 196, 22, "rod");
    I.bjelle(s2, 262, 160, 24, "rav");
    I.skjold(s2, 120, 104, 40, "navy", { hake: false });
    I.lupe(s2, 120, 104, 20, "graa");
    T(s2, 96, 60, "sjekker adressen,\nikke merket", liten({ tone: "navy" }));
    pakke(s2, 56, 126);
    T(s2, 150, 236, "Reserveruten avvises.\nIngen rute igjen: hardt avslag og varsel", liten({ fet: true }));
  };

  /* ---------- 11. Tre nivåer av testing ---------- */
  F.FIGURER.testnivaer = function (host, meta) {
    var s = F.svg(host, { w: 460, h: 410, tittel: meta.tittel, desc: meta.desc, klasse: "fig-hoy" });
    // 3: ekte modell (smalest, øverst)
    F.boks(s, 140, 14, 190, 112, "", { tone: "gronn" });
    I.terning(s, 210, 50, 32, "gronn");
    I.lupe(s, 258, 50, 34, "gronn");
    T(s, 235, 94, "3  Red teaming", { fet: true });
    T(s, 235, 114, "mot ekte modell", L);
    T(s, 342, 70, "viser atferd,\nbeviser ikke\ndet umulige", liten({ anker: "start", tone: "gronn" }));
    // 2: simulert kompromittert modell
    F.boks(s, 90, 134, 290, 112, "", { tone: "rav" });
    F.boks(s, 108, 150, 70, 46, "", { tone: "graa", fyll: "flate", r: 6 });
    I.maske(s, 143, 173, 30, "rod");
    [160, 174, 188].forEach(function (y) { F.pil(s, [[184, y], [304, y]], { tone: "rod" }); });
    F.boks(s, 310, 146, 12, 56, "", { tone: "navy", fyll: "solid", r: 2 });
    I.kryss(s, 342, 174, 24, "rod");
    T(s, 235, 224, "2  Simulert kompromittert modell", { fet: true });
    // 1: uten modell (bredest, nederst)
    F.boks(s, 44, 254, 412, 140, "", { tone: "navy" });
    [[92, "uinnlogget"], [172, "annen\nvirksomhet"], [252, "deaktivert"]].forEach(function (p, i) {
      I.person(s, p[0], 292, 40, i === 2 ? "graa" : "blekk");
      if (i === 1) I.bygg(s, p[0] + 20, 300, 18, "rod");
      T(s, p[0], 336, p[1], L);
    });
    F.pil(s, [[292, 292], [356, 292]], { tone: "rod" });
    I.kryss(s, 366, 292, 22, "rod");
    I.db(s, 410, 292, 50, "navy");
    T(s, 250, 364, "1  Direkte autorisasjonstester", { fet: true });
    T(s, 250, 384, "uten modell", L);
    // Klamme for de to nederste
    F.linje(s, [[30, 136], [20, 136], [20, 392], [30, 392]], { tone: "blekk" });
    var t = T(s, 10, 264, "avhenger ikke av at angrepet lykkes", liten({ fet: true }));
    t.setAttribute("transform", "rotate(-90 10 264)");
  };
})();
