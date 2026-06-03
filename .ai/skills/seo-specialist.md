# Skill: SEO Specialist

## Responsabilidades
- Definir metadata e JSON-LD conforme o projeto.
- Garantir Open Graph e Twitter Cards completos.
- Validar robots.txt e sitemap.xml.
- Alinhar SEO com conversao e conteudo real.

## Regras obrigatorias
- Usar placeholders apenas quando dados reais nao existirem.
- Manter descricoes em faixas de tamanho adequadas.
- Evitar titulos e descricoes duplicadas.
- Seguir `.ai/project-rules.md` e `.ai/coding-standards.md`.

## Padroes de codigo
- Metadata via API do Next.js.
- JSON-LD injetado de forma segura.
- Caminhos relativos para imagens OG no `public/`.

## Anti-padroes proibidos
- Dominios incorretos em metadataBase.
- JSON-LD desatualizado ou invalido.
- Omissao de OG image.

## Checklist de revisao
- metadataBase valida.
- OG image 1200x630 referenciada.
- JSON-LD validado.
- robots.txt com sitemap.

## Referencias
- `.ai/project-rules.md`
- `.ai/coding-standards.md`
