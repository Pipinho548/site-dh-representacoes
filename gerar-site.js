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
  iluminacao: { nome: "Iluminação LED para móveis",          curto: "LED", icone: "glass" },
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
    // Nova representada. Falta: logo, site, catálogo e cidade.
    slug: "iluminium", nome: "Iluminium", segmento: "iluminacao",
    resumo: "Iluminação LED para a indústria moveleira.",
    sobre: [
      "A Iluminium Brasil é uma fábrica de iluminação LED para o setor moveleiro, com venda direta para fábricas de móveis.",
    ],
    logo: null,
    fotos: [],
  },
  {
    slug: "bragagnolo", nome: "Bragagnolo", segmento: "embalagens",
    resumo: "Papel e embalagens, com parque industrial automatizado e frota própria.",
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

// Peças do roupeiro desenhado no topo da home.
// x/y = posição do ponto clicável no desenho (viewBox 1000 x 600).
const PECAS = [
  { id: "led", nome: "Iluminação LED do espelho", x: 364, y: 68,
    texto: "A luz que contorna o espelho do nicho. LED feito para móveis.",
    marcas: ["iluminium"] },
  { id: "vidro", nome: "Espelho e vidro da porta", x: 300, y: 196,
    texto: "O espelho do nicho e o vidro da porta de correr.",
    marcas: ["glass-house"] },
  { id: "puxadores", nome: "Puxadores", x: 252, y: 309,
    texto: "Puxadores das gavetas e das portas, injetados e com acabamento metalizado.",
    marcas: ["puxe", "formato"] },
  { id: "madeira", nome: "Lâminas, madeira e ferragens", x: 117, y: 200,
    texto: "Lâminas e madeiras da estrutura do roupeiro, além das ferragens de montagem.",
    marcas: ["hd-ferragens"] },
  { id: "trilho-al", nome: "Trilho e perfil de alumínio", x: 520, y: 60,
    texto: "Os trilhos de alumínio das portas de correr e o perfil que emoldura a porta de vidro.",
    marcas: ["alumiconte"] },
  { id: "porta-correr", nome: "Trilho plástico, roldanas e guias", x: 712, y: 485,
    texto: "Os componentes termoplásticos e o sistema que fazem a porta de correr deslizar.",
    marcas: ["plastiben"] },
  { id: "acessorios", nome: "Acessórios metálicos", x: 743, y: 117,
    texto: "Peças estampadas e em zamak, como os suportes do cabideiro.",
    marcas: ["alpa"] },
  { id: "perfil-plastico", nome: "Perfil plástico do rodapé", x: 300, y: 510,
    texto: "Perfis plásticos extrudados para rodapés, bordas e acabamentos.",
    marcas: ["ageplast"] },
  { id: "embalagem", nome: "Embalagem para o transporte", x: 887, y: 462,
    texto: "A caixa de papelão e o filme plástico que levam o móvel inteiro até o cliente.",
    marcas: ["bragagnolo", "alcaplas"] },
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
  chevl: '<polyline points="15 18 9 12 15 6"/>',
  chevr: '<polyline points="9 18 15 12 9 6"/>',
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
const EXTENSO = { 1: "Uma", 2: "Duas", 3: "Três", 4: "Quatro", 5: "Cinco", 6: "Seis", 7: "Sete", 8: "Oito", 9: "Nove", 10: "Dez", 11: "Onze", 12: "Doze" };
const porExtenso = (n) => EXTENSO[n] || String(n);
const mapsUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Rua Rotary Internacional, 299, Pedregal, Lagoa Vermelha - RS");

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
<meta name="theme-color" content="#13213f">
<link rel="icon" href="${base}images/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${base}css/style.css">
${extraHead}</head>
<body>
<a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
`;
}

function header(base, home) {
  const h = home ? "" : `${base}index.html`;
  const msg = "Olá! Vim pelo site da DH Representações e gostaria de falar com um representante.";
  return `<header class="site-header">
  <div class="wrap header-row">
    <a class="brand" href="${base}index.html" aria-label="${SITE.nome}, página inicial">
      <img src="${base}images/logo-dh.png" alt="${SITE.nome}" width="370" height="275">
    </a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">
      ${icon("menu", "icon-open")}${icon("close", "icon-close")}
    </button>
    <nav class="main-nav" id="menu" aria-label="Menu principal">
      <ul>
        <li><a href="${h}#representadas">Representadas</a></li>
        <li><a href="${h}#a-dh">A DH</a></li>
        <li><a href="${h}#equipe">Equipe</a></li>
        <li><a href="${h}#contato">Contato</a></li>
      </ul>
      <a class="header-phone" href="${tel(SITE.telefone)}">${formatFone(SITE.telefone)}</a>
      <a class="btn btn-whats" href="${wa(SITE.whatsapp, msg)}" target="_blank" rel="noopener">${icon("whats")} WhatsApp</a>
    </nav>
  </div>
</header>
`;
}

function footer(base, home) {
  const h = home ? "" : `${base}index.html`;
  const reps = REPRESENTADAS.map((r) => `<li><a href="${base}representadas/${r.slug}.html">${esc(r.nome)}</a></li>`).join("");
  return `<footer class="site-footer">
  <div class="wrap footer-grid">
    <div class="footer-brand">
      <img src="${base}images/logo-dh.png" alt="${SITE.nome}" width="370" height="275" loading="lazy">
      <p>${SITE.endereco}<br>${SITE.cidade}</p>
    </div>
    <div>
      <h2>Site</h2>
      <ul>
        <li><a href="${h}#representadas">Representadas</a></li>
        <li><a href="${h}#a-dh">A DH</a></li>
        <li><a href="${h}#equipe">Equipe</a></li>
        <li><a href="${h}#contato">Contato</a></li>
        <li><a href="${base}politica-de-privacidade.html">Política de privacidade</a></li>
      </ul>
    </div>
    <div class="footer-reps">
      <h2>Representadas</h2>
      <ul>${reps}</ul>
    </div>
    <div>
      <h2>Contato</h2>
      <ul>
        <li><a href="${tel(SITE.telefone)}">${formatFone(SITE.telefone)}</a></li>
        <li><a href="${wa(SITE.whatsapp)}" target="_blank" rel="noopener">WhatsApp ${formatFone(SITE.whatsapp.slice(2))}</a></li>
        <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
        <li>${SITE.horario}</li>
      </ul>
    </div>
  </div>
  <div class="wrap footer-base">
    <span>© <span id="ano">${new Date().getFullYear()}</span> ${SITE.nome}</span>
    <a href="${base}politica-de-privacidade.html">Política de privacidade</a>
  </div>
</footer>
<a class="whats-float" href="${wa(SITE.whatsapp, "Olá! Vim pelo site da DH Representações.")}" target="_blank" rel="noopener" aria-label="Conversar no WhatsApp">${icon("whats")}</a>
<script src="${base}js/main.js" defer></script>
</body>
</html>
`;
}

// Logo da representada; sem arquivo de logo, mostra o nome escrito
function logo(r, base, alt = "") {
  return r.logo
    ? `<img src="${base}images/representadas/${r.logo}" alt="${esc(alt)}" loading="lazy">`
    : `<span class="logo-word">${esc(r.nome)}</span>`;
}

// Linha do índice de representadas (home e páginas internas)
function repRow(r, base) {
  const url = `${base}representadas/${r.slug}.html`;
  const onde = [r.local, r.fundacao ? `Desde ${r.fundacao}` : null].filter(Boolean);
  return `<li class="rep-row">
            <a class="rep-tile" href="${url}" tabindex="-1" aria-hidden="true">${logo(r, base)}</a>
            <div class="rep-info">
              <h4><a href="${url}">${esc(r.nome)}</a></h4>
              <p>${esc(r.resumo)}</p>
            </div>
            <p class="rep-where">${onde.map(esc).join("<br>")}</p>
            <div class="rep-act">
              ${r.catalogo ? `<a class="btn btn-line" href="${r.catalogo}" target="_blank" rel="noopener">${icon("download")} Catálogo</a>` : ""}
              <a class="btn btn-text" href="${url}">Ver empresa</a>
            </div>
          </li>`;
}

// Card da home: logo grande, como no site antigo
function repCard(r, base) {
  const url = `${base}representadas/${r.slug}.html`;
  return `<li class="rep-card" data-segment="${r.segmento}">
          <a class="rep-card-logo" href="${url}" tabindex="-1" aria-hidden="true">${logo(r, base)}</a>
          <div class="rep-card-body">
            <span class="tag">${SEGMENTOS[r.segmento].nome}</span>
            <h3><a href="${url}">${esc(r.nome)}</a></h3>
            <p>${esc(r.resumo)}</p>
            <div class="rep-card-act">
              <a class="btn btn-line" href="${url}">Saiba mais</a>
              ${r.catalogo ? `<a class="btn btn-text" href="${r.catalogo}" target="_blank" rel="noopener">${icon("download")} Catálogo</a>` : ""}
            </div>
          </div>
        </li>`;
}

function repIndex(base, lista) {
  return Object.entries(SEGMENTOS).map(([k, s]) => {
    const itens = lista.filter((r) => r.segmento === k);
    if (!itens.length) return "";
    return `<div class="seg-group" id="seg-${k}">
        <h3 class="seg-title">${s.nome} <span>${itens.length} ${itens.length === 1 ? "indústria" : "indústrias"}</span></h3>
        <ul class="rep-list">
          ${itens.map((r) => repRow(r, base)).join("\n          ")}
        </ul>
      </div>`;
  }).join("\n      ");
}

// ---------------------------------------------------------
// O quarto: roupeiro em vista frontal, cada peça ligada a uma representada
// ---------------------------------------------------------
function roomSvg() {
  const ink = "#13213f", edge = "#8e9aab", metal = "#6f7c8f";
  const gavetas = [286, 340, 394, 448];
  return `<svg class="room-svg" viewBox="0 0 1000 600" role="img" aria-labelledby="room-title">
          <title id="room-title">Quarto com um roupeiro: cada peça é fornecida por uma indústria representada pela DH</title>
          <defs>
            <linearGradient id="g-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f1f4f7"/><stop offset="1" stop-color="#e5eaf0"/></linearGradient>
            <linearGradient id="g-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9dfe6"/><stop offset="1" stop-color="#e8ecf1"/></linearGradient>
            <linearGradient id="g-alu" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f5f7f9"/><stop offset=".55" stop-color="#bcc6d1"/><stop offset="1" stop-color="#8e9aab"/></linearGradient>
            <linearGradient id="g-alu-v" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9aa6b5"/><stop offset=".5" stop-color="#eef1f4"/><stop offset="1" stop-color="#9aa6b5"/></linearGradient>
            <linearGradient id="g-mirror" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4f7fa"/><stop offset="1" stop-color="#c6d2df"/></linearGradient>
            <linearGradient id="g-glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c9dcec" stop-opacity=".5"/><stop offset="1" stop-color="#8fabc6" stop-opacity=".42"/></linearGradient>
            <linearGradient id="g-box" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfab7c"/><stop offset="1" stop-color="#bb945f"/></linearGradient>
            <pattern id="p-wood" width="60" height="120" patternUnits="userSpaceOnUse">
              <rect width="60" height="120" fill="#d6bc96"/>
              <path d="M6 0c3 30-3 60 0 120M22 0c-4 40 4 70 0 120M41 0c3 25-2 75 1 120M53 0c-2 35 3 65 0 120" stroke="#c6a97f" stroke-width="1.4" fill="none"/>
            </pattern>
            <pattern id="p-lam" width="46" height="140" patternUnits="userSpaceOnUse">
              <rect width="46" height="140" fill="#efe6d8"/>
              <path d="M9 0c2 50-2 90 0 140M27 0c-3 45 3 95 0 140M39 0c2 60-2 80 0 140" stroke="#e3d6c2" stroke-width="1.2" fill="none"/>
            </pattern>
            <filter id="f-glow" x="-25%" y="-25%" width="150%" height="150%"><feGaussianBlur stdDeviation="7"/></filter>
          </defs>

          <rect width="1000" height="520" fill="url(#g-wall)"/>
          <rect y="520" width="1000" height="80" fill="url(#g-floor)"/>
          <path d="M0 520H1000M0 551H1000M0 580H1000" stroke="#c9d1db" stroke-width="1.5"/>
          <ellipse cx="440" cy="521" rx="352" ry="6" fill="${ink}" opacity=".1"/>
          <ellipse cx="887" cy="521" rx="84" ry="5" fill="${ink}" opacity=".1"/>

          <!-- fundos internos -->
          <rect x="124" y="54" width="256" height="216" fill="#f4f0ea"/>
          <rect x="394" y="66" width="362" height="422" fill="#f4f0ea"/>

          <!-- estrutura: lâminas e madeira (HD Ferragens) -->
          <g class="part" data-peca="madeira">
            <rect x="110" y="40" width="660" height="14" fill="url(#p-wood)"/>
            <rect x="110" y="40" width="14" height="460" fill="url(#p-wood)"/>
            <rect x="756" y="40" width="14" height="460" fill="url(#p-wood)"/>
            <rect x="380" y="54" width="14" height="446" fill="url(#p-wood)"/>
            <rect x="124" y="270" width="256" height="12" fill="url(#p-wood)"/>
          </g>

          <!-- LED do espelho (Iluminium) -->
          <g class="part" data-peca="led">
            <rect class="led-glow" x="140" y="68" width="224" height="188" rx="10" fill="none" stroke="#ffd47e" stroke-width="12" filter="url(#f-glow)"/>
            <rect class="led-strip" x="140" y="68" width="224" height="188" rx="10" fill="none" stroke-width="3.5"/>
          </g>

          <!-- espelho e vidro (Glass House) -->
          <g class="part" data-peca="vidro">
            <rect x="148" y="76" width="208" height="172" rx="5" fill="url(#g-mirror)" stroke="#a3b0bf"/>
            <path d="M176 244 252 80M206 244 282 80" stroke="#fff" stroke-width="7" opacity=".55"/>
          </g>

          <!-- gavetas -->
          <g fill="#fbfaf7" stroke="#a3b0bf" stroke-width="1.5">
            ${gavetas.map((y) => `<rect x="128" y="${y}" width="248" height="48" rx="2"/>`).join("")}
          </g>

          <!-- interior visto pelo vidro: cabideiro e roupas -->
          <line x1="398" y1="118" x2="752" y2="118" stroke="${edge}" stroke-width="5" stroke-linecap="round"/>
          <g stroke="${metal}" stroke-width="2" fill="none">
            <path d="M604 118v8l-18 12h36zM652 118v8l-18 12h36zM700 118v8l-18 12h36z"/>
          </g>
          <path d="M588 138h32l6 168h-44z" fill="#c4d0de"/>
          <path d="M636 138h32l8 196h-48z" fill="#d9cbb7"/>
          <path d="M684 138h32l4 150h-40z" fill="#a9bacd"/>

          <!-- suportes do cabideiro (Alpa) -->
          <g class="part" data-peca="acessorios">
            <rect x="398" y="105" width="12" height="26" rx="3" fill="${metal}"/>
            <rect x="737" y="105" width="12" height="26" rx="3" fill="${metal}"/>
          </g>

          <!-- porta de correr em laminado -->
          <rect x="398" y="68" width="186" height="418" fill="url(#p-lam)" stroke="#a3b0bf" stroke-width="1.5"/>

          <!-- porta de vidro -->
          <g class="part" data-peca="vidro">
            <rect x="572" y="68" width="180" height="418" fill="url(#g-glass)"/>
            <path d="M600 470 690 90M630 470 720 90" stroke="#fff" stroke-width="7" opacity=".4"/>
          </g>

          <!-- trilhos e perfil de alumínio (Alumiconte) -->
          <g class="part" data-peca="trilho-al">
            <rect x="394" y="54" width="362" height="12" fill="url(#g-alu)" stroke="${edge}"/>
            <rect x="394" y="488" width="362" height="12" fill="url(#g-alu)" stroke="${edge}"/>
            <rect x="572" y="68" width="180" height="418" fill="none" stroke="url(#g-alu-v)" stroke-width="9"/>
            <rect x="567.5" y="63.5" width="189" height="427" fill="none" stroke="${edge}" stroke-width="1"/>
          </g>

          <!-- puxadores (Puxe e Formato) -->
          <g class="part" data-peca="puxadores">
            ${gavetas.map((y) => `<rect x="217" y="${y + 18}" width="70" height="7" rx="3.5" fill="${metal}"/>`).join("")}
            <rect x="405" y="228" width="7" height="110" rx="3.5" fill="${metal}"/>
          </g>

          <!-- trilho plástico, roldanas e guias (Plastiben) -->
          <g class="part" data-peca="porta-correr">
            <rect x="420" y="478" width="26" height="10" rx="4" fill="#2f3a52"/>
            <rect x="536" y="478" width="26" height="10" rx="4" fill="#2f3a52"/>
            <rect x="592" y="478" width="26" height="10" rx="4" fill="#2f3a52"/>
            <rect x="699" y="478" width="26" height="10" rx="4" fill="#2f3a52"/>
            <rect x="426" y="66" width="18" height="6" rx="2" fill="#2f3a52"/>
            <rect x="700" y="66" width="18" height="6" rx="2" fill="#2f3a52"/>
          </g>

          <!-- perfil plástico do rodapé (Ageplast) -->
          <g class="part" data-peca="perfil-plastico">
            <rect x="110" y="500" width="660" height="20" fill="#c6ced8"/>
            <path d="M110 505H770" stroke="#eef1f4" stroke-width="2"/>
            <path d="M110 520H770" stroke="${edge}" stroke-width="1.5"/>
          </g>

          <!-- contorno do roupeiro -->
          <rect x="110" y="40" width="660" height="480" fill="none" stroke="${ink}" stroke-width="2.5"/>

          <!-- embalagem: caixa de papelão e filme plástico (Bragagnolo e Alcaplas) -->
          <g class="part" data-peca="embalagem">
            <rect x="812" y="400" width="150" height="120" fill="url(#g-box)" stroke="#8f6d45" stroke-width="1.5"/>
            <rect x="878" y="400" width="18" height="120" fill="#e4cc9e" opacity=".9"/>
            <rect x="828" y="452" width="38" height="26" fill="#f7f3ea"/>
            <path d="M834 460h26M834 467h18" stroke="#b7a68a" stroke-width="2"/>
            <rect x="840" y="346" width="100" height="54" fill="url(#g-box)" stroke="#8f6d45" stroke-width="1.5"/>
            <rect x="882" y="346" width="16" height="54" fill="#e4cc9e" opacity=".9"/>
            <rect x="806" y="394" width="162" height="126" rx="8" fill="#ffffff" fill-opacity=".16" stroke="#ffffff" stroke-opacity=".75" stroke-width="1.5"/>
            <path d="M822 512 870 404M846 512 894 404" stroke="#fff" stroke-width="5" opacity=".4"/>
          </g>
        </svg>`;
}

function panelHtml(p, i, base) {
  const marcas = p.marcas.map((slug) => REPRESENTADAS.find((r) => r.slug === slug)).filter(Boolean);
  return `<div class="panel-head">
            <span class="panel-count">Peça ${i + 1} de ${PECAS.length}</span>
            <span class="panel-nav">
              <button type="button" class="panel-btn" data-step="-1" aria-label="Peça anterior">${icon("chevl")}</button>
              <button type="button" class="panel-btn" data-step="1" aria-label="Próxima peça">${icon("chevr")}</button>
            </span>
          </div>
          <h3>${esc(p.nome)}</h3>
          <p>${esc(p.texto)}</p>
          <ul class="panel-brands">
            ${marcas.map((r) => `<li>
              <a class="panel-logo" href="${base}representadas/${r.slug}.html" tabindex="-1" aria-hidden="true">${logo(r, base)}</a>
              <div><h4><a href="${base}representadas/${r.slug}.html">${esc(r.nome)}</a></h4><p>${esc(r.resumo)}</p></div>
            </li>`).join("")}
          </ul>`;
}

function room(base) {
  const spots = PECAS.map((p, i) => `<button type="button" class="spot" data-peca="${p.id}" style="left:${p.x / 10}%;top:${(p.y / 6).toFixed(2)}%;--d:${i}" aria-label="${esc(p.nome)}" aria-pressed="${i === 0}"></button>`).join("\n          ");
  const tpls = PECAS.map((p, i) => `<template data-peca="${p.id}">${panelHtml(p, i, base)}</template>`).join("\n      ");
  return `<div class="room has-sel" data-sel="${PECAS[0].id}">
        <div class="room-stage">
          ${roomSvg()}
          ${spots}
        </div>
        <div class="room-panel" aria-live="polite">
          ${panelHtml(PECAS[0], 0, base)}
        </div>
      </div>
      ${tpls}`;
}

// ---------------------------------------------------------
// Home
// ---------------------------------------------------------
function pageHome() {
  const base = "";
  const n = REPRESENTADAS.length;
  const msg = "Olá! Vim pelo site da DH Representações e gostaria de um orçamento.";

  const segNav = [`<button type="button" class="chip" data-filter="todas" aria-pressed="true">Todas<span>${n}</span></button>`]
    .concat(Object.entries(SEGMENTOS).map(([k, s]) =>
      `<button type="button" class="chip" data-filter="${k}" aria-pressed="false">${s.curto}<span>${REPRESENTADAS.filter((r) => r.segmento === k).length}</span></button>`)).join("");

  const team = EQUIPE.map((p) => `<li class="person">
          <div class="person-name"><h3>${esc(p.nome)}</h3><p>${esc(p.cargo)}</p></div>
          <a class="person-link" href="${tel(p.fone)}">${formatFone(p.fone)}</a>
          <a class="person-link" href="mailto:${p.email}">${p.email}</a>
          <a class="btn btn-whats" href="${wa(p.fone, `Olá, ${p.nome.split(" ")[0]}! Vim pelo site da DH Representações.`)}" target="_blank" rel="noopener">${icon("whats")} Chamar ${esc(p.nome.split(" ")[0])}</a>
        </li>`).join("\n        ");

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
    description: `A DH Representações atende sua empresa com ${n} indústrias de componentes e ferragens para móveis, perfis, vidros e embalagens. Peça catálogo e orçamento.`,
    canonical: SITE.url + "/",
    base,
    extraHead: `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>\n`,
  }) + header(base, true) + `
<main id="conteudo">
  <section class="hero">
    <div class="hero-photo" style="background-image:url('${base}images/escritorio.webp')" aria-hidden="true"></div>
    <div class="wrap hero-inner">
      <h1><span>${porExtenso(n)} indústrias.</span> <span>Um só contato.</span></h1>
      <p class="hero-lead">A DH Representações, de Lagoa Vermelha (RS), leva até a sua empresa componentes e ferragens para móveis, perfis, vidros, iluminação LED e embalagens, com atendimento direto da nossa equipe comercial.</p>
      <div class="hero-actions">
        <a class="btn btn-whats btn-lg" href="${wa(SITE.whatsapp, msg)}" target="_blank" rel="noopener">${icon("whats")} Pedir orçamento</a>
        <a class="btn btn-ghost btn-lg" href="#representadas">Ver representadas</a>
      </div>
      <p class="hero-note">Atendimento ${SITE.horario.charAt(0).toLowerCase() + SITE.horario.slice(1)}</p>
    </div>
  </section>

  <section class="section" id="roupeiro">
    <div class="wrap">
      <div class="sec-head">
        <h2>Do trilho ao puxador</h2>
        <p>Um roupeiro reúne peças de várias indústrias, e a DH representa todas elas. Toque nas peças do desenho para ver quem fabrica cada uma.</p>
      </div>
      ${room(base)}
    </div>
  </section>

  <section class="section section-alu" id="representadas">
    <div class="wrap">
      <div class="sec-head">
        <h2>Empresas que representamos</h2>
        <p>${n} fabricantes de ${porExtenso(Object.keys(SEGMENTOS).length).toLowerCase()} segmentos. Abra a página de cada empresa ou baixe o catálogo direto daqui.</p>
      </div>
      <div class="filters" role="group" aria-label="Filtrar por segmento">${segNav}</div>
      <ul class="rep-grid">
        ${REPRESENTADAS.map((r) => repCard(r, base)).join("\n        ")}
      </ul>
    </div>
  </section>

  <section class="section section-alu" id="a-dh">
    <div class="wrap">
      <div class="about-grid">
        <div class="about-intro">
          <h2>A DH</h2>
          <p class="about-lead">Uma empresa de representação comercial com sede em Lagoa Vermelha (RS), criada para encurtar a distância entre fornecedores e clientes.</p>
          <p>Trabalhamos com base em responsabilidade e comprometimento, e valorizamos produtos que atendam aos padrões de exigência e sustentabilidade do mercado.</p>
        </div>
        <dl class="reasons">
          <div><dt>Um contato, ${n} indústrias</dt><dd>Componentes, ferragens, perfis, vidros e embalagens de ${n} fabricantes, negociados com a mesma equipe.</dd></div>
          <div><dt>Atendimento direto</dt><dd>Você fala com o representante pelo WhatsApp, telefone ou e-mail, sem intermediários.</dd></div>
          <div><dt>Catálogos à mão</dt><dd>Os catálogos das representadas estão no site para você chegar à conversa sabendo o que quer.</dd></div>
          <div><dt>Indústrias consolidadas</dt><dd>Fabricantes com décadas de mercado, sistemas de gestão da qualidade e grandes parques industriais.</dd></div>
        </dl>
      </div>
      <div class="mvv">
        <div><h3>Missão</h3><p>Encurtar distâncias entre fornecedores e clientes, trabalhando sempre com responsabilidade e comprometimento e valorizando produtos que atendam aos padrões de exigência e sustentabilidade do mercado global.</p></div>
        <div><h3>Visão</h3><p>Aprimorar-se cada vez mais em tecnologia e informação de mercado para trazer o que existe de melhor para os nossos parceiros.</p></div>
        <div><h3>Valores</h3><p>Ganhar reconhecimento pelo trabalho de excelência, prezando sempre pela honestidade e pelos bons valores.</p></div>
      </div>
    </div>
  </section>

  <section class="section" id="equipe">
    <div class="wrap">
      <div class="sec-head">
        <h2>Equipe comercial</h2>
        <p>Fale direto com quem vai atender o seu pedido.</p>
      </div>
      <ul class="team">
        ${team}
      </ul>
    </div>
  </section>

  <section class="section section-ink" id="contato">
    <div class="wrap contact-grid">
      <div class="contact-info">
        <h2>Peça um orçamento</h2>
        <p>Conte o que você precisa. Indicamos a representada e o representante certos para o seu pedido.</p>
        <dl class="office">
          <div><dt>Endereço</dt><dd><a href="${mapsUrl}" target="_blank" rel="noopener">${SITE.endereco}<br>${SITE.cidade}</a></dd></div>
          <div><dt>Telefone</dt><dd><a href="${tel(SITE.telefone)}">${formatFone(SITE.telefone)}</a></dd></div>
          <div><dt>WhatsApp</dt><dd><a href="${wa(SITE.whatsapp)}" target="_blank" rel="noopener">${formatFone(SITE.whatsapp.slice(2))}</a></dd></div>
          <div><dt>E-mail</dt><dd><a href="mailto:${SITE.email}">${SITE.email}</a></dd></div>
          <div><dt>Horário</dt><dd>${SITE.horario}</dd></div>
        </dl>
      </div>
      <form class="form" id="form-contato" novalidate>
        <div class="field"><label for="f-nome">Nome</label><input id="f-nome" name="nome" type="text" autocomplete="name" required></div>
        <div class="field"><label for="f-empresa">Empresa <span>opcional</span></label><input id="f-empresa" name="empresa" type="text" autocomplete="organization"></div>
        <div class="field"><label for="f-telefone">Telefone ou WhatsApp</label><input id="f-telefone" name="telefone" type="tel" autocomplete="tel" inputmode="tel" required></div>
        <div class="field"><label for="f-cidade">Cidade e estado</label><input id="f-cidade" name="cidade" type="text" autocomplete="address-level2" placeholder="Caxias do Sul, RS" required></div>
        <div class="field full"><label for="f-interesse">Representada <span>opcional</span></label>
          <select id="f-interesse" name="interesse"><option value="">Escolha, se já souber</option>${options}<option>Ainda não sei</option></select></div>
        <div class="field full"><label for="f-mensagem">O que você precisa <span>opcional</span></label><textarea id="f-mensagem" name="mensagem" rows="4" placeholder="Produtos, quantidades, prazos"></textarea></div>
        <div class="field full">
          <button class="btn btn-whats btn-lg btn-block" type="submit">${icon("whats")} Enviar pelo WhatsApp</button>
          <p class="form-note">Abrimos o WhatsApp com a sua mensagem pronta para a nossa equipe. Seus dados seguem a nossa <a href="politica-de-privacidade.html">política de privacidade</a>.</p>
        </div>
      </form>
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

  const facts = [`<div><dt>Segmento</dt><dd>${seg.nome}</dd></div>`];
  if (r.local) facts.push(`<div><dt>Origem</dt><dd>${esc(r.local)}</dd></div>`);
  if (r.fundacao) facts.push(`<div><dt>Fundação</dt><dd>${r.fundacao}</dd></div>`);

  const actions = [`<a class="btn btn-whats btn-lg" href="${wa(SITE.whatsapp, msg)}" target="_blank" rel="noopener">${icon("whats")} Pedir orçamento</a>`];
  if (r.catalogo) actions.push(`<a class="btn btn-line btn-lg" href="${r.catalogo}" target="_blank" rel="noopener">${icon("download")} Catálogo em PDF</a>`);
  if (r.site) actions.push(`<a class="btn btn-text" href="${r.site}" target="_blank" rel="noopener">Site da ${esc(r.nome)} ${icon("external")}</a>`);

  const linhas = r.linhas && r.linhas.length
    ? `<h2>Produtos e serviços</h2>
          <ul class="lines">${r.linhas.map((l) => `<li>${esc(l)}</li>`).join("")}</ul>`
    : "";

  const fotos = r.fotos && r.fotos.length
    ? `<div class="gallery g${Math.min(r.fotos.length, 2)}">${r.fotos.map((f) => `<figure><img src="${base}images/representadas/${f.src}" alt="${esc(f.alt)}" loading="lazy"></figure>`).join("")}</div>`
    : "";

  const mesmas = REPRESENTADAS.filter((o) => o.slug !== r.slug && o.segmento === r.segmento);
  const outras = (mesmas.length >= 2 ? mesmas : REPRESENTADAS.filter((o) => o.slug !== r.slug)).slice(0, 4);
  const outrasTitulo = mesmas.length >= 2 ? `Mais em ${seg.nome.charAt(0).toLowerCase() + seg.nome.slice(1)}` : "Outras representadas";

  return head({
    title: `${r.nome}: ${seg.nome.toLowerCase()} | DH Representações`,
    description: `${r.resumo} A DH Representações representa a ${r.nome}. Peça catálogo e orçamento.`,
    canonical: `${SITE.url}/representadas/${r.slug}.html`,
    base,
  }) + header(base, false) + `
<main id="conteudo">
  <section class="rep-hero">
    <div class="wrap">
      <nav class="breadcrumb" aria-label="Você está em">
        <ol>
          <li><a href="${base}index.html">Início</a></li>
          <li><a href="${base}index.html#representadas">Representadas</a></li>
          <li aria-current="page">${esc(r.nome)}</li>
        </ol>
      </nav>
      <div class="rep-hero-grid">
        <div class="rep-hero-logo">${logo(r, base, `Logo ${r.nome}`)}</div>
        <div>
          <h1>${esc(r.nome)}</h1>
          <p class="rep-hero-lead">${esc(r.resumo)}</p>
          <dl class="facts">${facts.join("")}</dl>
          <div class="rep-hero-actions">${actions.join("\n            ")}</div>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap detail">
      <div class="prose">
        <h2>Sobre a ${esc(r.nome)}</h2>
        ${r.sobre.map((p) => `<p>${esc(p)}</p>`).join("\n        ")}
        ${r.slogan ? `<blockquote>${esc(r.slogan)}</blockquote>` : ""}
        ${linhas}
      </div>
      <aside class="buy">
        <h2>Compre ${esc(r.nome)} com a DH</h2>
        <p>Somos representantes comerciais da ${esc(r.nome)}. Nossa equipe envia catálogo, condições e orçamento.</p>
        <a class="btn btn-whats btn-block" href="${wa(SITE.whatsapp, msg)}" target="_blank" rel="noopener">${icon("whats")} Falar no WhatsApp</a>
        <p class="buy-alt"><a href="${tel(SITE.telefone)}">${formatFone(SITE.telefone)}</a><br><a href="mailto:${SITE.email}">${SITE.email}</a></p>
      </aside>
    </div>
    ${fotos ? `<div class="wrap">${fotos}</div>` : ""}
  </section>

  <section class="section section-alu">
    <div class="wrap">
      <div class="sec-head"><h2>${outrasTitulo}</h2></div>
      <ul class="rep-list">
          ${outras.map((o) => repRow(o, base)).join("\n          ")}
      </ul>
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
  <section class="rep-hero">
    <div class="wrap">
      <nav class="breadcrumb" aria-label="Você está em"><ol><li><a href="index.html">Início</a></li><li aria-current="page">Política de privacidade</li></ol></nav>
      <h1>Política de privacidade</h1>
    </div>
  </section>
  <section class="section">
    <div class="wrap legal">
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
