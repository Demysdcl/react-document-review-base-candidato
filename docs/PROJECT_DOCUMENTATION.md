# Documentacao do Projeto

## Visao geral

O projeto **React Document Review** e uma aplicacao base para uma tela interna de revisao de documentos enviados por clientes.

A interface permite acompanhar documentos, visualizar indicadores operacionais, filtrar por texto e status, atualizar status de aprovacao/rejeicao e abrir um drawer com detalhes do documento selecionado.

A aplicacao foi criada com React, TypeScript e Vite, usando dados mockados em memoria e um provider do React Query no ponto de entrada.

## Estrutura atual do projeto

```text
.
|-- DECISIONS.md
|-- README.md
|-- docs/
|   `-- PROJECT_DOCUMENTATION.md
|-- eslint.config.js
|-- index.html
|-- package.json
|-- tsconfig.json
|-- vite.config.ts
`-- src/
    |-- App.tsx
    |-- main.tsx
    |-- styles.css
    |-- test-setup.ts
    |-- types.ts
    |-- api/
    |   `-- index.ts
    |-- hooks/
    |   `-- useDocuments.ts
    |-- components/
    |   |-- DocumentDrawer.tsx
    |   |-- DocumentStats.tsx
    |   |-- DocumentTable.tsx
    |   |-- DocumentToolbar.tsx
    |   `-- StatusBadge.tsx
    |-- mocks/
    |   `-- data.ts
    `-- __tests__/
        |-- App.test.tsx
        |-- DocumentDrawer.test.tsx
        |-- DocumentStats.test.tsx
        |-- DocumentTable.test.tsx
        `-- StatusBadge.test.tsx
```

### Arquivos principais

- `src/main.tsx`: ponto de entrada da aplicacao React. Cria o `QueryClient`, registra o provider e renderiza `App`.
- `src/App.tsx`: componente principal da tela. Controla carregamento, filtros, indicadores, tabela, drawer e atualizacao de status.
- `src/hooks/useDocuments.ts`: hook React Query que chama `fetchDocuments()` e fornece dados, estado de carregamento e erro.
- `src/api/index.ts`: API mockada em memoria para buscar documentos e atualizar status.
- `src/mocks/data.ts`: base inicial dos documentos usados nos testes e na tela.
- `src/components/`: componentes reutilizaveis da interface (`DocumentStats`, `DocumentTable`, `DocumentToolbar`, `DocumentDrawer`, `StatusBadge`).
- `src/types.ts`: definicoes de tipos, incluindo `DocumentStatus`, `CustomerDocument` e `Stats`.
- `src/__tests__/`: suite de testes automatizados com Vitest + Testing Library.

## Scripts disponiveis

Os scripts estao definidos em `package.json` :

```bash
npm run dev
```

Inicia o servidor de desenvolvimento do Vite.

```bash
npm run build
```

Executa `tsc -b` e gera a versao de producao com `vite build` .

```bash
npm test
```

Executa a suite de testes com Vitest.

```bash
npm run test:ui
```

Abre a interface visual do Vitest.

```bash
npm run lint
```

Executa o ESLint para arquivos TypeScript/TSX com avisos proibidos.

## Dependencias principais

### Producao

- `react` e `react-dom`: biblioteca base da interface.
- `@tanstack/react-query`: provider configurado no `main.tsx` para contexto de consulta.
- `vite` e `@vitejs/plugin-react`: build e desenvolvimento.
- `typescript`: verificacao estaticas de tipos.

### Desenvolvimento

- `vitest`: executa os testes.
- `jsdom`: ambiente DOM para testes.
- `@testing-library/react`, `@testing-library/jest-dom` e `@testing-library/user-event`: avaliacoes de interface e interacao.
- `eslint`, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`: validacoes de qualidade e padrao.

## Configuracao tecnica

### Vite

O arquivo `vite.config.ts` registra o plugin React e define o setup de testes com `jsdom` .

### TypeScript

O `tsconfig.json` usa `strict: true` , com suporte a `ES2022` , `DOM` , `DOM.Iterable` e JSX com `react-jsx` .

### Testes

A suite atual usa Vitest + Testing Library e carrega `src/test-setup.ts` para habilitar matchers como `toBeInTheDocument` .

Os testes cobrem:

- renderizacao e carregamento inicial;
- busca textual e filtro por status;
- calculo de indicadores;
- abertura e fechamento do drawer;
- aprovacao e rejeicao de documentos;
- mensagens de erro de carregamento.

## Tipagem

Os tipos principais estao em `src/types.ts` :

```ts
export type DocumentStatus = 'pending' | 'approved' | 'rejected' | 'reviewing';

export type CustomerDocument = {
  id: string;
  title: string;
  customerName: string;
  customerEmail?: string;
  status: DocumentStatus;
  category: string;
  createdAt: string;
  updatedAt?: string;
  confidence?: number;
  assignedTo?: string | null;
};

export type Stats = {
  total: number;
  pending: number;
  reviewing: number;
  rejected: number;
};
```

## Fluxo de dados

1. `src/mocks/data.ts` fornece os documentos iniciais.
2. `src/api/index.ts` mantem um estado interno em memoria e simula consultas assicronas com atraso artificial.
3. `useDocuments()` usa `useQuery` para chamar `fetchDocuments()` e manter os dados no cache do React Query.
4. `updateDocumentStatus(id, status)` altera o status do documento, atualiza `updatedAt` e retorna o item atualizado.
5. `src/App.tsx` consome o hook, aplica filtros e renderiza estatisticas, tabela e drawer, atualizando o cache do React Query apos cada alteracao de status.

## Funcionalidades da interface

- Carregamento inicial com feedback visual.
- Indicadores de total, pendentes, em analise e rejeitados.
- Busca textual por titulo, cliente e categoria.
- Filtro por status com valor `all` como padrao.
- Tabela com status, confianca, responsavel e botoes de aprovacao/rejeicao.
- Drawer lateral com detalhes do documento selecionado.
- Botao `Recarregar` para recarregar a pagina inteira.

## Estado atual dos testes

A suite atual inclui os seguintes arquivos:

- `src/__tests__/App.test.tsx`
- `src/__tests__/DocumentDrawer.test.tsx`
- `src/__tests__/DocumentStats.test.tsx`
- `src/__tests__/DocumentTable.test.tsx`
- `src/__tests__/StatusBadge.test.tsx`

Esses testes validam comportamento real da interface, incluindo interacoes e renderizacao de componentes.

## Observacoes tecnicas importantes

- Os dados sao mockados e nao dependem de backend real.
- O `QueryClientProvider` esta configurado e o carregamento inicial agora e feito via `useDocuments()` com React Query.
- A atualizacao de status usa o cache do React Query para manter a tela sincronizada sem depender de estado local manual para a lista principal.
- A documentacao foi atualizada para refletir a estrutura e a cobertura de testes presentes neste repositorio.
