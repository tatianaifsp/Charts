// ============================================================
// Backend Express - REST Countries (v3.1) 
// ============================================================

// Importa o Express para criar o servidor HTTP
import express from 'express'

// Importa o CORS para permitir que o front acesse o backend
import cors from 'cors'

// Importa o Axios para fazer requisições HTTP para a API externa
import axios from 'axios'

// Cria a aplicação/servidor Express
const app = express()

// Ativa o CORS (permite chamadas do navegador de outra origem/porta)
app.use(cors())

// Permite interpretar JSON no corpo das requisições
app.use(express.json())

// Middleware simples para liberar métodos básicos (GET/POST/PUT/DELETE)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')       // Libera acesso de qualquer origem (para fins didáticos)
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE') // Libera métodos comuns
  next()                                               // Passa para o próximo middleware/rota
})

// Porta onde o backend vai rodar localmente
const PORT = 3001

// Rota de saúde (para checar se o servidor está no ar)
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'restcountries-proxy' }) // Retorna um JSON simples
})

// Rota principal que o frontend consome para montar o gráfico
app.get('/api/countries', async (_req, res) => {
  try {
    // URL da API pública com os "fields" exigidos (nome, população e código)
    const url = 'https://restcountries.com/v3.1/all?fields=name,population,cca3'

    // Faz a chamada HTTP para a API externa com timeout de 15s
    const { data } = await axios.get(url, { timeout: 15000 })

    // Garante que a resposta seja um array (lista de países)
    if (!Array.isArray(data)) {
      return res.status(500).json({ error: 'Resposta inesperada da API' }) // Erro controlado caso venha algo estranho
    }

    // Prepara os dados: filtra, mapeia, ordena e pega os 10 mais populosos
    const mapped = data
      .filter(c => c?.name?.common && c?.population)   // Mantém só países com nome e população válidos
      .map(c => ({                                     // Cria um objeto mais simples para cada país
        name: c.name.common,                           // Nome comum do país (ex.: "Brazil")
        code: c.cca3,                                  // Código de 3 letras (ex.: "BRA")
        population: c.population                       // População
      }))
      .sort((a, b) => b.population - a.population)     // Ordena do maior para o menor por população
      .slice(0, 10)                                    // Fica apenas com os Top 10

    // Separa em dois arrays: um para rótulos (nomes) e outro para valores (população)
    const labels = mapped.map(c => c.name)             // Ex.: ["China", "India", ...]
    const series = mapped.map(c => c.population)       // Ex.: [1400000000, 1390000000, ...]

    // Retorna para o frontend num formato simples para o Chart.js
    return res.json({ count: labels.length, labels, series })
  } catch (err) {
    // Se algo falhar (rede, API fora, etc.), loga no servidor e retorna 500
    console.error('❌ Erro /api/countries:', err.message)
    res.status(500).json({ error: err.message })
  }
})

// Inicia o servidor e mostra a URL no terminal
app.listen(PORT, () => {
  console.log(`✅ Backend rodando em http://localhost:${PORT}`)
})

