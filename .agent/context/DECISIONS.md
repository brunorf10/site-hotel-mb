# Decisões Técnicas e de Design

## Arquitetura

### Componentes

- **Single Page Application (SPA)** com React Router para navegação
- **Componentes funcionais** com hooks do React
- **Estado local** via `useState` — sem necessidade de Redux/Context até o momento

### Validação de Formulários

- Validação customizada em `services/form-validation.ts`
- Validação em tempo real no `onBlur` e `onChange`
- Restrições HTML5 nativas (`min`, `required`, etc.) como primeira camada

### E-mail

- **EmailJS** para envio de e-mails do lado do cliente
- Templates customizáveis em `/templates_email_js/`
- Não requer backend próprio

## Estilização

### Abordagem

- CSS com classes utilitárias estilo Tailwind
- Cores temáticas via variáveis CSS (--primary, etc.)
- Responsividade via media queries e grid/flexbox

### Paleta de Cores

- **Primary:** Dourado/marrom elegante (a confirmar exato)
- **Texto:** Escalas de cinza
- **Fundo:** Branco/off-white

### Tipografia

- Fonte serifada para títulos (elegância)
- Fonte sans-serif para corpo (legibilidade)

## UX

### Formulário de Reserva

- Modal overlay com animação suave (Framer Motion)
- Feedback visual de erros em tempo real
- Botão desabilitado até formulário válido
- Confirmação visual após envio

### Navegação

- Menu fixo no topo
- Scroll suave para seções (anchor links)
- Mobile-first responsivo

## Performance

- Lazy loading de imagens (quando implementado)
- Build otimizado com Vite (tree-shaking, minificação)
- Deploy na edge via Vercel

---

_Atualizar conforme novas decisões forem tomadas_
