import axios from 'axios';

const baseURL = import.meta.env.DEV
  ? '/freetogame-api' // В разработке - прокси
  : 'https://www.freetogame.com/api'; // В продакшен - прямой url
  
const api = axios.create({
  baseURL,
  timeout: 15000,
  timeoutErrorMessage: 'Превышено время ожидания ответа от сервера',
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      error.message = 'Сервер не отвечает. Попробуйте позже';
    }
    return Promise.reject(error);
  }
);

export default api;