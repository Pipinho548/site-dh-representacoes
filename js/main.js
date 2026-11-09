/* DH Representações — interações do site (sem bibliotecas) */
(function () {
  "use strict";

  var WHATSAPP = "5554996260648";

  // Menu do celular
  var toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    });
    document.querySelectorAll(".main-nav a").forEach(function (a) {
      a.addEventListener("click", function () {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // O quarto: tocar numa peça destaca a peça e mostra quem fabrica
  var room = document.querySelector(".room");
  if (room) {
    var spots = Array.prototype.slice.call(room.querySelectorAll(".spot"));
    var panel = room.querySelector(".room-panel");
    var ids = spots.map(function (s) { return s.dataset.peca; });

    var select = function (id) {
      var tpl = document.querySelector('template[data-peca="' + id + '"]');
      if (!tpl) return;
      room.dataset.sel = id;
      room.querySelectorAll(".part").forEach(function (p) {
        p.classList.toggle("is-sel", p.dataset.peca === id);
      });
      spots.forEach(function (s) { s.setAttribute("aria-pressed", s.dataset.peca === id ? "true" : "false"); });
      panel.innerHTML = tpl.innerHTML;
    };

    spots.forEach(function (s) {
      s.addEventListener("click", function () { select(s.dataset.peca); });
    });
    panel.addEventListener("click", function (e) {
      var btn = e.target.closest(".panel-btn");
      if (!btn) return;
      var i = ids.indexOf(room.dataset.sel);
      var next = ids[(i + Number(btn.dataset.step) + ids.length) % ids.length];
      select(next);
      var again = panel.querySelector('.panel-btn[data-step="' + btn.dataset.step + '"]');
      if (again) again.focus();
    });
    select(room.dataset.sel);
  }

  // Filtro das representadas por segmento
  var chips = document.querySelectorAll(".chip[data-filter]");
  var cards = document.querySelectorAll(".rep-card[data-segment]");
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var seg = chip.dataset.filter;
      chips.forEach(function (c) { c.setAttribute("aria-pressed", c === chip ? "true" : "false"); });
      cards.forEach(function (card) { card.hidden = !(seg === "todas" || card.dataset.segment === seg); });
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
        "*Cidade:* " + d.get("cidade"),
        d.get("interesse") ? "*Representada:* " + d.get("interesse") : null,
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
