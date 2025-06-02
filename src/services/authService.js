import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    Authorization: '',
  },
})

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  },
)

export default apiClient
