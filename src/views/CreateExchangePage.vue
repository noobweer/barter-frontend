<script setup>
import Card from '@/volt/Card.vue'
import InputText from '@/volt/InputText.vue'
import Button from '@/volt/Button.vue'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import apiClient from '@/services/authService'
import { useExchangesStore } from '@/stores/exchangesStore'
import { ref } from 'vue'

const adSenderId = ref()
const adReceiverId = ref()
const comment = ref('')

const exchangeStore = useExchangesStore()
const router = useRouter()
const toast = useToast()

// {
// 	"ad_sender_id": 2,
// 	"ad_receiver_id": 4,
// 	"comment": "Давай меняться"
// }

// Функция для авторизации
const createExchange = async () => {
  if (!adSenderId.value || !adReceiverId.value) {
    toast.add({
      severity: 'error',
      summary: 'Ошибка при создание',
      detail: 'Заполните все поля',
      life: 3000,
    })
    return
  }

  try {
    const response = await apiClient.post('create-exchange/', {
      ad_sender_id: adSenderId.value,
      ad_receiver_id: adReceiverId.value,
      comment: comment.value,
    })

    if (response.data.is_created === false) {
      toast.add({
        severity: 'error',
        summary: 'Введите корректные данные',
        detail: 'ID должны существовать и быть различны',
        life: 3000,
      })
    }

    if (response.data.is_created) {
      toast.add({
        severity: 'success',
        summary: 'Объявление успешно создано',
        detail: 'Возвращаем на главную...',
        life: 3000,
      })
      exchangeStore.fetchExchanges()
      router.push('/')
    }
  } catch (error) {
    console.error(error)
    toast.add({
      severity: 'error',
      summary: 'Ошибка при создание',
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
      <template #title>Создание предложение обмена</template>
      <template #content>
        <form class="space-y-4" @submit.prevent="createExchange">
          <!-- Поле для ввода комментария -->
          <div class="flex flex-col space-y-1.5">
            <span for="comment">Комментарий</span>
            <InputText
              id="comment"
              v-model="comment"
              type="text"
              placeholder="Введите комментарий (опционально)"
            />
          </div>

          <div class="flex flex-col space-y-1.5">
            <span for="adSenderId">ID объявления отправителя</span>
            <InputText
              id="adSenderId"
              v-model="adSenderId"
              type="text"
              placeholder="Введите ID вашего объявления"
            />
          </div>

          <div class="flex flex-col space-y-1.5">
            <span for="adReceiverId">ID объявления, которое хотите получить</span>
            <InputText
              id="adReceiverId"
              v-model="adReceiverId"
              type="text"
              placeholder="Введите ID объявления, которое хотите получить"
            />
          </div>

          <!-- Кнопка "Создать" внутри формы -->
          <Button type="submit" class="w-full">Создать</Button>
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
  min-width: 400px;
  max-width: 800px;
}
</style>
