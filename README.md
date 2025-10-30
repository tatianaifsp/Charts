Este projeto mostra como **consumir dados de um backend Node.js** e **exibir em um gráfico Chart.js** no front-end Vue 3, usando **Pinia** para controlar o estado global da aplicação.
A API usada é **REST Countries** (https://restcountries.com/v3.1/all), que retorna dados públicos sobre países.

Como o Pinia funciona neste projeto

Estrutura de um Store

Ele organiza os dados em 3 partes principais:

| Parte | Função | Exemplo neste projeto |
|--------|--------|------------------------|
| **state** | Armazena os dados globais (variáveis reativas) | Lista de países, populações, estado de carregamento |
| **actions** | Executa funções assíncronas (ex: buscar dados do backend) | `fetchData()` chama o backend com Axios |
| **getters** | Calcula valores derivados dos estados | `hasData` retorna `true` se houver dados |


**Fluxo de Comunicação (Backend → Pinia → Chart)**

1. O usuário clica em **Carregar Dados** (`Dashboard.vue` chama `store.fetchData()`).
2. A **action** `fetchData()` (Pinia) faz `GET http://localhost:3001/api/countries`.
3. O **backend** (Express) chama a API **REST Countries** e retorna `{ labels, series }`.
4. O **state** do Pinia é atualizado (`labels`, `series`).
5. O componente **BarChart.vue** recebe `labels` e `series` via **props** e o **Chart.js** desenha o gráfico.


**📊 Arquitetura Resumida**

Camada	          Tecnologia	                        Função
Backend	      Node.js + Express + Axios	              Faz proxy para API pública
Front-end	      Vue 3 + Vite	                          Interface do usuário
Gerência de Estado	Pinia	Controla dados globais       (labels, séries, status)
Gráfico	Chart.js	Renderiza visualmente os dados

**⚙️ Como Executar o Projeto**

1️⃣ Instalar dependências
No terminal, execute:
npm install

2️⃣ Rodar o backend
cd backend
node server.js

3️⃣ Rodar o frontend
cd frontend
npm run dev
O projeto estará disponível em http://localhost:5173

**📈 Como Conectar Outro Gráfico**

Quer exibir outro tipo de dado (ex: área dos países)?

Siga os passos abaixo:

**Backend (server.js)**

Edite a rota e adicione o campo area:

const countries = data.map(country => ({
  name: country.name.common,
  population: country.population,
  area: country.area
}))



**Store (countryStore.js)**

Altere a action fetchData() para incluir area:

this.areas = data.map(item => item.area)


**Novo componente (AreaChart.vue)**

Copie o BarChart.vue e altere o tipo:

new Chart(chartCanvas.value, {
  type: 'line',
  data: { labels: store.labels, datasets: [{ label: 'Área', data: store.areas }] }
})

**Exiba no template**

Importe o novo componente e adicione**AreaChart />**

**🧠Referências Técnicas**

📦 Pinia: https://pinia.vuejs.org/core-concepts/

📊 Chart.js: https://www.chartjs.org/docs/latest/

🌍 REST Countries: https://restcountries.com

🚀 Express: https://expressjs.com/
