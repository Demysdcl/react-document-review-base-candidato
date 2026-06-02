# Documentacao do Projeto

## Visao geral

O projeto **React Document Review** e uma aplicacao base de desafio tecnico para uma tela interna de listagem e gestao de documentos enviados por clientes.

A interface permite que uma equipe operacional acompanhe documentos, visualize indicadores simples, filtre registros, simule a alteracao de status e consulte detalhes de um documento selecionado.

A aplicacao foi criada com React, TypeScript e Vite. Os dados sao mockados localmente e acessados por uma API simulada em memoria.

## Estrutura do projeto

```text
.
|-- DECISIONS.md
|-- README.md
|-- eslint.config.js
|-- index.html
|-- package.json
|-- tsconfig.json
|-- vite.config.ts
|-- yarn.lock
|-- DOC/
|   `-- PROJECT_DOCUMENTATION.md
`-- src/
    |-- App.tsx
    |-- api.ts
    |-- data.ts
    |-- main.tsx
    |-- styles.css
    |-- test-setup.ts
    |-- types.ts
    `-- __tests__/
        `-- app.test.tsx
```

### Arquivos principais

- `src/main.tsx`: ponto de entrada da aplicacao React. Cria o `QueryClient`, registra o `QueryClientProvider` e renderiza o componente `App`.
- `src/App.tsx`: componente principal da tela. Controla carregamento, filtros, indicadores, tabela, drawer de detalhes e atualizacao de status.
- `src/api.ts`: API mockada com funcoes assincronas para buscar documentos e atualizar status.
- `src/data.ts`: base inicial de documentos mockados.
- `src/types.ts`: tipos TypeScript usados pelos documentos.
- `src/styles.css`: estilos globais da interface.
- `src/__tests__/app.test.tsx`: teste automatizado atual da tela principal.
- `vite.config.ts`: configuracao do Vite, plugin React e ambiente de testes.
- `tsconfig.json`: configuracao TypeScript do projeto.
- `package.json`: scripts, dependencias e metadados do projeto.

## Scripts disponiveis

Os scripts estao definidos em `package.json`:

```bash
npm run dev
```

Inicia o servidor de desenvolvimento Vite.

```bash
npm run build
```

Executa a compilacao TypeScript com `tsc -b` e gera o build de producao com `vite build`.

```bash
npm test
```

Executa os testes com Vitest.

```bash
npm run test:ui
```

Executa a interface visual do Vitest.

```bash
npm run lint
```

Executa o ESLint para arquivos TypeScript e TSX, sem permitir avisos.

## Dependencias

### Dependencias de producao

- `react`: biblioteca principal para construcao da interface.
- `react-dom`: integracao do React com o DOM do navegador.
- `@tanstack/react-query`: biblioteca para gerenciamento de consultas e cache de dados assincronos.
- `vite`: ferramenta de desenvolvimento e build.
- `@vitejs/plugin-react`: plugin React para o Vite.
- `typescript`: linguagem e checagem estatica de tipos.

Observacao: embora `@tanstack/react-query` esteja configurado no `main.tsx` por meio de `QueryClientProvider`, o componente `App.tsx` atualmente usa `useEffect` e estado local para buscar e armazenar documentos, em vez de hooks como `useQuery`.

### Dependencias de desenvolvimento

- `vitest`: framework de testes.
- `jsdom`: ambiente DOM usado nos testes.
- `@testing-library/react`: utilitarios para testar componentes React.
- `@testing-library/jest-dom`: matchers adicionais para assercoes no DOM.
- `@testing-library/user-event`: utilitarios para simular interacoes de usuario.
- `@types/react`: tipos TypeScript para React.
- `@types/react-dom`: tipos TypeScript para React DOM.
- `eslint`: ferramenta de lint.
- `typescript-eslint`: suporte TypeScript para ESLint.
- `eslint-plugin-react-hooks`: regras de lint para hooks do React.
- `eslint-plugin-react-refresh`: regras relacionadas ao React Refresh.

## Configuracao tecnica

### Vite

O arquivo `vite.config.ts` usa `defineConfig` e registra o plugin `react`.

Tambem configura os testes para:

- usar o ambiente `jsdom`;
- carregar `./src/test-setup.ts` antes dos testes.

### TypeScript

O `tsconfig.json` esta com `strict: true`, o que habilita verificacoes rigorosas de tipos.

Outras configuracoes importantes:

- `target: "ES2022"`;
- `lib: ["ES2022", "DOM", "DOM.Iterable"]`;
- `module: "ESNext"`;
- `moduleResolution: "Node"`;
- `jsx: "react-jsx"`;
- `noEmit: true`;
- `allowJs: false`;
- `isolatedModules: true`;
- `include: ["src"]`.

### Testes

Os testes usam Vitest com Testing Library.

O arquivo `src/test-setup.ts` importa `@testing-library/jest-dom/vitest`, habilitando matchers como `toBeInTheDocument`.

O teste atual em `src/__tests__/app.test.tsx` renderiza o `App` dentro de um `QueryClientProvider` e valida se o titulo `Documentos de clientes` aparece na tela.

## Tipagem

Os tipos principais estao em `src/types.ts`.

### `DocumentStatus`

```ts
export type DocumentStatus = 'pending' | 'approved' | 'rejected' | 'reviewing';
```

Representa os status possiveis de um documento:

- `pending`: pendente;
- `approved`: aprovado;
- `rejected`: rejeitado;
- `reviewing`: em analise.

### `CustomerDocument`

```ts
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
```

Campos:

- `id`: identificador unico do documento.
- `title`: titulo ou descricao do documento.
- `customerName`: nome do cliente.
- `customerEmail`: e-mail do cliente, opcional.
- `status`: status atual do documento.
- `category`: categoria do documento.
- `createdAt`: data de criacao em formato string ISO.
- `updatedAt`: data da ultima atualizacao, opcional.
- `confidence`: percentual de confianca da classificacao automatica, opcional e representado como numero decimal.
- `assignedTo`: responsavel pelo documento, opcional e podendo ser `null`.

### Observacoes sobre tipos atuais

O arquivo `src/types.ts` indica que a modelagem foi deixada propositalmente incompleta para evolucao pelo candidato.

No `src/App.tsx`, ainda existem usos de `any`:

- `statusLabels: any`;
- `selectedDocument` inicializado com `useState<any>(null)`.

Esses pontos reduzem a seguranca de tipos apesar do projeto estar com `strict: true`.

## Fluxo de dados

1. `src/data.ts` exporta a lista inicial de documentos mockados.
2. `src/api.ts` importa essa lista e cria um estado local em memoria com `let state = [...documents]`.
3. `fetchDocuments()` simula uma chamada assincrona, aguarda 600 ms e retorna uma copia do estado.
4. `updateDocumentStatus(id, status)` simula uma atualizacao assincrona, aguarda 350 ms, procura o documento pelo `id`, altera o `status`, preenche `updatedAt` com a data atual e atualiza o estado em memoria.
5. `src/App.tsx` chama `fetchDocuments()` no `useEffect` inicial, armazena os documentos em estado local e renderiza a tela.
6. Ao aprovar ou rejeitar um documento, `App.tsx` chama `updateDocumentStatus()` e substitui o item atualizado no estado local.
7. `src/main.tsx` renderiza a aplicacao dentro de `QueryClientProvider`, embora o fluxo atual de dados seja controlado diretamente pelo componente `App`.

## API mockada

### `fetchDocuments()`

```ts
export async function fetchDocuments(): Promise<CustomerDocument[]>
```

Comportamento:

- aguarda 600 ms para simular latencia de rede;
- possui chance de 3% de lancar o erro `Falha ao carregar documentos`;
- retorna uma copia dos documentos armazenados em memoria.

### `updateDocumentStatus(id, status)`

```ts
export async function updateDocumentStatus(
  id: string,
  status: DocumentStatus
): Promise<CustomerDocument>
```

Comportamento:

- aguarda 350 ms para simular latencia de rede;
- busca o documento pelo `id`;
- se o documento nao existir, lanca o erro `Documento nao encontrado`;
- atualiza o `status`;
- define `updatedAt` com a data atual em ISO;
- atualiza o estado em memoria;
- retorna o documento atualizado.

## Funcionalidades da interface

### Carregamento inicial

Ao montar o componente `App`, a aplicacao:

- ativa `isLoading`;
- chama `fetchDocuments()`;
- armazena o resultado em `documents`;
- limpa mensagens de erro quando a busca tem sucesso;
- exibe erro se a chamada falhar;
- desativa `isLoading` ao final.

Durante o carregamento, a tela mostra a mensagem `Carregando documentos...`.

### Indicadores

A secao de indicadores calcula valores com `useMemo` a partir de `documents`:

- total de documentos;
- documentos pendentes;
- documentos em analise;
- documentos rejeitados.

O indicador de aprovados nao e exibido atualmente.

### Busca textual

O campo de busca filtra os documentos por:

- titulo;
- nome do cliente;
- categoria.

A comparacao e feita com `toLowerCase()`, tornando a busca insensivel a maiusculas e minusculas.

### Filtro por status

O seletor de status permite filtrar por:

- todos os status;
- pendente;
- em analise;
- aprovado;
- rejeitado.

Quando o valor selecionado e `all`, todos os documentos que correspondem ao texto de busca sao exibidos.

### Tabela de documentos

A tabela exibe:

- documento e identificador;
- cliente e e-mail, quando disponivel;
- categoria;
- status com badge visual;
- confianca da IA em percentual;
- data de criacao formatada em `pt-BR`;
- responsavel;
- acoes de aprovar e rejeitar.

Quando `customerEmail` nao existe, a interface mostra `Sem e-mail cadastrado`.

Quando `assignedTo` esta ausente ou nulo, a interface mostra `Nao atribuido`.

### Atualizacao de status

Cada linha possui botoes:

- `Aprovar`: altera o status para `approved`;
- `Rejeitar`: altera o status para `rejected`.

A atualizacao chama a API mockada e substitui o documento correspondente no estado local.

### Drawer de detalhes

Ao clicar em uma linha da tabela, o documento e salvo em `selectedDocument` e um drawer lateral e exibido.

O drawer mostra:

- titulo;
- cliente;
- status;
- categoria;
- data de criacao formatada.

O botao de fechar limpa `selectedDocument` e remove o drawer da tela.

### Recarregar pagina

O botao `Recarregar` chama `window.location.reload()`, recarregando a pagina inteira.

### Estados de erro

Quando `fetchDocuments()` lanca erro, a mensagem recebida e exibida em um bloco com classes `feedback error`.

O fluxo atual nao exibe tratamento visual especifico para erro durante `updateDocumentStatus()`.

## Estilos e layout

O CSS define:

- fonte global baseada em Inter e fontes de sistema;
- pagina centralizada com largura maxima de 1180 px;
- hero com titulo, subtitulo e botao de recarregar;
- cards de indicadores em grid;
- toolbar com campo de busca e seletor;
- tabela responsiva dentro de container com overflow;
- badges coloridas por status;
- drawer fixo no canto superior direito;
- ajuste responsivo para telas ate 800 px, reduzindo os indicadores para duas colunas e empilhando hero e toolbar.

## Estado atual dos testes

O projeto possui um teste automatizado:

- renderiza a aplicacao;
- verifica se o titulo `Documentos de clientes` esta presente.

Nao ha testes cobrindo atualmente:

- carregamento de documentos;
- filtro por texto;
- filtro por status;
- calculo dos indicadores;
- abertura e fechamento do drawer;
- aprovacao ou rejeicao de documentos;
- estados de erro da API mockada.

## Observacoes tecnicas importantes

- A aplicacao usa dados mockados e estado em memoria; nao ha backend real.
- A API simulada possui latencia artificial e uma pequena chance de falha no carregamento.
- React Query esta instalado e configurado no provider, mas nao e usado diretamente para as chamadas no `App.tsx`.
- O projeto usa TypeScript em modo estrito, mas ainda contem `any` em pontos do componente principal.
- A documentacao atual descreve o estado existente do projeto e nao inclui alteracoes funcionais.
