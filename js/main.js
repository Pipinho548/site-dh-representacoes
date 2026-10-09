/* DH Representações — interações do site (sem bibliotecas) */
(function () {
  "use strict";

  var WHATSAPP = "5554996260648";

  // Menu mobile
  var toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll(".main-nav a").forEach(function (a) {
      a.addEventListener("click", function () {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Filtro de representadas por segmento
  var chips = document.querySelectorAll(".chip[data-filter]");
  var cards = document.querySelectorAll(".rep-card[data-segment]");
  function applyFilter(seg) {
    chips.forEach(function (c) {
      c.setAttribute("aria-pressed", c.dataset.filter === seg ? "true" : "false");
    });
    cards.forEach(function (card) {
      card.hidden = !(seg === "todas" || card.dataset.segment === seg);
    });
  }
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () { applyFilter(chip.dataset.filter); });
  });

  // Atalhos do hero: filtram e rolam até as representadas
  document.querySelectorAll("[data-goto-segment]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyFilter(btn.dataset.gotoSegment);
      var target = document.getElementById("representadas");
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // Formulário de contato → abre o WhatsApp com a mensagem pronta
  var form = document.getElementById("form-contato");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var d = new FormData(form);
      var linhas = [
        "Olá! Vim pelo site da DH Representações.",
        "",
        "*Nome:* " + d.get("nome"),
        d.get("empresa") ? "*Empresa:* " + d.get("empresa") : null,
        "*Telefone:* " + d.get("telefone"),
        "*Cidade/UF:* " + d.get("cidade"),
        d.get("interesse") ? "*Interesse:* " + d.get("interesse") : null,
        d.get("mensagem") ? "" : null,
        d.get("mensagem") || null
      ].filter(function (l) { return l !== null; });
      var url = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(linhas.join("\n"));
      window.open(url, "_blank", "noopener");
    });
  }

  // Ano no rodapé
  var y = document.getElementById("ano");
  if (y) y.textContent = new Date().getFullYear();
})();
