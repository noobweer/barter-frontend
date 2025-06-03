import { defineStore } from 'pinia'
import apiClient from '@/services/authService'

export const useAdsStore = defineStore('ads', {
  state: () => ({
    ads: [],
    account: null,
    categories: [], // массив уникальных строк
    conditions: [], // массив уникальных строк
    filters: {
      query: null, // строка
      category: null, // массив строк
      condition: null, // массив строк
    },
  }),

  getters: {
    getAds(state) {
      return state.ads
    },
    getAdById: (state) => {
      return (id) => {
        return state.ads.find((ad) => ad.id === Number(id)) || null
      }
    },
    getCategories(state) {
      return state.categories
    },
    getConditions(state) {
      return state.conditions
    },
    getFilters(state) {
      return state.filters
    },
    getAccount(state) {
      return state.account
    },
  },

  actions: {
    async fetchAds(filters = {}) {
      try {
        const response = await apiClient.post('ads/', filters)

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

    async fetchAccount() {
      try {
        const response = await apiClient.get('user-info/')

        if (response.data && response.data.account) {
          this.account = response.data.account
        } else {
          console.error('Ответ от сервера имеет некорректную структуру')
          throw new Error('Некорректный формат данных')
        }
      } catch (error) {
        console.error('Ошибка при получении аккаунта:', error)
        throw error
      }
    },

    async fetchCategories() {
      try {
        const response = await apiClient.get('categories/')

        if (response.data) {
          this.categories = response.data
        } else {
          console.error('Ответ от сервера имеет некорректную структуру')
          throw new Error('Некорректный формат данных')
        }
      } catch (error) {
        console.error('Ошибка при получении категории:', error)
        throw error
      }
    },

    async fetchConditions() {
      try {
        const response = await apiClient.get('conditions/')

        if (response.data) {
          this.conditions = response.data
        } else {
          console.error('Ответ от сервера имеет некорректную структуру')
          throw new Error('Некорректный формат данных')
        }
      } catch (error) {
        console.error('Ошибка при получении категории:', error)
        throw error
      }
    },

    resetAdsData() {
      this.ads = []
      this.categories = []
      this.conditions = []
    },

    setFilter(key, value) {
      if (['query', 'category', 'condition'].includes(key)) {
        this.filters[key] = value
      }
    },

    async applyFilters() {
      await this.fetchAds(this.filters)
    },
  },
})
