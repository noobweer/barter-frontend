<script setup>
import Card from '@/volt/Card.vue'
import InputText from '@/volt/InputText.vue'
import Button from '@/volt/Button.vue'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import apiClient from '@/services/authService'
import { checkAuthInitData } from '@/services/authChecker'
import MultiSelect from '@/volt/MultiSelect.vue'
import { useAdsStore } from '@/stores/adsStore'
import { ref, computed } from 'vue'

const adsStore = useAdsStore()

const categories = computed(() => adsStore.getCategories)
const conditions = computed(() => adsStore.getConditions)

const title = ref('')
const description = ref('')
const selectedCategory = ref(null)
const selectedCondition = ref(null)

const router = useRouter()
const { toast } = useToast()

// {
// 	"title": "Часы Casio",
// 	"description": "Крутые часы",
// 	"category": "Часы",
// 	"condition": "Новое"
// }

// Функция для авторизации
const createAd = async () => {
  if (
    !title.value.trim() ||
    !description.value.trim() ||
    !selectedCategory.value ||
    !selectedCondition.value
  ) {
    toast.add({
      severity: 'error',
      summary: 'Ошибка при создание',
      detail: 'Заполните все поля',
      life: 3000,
    })
    return
  }

  try {
    const categoryNames = selectedCategory.value?.map((cat) => cat.name) || []
    const conditionNames = selectedCondition.value?.map((cond) => cond.name) || []
    const response = await apiClient.post('create-ad/', {
      title: title.value,
      description: description.value,
      category: categoryNames[0],
      condition: conditionNames[0],
    })

    if (response.data.is_created) {
      checkAuthInitData()
      router.push('/')
    }
  } catch (error) {
    console.error(error)
    toast.add({
      severity: 'error',
      summary: 'Ошибка при создание',
      detail: 'Поля неверено заполеннны',
      life: 3000,
    })
  }
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
          <Button type="submit" class="w-full">Изменитть</Button>
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
