<script setup>
import AdCard from '@/components/AdCard.vue'
import Button from '@/volt/Button.vue'
import MultiSelect from '@/volt/MultiSelect.vue'
import InputText from '@/volt/InputText.vue'

import { useAdsStore } from '@/stores/adsStore'
import { ref, onMounted, computed } from 'vue'
import router from '@/router'

const adsStore = useAdsStore()
const ads = ref([])
const categories = computed(() => adsStore.getCategories)
const conditions = computed(() => adsStore.getConditions)
const account = computed(() => adsStore.getAccount)

const selectedCategories = ref(null)
const selectedConditions = ref(null)
const query = ref(null)

onMounted(async () => {
  await adsStore.fetchAds()
  ads.value = adsStore.getAds
})

// Применение фильтров
const applyFilters = async () => {
  const categoryNames = selectedCategories.value?.map((cat) => cat.name) || []
  const conditionNames = selectedConditions.value?.map((cond) => cond.name) || []

  adsStore.setFilter('query', query.value || null)
  adsStore.setFilter('category', categoryNames || [])
  adsStore.setFilter('condition', conditionNames || [])

  await adsStore.applyFilters()
  ads.value = adsStore.getAds
}
const removeFilters = async () => {
  adsStore.setFilter('query', null)
  adsStore.setFilter('category', [])
  adsStore.setFilter('condition', [])
  selectedCategories.value = null
  selectedConditions.value = null
  query.value = null

  await adsStore.applyFilters()
  ads.value = adsStore.getAds
}

const pushCreateAd = async () => {
  router.push({ name: 'CreateAdPage' })
}
</script>

<template>
  <div class="ads">
    <div class="buttons">
      <Button @click="pushCreateAd" label="Создать объявление" class="w-[15rem]" size="small" />
    </div>
    <div class="buttons">
      <Button label="Применить фильтр" @click="applyFilters" class="w-[10rem]" size="small" />
      <Button label="Убрать фильтр" @click="removeFilters" class="w-[10rem]" size="small" />
      <MultiSelect
        v-model="selectedCategories"
        :options="categories"
        optionLabel="name"
        filter
        placeholder="Выберите категории"
        :maxSelectedLabels="3"
        class="w-full md:w-60"
        size="small"
      />
      <MultiSelect
        v-model="selectedConditions"
        :options="conditions"
        optionLabel="name"
        filter
        placeholder="Выберите состояния"
        :maxSelectedLabels="3"
        class="w-full md:w-60"
        size="small"
      />
      <InputText
        v-model="query"
        placeholder="Введите ключевое слово"
        class="w-full md:w-60"
        size="small"
      />
    </div>
    <div class="ads-cards">
      <AdCard
        v-for="ad in ads"
        :key="ad.id"
        :id="ad.id"
        :account="account"
        :user="ad.user"
        :title="ad.title"
        :description="ad.description"
        :category="ad.category.name"
        :condition="ad.condition.name"
        :createdAt="ad.created_at"
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
.buttons {
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
  gap: 0.5rem;
  align-self: stretch;
  flex-wrap: wrap;
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
