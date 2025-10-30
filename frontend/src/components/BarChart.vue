<!-- =========================================================
🔹 Componente que renderiza um gráfico de barras com Chart.js
Recebe "labels" e "series" como props (dados vindos da store)
========================================================= -->
<template>
  <!-- Canvas onde o Chart.js desenhará o gráfico -->
  <canvas ref="canvasEl"></canvas>
</template>

<script setup>
// =====================================================
// Importa Chart.js e registra manualmente os componentes
// (necessário no Chart.js v4+ para habilitar escalas e eixos)
// =====================================================
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js'

// Registra os módulos usados no gráfico de barras
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend)

// Importa funções reativas do Vue
import { ref, onMounted, watch } from 'vue'

// Declara que este componente espera receber props (dados)
const props = defineProps({
  labels: Array,   // lista de países
  series: Array    // lista de populações
})

// Cria uma referência ao elemento <canvas>
const canvasEl = ref(null)

// Cria variável para guardar o gráfico atual
let chart = null

// Função para desenhar o gráfico
function renderChart() {
  // Se já existir um gráfico, destrói para redesenhar
  if (chart) chart.destroy()

  // Cria o novo gráfico de barras
  chart = new Chart(canvasEl.value, {
    type: 'bar',
    data: {
      labels: props.labels,
      datasets: [
        {
          label: 'População (habitantes)',
          data: props.series,
          backgroundColor: 'rgba(19, 81, 180, 0.6)'
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true, position: 'top' },
        tooltip: { enabled: true }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: 'População' }
        },
        x: {
          title: { display: true, text: 'Países' }
        }
      }
    }
  })
}

// Quando o componente for montado, cria o gráfico
onMounted(renderChart)

// Quando as props mudarem, redesenha o gráfico
watch(() => [props.labels, props.series], renderChart)
</script>

<style scoped>
canvas {
  width: 100%;
  height: 400px;
}
</style>
