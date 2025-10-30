<template>
  <section class="container">
    <!-- Título da página -->
    <h1>🌍 Top 10 Países mais Populosos</h1>

    <!-- Botão para buscar os dados manualmente -->
    <button @click="loadData" :disabled="store.loading">
      {{ store.loading ? "Carregando..." : "Carregar Dados" }}
    </button>

    <!-- Se der erro na busca, aparece essa mensagem -->
    <p v-if="store.error" class="erro">Erro: {{ store.error }}</p>

    <!-- Mostra o gráfico quando os dados já foram carregados -->
    <BarChart
      v-if="store.labels.length"
      :labels="store.labels"
      :series="store.series"
    />

    <!-- Mostra a data e hora da última atualização -->
    <p v-if="store.lastUpdate" class="update">
      Última atualização: {{ store.lastUpdate }}
    </p>
  </section>
</template>

<script setup>
// Importa ferramentas do Vue
import { onMounted, onUnmounted } from 'vue'
// Importa a "store" (onde ficam os dados)
import { useCountryStore } from "../stores/countryStore"
// Importa o componente do gráfico
import BarChart from "../components/BarChart.vue"

// Cria uma variável para usar os dados da store
const store = useCountryStore()

// Função que busca os dados quando o botão é clicado
function loadData() {
  store.fetchData()
}

// Variável para guardar o temporizador
let intervalo = null

// Quando a tela é aberta
onMounted(() => {
  store.fetchData() // Busca os dados uma vez

  // Depois, repete a busca a cada 10 segundos
  intervalo = setInterval(() => {
    store.fetchData()
    console.log("🔁 Dados atualizados automaticamente")
  }, 10000) // 10.000 milissegundos = 10 segundos
})

// Quando o usuário sai da tela, para o temporizador
onUnmounted(() => {
  clearInterval(intervalo)
})
</script>

<style scoped>
/* Estilos da página */
.container {
  max-width: 800px;         /* Largura máxima da área */
  margin: 40px auto;        /* Centraliza no meio da tela */
  text-align: center;       /* Centraliza o conteúdo */
  font-family: "Segoe UI", sans-serif; /* Tipo de letra */
}

button {
  margin: 16px 0;
  padding: 10px 18px;
  background-color: #1351b4; /* Cor azul */
  border: none;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

/* Quando o botão está desativado */
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Texto de erro */
.erro {
  color: red;
  margin-bottom: 10px;
}

/* Texto da última atualização */
.update {
  margin-top: 10px;
  color: #333;
  font-size: 0.9rem;
}
</style>
