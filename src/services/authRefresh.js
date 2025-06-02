import apiClient from './authService'

export const refreshAuthToken = async () => {
  const refreshToken = localStorage.getItem('refresh_token')

  const response = await apiClient.post('refresh/', {
    refresh: refreshToken,
  })

  if (response.data && response.data.access) {
    localStorage.setItem('access_token', response.data.access)
  }
  return true
}
