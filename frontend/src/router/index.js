// ============================================================
// 🔹 Define as rotas (URLs) do site
// ============================================================

import { createRouter, createWebHistory } from 'vue-router' // funções do roteador
import Dashboard from '../views/Dashboard.vue'              // tela principal

// Lista de rotas disponíveis
const routes = [
  {
    path: '/',            // quando acessar a raiz do site
    name: 'dashboard',    // nome interno da rota
    component: Dashboard  // qual componente será exibido
  }
]

// Cria o roteador usando o histórico padrão do navegador
const router = createRouter({
  history: createWebHistory(), // URLs normais (sem #)
  routes                        // aplica as rotas definidas acima
})

export default router