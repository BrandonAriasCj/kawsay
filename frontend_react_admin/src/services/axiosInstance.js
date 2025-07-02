import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api';


const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});


axiosInstance.interceptors.request.use(
  (config) => {
    
    const token = localStorage.getItem('jwtToken');
    
    
    console.log('Interceptando petición. ¿Token encontrado?:', token ? 'Sí' : 'No');

    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      
      
      console.log('Header de Autorización enviado:', config.headers.Authorization);
    } else {
     
      console.warn('Advertencia: No se encontró un token JWT. La petición irá sin autorización.');
    }
    
    return config;
  },
  (error) => {
    
    console.error('Error en el interceptor de Axios (petición):', error);
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => {
   
    return response;
  },
  (error) => {
    
    if (error.response) {
 
      console.error(`Error de Respuesta - Status: ${error.response.status}`);
      console.error('Data:', error.response.data);
      console.error('Headers:', error.response.headers);
    } else if (error.request) {
      
      console.error('Error de Petición: No se recibió respuesta del servidor.', error.request);
    } else {
      
      console.error('Error General de Axios:', error.message);
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;