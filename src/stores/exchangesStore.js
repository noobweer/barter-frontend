import { defineStore } from 'pinia'
import apiClient from '@/services/authService'

export const useExchangesStore = defineStore('exchanges', {
  state: () => ({
    exchanges: [],
    statuses: ['Ожидает', 'Принято', 'Отклонено'], // массив уникальных статусов
    filters: {
      sender_username: null, // строка
      receiver_username: null, // массив строк
      status: null, // массив строк
    },
  }),

  getters: {
    getExchanges(state) {
      return state.exchanges
    },
    getExchangeById: (state) => {
      return (id) => {
        return state.exchanges.find((exchange) => exchange.id === Number(id)) || null
      }
    },
    getStatuses(state) {
      return state.statuses
    },
    getFilters(state) {
      return state.filters
    },
  },

  actions: {
    async fetchExchanges(filters = {}) {
      try {
        const response = await apiClient.post('exchanges/', filters)

        if (response.data) {
          this.exchanges = response.data
        } else {
          console.error('Ответ от сервера имеет некорректную структуру')
          throw new Error('Некорректный формат данных')
        }
      } catch (error) {
        console.error('Ошибка при получении обменов:', error)
        throw error
      }
    },

    resetExchangesData() {
      this.exchanges = []
    },

    setFilter(key, value) {
      if (['sender_username', 'receiver_username', 'status'].includes(key)) {
        this.filters[key] = value
      }
    },

    async applyFilters() {
      await this.fetchExchanges(this.filters)
    },
  },
})
