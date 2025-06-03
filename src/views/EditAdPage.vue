<script setup>
import Card from '@/volt/Card.vue'
import InputText from '@/volt/InputText.vue'
import Button from '@/volt/Button.vue'
import DangerButton from '@/volt/DangerButton.vue'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import apiClient from '@/services/authService'
import { checkAuthInitData } from '@/services/authChecker'
import MultiSelect from '@/volt/MultiSelect.vue'
import { useAdsStore } from '@/stores/adsStore'
import { watchEffect, computed, ref } from 'vue'

const props = defineProps({
  id: {
    type: [Number, String],
    required: true,
  },
})

const router = useRouter()
const toast = useToast()
const adsStore = useAdsStore()

const title = ref('')
const description = ref('')
const selectedCategory = ref([])
const selectedCondition = ref([])

// Загружаем данные при монтировании
watchEffect(async () => {
  const adData = adsStore.getAdById(Number(props.id))

  if (!adData && adsStore.getAds.length === 0) {
    await adsStore.fetchAds()
  }

  const foundAd = adsStore.getAdById(Number(props.id))

  if (foundAd) {
    title.value = foundAd.title
    description.value = foundAd.description
    selectedCategory.value = foundAd.category ? [foundAd.category] : []
    selectedCondition.value = foundAd.condition ? [foundAd.condition] : []
  }
})

const categories = computed(() => adsStore.getCategories)
const conditions = computed(() => adsStore.getConditions)

// {
// 	"title": "Часы Casio",
// 	"description": "Крутые часы",
// 	"category": "Часы",
// 	"condition": "Новое"
// }

// Функция для авторизации
const editAd = async () => {
  if (
    !title.value.trim() ||
    !description.value.trim() ||
    !selectedCategory.value ||
    !selectedCondition.value
  ) {
    toast.add({
      severity: 'error',
      summary: 'Ошибка при изменение',
      detail: 'Заполните все поля',
      life: 3000,
    })
    return
  }

  try {
    const categoryNames = selectedCategory.value?.map((cat) => cat.name) || []
    const conditionNames = selectedCondition.value?.map((cond) => cond.name) || []
    const response = await apiClient.post('edit-ad/', {
      ad_id: Number(props.id),
      title: title.value,
      description: description.value,
      category: categoryNames[0],
      condition: conditionNames[0],
    })

    if (response.data.is_edited) {
      toast.add({
        severity: 'success',
        summary: 'Объявление успешно изменено',
        detail: 'Возвращаем на главную...',
        life: 3000,
      })
      checkAuthInitData()
      router.push('/')
    }
  } catch (error) {
    console.error(error)
    toast.add({
      severity: 'error',
      summary: 'Ошибка при изменение',
      detail: 'Поля неверено заполнены',
      life: 3000,
    })
  }
}

const deleteAd = async () => {
  try {
    const response = await apiClient.post('delete-ad/', {
      ad_id: Number(props.id),
    })

    if (response.data.is_deleted) {
      toast.add({
        severity: 'success',
        summary: 'Объявление успешно удалено',
        detail: 'Возвращаем на главную...',
        life: 3000,
      })
      checkAuthInitData()
      router.push('/')
    }
  } catch (error) {
    console.error(error)
    toast.add({
      severity: 'error',
      summary: 'Ошибка при изменение',
      detail: 'Поля неверено заполнены',
      life: 3000,
    })
  }
}

const pushHome = async () => {
  router.push({ name: 'BarterPage' })
}
</script>

<template>
  <div class="login__container">
    <Card class="login_form__container">
      <template #title>Редактирование объявления</template>
      <template #content>
        <form class="space-y-4" @submit.prevent="createAd">
          <!-- Поле для ввода заголовка -->
          <div class="flex flex-col space-y-1.5">
            <span for="title">Заголовок</span>
            <InputText id="title" v-model="title" type="text" placeholder="Введите заголовок" />
          </div>

          <!-- Поле для ввода описания -->
          <div class="flex flex-col space-y-1.5">
            <span for="description">Описание</span>
            <InputText
              id="description"
              v-model="description"
              type="text"
              placeholder="Введите описание"
            />
          </div>

          <MultiSelect
            v-model="selectedCategory"
            :options="categories"
            optionLabel="name"
            filter
            placeholder="Выберите категорию"
            :maxSelectedLabels="1"
            :selectionLimit="1"
            class="w-full md:w-60"
            size="small"
          />

          <MultiSelect
            v-model="selectedCondition"
            :options="conditions"
            optionLabel="name"
            filter
            placeholder="Выберите состояние"
            :maxSelectedLabels="1"
            :selectionLimit="1"
            class="w-full md:w-60"
            size="small"
          />

          <!-- Кнопка "Изменить" внутри формы -->
          <Button @click="editAd" type="submit" class="w-full">Изменить</Button>
          <DangerButton @click="deleteAd" label="Удалить объявление" class="w-full" />
          <Button @click="pushHome" label="Назад" variant="outlined" class="w-full" />
        </form>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.login__container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: #18181b;
}
.login_form__container {
  max-width: 480px;
}
</style>
