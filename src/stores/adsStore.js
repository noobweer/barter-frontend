import { defineStore } from 'pinia'
import apiClient from '@/services/authService'

export const useAdsStore = defineStore('ads', {
  state: () => ({
    ads: [],
  }),

  getters: {
    getAds() {
      return this.ads
    },
  },

  actions: {
    async fetchAds() {
      try {
        const params = {}

        const response = await apiClient.post('ads/', { params })

        if (response.data && Array.isArray(response.data.results)) {
          this.ads = response.data.results
        } else {
          console.error('Ответ от сервера имеет некорректную структуру')
          throw new Error('Некорректный формат данных')
        }
      } catch (error) {
        console.error('Ошибка при получении объявлений:', error)
        throw error
      }
    },

    resetAdsData() {
      this.ads = []
    },
  },
})
