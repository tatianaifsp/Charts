// ============================================================
// 🔹 Arquivo principal: inicializa o Vue, Pinia e Router
// ============================================================

import { createApp } from 'vue'        // importa função para criar o app Vue
import { createPinia } from 'pinia'    // importa o gerenciador de estado global
import App from './App.vue'            // componente raiz (App)
import router from './router'          // controle de rotas (páginas)

// Cria a instância principal da aplicação Vue
const app = createApp(App)

// Registra o Pinia (estado global)
app.use(createPinia())

// Registra o roteador (para navegar entre telas)
app.use(router)

// Monta o app no elemento <div id="app"> do index.html
app.mount('#app')
