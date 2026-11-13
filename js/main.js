/* DH Representações — interações do site (sem bibliotecas) */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Menu do celular
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("menu");
  if (toggle && menu) {
    var setMenu = function (open) {
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    };
    toggle.addEventListener("click", function () { setMenu(!document.body.classList.contains("nav-open")); });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.body.classList.contains("nav-open")) { setMenu(false); toggle.focus(); }
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
      spots.forEach(function (s) { s.classList.toggle("is-sel", s.dataset.peca === id); });
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

    // Computador: o cartão abre ao chegar perto (CSS); aqui só o estado para leitores de tela e o Esc
    room.querySelectorAll(".hot").forEach(function (hot) {
      var spot = hot.querySelector(".spot");
      var open = function () { hot.classList.remove("is-closed"); spot.setAttribute("aria-expanded", "true"); };
      var close = function () { spot.setAttribute("aria-expanded", "false"); };
      hot.addEventListener("mouseenter", open);
      hot.addEventListener("mouseleave", function () { close(); hot.classList.remove("is-closed"); });
      hot.addEventListener("focusin", function () { if (!hot.classList.contains("is-closed")) open(); });
      hot.addEventListener("focusout", function (e) { if (!hot.contains(e.relatedTarget)) { close(); hot.classList.remove("is-closed"); } });
      hot.addEventListener("keydown", function (e) {
        if (e.key !== "Escape") return;
        hot.classList.add("is-closed");
        close();
        spot.focus();
      });
    });
  }

  // Equipe: escolher um vendedor mostra as representadas que ele atende
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".team-tabs [role=tab]"));
  if (tabs.length) {
    var show = function (tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
      });
      if (focus) tab.focus();
    };
    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () {
        show(tab, false);
        // no celular o painel fica abaixo de todos os cards: rola até ele se estiver fora da tela
        var p = document.getElementById(tab.getAttribute("aria-controls"));
        if (p.getBoundingClientRect().top > window.innerHeight - 120) p.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      });
      tab.addEventListener("keydown", function (e) {
        var k = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
        if (e.key === "Home") k = -i; else if (e.key === "End") k = tabs.length - 1 - i;
        if (k === undefined) return;
        e.preventDefault();
        show(tabs[(i + k + tabs.length) % tabs.length], true);
      });
    });
    show(tabs.filter(function (t) { return t.getAttribute("aria-selected") === "true"; })[0] || tabs[0], false);
  }

  // Formulário de contato → abre o WhatsApp (ou o e-mail) com a mensagem pronta
  var form = document.getElementById("form-contato");
  if (form) {
    var mensagem = function () {
      var d = new FormData(form);
      return [
        "Olá! Vim pelo site da DH Representações.",
        "",
        "*Nome:* " + d.get("nome"),
        d.get("empresa") ? "*Empresa:* " + d.get("empresa") : null,
        "*Telefone:* " + d.get("telefone"),
        "*Cidade:* " + d.get("cidade"),
        d.get("interesse") ? "*Representada:* " + d.get("interesse") : null,
        d.get("mensagem") ? "" : null,
        d.get("mensagem") || null
      ].filter(function (l) { return l !== null; }).join("\n");
    };
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      window.open("https://wa.me/" + form.dataset.whats + "?text=" + encodeURIComponent(mensagem()), "_blank", "noopener");
    });
    var mail = form.querySelector("[data-mail]");
    if (mail) mail.addEventListener("click", function (e) {
      if (!form.reportValidity()) { e.preventDefault(); return; }
      mail.href = "mailto:" + form.dataset.email + "?subject=" + encodeURIComponent("Orçamento pelo site") +
        "&body=" + encodeURIComponent(mensagem().replace(/\*/g, ""));
    });

    // O botão flutuante do WhatsApp não cobre o formulário
    var flutuante = document.querySelector(".whats-float");
    if (flutuante && "IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        flutuante.classList.toggle("is-hidden", entries[0].isIntersecting);
      }).observe(form);
    }
  }

  // Vídeos: troca a capa pelo player do YouTube (modo privacidade) só quando a pessoa clica
  document.querySelectorAll(".video[data-yt]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var f = document.createElement("iframe");
      f.src = "https://www.youtube-nocookie.com/embed/" + btn.dataset.yt + "?autoplay=1&rel=0";
      f.title = btn.getAttribute("aria-label") || "Vídeo";
      f.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
      f.allowFullscreen = true;
      var box = document.createElement("div");
      box.className = "video";
      box.appendChild(f);
      btn.replaceWith(box);
    });
  });

  // Ano no rodapé
  var y = document.getElementById("ano");
  if (y) y.textContent = new Date().getFullYear();
})();
