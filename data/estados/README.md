# Base por estado e cidade

Esta pasta e a area de trabalho da pesquisa.

Use este fluxo daqui em diante:

- edite ou crie registros em `data/estados/<estado>/<cidade>/servicos.json`;
- mantenha `estado.json` apenas como resumo da cobertura do estado;
- preserve fontes oficiais, data de verificacao e avisos de confirmacao em cada servico;
- consolide a base grande apenas ao fim de uma etapa, usando `scripts/consolidate-state-city-data.js`.

Arquivos de controle:

- `_indice.json`: resumo geral da estrutura modular;
- `_portal.json`: metadados gerais usados ao recompor a base principal.

A pasta `Nao informado` ou `Não informado` preserva registros antigos sem UF definida. Eles devem ser corrigidos aos poucos quando houver informacao suficiente.
