# NLW Agents

Projeto desenvolvido durante o evento NLW (Next Level Week) da Rocketseat, focando na criação de uma aplicação web moderna com React e TypeScript.

## 🚀 Tecnologias Utilizadas

- **React 19** - Framework JavaScript para interfaces de usuário
- **TypeScript** - Linguagem de programação com tipagem estática
- **Vite** - Build tool e dev server ultrarrápido
- **React Router DOM** - Gerenciamento de rotas
- **TanStack Query** - Gerenciamento de estado assíncrono e cache
- **Axios** - Cliente HTTP para requisições à API
- **Tailwind CSS** - Framework CSS utilitário
- **shadcn/ui** - Componentes de interface reutilizáveis

## 🛠️ Ferramentas de Desenvolvimento

- **Biome** - Linter e formatter de código
- **pnpm** - Gerenciador de pacotes rápido e eficiente

## 📁 Estrutura do Projeto

```
src/
├── components/
│   └── ui/           # Componentes de interface (shadcn/ui)
├── lib/
│   ├── axios.ts      # Configuração do cliente HTTP
│   └── utils.ts      # Utilitários e helpers
└── pages/
    ├── create-room.tsx
    └── room.tsx
```

## 🔧 Configuração e Setup

### Pré-requisitos

- Node.js (versão 20 ou superior)
- pnpm (recomendado) ou npm/yarn

### Instalação

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd web
```

2. Instale as dependências:

```bash
pnpm install
```

### Executando o projeto

#### Desenvolvimento

```bash
pnpm dev
```

Abre a aplicação em `http://localhost:5173`

#### Build para produção

```bash
pnpm build
```

#### Preview da build

```bash
pnpm preview
```

## 🎨 Padrões do Projeto

- **Componentes funcionais** com hooks do React
- **TypeScript strict mode** para tipagem robusta
- **Tailwind CSS** para estilização utilitária
- **shadcn/ui** para componentes base consistentes
- **Path mapping** com alias `@/` para imports limpos
- **React Query** para gerenciamento de estado server
- **Biome** para formatação e linting consistente

## 📚 Scripts Disponíveis

- `pnpm dev` - Inicia servidor de desenvolvimento
- `pnpm build` - Gera build de produção
- `pnpm preview` - Visualiza build de produção localmente

---

Desenvolvido com ❤️ durante o NLW da Rocketseat
