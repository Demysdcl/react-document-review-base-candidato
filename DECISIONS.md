# DECISIONS.md

Use este arquivo para explicar suas decisões técnicas.

## Principais problemas encontrados

- Falta de tipagem em algumas variável
- Falta de componentização e divisão de responsabilidade
- O projeto tem o React Query, porém está controlando a requisão com 3 status
- Podemos organizar melhor o projeto
- Ao clicar em aprovar e rejeitar o onSelectDocument estava sendo chamando junto

## Mudanças realizadas

- Solicitei que a IA mapeasse o projeto antes de começar as refatorações, gerando um documento para ser utilizado como contexto para IA.
- Solicitei que a IA criasse os testes das funcionalidades para garantir que a aplicação não quebre após as refatorações.
- Solicitei a IA para criar componentes reutilizáveis, atualize o App.tsx e garantir que os testes continuam passando.
- Criei uma pasta de utilitários e passei a formatação de data para ela.
- Criei o tipo para Stats
- Criei uma pasta mocks para os dados
- Criei funções handle para a aprovação e rejeição para interceptar o click e acionar o stopPropagation.
- Criei o hook useDocuments para utilizar o React Query e chamar a API
- Refatorei novamente o App chamando o novo hook useDocuments
- Adicionei useMemo para o filteredDocuments
- Solicitei que a IA separasse os styles e colocasse no respectivo componente.
- adicionei um componente de card para mostrar em dispositivos pequenos

## Decisões de arquitetura

- Pasta para mocks, utilitários e tipos
- Pasta para os components com index.tsx e styles.css

## Trade-offs

- Configurar um formatador padrão
- Adicionar o Tailwind

## Testes adicionados

- Filtragem por texto
- Filtragem por status
- Aprovação
- Reprovação

## Performance e observabilidade

- Melhorei o algoritmo de pesquisa criando um texto único com os campos utilizados e com isso utilizei apenas um includes para filtrar a query
- Adicionei memoization para os novos components
- um debounce para dar um pequeno delay na query evitando várias renderizações ao digitar o texto

## Uso de IA

Descreva quais ferramentas de IA você usou, em quais partes, quais outputs foram revisados/corrigidos e quais decisões continuaram sendo suas.

- Utilizei o Codex para mapear o projeto
- Utilizei o Gemini do VSCode para executar as demais refatorações
- Revisei todos os componentes e testes
- As ações tomadas pela IA foram em conformidade com a arquitetura que eu jugo para eficiente
- Precisei remover a função de formação de dados dos componentes criados
- Mover os css de responsividade para o style do respectivo componente
- Adicionei mais um useMemo para o filteredDocuments

## O que faria com mais tempo

- Adicionaria o React Compile
- O oxlint e oxfmt para agilizar a validação e formatação
- Adicionaria alias para as pastas compartilhadas
