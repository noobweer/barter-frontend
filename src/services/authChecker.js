import { refreshAuthToken } from './authRefresh'
import { useAdsStore } from '@/stores/adsStore'
import { useExchangesStore } from '@/stores/exchangesStore'

export async function checkAuthInitData() {
  const adsStore = useAdsStore()
  const exchangeStore = useExchangesStore()

  if (!localStorage.getItem('access_token')) {
    console.log('Access token not found. Redirecting to login.')
    return false
  }

  try {
    console.log('Initializing data for authenticated user...')
    await Promise.all([
      adsStore.fetchAds(),
      adsStore.fetchAccount(),
      adsStore.fetchCategories(),
      adsStore.fetchConditions(),
      exchangeStore.fetchExchanges(),
    ])
    console.log('All data initialized successfully.')
    return true
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const isTokenRefreshed = await refreshAuthToken()
      if (isTokenRefreshed) {
        console.log('Token refreshed successfully. Retrying fetchAllPools...')
        await Promise.all([
          adsStore.fetchAds(),
          adsStore.fetchAccount(),
          adsStore.fetchCategories(),
          adsStore.fetchConditions(),
          exchangeStore.fetchExchanges(),
        ])
        console.log('All data initialized successfully after token refresh.')
        return true
      } else {
        console.error('Error initializing data:', error)
        return false
      }
    }
  }
}
