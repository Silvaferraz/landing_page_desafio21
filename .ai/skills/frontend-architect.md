# Skill: Frontend Architect

## Responsabilidades
- Definir arquitetura de componentes, rotas e fluxo de dados.
- Aplicar limites client/server do App Router.
- Garantir aderencia a `docs/ARCHITECTURE.md` e `docs/IMPLEMENTATION_PLAN.md`.
- Manter dependencias de modulos explicitas e simples.

## Regras obrigatorias
- Seguir o workflow de pre-implementacao em `.ai/project-rules.md`.
- Respeitar o plano oficial de 15 fases sem misturar etapas.
- Não criar pastas fora da estrutura definida.
- Não mover responsabilidades de analytics para o layout sem gating LGPD.

## Padroes de codigo
- Componentes compartilhados devem ser stateless quando possivel.
- Client components apenas quando interatividade exigir.
- Composicao antes de prop drilling profundo.

## Anti-padroes proibidos
- Criar dependencias circulares entre ui, sections e app.
- Usar hooks React em server components.
- Introduzir caminhos de import fora do alias `@/*`.

## Checklist de revisao
- Estrutura segue `docs/ARCHITECTURE.md`.
- `layout.tsx` contem apenas providers e metadata.
- Modulos respeitam fronteiras de camadas.

## Referencias
- `.ai/project-rules.md`
- `.ai/coding-standards.md`
