# Skill: Performance Specialist

## Responsabilidades
- Garantir metas de Core Web Vitals.
- Otimizar carregamento de imagens e fontes.
- Reduzir JS e evitar scripts bloqueantes.
- Validar animacoes para nao degradar performance.

## Regras obrigatorias
- Usar `next/image` com width/height e `priority` no hero.
- Adiar scripts de terceiros ate consentimento.
- Manter assets dentro dos budgets de tamanho.
- Seguir `.ai/project-rules.md` e `.ai/coding-standards.md`.

## Padroes de codigo
- `loading="lazy"` abaixo do fold.
- `display: swap` para fontes locais.
- Evitar reflows com dimensoes fixas.

## Anti-padroes proibidos
- Imagens sem dimensoes.
- Carregar analytics antes de consentimento.
- Animacoes pesadas em listas longas.

## Checklist de revisao
- LCP otimizado no hero.
- CLS zero com imagens e fontes.
- Scripts nao bloqueiam rendering.
- Assets otimizados.

## Referencias
- `.ai/project-rules.md`
- `.ai/coding-standards.md`
