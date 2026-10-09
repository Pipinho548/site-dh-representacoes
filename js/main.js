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

  // Diagrama do topo: acende a linha da marca sob o mouse/foco
  document.querySelectorAll(".hub-tile").forEach(function (tile) {
    var line = document.querySelector('.hub-line[data-i="' + tile.dataset.i + '"]');
    if (!line) return;
    var on = function () { line.classList.add("is-on"); };
    var off = function () { line.classList.remove("is-on"); };
    tile.addEventListener("mouseenter", on);
    tile.addEventListener("mouseleave", off);
    tile.addEventListener("focus", on);
    tile.addEventListener("blur", off);
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
