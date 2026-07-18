# Portal do Imigrante Research Desk

Research Desk e a interface de trabalho para revisar servicos por estado e cidade sem editar a base grande durante a pesquisa.

## Como abrir

Abra `research-desk/index.html` no navegador.

Se preferir servir localmente:

```sh
python -m http.server 4174
```

Depois acesse `http://127.0.0.1:4174/research-desk/`.

## Como atualizar os dados do painel

Quando os arquivos em `data/estados/` mudarem, rode:

```sh
node scripts/build-research-desk-data.js
```

Isso recria `research-desk/data.js`.

## Como criar um pacote de pesquisa

Use:

```sh
node scripts/create-research-packet.js "Minas Gerais" "Belo Horizonte"
```

O script cria, sem sobrescrever arquivos existentes:

- `fontes-encontradas.json`
- `servicos.rascunho.json`
- `relatorio-validacao.md`

## Regra operacional

Rascunho nao e publicacao. Um servico so deve entrar em `servicos.json` depois de fonte oficial, data de verificacao e revisao de riscos.
