Este projeto mostra como **consumir dados de um backend Node.js** e **exibir em um gráfico Chart.js** no front-end Vue 3, usando **Pinia** para controlar o estado global da aplicação.
A API usada é **REST Countries** (https://restcountries.com/v3.1/all), que retorna dados públicos sobre países.

Como o Pinia funciona neste projeto

Estrutura de um Store

Pinia substitui o antigo `Vuex`. Ele organiza os dados em 3 partes principais:

| Parte | Função | Exemplo neste projeto |
|--------|--------|------------------------|
| **state** | Armazena os dados globais (variáveis reativas) | Lista de países, populações, estado de carregamento |
| **actions** | Executa funções assíncronas (ex: buscar dados do backend) | `fetchData()` chama o backend com Axios |
| **getters** | Calcula valores derivados dos estados | `hasData` retorna `true` se houver dados |


Fluxo de Comunicação (Backend → Pinia → Chart)

1. O usuário clica em **Carregar Dados** (`Dashboard.vue` chama `store.fetchData()`).
2. A **action** `fetchData()` (Pinia) faz `GET http://localhost:3001/api/countries`.
3. O **backend** (Express) chama a API **REST Countries** e retorna `{ labels, series }`.
4. O **state** do Pinia é atualizado (`labels`, `series`).
5. O componente **BarChart.vue** recebe `labels` e `series` via **props** e o **Chart.js** desenha o gráfico.

Diagrama:

[REST Countries API]
        ↓ (Axios)
[Backend Express]
        ↓ (JSON)
[Pinia Action fetchData()]
        ↓
[Pinia State.labels / series]
        ↓ (props)
[Componente BarChart.vue]
        ↓
[Chart.js → Gráfico Renderizado]
```

---

## 📊 Arquitetura Resumida

| Camada | Tecnologia | Função |
|---------|-------------|--------|
| **Backend** | Node.js + Express + Axios | Faz proxy para API pública |
| **Front-end** | Vue 3 + Vite | Interface do usuário |
| **Gerência de Estado** | Pinia | Controla dados globais |
| **Gráfico** | Chart.js | Exibe dados visualmente |

---
Como conectar outro gráfico

Quer exibir outro tipo de dado (ex: área dos países)?
1. Edite o backend (`server.js`) e adicione o campo `area`.
2. Altere a action `fetchData()` para receber `area`.
3. Crie outro componente `AreaChart.vue` copiando o BarChart.
4. Passe os novos dados do Pinia para o novo gráfico.

---

Referências
- Pinia: https://pinia.vuejs.org/core-concepts/
- Chart.js: https://www.chartjs.org/docs/latest/
- REST Countries: https://restcountries.com
- Express: https://expressjs.com/
