/* =========================================================
   Gerador do site DH Representações
   ---------------------------------------------------------
   Todo o conteúdo (empresa, equipe, representadas) fica nos
   DADOS abaixo. Para atualizar o site:
     1. edite os dados
     2. rode:  node gerar-site.js
   Ele recria index.html, representadas/*.html e a política.
   CSS (css/style.css) e JS (js/main.js) são editados direto.
   ========================================================= */
const fs = require("fs");
const path = require("path");

// ---------------------------------------------------------
// DADOS
// ---------------------------------------------------------
const SITE = {
  url: "https://dhrepresentacoes.com.br",
  nome: "DH Representações",
  endereco: "Rua Rotary Internacional, 299 – Bairro Pedregal",
  cidade: "Lagoa Vermelha – RS",
  telefone: "5433586050",          // fixo do escritório
  whatsapp: "5554996260648",       // WhatsApp principal (com 55 + DDD)
  email: "atendimento@dh.ind.br",
  horario: "Seg. a sex., 8h às 18h",
};

const SEGMENTOS = {
  moveis:     { nome: "Componentes e ferragens para móveis", curto: "Móveis", icone: "tool" },
  perfis:     { nome: "Perfis e esquadrias",                 curto: "Perfis", icone: "layers" },
  vidros:     { nome: "Vidros processados",                  curto: "Vidros", icone: "glass" },
  embalagens: { nome: "Embalagens e resinas",                curto: "Embalagens", icone: "package" },
};

const EQUIPE = [
  { nome: "Evandro Silva",    cargo: "Diretor comercial",       fone: "54996260648", email: "atendimento@dh.ind.br" },
  { nome: "José Reis",        cargo: "Representante comercial", fone: "54999758770", email: "jose@dh.ind.br" },
  { nome: "Jefersson Didoné", cargo: "Representante comercial", fone: "54981295827", email: "jefersson@dh.ind.br" },
  { nome: "Palmer Bueno",     cargo: "Representante comercial", fone: "54999876260", email: "palmer@dh.ind.br" },
  { nome: "Fausto Manto",     cargo: "Representante comercial", fone: "54999300433", email: "fausto@dh.ind.br" },
  { nome: "Higor dos Reis",   cargo: "Representante comercial", fone: "4797689965",  email: "higor@dh.ind.br" },
];

const REPRESENTADAS = [
  {
    slug: "alpa", nome: "Alpa", segmento: "moveis",
    resumo: "Acessórios para móveis em peças estampadas, zamak e extrusão.",
    fundacao: "1997",
    sobre: [
      "Empresa brasileira fundada em 1997, a Alpa fabrica acessórios para móveis e também peças para os setores automobilístico e de construção civil.",
      "Atende o segmento moveleiro desde a fundação, com foco em bom atendimento, melhoria contínua e qualidade garantida em todas as etapas — da fabricação até a entrega.",
      "Entre os diferenciais estão o desenvolvimento e a adaptação de novos produtos, preços competitivos e pontualidade nas entregas.",
    ],
    linhas: ["Peças estampadas", "Peças injetadas em zamak", "Extrusão de poliestireno e PVC"],
    catalogo: "https://dhrepresentacoes.com.br/wp-content/uploads/2024/10/ALPA-CATALOGO-24.pdf",
    site: "https://alpaindustrial.com.br/site/",
    logo: "alpa-logo.png",
    fotos: [{ src: "alpa-industria.jpg", alt: "Parque industrial da Alpa" }],
  },
  {
    slug: "plastiben", nome: "Plastiben", segmento: "moveis",
    resumo: "Componentes em metal e termoplástico e sistemas de porta de correr.",
    local: "São Bento do Sul – SC",
    sobre: [
      "Localizada em São Bento do Sul (SC), um dos maiores polos moveleiros do Brasil, a Plastiben nasceu da necessidade de fabricar sistemas de porta de correr para esse mercado.",
      "Hoje é especializada em componentes de metais e termoplásticos, com equipe qualificada e processos tecnológicos para atender seus clientes.",
      "Opera com Sistema de Gestão da Qualidade que cobre todas as etapas de fabricação e entrega, com implantação da ISO 9001:2015.",
    ],
    linhas: ["Sistemas de porta de correr", "Termoplásticos injetados: PVC, PA, POM, PP, PE e PS", "Peças em zamak injetado", "Chapas de aço estampadas"],
    catalogo: "https://dhrepresentacoes.com.br/wp-content/uploads/2024/10/Plastiben-Completo-2024-2.pdf",
    site: "https://plastiben.com.br/",
    logo: "plastiben-logo.png",
    fotos: [{ src: "plastiben-industria.jpg", alt: "Indústria da Plastiben" }],
  },
  {
    slug: "hd-ferragens", nome: "HD Ferragens", segmento: "moveis",
    resumo: "Ferragens, lâminas e madeiras com despacho médio em 24 horas.",
    sobre: [
      "A HD Ferragens é uma indústria de distribuição de ferragens e lâminas para o setor moveleiro e varejista em todo o Brasil.",
      "Com amplo estoque regulador, despacha os pedidos em um prazo médio de 24 horas.",
    ],
    linhas: ["Ferragens", "Lâminas", "Madeiras"],
    catalogo: "https://dhrepresentacoes.com.br/wp-content/uploads/2024/10/catalogo-hd-ferragens-3_compressedffffffffffffffffffff.pdf",
    site: "https://www.hdferragens.com.br/",
    logo: "hd-ferragens-logo.png",
    fotos: [{ src: "hd-ferragens-industria.jpg", alt: "Estrutura da HD Ferragens" }],
  },
  {
    slug: "puxe", nome: "Puxe Componentes", segmento: "moveis",
    resumo: "Puxadores para móveis com ótima relação custo-benefício.",
    local: "Arapongas – PR",
    sobre: [
      "Localizada em Arapongas, no norte do Paraná, a Puxe Componentes adota uma política de crescimento sustentável e de compromisso com os clientes.",
      "Trabalha com matéria-prima de alta qualidade, equipamentos modernos e funcionários qualificados, em um processo produtivo enxuto e focado em qualidade e produtividade — o que garante ótima relação custo-benefício.",
    ],
    linhas: ["Puxadores para móveis"],
    catalogo: "https://dhrepresentacoes.com.br/wp-content/uploads/2024/10/FOLDER-PUXADORES-1_compressed.pdf",
    site: "https://puxecomponentes.com.br",
    logo: "puxe-logo.jpg",
    fotos: [{ src: "puxe-empresa.jpg", alt: "Puxe Componentes" }],
  },
  {
    slug: "formato", nome: "Formato", segmento: "moveis",
    resumo: "Puxadores injetados com metalização em alto vácuo e pintura robotizada.",
    sobre: [
      "Reconhecida pela inovação e competência, a Formato desenvolve seus projetos com equipamentos modernos e profissionais tecnicamente capacitados.",
      "Seu objetivo é atender às necessidades dos clientes com melhoria contínua da qualidade, parceria com colaboradores, clientes e fornecedores e compromisso com a ética profissional e a responsabilidade socioambiental.",
      "Além da linha própria, desenvolve produtos especiais sob encomenda.",
    ],
    linhas: ["Puxadores", "Desenvolvimento de desenho e moldes", "Injeção de termoplásticos", "Metalização em alto vácuo", "Pintura robotizada com secagem UV", "Produtos especiais sob encomenda"],
    catalogo: "https://dhrepresentacoes.com.br/wp-content/uploads/2023/01/Catalogo-Formato.pdf",
    site: "https://www.sulformato.com.br/",
    logo: "formato-logo.png",
    fotos: [{ src: "formato-fachada.png", alt: "Fachada da Formato" }],
  },
  {
    slug: "ageplast", nome: "Ageplast", segmento: "perfis",
    resumo: "Perfis plásticos extrudados e coextrudados, inclusive sob medida.",
    local: "Caxias do Sul – RS",
    sobre: [
      "Com mais de 10 anos na indústria de plásticos, a Ageplast, de Caxias do Sul (RS), é especializada em extrusão e coextrusão de perfis.",
      "Também desenvolve projetos especiais conforme a necessidade de cada cliente, sempre com foco em excelência e qualidade.",
    ],
    linhas: ["Perfis para o setor moveleiro", "Perfis para implementos rodoviários", "Perfis para ônibus", "Perfis para refrigeração", "Projetos especiais sob medida"],
    site: "https://www.ageplast.com.br",
    logo: "ageplast-logo.jpg",
    fotos: [{ src: "ageplast-industria.jpg", alt: "Ageplast" }],
  },
  {
    slug: "alumiconte", nome: "Alumiconte", segmento: "perfis",
    resumo: "Perfis, componentes e persianas para esquadrias, móveis e construção.",
    fundacao: "1988",
    sobre: [
      "Fundada em 1988, a Alumiconte oferece um amplo portfólio de componentes e persianas para esquadrias, além de perfis para a indústria moveleira e a construção civil.",
      "Conta com processos próprios de anodização, pintura eletrostática e sublimação para o acabamento dos produtos, e com suporte técnico especializado no desenvolvimento de soluções para os projetos dos clientes.",
    ],
    linhas: ["Componentes para esquadrias", "Persianas", "Perfis para a indústria moveleira", "Perfis para construção civil", "Anodização, pintura eletrostática e sublimação"],
    site: "https://www.alumiconte.com.br/pt/",
    logo: "alumiconte-logo.jpg",
    fotos: [{ src: "alumiconte-industria.jpg", alt: "Vista aérea da Alumiconte" }],
  },
  {
    slug: "glass-house", nome: "Glass House", segmento: "vidros",
    resumo: "Vidros processados em escala industrial para o Brasil e o exterior.",
    sobre: [
      "A Glass House do Brasil Importação e Exportação é referência em vidros processados na América.",
      "São cerca de 50 mil m² de área construída — o maior parque de processamento de vidros do Brasil —, com processos industriais e logísticos avançados para atender os mercados nacional e internacional.",
    ],
    linhas: ["Vidros processados"],
    catalogo: "https://dhrepresentacoes.com.br/wp-content/uploads/2024/10/Catalogo_Glass-House.pdf",
    logo: "glass-house-logo.png",
    fotos: [{ src: "glass-house-industria.jpg", alt: "Indústria da Glass House" }],
  },
  {
    slug: "bragagnolo", nome: "Bragagnolo", segmento: "embalagens",
    resumo: "Embalagens com parque industrial automatizado e frota própria.",
    local: "Faxinal dos Guedes – SC",
    slogan: "Embalando o presente, preservando o futuro.",
    sobre: [
      "Com sede em Faxinal dos Guedes, no oeste catarinense, a Bragagnolo tem um parque industrial com máquinas modernas, processos automatizados e geração própria de energia.",
      "A frota própria, com mais de 100 veículos, roda cerca de 50 mil quilômetros por dia para levar os produtos a diversos setores com prazo, agilidade e segurança.",
    ],
    site: "https://bragagnolo.com.br/",
    logo: "bragagnolo-logo.png",
    fotos: [
      { src: "bragagnolo-industria.jpg", alt: "Parque industrial da Bragagnolo" },
      { src: "bragagnolo-transporte.jpg", alt: "Frota própria da Bragagnolo" },
    ],
  },
  {
    slug: "alcaplas", nome: "Alcaplas", segmento: "embalagens",
    resumo: "Resinas e embalagens plásticas a partir da recuperação de plásticos.",
    sobre: [
      "Líder sul-brasileira na recuperação de plásticos, a Alcaplas transforma sucata plástica em polímeros e fornece resinas e embalagens plásticas para todo o Brasil.",
      "Atua de forma socialmente justa, economicamente viável e ambientalmente correta, é referência em desenvolvimento sustentável e é reconhecida nacionalmente pelo rigor na qualidade dos seus produtos.",
    ],
    linhas: ["Resinas plásticas (polímeros)", "Embalagens plásticas"],
    catalogo: "https://dhrepresentacoes.com.br/wp-content/uploads/2023/06/FOLDER-PRODUTOS-ALCAPLAS3-1.pdf",
    site: "https://www.alcaplas.com.br/",
    logo: "alcaplas-logo.png",
    fotos: [
      { src: "alcaplas-industria.jpeg", alt: "Indústria da Alcaplas" },
      { src: "alcaplas-empresa.jpg", alt: "Alcaplas" },
    ],
  },
];

// ---------------------------------------------------------
// Utilitários
// ---------------------------------------------------------
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function formatFone(n) {
  const d = n.replace(/\D/g, "");
  if (d.length === 11) return `(${d.slice(0, 2)}) ${d[2]} ${d.slice(3, 7)}-${d.slice(7)}`;
  if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return n;
}
const tel = (n) => `tel:+55${n.replace(/\D/g, "")}`;
const wa = (n, msg) => `https://wa.me/${n.startsWith("55") ? n : "55" + n}${msg ? "?text=" + encodeURIComponent(msg) : ""}`;
const iniciais = (nome) => nome.split(" ").filter((p) => p.length > 2).map((p) => p[0]).slice(0, 2).join("").toUpperCase();

// Ícones (traço estilo Feather, MIT). WhatsApp: Font Awesome Free, CC BY 4.0.
const ICONS = {
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  pin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  arrow: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  menu: '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>',
  close: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
  tool: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  glass: '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="7" y1="13" x2="13" y2="7"/><line x1="11" y1="17" x2="17" y2="11"/>',
  package: '<line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
  award: '<circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
};
const WHATS_PATH = '<path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>';

function icon(name, extra = "") {
  if (name === "whats") return `<svg class="icon ${extra}" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true">${WHATS_PATH}</svg>`;
  return `<svg class="icon ${extra}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;
}

// ---------------------------------------------------------
// Partes comuns
// ---------------------------------------------------------
function head({ title, description, canonical, base, extraHead = "" }) {
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="${SITE.nome}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta name="theme-color" content="#16244a">
<link rel="icon" href="${base}images/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${base}css/style.css">
${extraHead}</head>
<body>
<a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
`;
}

function header(base, home) {
  const h = home ? "" : `${base}index.html`;
  const msg = "Olá! Vim pelo site da DH Representações e gostaria de falar com um representante.";
  return `<div class="topbar">
  <div class="container">
    <ul>
      <li><a href="${tel(SITE.telefone)}">${icon("phone")} ${formatFone(SITE.telefone)}</a></li>
      <li><a href="mailto:${SITE.email}">${icon("mail")} ${SITE.email}</a></li>
    </ul>
    <ul>
      <li>${icon("clock")} ${SITE.horario}</li>
      <li>${icon("pin")} ${SITE.cidade}</li>
    </ul>
  </div>
</div>
<header class="site-header">
  <div class="container">
    <a class="brand" href="${base}index.html" aria-label="${SITE.nome} — página inicial">
      <img src="${base}images/logo-dh.png" alt="${SITE.nome}" width="370" height="275">
    </a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">
      ${icon("menu", "icon-open")}${icon("close", "icon-close")}
    </button>
    <nav class="main-nav" id="menu" aria-label="Menu principal">
      <ul>
        <li><a href="${h}#representadas">Representadas</a></li>
        <li><a href="${h}#sobre">Sobre</a></li>
        <li><a href="${h}#equipe">Equipe comercial</a></li>
        <li><a href="${h}#contato">Contato</a></li>
        <li class="nav-mobile-cta"><a class="btn btn-whats btn-block" href="${wa(SITE.whatsapp, msg)}" target="_blank" rel="noopener">${icon("whats")} Falar no WhatsApp</a></li>
      </ul>
    </nav>
    <a class="btn btn-whats btn-sm header-cta" href="${wa(SITE.whatsapp, msg)}" target="_blank" rel="noopener">${icon("whats")} Falar no WhatsApp</a>
  </div>
</header>
`;
}

function footer(base, home) {
  const h = home ? "" : `${base}index.html`;
  const reps = REPRESENTADAS.map((r) => `<li><a href="${base}representadas/${r.slug}.html">${esc(r.nome)}</a></li>`).join("\n          ");
  return `<footer class="site-footer">
  <div class="container footer-grid">
    <div>
      <img class="footer-logo" src="${base}images/logo-dh.png" alt="${SITE.nome}" width="370" height="275" loading="lazy">
      <p>Representação comercial de indústrias de componentes para móveis, perfis, vidros e embalagens.</p>
    </div>
    <div>
      <h2>Navegação</h2>
      <ul>
        <li><a href="${h}#representadas">Representadas</a></li>
        <li><a href="${h}#sobre">Sobre a DH</a></li>
        <li><a href="${h}#equipe">Equipe comercial</a></li>
        <li><a href="${h}#contato">Contato</a></li>
        <li><a href="${base}politica-de-privacidade.html">Política de privacidade</a></li>
      </ul>
    </div>
    <div>
      <h2>Representadas</h2>
      <ul>
          ${reps}
      </ul>
    </div>
    <div>
      <h2>Contato</h2>
      <ul class="footer-contact">
        <li>${icon("pin")}<span>${SITE.endereco}<br>${SITE.cidade}</span></li>
        <li>${icon("phone")}<a href="${tel(SITE.telefone)}">${formatFone(SITE.telefone)}</a></li>
        <li>${icon("whats")}<a href="${wa(SITE.whatsapp)}" target="_blank" rel="noopener">${formatFone(SITE.whatsapp.slice(2))}</a></li>
        <li>${icon("mail")}<a href="mailto:${SITE.email}">${SITE.email}</a></li>
        <li>${icon("clock")}<span>${SITE.horario}</span></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="container">
      <span>© <span id="ano">${new Date().getFullYear()}</span> ${SITE.nome}. Todos os direitos reservados.</span>
      <a href="${base}politica-de-privacidade.html">Política de privacidade</a>
    </div>
  </div>
</footer>
<a class="whats-float" href="${wa(SITE.whatsapp, "Olá! Vim pelo site da DH Representações.")}" target="_blank" rel="noopener" aria-label="Conversar no WhatsApp">${icon("whats")}</a>
<script src="${base}js/main.js" defer></script>
</body>
</html>
`;
}

function repCard(r, base) {
  const seg = SEGMENTOS[r.segmento];
  const url = `${base}representadas/${r.slug}.html`;
  const meta = r.local ? `<span class="rep-meta">${icon("pin")} ${esc(r.local)}</span>` : r.fundacao ? `<span class="rep-meta">${icon("calendar")} Desde ${r.fundacao}</span>` : "";
  const cat = r.catalogo ? `<a class="rep-cat" href="${r.catalogo}" target="_blank" rel="noopener">${icon("download")} Catálogo</a>` : "";
  return `<article class="rep-card" data-segment="${r.segmento}">
          <a class="rep-logo" href="${url}" tabindex="-1" aria-hidden="true"><img src="${base}images/representadas/${r.logo}" alt="" loading="lazy"></a>
          <div class="rep-body">
            <span class="tag">${seg.curto}</span>
            <h3><a href="${url}">${esc(r.nome)}</a></h3>
            <p>${esc(r.resumo)}</p>
            ${meta}
            <div class="rep-actions">
              <a class="rep-more" href="${url}">Ver detalhes ${icon("arrow")}</a>
              ${cat}
            </div>
          </div>
        </article>`;
}

// ---------------------------------------------------------
// Home
// ---------------------------------------------------------
function pageHome() {
  const base = "";
  const segList = Object.entries(SEGMENTOS).map(([k, s]) => {
    const marcas = REPRESENTADAS.filter((r) => r.segmento === k).map((r) => r.nome).join(", ");
    return `<li><button type="button" class="segment-link" data-goto-segment="${k}">
            <span class="segment-ico">${icon(s.icone)}</span>
            <span><strong>${s.nome}</strong><small>${esc(marcas)}</small></span>
            ${icon("arrow", "arrow")}
          </button></li>`;
  }).join("\n          ");

  const chips = [`<button type="button" class="chip" data-filter="todas" aria-pressed="true">Todas <span class="count">${REPRESENTADAS.length}</span></button>`]
    .concat(Object.entries(SEGMENTOS).map(([k, s]) => `<button type="button" class="chip" data-filter="${k}" aria-pressed="false">${s.nome} <span class="count">${REPRESENTADAS.filter((r) => r.segmento === k).length}</span></button>`))
    .join("\n        ");

  const cards = REPRESENTADAS.map((r) => repCard(r, base)).join("\n        ");

  const team = EQUIPE.map((p) => `<article class="person">
          <div class="person-head">
            <span class="avatar" aria-hidden="true">${iniciais(p.nome)}</span>
            <div><h3>${esc(p.nome)}</h3><span class="role">${esc(p.cargo)}</span></div>
          </div>
          <ul class="person-contacts">
            <li><a href="${tel(p.fone)}">${icon("phone")} ${formatFone(p.fone)}</a></li>
            <li><a href="mailto:${p.email}">${icon("mail")} ${p.email}</a></li>
          </ul>
          <a class="btn btn-whats btn-sm" href="${wa(p.fone, `Olá, ${p.nome.split(" ")[0]}! Vim pelo site da DH Representações.`)}" target="_blank" rel="noopener">${icon("whats")} Chamar no WhatsApp</a>
        </article>`).join("\n        ");

  const options = REPRESENTADAS.map((r) => `<option>${esc(r.nome)}</option>`).join("");

  const jsonld = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.nome,
    url: SITE.url + "/",
    logo: SITE.url + "/images/logo-dh.png",
    telephone: "+55" + SITE.telefone,
    email: SITE.email,
    address: { "@type": "PostalAddress", streetAddress: "Rua Rotary Internacional, 299 – Pedregal", addressLocality: "Lagoa Vermelha", addressRegion: "RS", addressCountry: "BR" },
    openingHours: "Mo-Fr 08:00-18:00",
  };

  return head({
    title: "DH Representações | Representação comercial em Lagoa Vermelha – RS",
    description: "A DH Representações conecta empresas a 10 indústrias de componentes e ferragens para móveis, perfis, vidros e embalagens. Fale com nossa equipe comercial.",
    canonical: SITE.url + "/",
    base,
    extraHead: `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>\n`,
  }) + header(base, true) + `
<main id="conteudo">
  <section class="hero">
    <div class="container">
      <div>
        <span class="eyebrow">Representação comercial · ${SITE.cidade}</span>
        <h1>Encurtamos a distância entre a sua empresa e <em>grandes indústrias</em>.</h1>
        <p class="hero-lead">A DH Representações conecta você a ${REPRESENTADAS.length} fornecedores de componentes e ferragens para móveis, perfis, vidros e embalagens — com atendimento direto da nossa equipe comercial.</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="#contato">Solicitar orçamento ${icon("arrow")}</a>
          <a class="btn btn-ghost" href="#representadas">Ver representadas</a>
        </div>
      </div>
      <div class="segments-card">
        <h2>O que você encontra aqui</h2>
        <ul>
          ${segList}
        </ul>
      </div>
    </div>
  </section>

  <div class="stats">
    <div class="container">
      <div class="stats-grid">
        <div class="stat"><span class="stat-num">${REPRESENTADAS.length}</span><p>indústrias<br>representadas</p></div>
        <div class="stat"><span class="stat-num">${EQUIPE.length}</span><p>profissionais na<br>equipe comercial</p></div>
        <div class="stat"><span class="stat-num small">${icon("clock")}</span><p>Atendimento<br>${SITE.horario}</p></div>
      </div>
    </div>
  </div>

  <section class="section" id="representadas">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Representadas</span>
        <h2>Conheça as empresas que representamos</h2>
        <p>Selecione um segmento para filtrar. Em cada página você encontra a apresentação da empresa, as linhas de produtos e o catálogo.</p>
      </div>
      <div class="filters" role="group" aria-label="Filtrar representadas por segmento">
        ${chips}
      </div>
      <div class="rep-grid">
        ${cards}
      </div>
    </div>
  </section>

  <section class="section section-navy" id="diferenciais">
    <div class="container">
      <div class="section-head center">
        <span class="eyebrow">Por que comprar com a DH</span>
        <h2>Vários fornecedores, um só atendimento</h2>
      </div>
      <div class="diff-grid">
        <article class="diff">
          <span class="diff-ico">${icon("layers")}</span>
          <h3>Um contato, ${REPRESENTADAS.length} indústrias</h3>
          <p>Componentes, ferragens, perfis, vidros e embalagens de ${REPRESENTADAS.length} fabricantes, negociados com a mesma equipe.</p>
        </article>
        <article class="diff">
          <span class="diff-ico">${icon("whats")}</span>
          <h3>Atendimento direto</h3>
          <p>Fale com o representante pelo WhatsApp, telefone ou e-mail, sem intermediários.</p>
        </article>
        <article class="diff">
          <span class="diff-ico">${icon("download")}</span>
          <h3>Catálogos à mão</h3>
          <p>Baixe os catálogos das representadas direto no site e chegue à conversa já sabendo o que quer.</p>
        </article>
        <article class="diff">
          <span class="diff-ico">${icon("award")}</span>
          <h3>Indústrias consolidadas</h3>
          <p>Fabricantes com décadas de mercado, sistemas de gestão da qualidade e grandes parques industriais.</p>
        </article>
      </div>
    </div>
  </section>

  <section class="section section-soft" id="sobre">
    <div class="container about">
      <div class="about-text">
        <span class="eyebrow">Sobre a DH</span>
        <h2>Representação comercial com responsabilidade e comprometimento</h2>
        <p class="lead">A DH Representações é uma empresa de representação comercial com sede em Lagoa Vermelha (RS).</p>
        <p>Nosso trabalho é encurtar distâncias entre fornecedores e clientes. Valorizamos produtos que atendam aos padrões de exigência e sustentabilidade do mercado global e buscamos trazer o que existe de melhor para os nossos parceiros.</p>
        <a class="btn btn-primary" href="#equipe">Falar com a equipe ${icon("arrow")}</a>
      </div>
      <div class="mvv">
        <article class="mvv-item">
          <span class="segment-ico">${icon("target")}</span>
          <div><h3>Missão</h3><p>Além de buscar encurtar distâncias entre fornecedores e clientes, trabalhamos sempre baseados no princípio de responsabilidade e comprometimento. Nossa empresa valoriza produtos que atendam aos padrões de exigência e sustentabilidade do mercado global.</p></div>
        </article>
        <article class="mvv-item">
          <span class="segment-ico">${icon("eye")}</span>
          <div><h3>Visão</h3><p>Sempre se aprimorando cada vez mais em tecnologia e informação de mercado, a DH Representações busca trazer o que existe de melhor para os seus parceiros.</p></div>
        </article>
        <article class="mvv-item">
          <span class="segment-ico">${icon("award")}</span>
          <div><h3>Valores</h3><p>Ganhar reconhecimento pelo trabalho de excelência executado, prezando sempre pela honestidade e pelos bons valores.</p></div>
        </article>
      </div>
    </div>
  </section>

  <section class="section" id="equipe">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Equipe comercial</span>
        <h2>Fale direto com quem vai te atender</h2>
        <p>Nossa equipe está pronta para apresentar as linhas, enviar catálogos e preparar seu orçamento.</p>
      </div>
      <div class="team-grid">
        ${team}
      </div>
    </div>
  </section>

  <section class="section section-soft" id="contato">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Contato</span>
        <h2>Solicite um orçamento</h2>
        <p>Conte o que você precisa e indicamos a representada e o representante certos para o seu pedido.</p>
      </div>
      <div class="contact">
        <form class="form-card" id="form-contato" novalidate>
          <div class="form-grid">
            <div class="field"><label for="f-nome">Nome</label><input id="f-nome" name="nome" type="text" autocomplete="name" required></div>
            <div class="field"><label for="f-empresa">Empresa <span class="opt">(opcional)</span></label><input id="f-empresa" name="empresa" type="text" autocomplete="organization"></div>
            <div class="field"><label for="f-telefone">Telefone / WhatsApp</label><input id="f-telefone" name="telefone" type="tel" autocomplete="tel" inputmode="tel" required></div>
            <div class="field"><label for="f-cidade">Cidade / UF</label><input id="f-cidade" name="cidade" type="text" autocomplete="address-level2" placeholder="Ex.: Caxias do Sul / RS" required></div>
            <div class="field full"><label for="f-interesse">Tenho interesse em <span class="opt">(opcional)</span></label>
              <select id="f-interesse" name="interesse"><option value="">Selecione uma representada</option>${options}<option>Ainda não sei / outro produto</option></select></div>
            <div class="field full"><label for="f-mensagem">Mensagem <span class="opt">(opcional)</span></label><textarea id="f-mensagem" name="mensagem" placeholder="Produtos, quantidades, prazos…"></textarea></div>
            <div class="form-actions">
              <button class="btn btn-whats btn-block" type="submit">${icon("whats")} Enviar pelo WhatsApp</button>
              <p class="form-note">Ao enviar, abrimos o WhatsApp com a sua mensagem pronta para a nossa equipe. Seus dados são tratados conforme a nossa <a href="politica-de-privacidade.html">política de privacidade</a>.</p>
            </div>
          </div>
        </form>
        <aside class="info-card">
          <h3>Escritório</h3>
          <ul class="info-list">
            <li><span class="segment-ico">${icon("pin")}</span><div><strong>Endereço</strong><span>${SITE.endereco}, ${SITE.cidade}</span></div></li>
            <li><span class="segment-ico">${icon("phone")}</span><div><strong>Telefone</strong><a href="${tel(SITE.telefone)}">${formatFone(SITE.telefone)}</a></div></li>
            <li><span class="segment-ico">${icon("whats")}</span><div><strong>WhatsApp</strong><a href="${wa(SITE.whatsapp)}" target="_blank" rel="noopener">${formatFone(SITE.whatsapp.slice(2))}</a></div></li>
            <li><span class="segment-ico">${icon("mail")}</span><div><strong>E-mail</strong><a href="mailto:${SITE.email}">${SITE.email}</a></div></li>
            <li><span class="segment-ico">${icon("clock")}</span><div><strong>Horário</strong><span>${SITE.horario}</span></div></li>
          </ul>
          <div class="map">
            <iframe title="Mapa: DH Representações em Lagoa Vermelha – RS" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=${encodeURIComponent("Rua Rotary Internacional, 299, Pedregal, Lagoa Vermelha - RS")}&t=m&z=15&output=embed"></iframe>
          </div>
        </aside>
      </div>
    </div>
  </section>
</main>
` + footer(base, true);
}

// ---------------------------------------------------------
// Página de cada representada
// ---------------------------------------------------------
function pageRep(r) {
  const base = "../";
  const seg = SEGMENTOS[r.segmento];
  const msg = `Olá! Vim pelo site da DH Representações e gostaria de um orçamento de produtos da ${r.nome}.`;

  const facts = [`<li>${icon(seg.icone)} ${seg.nome}</li>`];
  if (r.local) facts.push(`<li>${icon("pin")} ${esc(r.local)}</li>`);
  if (r.fundacao) facts.push(`<li>${icon("calendar")} Desde ${r.fundacao}</li>`);

  const actions = [`<a class="btn btn-whats" href="${wa(SITE.whatsapp, msg)}" target="_blank" rel="noopener">${icon("whats")} Solicitar orçamento</a>`];
  if (r.catalogo) actions.push(`<a class="btn btn-primary" href="${r.catalogo}" target="_blank" rel="noopener">${icon("download")} Baixar catálogo (PDF)</a>`);
  if (r.site) actions.push(`<a class="btn btn-outline" href="${r.site}" target="_blank" rel="noopener">Site oficial ${icon("external")}</a>`);

  const linhas = r.linhas && r.linhas.length
    ? `<h2>Linhas de produtos e serviços</h2>
          <ul class="lines">${r.linhas.map((l) => `<li>${icon("check")}<span>${esc(l)}</span></li>`).join("")}</ul>`
    : "";

  const fotos = r.fotos && r.fotos.length
    ? `<div class="gallery">${r.fotos.map((f) => `<figure><img src="${base}images/representadas/${f.src}" alt="${esc(f.alt)}" loading="lazy"></figure>`).join("")}</div>`
    : "";

  const outras = REPRESENTADAS.filter((o) => o.slug !== r.slug)
    .sort((a, b) => (b.segmento === r.segmento) - (a.segmento === r.segmento))
    .slice(0, 4).map((o) => repCard(o, base)).join("\n        ");

  return head({
    title: `${r.nome} – ${seg.nome} | DH Representações`,
    description: `${r.resumo} Representação comercial da ${r.nome} pela DH Representações. Solicite catálogo e orçamento.`,
    canonical: `${SITE.url}/representadas/${r.slug}.html`,
    base,
  }) + header(base, false) + `
<main id="conteudo">
  <section class="page-hero">
    <div class="container">
      <nav class="breadcrumb" aria-label="Você está em">
        <ol>
          <li><a href="${base}index.html">Início</a></li>
          <li><a href="${base}index.html#representadas">Representadas</a></li>
          <li aria-current="page">${esc(r.nome)}</li>
        </ol>
      </nav>
      <div class="page-hero-grid">
        <div>
          <span class="eyebrow">Representada</span>
          <h1>${esc(r.nome)}</h1>
          <p class="lead">${esc(r.resumo)}</p>
          <ul class="facts">${facts.join("")}</ul>
          <div class="page-actions">${actions.join("\n            ")}</div>
        </div>
        <div class="logo-panel"><img src="${base}images/representadas/${r.logo}" alt="Logo ${esc(r.nome)}"></div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container detail">
      <div class="prose">
        <h2>Sobre a ${esc(r.nome)}</h2>
        ${r.sobre.map((p) => `<p>${esc(p)}</p>`).join("\n        ")}
        ${r.slogan ? `<p class="slogan">“${esc(r.slogan)}”</p>` : ""}
        ${linhas}
        ${fotos}
      </div>
      <aside class="aside-card">
        <h2>Compre ${esc(r.nome)} com a DH</h2>
        <p>Somos representantes comerciais da ${esc(r.nome)}. Fale com a nossa equipe para receber catálogo, condições e orçamento.</p>
        <ul>
          <li><a href="${tel(SITE.telefone)}">${icon("phone")} ${formatFone(SITE.telefone)}</a></li>
          <li><a href="mailto:${SITE.email}">${icon("mail")} ${SITE.email}</a></li>
        </ul>
        <a class="btn btn-whats" href="${wa(SITE.whatsapp, msg)}" target="_blank" rel="noopener">${icon("whats")} Falar no WhatsApp</a>
      </aside>
    </div>
  </section>

  <section class="section section-soft">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Outras representadas</span>
        <h2>Veja também</h2>
      </div>
      <div class="rep-grid">
        ${outras}
      </div>
    </div>
  </section>
</main>
` + footer(base, false);
}

// ---------------------------------------------------------
// Política de privacidade (texto do site atual, revisado)
// ---------------------------------------------------------
function pagePrivacidade() {
  const base = "";
  return head({
    title: "Política de privacidade | DH Representações",
    description: "Saiba como a DH Representações coleta, usa e protege os seus dados pessoais, conforme a LGPD.",
    canonical: SITE.url + "/politica-de-privacidade.html",
    base,
  }) + header(base, false) + `
<main id="conteudo">
  <section class="page-hero">
    <div class="container">
      <nav class="breadcrumb" aria-label="Você está em"><ol><li><a href="index.html">Início</a></li><li aria-current="page">Política de privacidade</li></ol></nav>
      <h1>Política de privacidade</h1>
    </div>
  </section>
  <section class="section">
    <div class="container legal">
      <p>A DH Representações preza pela transparência sobre o tratamento dos seus dados pessoais.</p>
      <p>Esta política tem como objetivo assegurar o compromisso da DH Representações perante nossas representadas e nossos clientes, em cumprimento à Lei Geral de Proteção de Dados – LGPD (Lei nº 13.709/18). Ela apresenta informações sobre a coleta, o tratamento e a proteção dos dados pessoais no site da DH Representações (dhrepresentacoes.com.br).</p>
      <p>A aceitação desta política se dá quando você acessa ou utiliza o nosso site ou os nossos serviços, indicando que está ciente e de acordo com a forma como utilizaremos as suas informações e os seus dados.</p>

      <h2>Quais informações são coletadas?</h2>
      <p>Coletamos as informações que você nos fornece, como nome, e-mail, telefone, empresa, estado, cidade e demais dados informados por você em nossos formulários de contato. Em síntese, coletamos as informações ativamente disponibilizadas pelo usuário na utilização do nosso site.</p>

      <h2>Como utilizamos seus dados?</h2>
      <p>Todos os dados e informações sobre você são tratados como confidenciais e somente serão utilizados para os fins descritos e autorizados por você, visando sempre melhorar a sua experiência com nossas representadas e com a nossa equipe.</p>
      <p>Os dados enviados pelo formulário de contato são usados para responder a solicitações de propostas comerciais e de informações sobre representadas e representantes, e são encaminhados ao setor comercial responsável conforme o assunto informado.</p>
      <p>Por meio desta política, a DH Representações fica autorizada a utilizar seus dados para:</p>
      <ul>
        <li>Permitir o acesso a recursos e funcionalidades do site;</li>
        <li>Enviar mensagens como alertas, notificações e atualizações;</li>
        <li>Comunicar sobre produtos, serviços, promoções, notícias e outros assuntos do seu interesse;</li>
        <li>Personalizar serviços para que se adequem cada vez mais aos seus interesses;</li>
        <li>Criar novos serviços, produtos e funcionalidades;</li>
        <li>Entender melhor o seu comportamento e construir perfis comportamentais.</li>
      </ul>
      <p>O eventual uso dos seus dados para finalidades diferentes das descritas será feito mediante autorização prévia.</p>

      <h2>Compartilhamento de informações</h2>
      <p>Todos os seus dados são confidenciais, e somente pessoas com as devidas autorizações terão acesso a eles. Qualquer uso desses dados estará de acordo com esta política. A DH Representações empreenderá todos os esforços razoáveis de mercado para garantir a segurança dos nossos sistemas e dos seus dados, sempre atendendo aos princípios da LGPD.</p>

      <h2>Dados de navegação (cookies)</h2>
      <p>Cookies são arquivos de texto que os sites enviam para o computador ou outros dispositivos do usuário para identificar o dispositivo e o navegador ou para armazenar informações e configurações. A DH Representações não vende nem comercializa nenhuma informação coletada.</p>

      <h2>Atualizações desta política</h2>
      <p>A DH Representações se reserva o direito de alterar esta política sempre que necessário, visando oferecer mais segurança e conveniência. Recomendamos que você a consulte periodicamente.</p>

      <h2>Contato</h2>
      <p>Em caso de dúvidas ou solicitações sobre esta política, entre em contato pelo e-mail <a href="mailto:${SITE.email}">${SITE.email}</a> ou pelo telefone <a href="${tel(SITE.telefone)}">${formatFone(SITE.telefone)}</a>.</p>
    </div>
  </section>
</main>
` + footer(base, false);
}

// ---------------------------------------------------------
// .htaccess — redireciona os links antigos do WordPress
// ---------------------------------------------------------
function htaccess() {
  const linhas = REPRESENTADAS.map((r) => `Redirect 301 /${r.slug}/ /representadas/${r.slug}.html`);
  linhas.push("Redirect 301 /politicas-de-privacidade/ /politica-de-privacidade.html");
  linhas.push("Redirect 301 /sample-page/ /");
  return `# Redirecionamentos dos endereços antigos (WordPress) para o site novo\n# Mantém o Google e links salvos funcionando.\n${linhas.join("\n")}\n\nErrorDocument 404 /index.html\n`;
}

// ---------------------------------------------------------
// Gera os arquivos
// ---------------------------------------------------------
const out = __dirname;
const write = (rel, content) => {
  const file = path.join(out, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
  console.log("gerado:", rel);
};

write("index.html", pageHome());
REPRESENTADAS.forEach((r) => write(`representadas/${r.slug}.html`, pageRep(r)));
write("politica-de-privacidade.html", pagePrivacidade());
write(".htaccess", htaccess());
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE.url}/</loc></url>
${REPRESENTADAS.map((r) => `  <url><loc>${SITE.url}/representadas/${r.slug}.html</loc></url>`).join("\n")}
  <url><loc>${SITE.url}/politica-de-privacidade.html</loc></url>
</urlset>
`);
write("robots.txt", `User-agent: *\nAllow: /\nSitemap: ${SITE.url}/sitemap.xml\n`);
