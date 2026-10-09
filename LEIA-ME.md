# Site DH Representações

Site estático (HTML/CSS/JS puro), sem WordPress, sem plugins.

## Estrutura
- `index.html` — home (hero, representadas com filtro, diferenciais, sobre, equipe, contato)
- `representadas/*.html` — uma página por representada
- `politica-de-privacidade.html`
- `css/style.css`, `js/main.js`
- `images/` — logo e fotos (baixadas do site atual)
- `.htaccess` — redireciona os links antigos do WordPress (ex.: `/alpa/` → `/representadas/alpa.html`)
- `sitemap.xml`, `robots.txt`

## Como editar conteúdo
Textos, equipe e representadas ficam no topo de `gerar-site.js`. Depois de editar:

    node gerar-site.js

## Ver no computador

    node servidor-local.js

Abra http://localhost:5173

## Antes de publicar
1. Mover os catálogos PDF para uma pasta `catalogos/` (hoje apontam para `wp-content/uploads`, que some quando o WordPress sair) e atualizar os links em `gerar-site.js`.
2. Fazer backup completo do WordPress (WPvivid) antes de trocar.
3. Subir todos os arquivos na raiz da hospedagem.
