import axios from 'axios';

// Usar variável de ambiente ou padrão para desenvolvimento
let API_URL = import.meta.env.VITE_API_URL || '/api';

// Garantir que a URL termina com /api
if (API_URL && !API_URL.endsWith('/api')) {
  // Se a URL não termina com /api, adicionar
  API_URL = API_URL.endsWith('/') ? API_URL + 'api' : API_URL + '/api';
}

// Log para debug (remover em produção se necessário)
console.log('🔗 API URL configurada:', API_URL);
console.log('🔗 VITE_API_URL do env:', import.meta.env.VITE_API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;


