# Relatório de melhorias aplicadas

Data da revisão: 28/06/2026

## Diagnóstico principal

- O HTML original tinha mais de 10 mil linhas e acumulava versões repetidas de CSS, dados e JavaScript.
- A base contém 564 serviços, mas somente 53 têm telefone classificado como real.
- Nenhum dos 564 registros possui fonte registrada na coluna de fontes.
- O painel anterior classificava muitos registros como “alta qualidade” mesmo sem telefone ou fonte, confundindo completude com validação.
- Havia contagem de 6 regiões porque “Não informado” era tratado como região.

## Melhorias aplicadas ao portal

- Separação em HTML, CSS, JavaScript, JSON, manifesto e service worker.
- Aviso permanente de base em validação; nenhum serviço local é apresentado como oficialmente confirmado.
- Canais de emergência nacionais em destaque.
- Links oficiais para Polícia Federal, Receita Federal, SUS e Direitos Humanos.
- Busca territorial e por necessidade, paginação, checklist e favoritos locais.
- Interface em português, espanhol e inglês nos pontos essenciais.
- Alto contraste, aumento de fonte, foco visível, navegação por teclado e respeito a movimento reduzido.
- Proteção contra injeção de conteúdo nos cards e política de segurança de conteúdo.
- Sem coleta de nome, CPF, documento ou localização.

## Melhorias aplicadas à planilha

- Nova aba “Governança” com critérios mínimos de publicação.
- Nova aba “Fila_Revisão” com 564 registros classificados por risco.
- 368 registros foram classificados como revisão urgente pelo novo critério conservador.
- Painel atualizado com alerta de que completude técnica não equivale a confirmação oficial.

## Próxima etapa recomendada

Validar primeiro os serviços de saúde, acolhimento e alimentação, registrando URL oficial, data de conferência, responsável e evidência. Somente depois liberar selos de serviço validado.

## Atualização — Rio Grande do Sul

Em 28/06/2026 foram adicionados 19 serviços com fontes oficiais para Porto Alegre, Caxias do Sul, Canoas, Pelotas e Santa Maria, os cinco municípios mais populosos do estado segundo as Estimativas da População 2025 do IBGE.

Também foi criada uma cópia local da base em `data/services.js`, permitindo que o portal funcione quando o `index.html` é aberto diretamente por duplo clique, sem servidor.

## Atualização — Pernambuco

Em 28/06/2026 foram adicionados 19 registros com fontes oficiais para Recife, Jaboatão dos Guararapes, Petrolina, Caruaru e Olinda, os cinco municípios mais populosos do estado segundo as Estimativas da População 2025 do IBGE.

A cobertura inclui saúde de urgência, CRAS, Centro POP, acolhimento, trabalho e um ponto da Polícia Federal. Informações não apresentadas pelas fontes oficiais continuam marcadas para confirmação.

## Atualização — Acre

Em 28/06/2026 foram adicionados 20 registros com fontes oficiais para Rio Branco, Cruzeiro do Sul, Tarauacá, Sena Madureira e Feijó, os cinco municípios mais populosos do estado segundo as Estimativas da População 2025 do IBGE.

A revisão cobre pronto-socorro, unidades básicas e de saúde mental, CRAS, CREAS, SINE, Conselhos Tutelares, farmácia municipal e Defesa Civil. Telefone e horário só foram publicados quando constavam na página oficial; ausências permanecem sinalizadas para confirmação.

Os resultados com fonte oficial também passaram a aparecer antes dos registros ainda não validados dentro da busca, evitando que informações antigas ocupem as primeiras posições.

## Atualização — Alagoas

Em 28/06/2026 foram adicionados 20 registros com fontes oficiais para Maceió, Arapiraca, Rio Largo, Palmeira dos Índios e Marechal Deodoro, os cinco municípios mais populosos do estado segundo as Estimativas da População 2025 do IBGE.

A cobertura inclui hospitais e emergência, CAPS, Centro POP, CRAS, SINE, Defensoria Pública, emissão de identidade, tarifa social de água e atendimento policial. Horários contraditórios encontrados no cadastro estadual foram omitidos e marcados para confirmação.

## Atualização — Amapá

Em 28/06/2026 foram adicionados 20 registros com fontes oficiais para Macapá, Santana, Laranjal do Jari, Oiapoque e Mazagão, os cinco municípios mais populosos do estado segundo as Estimativas da População 2025 do IBGE.

A cobertura inclui emergência hospitalar, atendimento especializado à mulher, Centro POP, assistência social, trabalho e emprego, Defensoria Pública, Super Fácil, Ciretran e atendimento de serviço público essencial. Quando a fonte não publicou telefone, dias ou horário completos, o dado permaneceu explicitamente marcado para confirmação.

## Atualização — Amazonas

Em 28/06/2026 foram adicionados 20 registros com fontes oficiais para Manaus, Itacoatiara, Manacapuru, Parintins e Tefé, os cinco municípios mais populosos do estado segundo as Estimativas da População 2025 do IBGE.

Em Manaus, a seleção prioriza regularização e acolhimento de migrantes e refugiados, trabalho e pronto-socorro. No interior, cada cidade recebeu referências de cidadania, assistência jurídica gratuita, formação profissional e hospital. Um telefone hospitalar incompleto no cadastro oficial de Parintins foi omitido, preservando a política de não inferir contatos.

## Atualização — Bahia

Em 28/06/2026 foram adicionados 20 registros com fontes oficiais para Salvador, Feira de Santana, Vitória da Conquista, Camaçari e Juazeiro, os cinco municípios mais populosos do estado segundo as Estimativas da População 2025 do IBGE.

Cada cidade recebeu referências de atendimento ao cidadão e documentação, assistência jurídica gratuita, saúde pública e proteção especializada à mulher. A central geral do SAC não foi apresentada como telefone direto dos postos, e horários ausentes nas fontes permaneceram marcados para confirmação.

## Consolidação da base

Em 29/06/2026, todos os dados revisados foram consolidados na base principal e na cópia usada para abertura direta do portal. A versão consolidada contém 702 serviços, sendo 138 com fonte oficial, e registra 7 das 27 unidades federativas como concluídas.

O portal passou a exibir os totais de serviços mapeados, registros com fonte oficial e unidades revisadas. Também foi adicionada uma rotina única de validação e sincronização, preservando na fila de revisão os registros históricos que ainda não possuem todos os campos.

## Atualização — Ceará

Em 29/06/2026 foram adicionados 20 registros com fontes oficiais para Fortaleza, Caucaia, Juazeiro do Norte, Maracanaú e Sobral, os cinco municípios mais populosos do estado segundo as Estimativas da População 2025 do IBGE.

Cada cidade recebeu referências de trabalho e emprego, assistência jurídica gratuita, urgência em saúde e atendimento à população em situação de rua. Dias de atendimento ausentes nas páginas do IDT foram mantidos para confirmação, e a central 129 da Defensoria foi identificada como contato estadual, não como telefone direto das unidades.

Também foi corrigida a ação de chamada telefônica dos cards: quando uma fonte publica mais de um contato, o botão “Ligar” agora utiliza apenas o primeiro número, sem concatenar contatos diferentes.

## Atualização — Distrito Federal

Em 29/06/2026 foram adicionados 20 registros com fontes oficiais para Ceilândia, Samambaia, Plano Piloto, Planaltina e Taguatinga, as cinco regiões administrativas mais populosas na projeção oficial de 2025 do IPEDF.

Como o Distrito Federal não possui municípios, a cobertura registra explicitamente regiões administrativas. Cada área recebeu referências de trabalho e emprego, CRAS, CREAS para situações de violência ou violação de direitos e pronto-socorro hospitalar 24 horas. Horários não especificados integralmente pelas fontes oficiais permaneceram marcados para confirmação.

## Atualização — Espírito Santo

Em 29/06/2026 foram adicionados 20 registros com fontes oficiais para Serra, Vila Velha, Cariacica, Vitória e Cachoeiro de Itapemirim, os cinco municípios mais populosos do estado segundo o panorama/estimativas oficiais do IBGE.

A cobertura inclui SINE ou agência do trabalhador, assistência social, saúde pública e defesa do consumidor/cidadania. Vitória e Cachoeiro de Itapemirim receberam unidades com endereço, telefone e horário detalhados; nos municípios em que o portal oficial publicou apenas canal institucional, o registro foi mantido com aviso explícito para confirmação antes do deslocamento.

## Atualização — Goiás

Em 29/06/2026 foram adicionados 20 registros com fontes oficiais para Goiânia, Aparecida de Goiânia, Anápolis, Águas Lindas de Goiás e Rio Verde, os cinco municípios mais populosos do estado segundo as Estimativas da População 2025 do IBGE/SIDRA.

A cobertura inclui trabalho/SINE ou canal municipal de trabalho, CRAS, UPA/pronto atendimento, Procon e atendimento ao cidadão. A revisão registrou que Águas Lindas de Goiás aparece à frente de Rio Verde na estimativa oficial de 2025. Nos casos em que a fonte oficial publicou apenas canal institucional ou horário administrativo, o registro foi marcado para confirmação antes do deslocamento.

## Atualização — Maranhão

Em 30/06/2026 foram adicionados 20 registros com fontes oficiais para São Luís, Imperatriz, São José de Ribamar, Timon e Caxias, os cinco municípios mais populosos do estado segundo as Estimativas da População 2025 do IBGE/SIDRA.

Cada cidade recebeu referências de trabalho/SINE, assistência social, urgência em saúde e cidadania ou defesa do consumidor. A seleção foi conferida diretamente na API oficial do IBGE, que coloca São José de Ribamar à frente de Timon e Caxias. Telefones e horários ausentes nas fontes permaneceram sinalizados para confirmação; nenhum contato foi inferido.

## Atualização — Mato Grosso

Em 02/07/2026 foram adicionados 20 registros com fontes oficiais para Cuiabá, Várzea Grande, Rondonópolis, Sinop e Sorriso, os cinco municípios mais populosos do estado segundo as Estimativas da População 2025 do IBGE/SIDRA.

Cada cidade recebeu uma referência de trabalho/SINE, assistência social, saúde pública e defesa do consumidor. A revisão usou páginas municipais atuais, cadastros federais e o Guia de Serviços do Ministério Público de Mato Grosso. Quando a fonte não publicou telefone ou expediente específico, o campo permaneceu marcado para confirmação antes do deslocamento.

## Atualização — Mato Grosso do Sul

Em 02/07/2026 foram adicionados 20 registros com fontes oficiais para Campo Grande, Dourados, Três Lagoas, Corumbá e Ponta Porã, os cinco municípios mais populosos do estado segundo as Estimativas da População 2025 do IBGE/SIDRA.

Cada cidade recebeu uma referência de trabalho, assistência social, saúde pública e defesa do consumidor. A seleção preserva a ordem oficial de 2025, na qual Corumbá aparece ligeiramente à frente de Ponta Porã. Endereços e contatos foram conferidos em páginas municipais, na Funtrab e em fundações públicas de saúde; informações não publicadas permaneceram marcadas para confirmação.
