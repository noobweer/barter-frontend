<script setup>
import AdCard from '@/components/AdCard.vue'
import Button from '@/volt/Button.vue'

import { useAdsStore } from '@/stores/adsStore'
import { onMounted, computed } from 'vue'

const adsStore = useAdsStore()
const ads = computed(() => adsStore.getAds)

onMounted(async () => {
  await adsStore.fetchAds()
})
</script>

<template>
  <div class="ads">
    <Button label="Создать объявление" class="w-[15rem]" />
    <div class="ads-cards">
      <AdCard
        v-for="ad in ads"
        :key="ad.id"
        :id="ad.id"
        :user="ad.user"
        :title="ad.title"
        :description="ad.description"
        :category="ad.category.name"
        :condition="ad.condition.name"
      />
    </div>
  </div>
</template>

<style scoped>
.ads {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.ads-cards {
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
  gap: 1rem;
  align-self: stretch;
  flex-wrap: wrap;
}
</style>
