/* ============================================================
   vegardjorg.github.io · fig-motor.js
   Figurmotor for artiklene. Kopiert fra IN2120-guidens figurmotor (assets/js/figurer/fig-felles.js)
   etter motorpakkens regel om å kopiere én gang og eie koden. Svarfelt og eksamensoppslag er fjernet.
   Nytt her: fargetoner, tekst over flere linjer, enkle ikoner og to oppsett (bredt og smalt).
   Stil: assets/css/artikkel.css (.fig-*). Klassisk script, ingen moduler.

   TONER: "navy" (det som håndhever), "gronn" (godkjent), "rav" (reduserer risiko, menneske i løkka),
          "rod" (angrep, avvist), "graa" (nøytral, upålitelig komponent), "blekk" (tekstfarge).

   SVG (alle mål i viewBox-enheter):
     F.svg(parent, { w, h, tittel, desc }) → svg med <title>/<desc> og pilspisser i alle toner
     F.g(parent, klasse?) → <g>
     F.tekst(parent, x, y, tekst, { anker?, fet?, kursiv?, str?, tone?, klasse? })
       y er midtlinja. "\n" gir flere linjer, sentrert rundt y. "M_1" gir senket skrift som i guiden.
     F.boks(parent, x, y, w, h, etikett?, { tone?, fyll?: "solid"|"tone"|"flate", stiplet?, r?, str?, fet? })
       → { g, x, y, w, h, cx, cy, topp, bunn, venstre, hoyre }
     F.pil(parent, punkter, { tone?, stiplet?, bred?, start? })   spiss i siste punkt
     F.linje(parent, punkter, { tone?, stiplet?, bred? })
     F.bue(parent, x0, y0, x1, y1, hoyde, { tone?, stiplet?, pil? })  kvadratisk bue mellom to punkter
     F.ikon.<navn>(parent, cx, cy, str, tone?, o?)  ikon sentrert i (cx, cy), str = høyde
       db, skjold, hake, kryss, las, person, bygg, mappe, konvolutt, skjerm, telefon, nokkel,
       kort, lupe, klokke, bjelle, stjerner, varsel, bom, blyant, trakt, bok, terning, maske, gjerde, mur
   OPPSETT:
     F.tegn(host, { bred: fn(host), smal: fn(host), grense?: 560 })
       Tegner smal-varianten når host er smalere enn grensen, og tegner på nytt når bredden krysser den.
     F.celler(host, n) → [celle, …]  side om side på bred skjerm, stablet på smal (container query)
   ============================================================ */
(function () {
  "use strict";
  var NS = "http://www.w3.org/2000/svg", seq = 0;
  var TONER = ["blekk", "navy", "gronn", "rav", "rod", "graa"];

  function s(tag, attrs, parent) {
    var n = document.createElementNS(NS, tag);
    for (var k in attrs) if (attrs[k] != null && attrs[k] !== false) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }
  function h(tag, attrs, parent) {
    var n = document.createElement(tag);
    for (var k in attrs || {}) {
      if (attrs[k] == null || attrs[k] === false) continue;
      if (k === "text") n.textContent = attrs[k]; else if (k === "html") n.innerHTML = attrs[k]; else n.setAttribute(k, attrs[k]);
    }
    if (parent) parent.appendChild(n);
    return n;
  }
  function svgRoot(n) { while (n && n.nodeName.toLowerCase() !== "svg") n = n.parentNode; return n; }
  function d(punkter) { return punkter.map(function (p, i) { return (i ? "L" : "M") + p[0] + " " + p[1]; }).join(" "); }

  /* "M_1" / "C_{12}" / "x^2" → tspans (fra guiden). */
  function fyllTekst(t, tekst, x, dy0) {
    var re = /([_^])(\{[^}]*\}|.)/g, last = 0, m, cur = 0, forste = true;
    function del(txt, maal, liten) {
      var dy = Math.round((maal - cur) / (liten ? 0.7 : 1) * 1000) / 1000;
      var a = { "font-size": liten ? "70%" : null };
      if (forste) { a.x = x; a.dy = dy0 + dy + "em"; forste = false; } else if (dy) a.dy = dy + "em";
      s("tspan", a, t).textContent = txt;
      cur = maal;
    }
    while ((m = re.exec(tekst))) {
      if (m.index > last) del(tekst.slice(last, m.index), 0, false);
      var inn = m[2].charAt(0) === "{" ? m[2].slice(1, -1) : m[2];
      del(inn, m[1] === "_" ? 0.3 : -0.45, true);
      last = re.lastIndex;
    }
    if (last < tekst.length || cur || forste) del(tekst.slice(last), 0, false);
  }

  var F = (window.FIG = {});

  F.svg = function (parent, o) {
    o = o || {};
    var id = "afig" + (++seq);
    var svg = s("svg", { viewBox: "0 0 " + o.w + " " + o.h, class: "fig-tegning" + (o.klasse ? " " + o.klasse : ""),
      role: "img", "aria-labelledby": id + "-t " + id + "-d", preserveAspectRatio: "xMidYMid meet" });
    s("title", { id: id + "-t" }, svg).textContent = o.tittel || "Figur";
    s("desc", { id: id + "-d" }, svg).textContent = o.desc || "";
    var defs = s("defs", {}, svg);
    svg._pil = {};
    TONER.forEach(function (tone) {
      var mid = id + "-pil-" + tone;
      var mk = s("marker", { id: mid, viewBox: "0 0 10 10", refX: "8.5", refY: "5", markerWidth: "9", markerHeight: "9",
        markerUnits: "userSpaceOnUse", orient: "auto-start-reverse" }, defs);
      s("path", { d: "M0 0 L10 5 L0 10 z", class: "fig-f-" + tone }, mk);
      svg._pil[tone] = mid;
    });
    if (o.maks) svg.style.maxWidth = o.maks + "px";
    if (parent) parent.appendChild(svg);
    return svg;
  };

  F.g = function (parent, klasse, transform) { return s("g", { class: klasse || null, transform: transform || null }, parent); };

  F.tekst = function (parent, x, y, tekst, o) {
    o = o || {};
    var cls = ["fig-txt"];
    if (o.kursiv) cls.push("fig-kursiv");
    if (o.fet) cls.push("fig-fet");
    if (o.tone) cls.push("fig-t-" + o.tone);
    if (o.klasse) cls.push(o.klasse);
    var t = s("text", { x: x, y: y, "text-anchor": o.anker || "middle", "dominant-baseline": "central",
      class: cls.join(" "), style: o.str ? "font-size:" + o.str + "px" : null }, parent);
    var linjer = String(tekst).split("\n"), lh = 1.22, start = -(linjer.length - 1) * lh / 2;
    linjer.forEach(function (l, i) { fyllTekst(t, l, x, i === 0 ? start : lh); });
    return t;
  };

  F.boks = function (parent, x, y, w, hh, etikett, o) {
    o = o || {};
    var tone = o.tone || "graa", fyll = o.fyll || "tone";
    var g = s("g", { class: "fig-boks fig-b-" + tone + " fig-fyll-" + fyll + (o.klasse ? " " + o.klasse : "") }, parent);
    s("rect", { x: x, y: y, width: w, height: hh, rx: o.r != null ? o.r : 8, class: "fig-boks-r" + (o.stiplet ? " fig-stiplet" : "") }, g);
    if (etikett != null && etikett !== "") F.tekst(g, x + w / 2, y + hh / 2, etikett, { fet: o.fet !== false, str: o.str, klasse: "fig-boks-t" });
    return { g: g, x: x, y: y, w: w, h: hh, cx: x + w / 2, cy: y + hh / 2, topp: y, bunn: y + hh, venstre: x, hoyre: x + w };
  };

  F.linje = function (parent, punkter, o) {
    o = o || {};
    return s("path", { d: typeof punkter === "string" ? punkter : d(punkter),
      class: "fig-strek fig-s-" + (o.tone || "blekk") + (o.stiplet ? " fig-stiplet" : "") + (o.bred ? " fig-bred" : "") + (o.klasse ? " " + o.klasse : ""),
      fill: "none" }, parent);
  };

  F.pil = function (parent, punkter, o) {
    o = o || {};
    var p = F.linje(parent, punkter, o), root = svgRoot(parent), tone = o.tone || "blekk";
    if (root && root._pil) {
      p.setAttribute("marker-end", "url(#" + root._pil[tone] + ")");
      if (o.start) p.setAttribute("marker-start", "url(#" + root._pil[tone] + ")");
    }
    return p;
  };

  F.bue = function (parent, x0, y0, x1, y1, hoyde, o) {
    o = o || {};
    var mx = (x0 + x1) / 2, my = (y0 + y1) / 2, dx = x1 - x0, dy = y1 - y0, l = Math.hypot(dx, dy) || 1;
    var cx = mx + (dy / l) * hoyde, cy = my - (dx / l) * hoyde;
    var path = "M" + x0 + " " + y0 + " Q" + cx + " " + cy + " " + x1 + " " + y1;
    var p = o.pil ? F.pil(parent, path, o) : F.linje(parent, path, o);
    return { p: p, mx: (x0 + 2 * cx + x1) / 4, my: (y0 + 2 * cy + y1) / 4 };
  };

  /* ---------- Ikoner. (cx, cy) = midten, k = høyde i viewBox-enheter. ---------- */
  function ikonG(parent, cx, cy, k, tone, navn) {
    var g = s("g", { class: "fig-ikon fig-i-" + (tone || "blekk"), transform: "translate(" + cx + " " + cy + ") scale(" + k / 40 + ")" }, parent);
    if (navn) s("title", {}, g).textContent = navn;
    return g;
  }
  function p(g, dd, cls) { return s("path", { d: dd, class: cls || "fig-i-strek" }, g); }
  var I = (F.ikon = {});

  I.db = function (par, cx, cy, k, tone) {
    var g = ikonG(par, cx, cy, k, tone || "navy");
    p(g, "M-16 -13 v26 a16 6 0 0 0 32 0 v-26", "fig-i-fyll");
    s("ellipse", { cx: 0, cy: -13, rx: 16, ry: 6, class: "fig-i-fyll2" }, g);
    p(g, "M-16 -4 a16 6 0 0 0 32 0 M-16 5 a16 6 0 0 0 32 0", "fig-i-strek");
    return g;
  };
  I.skjold = function (par, cx, cy, k, tone, o) {
    var g = ikonG(par, cx, cy, k, tone || "gronn");
    p(g, "M0 -19 L15 -13 V-1 C15 9 8 16 0 19 C-8 16 -15 9 -15 -1 V-13 Z", "fig-i-fyll");
    if (!o || o.hake !== false) p(g, "M-7 0 L-2 5 L8 -6", "fig-i-motstrek");
    return g;
  };
  I.hake = function (par, cx, cy, k, tone) {
    var g = ikonG(par, cx, cy, k, tone || "gronn");
    s("circle", { cx: 0, cy: 0, r: 18, class: "fig-i-fyll" }, g);
    p(g, "M-8 0 L-2 6 L9 -6", "fig-i-motstrek");
    return g;
  };
  I.kryss = function (par, cx, cy, k, tone) {
    var g = ikonG(par, cx, cy, k, tone || "rod");
    s("circle", { cx: 0, cy: 0, r: 18, class: "fig-i-fyll" }, g);
    p(g, "M-7 -7 L7 7 M7 -7 L-7 7", "fig-i-motstrek");
    return g;
  };
  I.las = function (par, cx, cy, k, tone) {
    var g = ikonG(par, cx, cy, k, tone || "navy");
    p(g, "M-8 -3 V-9 a8 8 0 0 1 16 0 V-3", "fig-i-strek fig-i-tykk");
    s("rect", { x: -13, y: -4, width: 26, height: 21, rx: 3, class: "fig-i-fyll" }, g);
    s("circle", { cx: 0, cy: 5, r: 2.8, class: "fig-i-hull" }, g);
    return g;
  };
  I.person = function (par, cx, cy, k, tone) {
    var g = ikonG(par, cx, cy, k, tone || "graa");
    s("circle", { cx: 0, cy: -10, r: 8, class: "fig-i-fyll" }, g);
    p(g, "M-15 20 C-15 6 -9 1 0 1 C9 1 15 6 15 20 Z", "fig-i-fyll");
    return g;
  };
  I.bygg = function (par, cx, cy, k, tone) {
    var g = ikonG(par, cx, cy, k, tone || "navy");
    s("rect", { x: -14, y: -18, width: 28, height: 37, rx: 2, class: "fig-i-fyll" }, g);
    [-11, -2, 7].forEach(function (yy) { [-7, 3].forEach(function (xx) { s("rect", { x: xx, y: yy, width: 4, height: 4, class: "fig-i-hull" }, g); }); });
    return g;
  };
  I.mappe = function (par, cx, cy, k, tone) {
    var g = ikonG(par, cx, cy, k, tone || "navy");
    p(g, "M-17 -12 H-5 L-1 -8 H17 V14 H-17 Z", "fig-i-fyll");
    p(g, "M-17 -4 H17", "fig-i-motstrek fig-i-tynn");
    return g;
  };
  I.konvolutt = function (par, cx, cy, k, tone, o) {
    var g = ikonG(par, cx, cy, k, tone || "rod");
    s("rect", { x: -18, y: -12, width: 36, height: 24, rx: 2, class: "fig-i-fyll" }, g);
    p(g, "M-18 -11 L0 3 L18 -11", "fig-i-motstrek fig-i-tynn");
    if (o && o.utrop) { s("circle", { cx: 16, cy: -12, r: 7, class: "fig-i-merke" }, g); p(g, "M16 -16 V-11 M16 -8.4 V-8", "fig-i-merkestrek"); }
    return g;
  };
  I.skjerm = function (par, cx, cy, k, tone) {
    var g = ikonG(par, cx, cy, k, tone || "graa");
    s("rect", { x: -20, y: -15, width: 40, height: 26, rx: 2, class: "fig-i-fyll" }, g);
    s("rect", { x: -17, y: -12, width: 34, height: 20, class: "fig-i-hull" }, g);
    p(g, "M-8 19 H8 M0 11 V19", "fig-i-strek");
    return g;
  };
  I.telefon = function (par, cx, cy, k, tone) {
    var g = ikonG(par, cx, cy, k, tone || "graa");
    s("rect", { x: -11, y: -19, width: 22, height: 38, rx: 4, class: "fig-i-fyll" }, g);
    s("rect", { x: -8, y: -14, width: 16, height: 26, rx: 1, class: "fig-i-hull" }, g);
    return g;
  };
  I.nokkel = function (par, cx, cy, k, tone) {
    var g = ikonG(par, cx, cy, k, tone || "rav");
    s("circle", { cx: -9, cy: 0, r: 8, class: "fig-i-fyll" }, g);
    s("circle", { cx: -11, cy: 0, r: 2.6, class: "fig-i-hull" }, g);
    p(g, "M-2 -2.5 H18 V2.5 H14 V7 H10 V2.5 H-2 Z", "fig-i-fyll");
    return g;
  };
  I.kort = function (par, cx, cy, k, tone, o) {
    var g = ikonG(par, cx, cy, k, tone || "graa");
    s("rect", { x: -15, y: -19, width: 30, height: 38, rx: 3, class: "fig-i-flate" }, g);
    var n = (o && o.linjer) || 4;
    for (var i = 0; i < n; i++) p(g, "M-9 " + (-11 + i * 7) + " H" + (i === n - 1 ? 3 : 9), "fig-i-strek fig-i-tynn");
    return g;
  };
  I.lupe = function (par, cx, cy, k, tone) {
    var g = ikonG(par, cx, cy, k, tone || "gronn");
    s("circle", { cx: -4, cy: -4, r: 11, class: "fig-i-strek fig-i-tykk fig-i-hull" }, g);
    p(g, "M4 4 L15 15", "fig-i-strek fig-i-tykkere");
    return g;
  };
  I.klokke = function (par, cx, cy, k, tone) {
    var g = ikonG(par, cx, cy, k, tone || "navy");
    s("circle", { cx: 0, cy: 0, r: 17, class: "fig-i-fyll" }, g);
    p(g, "M0 -10 V0 L7 5", "fig-i-motstrek");
    return g;
  };
  I.bjelle = function (par, cx, cy, k, tone) {
    var g = ikonG(par, cx, cy, k, tone || "rav");
    p(g, "M-13 9 C-11 6 -11 2 -11 -3 C-11 -10 -6 -14 0 -14 C6 -14 11 -10 11 -3 C11 2 11 6 13 9 Z", "fig-i-fyll");
    s("circle", { cx: 0, cy: 13, r: 3.4, class: "fig-i-fyll" }, g);
    return g;
  };
  I.stjerner = function (par, cx, cy, k, tone) {
    var g = ikonG(par, cx, cy, k, tone || "navy");
    for (var i = 0; i < 12; i++) {
      var a = i * Math.PI / 6;
      s("circle", { cx: Math.cos(a) * 14, cy: Math.sin(a) * 14, r: 2.6, class: "fig-i-fyll" }, g);
    }
    return g;
  };
  I.varsel = function (par, cx, cy, k, tone) {
    var g = ikonG(par, cx, cy, k, tone || "rod");
    p(g, "M0 -17 L18 15 H-18 Z", "fig-i-fyll");
    p(g, "M0 -6 V4 M0 9 V9.5", "fig-i-motstrek");
    return g;
  };
  I.blyant = function (par, cx, cy, k, tone) {
    var g = ikonG(par, cx, cy, k, tone || "rav");
    p(g, "M-14 14 L-12 6 L8 -14 L14 -8 L-6 12 Z", "fig-i-fyll");
    return g;
  };
  I.trakt = function (par, cx, cy, k, tone) {
    var g = ikonG(par, cx, cy, k, tone || "navy");
    p(g, "M-18 -15 H18 L4 2 V16 L-4 12 V2 Z", "fig-i-fyll");
    return g;
  };
  I.bok = function (par, cx, cy, k, tone) {
    var g = ikonG(par, cx, cy, k, tone || "navy");
    p(g, "M0 -12 C-6 -16 -13 -16 -18 -14 V14 C-13 12 -6 12 0 16 C6 12 13 12 18 14 V-14 C13 -16 6 -16 0 -12 Z", "fig-i-fyll");
    p(g, "M0 -12 V16", "fig-i-motstrek fig-i-tynn");
    return g;
  };
  I.terning = function (par, cx, cy, k, tone) {
    var g = ikonG(par, cx, cy, k, tone || "gronn");
    s("rect", { x: -15, y: -15, width: 30, height: 30, rx: 6, class: "fig-i-fyll" }, g);
    [[-7, -7], [0, 0], [7, 7], [7, -7], [-7, 7]].forEach(function (q) { s("circle", { cx: q[0], cy: q[1], r: 2.6, class: "fig-i-hull" }, g); });
    return g;
  };
  I.maske = function (par, cx, cy, k, tone) {
    var g = ikonG(par, cx, cy, k, tone || "rod");
    p(g, "M-19 -6 C-12 -10 -4 -9 0 -5 C4 -9 12 -10 19 -6 C19 4 13 9 6 7 C3 6 2 3 0 3 C-2 3 -3 6 -6 7 C-13 9 -19 4 -19 -6 Z", "fig-i-fyll");
    s("ellipse", { cx: -8, cy: -1, rx: 4, ry: 2.6, class: "fig-i-hull" }, g);
    s("ellipse", { cx: 8, cy: -1, rx: 4, ry: 2.6, class: "fig-i-hull" }, g);
    return g;
  };
  I.gjerde = function (par, cx, cy, k, tone) {
    var g = ikonG(par, cx, cy, k, tone || "rav");
    [-17, -9, 9, 17].forEach(function (x) { p(g, "M" + (x - 2.5) + " 16 V-4 L" + x + " -9 L" + (x + 2.5) + " -4 V16 Z", "fig-i-fyll"); });
    p(g, "M-20 1 H-6 M6 1 H20 M-20 10 H-6 M6 10 H20", "fig-i-strek fig-i-tykk");
    return g;
  };
  I.mur = function (par, cx, cy, k, tone) {
    var g = ikonG(par, cx, cy, k, tone || "navy");
    s("rect", { x: -20, y: -16, width: 40, height: 32, rx: 2, class: "fig-i-fyll" }, g);
    p(g, "M-20 -5 H20 M-20 6 H20 M-6 -16 V-5 M8 -16 V-5 M-12 -5 V6 M2 -5 V6 M14 -5 V6 M-6 6 V16 M8 6 V16", "fig-i-motstrek fig-i-tynn");
    return g;
  };
  I.bom = function (par, x0, y, x1, tone) {
    var g = s("g", { class: "fig-ikon fig-i-" + (tone || "rod") }, par);
    s("rect", { x: x0, y: y - 5, width: x1 - x0, height: 10, rx: 3, class: "fig-i-fyll" }, g);
    for (var x = x0 + 8; x < x1 - 6; x += 16) s("path", { d: "M" + x + " " + (y + 5) + " l8 -10", class: "fig-i-motstrek fig-i-tynn" }, g);
    return g;
  };

  /* ---------- Oppsett ---------- */
  F.tegn = function (host, o) {
    var grense = o.grense || 560, sist = null;
    function tegn() {
      var w = host.clientWidth || host.getBoundingClientRect().width;
      var smal = o.smal && w > 0 && w < grense;
      if (smal === sist) return;
      sist = smal;
      while (host.firstChild) host.removeChild(host.firstChild);
      (smal ? o.smal : o.bred)(host);
    }
    tegn();
    if (window.ResizeObserver && o.smal) new ResizeObserver(tegn).observe(host);
  };

  F.celler = function (host, n, o) {
    o = o || {};
    var box = h("div", { class: "fig-celler" + (o.klasse ? " " + o.klasse : "") }, host), out = [];
    var grid = h("div", { class: "fig-celler-grid" }, box);
    grid.style.setProperty("--fig-kol", String(o.kol || n));
    for (var i = 0; i < n; i++) out.push(h("div", { class: "fig-celle" }, grid));
    return out;
  };

  /* Tegn alle <figure data-fig="nøkkel"> på siden med FIG.FIGURER[nøkkel]. */
  F.FIGURER = {};
  F.start = function () {
    Array.prototype.forEach.call(document.querySelectorAll("figure[data-fig]"), function (fig) {
      var key = fig.getAttribute("data-fig"), fn = F.FIGURER[key], host = fig.querySelector(".fig-flate");
      if (!fn || !host) return;
      var alt = host.textContent.replace(/\s+/g, " ").trim();
      try {
        while (host.firstChild) host.removeChild(host.firstChild);
        fn(host, { desc: alt, tittel: fig.getAttribute("data-tittel") || "Figur" });
        fig.classList.add("er-tegnet");
      } catch (e) {
        if (window.console) console.error("Figur " + key, e);
        host.textContent = alt;
      }
    });
  };
})();
