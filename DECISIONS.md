# DECISIONS.md

Use este arquivo para explicar suas decisões técnicas.

## Principais problemas encontrados

* Falta de tipagem em algumas variável
* Falta de componentização e divisão de responsabilidade
* O projeto tem o React Query, porém está controlando a requisão com 3 status
* Podemos organizar melhor o projeto
* Ao clicar em aprovar e rejeitar o onSelectDocument estava sendo chamando junto

## Mudanças realizadas

* Solicitei que a IA mapeasse o projeto antes de começar as refatorações, gerando um documento para ser utilizado como contexto para IA.
* Solicitei que a IA criasse os testes das funcionalidades para garantir que a aplicação não quebre após as refatorações.
* Solicitei a IA para criar componentes reutilizáveis, atualize o App.tsx e garantir que os testes continuam passando.
* Criei uma pasta de utilitários e passei a formatação de data para ela.
* Criei o tipo para Stats
* Criei uma pasta mocks para os dados
* Criei funções handle para a aprovação e rejeição para interceptar o click e acionar o stopPropagation.
* Criei o hook useDocuments para utilizar o React Query e chamar a API
* Refatorei novamente o App chamando o novo hook useDocuments
* Adicionei useMemo para o filteredDocuments

## Decisões de arquitetura

* Pasta para mocks, Utilitários e tipos

## Trade-offs

-

## Testes adicionados

* Filtragem por texto
* Filtragem por status
* Aprovação
* Reprovação

## Performance e observabilidade

-

## Uso de IA

Descreva quais ferramentas de IA você usou, em quais partes, quais outputs foram revisados/corrigidos e quais decisões continuaram sendo suas.

## O que faria com mais tempo

-
