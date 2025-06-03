<script setup>
import Toast from '@/volt/Toast.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAdsStore } from '@/stores/adsStore'
import { refreshAuthToken } from './services/authRefresh'

const router = useRouter()
const adsStore = useAdsStore()
const isLoading = ref(true)

onMounted(async () => {
  try {
    // Проверка токена
    if (!localStorage.getItem('access_token')) {
      console.log('Access token not found. Redirecting to login.')
      router.push('/login')
      return
    }

    // Загрузка данных
    // await adsStore.fetchAds()
    await adsStore.fetchAccount()
    await adsStore.fetchCategories()
    await adsStore.fetchConditions()
    // await exchangesStore.fetchExchanges()
    isLoading.value = false
  } catch (error) {
    console.error('Ошибка при инициализации данных:', error)

    // Попытка обновить токен
    const isTokenRefreshed = await refreshAuthToken()
    if (isTokenRefreshed) {
      await adsStore.fetchAds()
      await adsStore.fetchAccount()
      isLoading.value = false
    } else {
      router.push('/login')
    }
  }
})
</script>

<template>
  <Toast />
  <router-view></router-view>
</template>

<style scoped></style>
