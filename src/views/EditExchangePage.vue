<script setup>
import Card from '@/volt/Card.vue'
import Button from '@/volt/Button.vue'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import apiClient from '@/services/authService'
import MultiSelect from '@/volt/MultiSelect.vue'
import { useExchangesStore } from '@/stores/exchangesStore'
import { watchEffect, ref } from 'vue'

const props = defineProps({
  id: {
    type: [Number, String],
    required: true,
  },
})

const router = useRouter()
const toast = useToast()
const exchangeStore = useExchangesStore()

const statuses = exchangeStore.getStatuses
const selectedStatus = ref('')

// Загружаем данные при монтировании
watchEffect(async () => {
  const exchangeData = exchangeStore.getExchangeById(Number(props.id))

  if (!exchangeData && exchangeData.getExchanges.length === 0) {
    await exchangeStore.fetchExchanges()
  }

  const foundExchange = exchangeStore.getExchangeById(Number(props.id))

  if (foundExchange) {
    selectedStatus.value = foundExchange.status_display ? [foundExchange.status_display] : []
  }
})

// {
// 	"exchange_id": 2,
// 	"status": "Принято"
// }

// Функция для авторизации
const editExchange = async () => {
  if (!selectedStatus.value) {
    toast.add({
      severity: 'error',
      summary: 'Ошибка при изменение статуса',
      detail: 'Заполните поле статуса',
      life: 3000,
    })
    return
  }

  try {
    const response = await apiClient.post('edit-exchange/', {
      exchange_id: Number(props.id),
      status: selectedStatus.value[0],
    })

    if (response.data.is_edited) {
      toast.add({
        severity: 'success',
        summary: 'Предложение обмена успешно изменено',
        detail: 'Возвращаем на главную...',
        life: 3000,
      })
      exchangeStore.fetchExchanges
      router.push('/')
    }
  } catch (error) {
    console.error(error)
    toast.add({
      severity: 'error',
      summary: 'Ошибка при изменение статуса',
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
      <template #title>Редактирование предложения обмена</template>
      <template #content>
        <form class="space-y-4" @submit.prevent="editExchange">
          <div class="flex flex-col space-y-1.5">
            <span for="statuses">Статус обмена</span>
            <MultiSelect
              v-model="selectedStatus"
              :options="statuses"
              filter
              placeholder="Выберите состояние"
              :maxSelectedLabels="3"
              :selectionLimit="1"
              class="w-full md:w-60"
              size="small"
            />
          </div>

          <!-- Кнопка "Изменить" внутри формы -->
          <Button type="submit" class="w-full">Изменить</Button>
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
