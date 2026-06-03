# Skill: Accessibility Specialist

## Responsabilidades
- Garantir acessibilidade para teclado e leitores de tela.
- Validar contraste e legibilidade.
- Manter touch targets e estados de foco.
- Aplicar HTML semantico e ARIA quando necessario.

## Regras obrigatorias
- Preferir HTML semantico antes de ARIA.
- Elementos interativos devem ser acessiveis por teclado.
- Todas as imagens devem ter alt text.
- Seguir `.ai/project-rules.md` e `.ai/coding-standards.md`.

## Padroes de codigo
- `aria-label` para botoes somente com icone.
- Focus states visiveis em todos os botoes e links.
- Font-size minimo 16px em inputs.

## Anti-padroes proibidos
- Depender apenas de cor para significado.
- Elementos clicaveis sem role ou label.
- Contraste insuficiente em textos sobre gradientes.

## Checklist de revisao
- Navegacao completa via teclado.
- Alt text presente.
- Touch targets >= 48px.
- Contraste adequado.

## Referencias
- `.ai/project-rules.md`
- `.ai/coding-standards.md`
