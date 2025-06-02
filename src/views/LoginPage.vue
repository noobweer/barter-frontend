<script setup>
import Card from '@/volt/Card.vue'
import InputText from '@/volt/InputText.vue'
import Button from '@/volt/Button.vue'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import apiClient from '@/services/authService'
import { checkAuthInitData } from '@/services/authChecker'

const username = ref('')
const password = ref('')
const router = useRouter()
const { toast } = useToast()

// Функция для авторизации
const login = async () => {
  if (!username.value.trim() || !password.value.trim()) {
    toast.add({
      severity: 'error',
      summary: 'Ошибка при авторизации',
      detail: 'Имя пользователя и пароль обязательны',
      life: 3000,
    })
    return
  }

  try {
    const response = await apiClient.post('login/', {
      username: username.value,
      password: password.value,
    })

    if (response.data.access && response.data.refresh) {
      localStorage.setItem('access_token', response.data.access)
      localStorage.setItem('refresh_token', response.data.refresh)
      // checkAuthInitData()
      router.push('/')
    }
  } catch (error) {
    console.error(error)
    toast.add({
      severity: 'error',
      summary: 'Ошибка при авторизации',
      detail: 'Неверное имя пользователя или пароль',
      life: 3000,
    })
  }
}
</script>

<template>
  <div class="login__container">
    <Card class="login_form__container">
      <template #title>Авторизация</template>
      <template #subtitle>Введите данные ниже, чтобы войти в учетную запись</template>
      <template #content>
        <form class="space-y-4" @submit.prevent="login">
          <!-- Поле для ввода имени пользователя -->
          <div class="flex flex-col space-y-1.5">
            <span for="username">Логин пользователя</span>
            <InputText id="username" v-model="username" type="text" placeholder="Введите логин" />
          </div>

          <!-- Поле для ввода пароля -->
          <div class="flex flex-col space-y-1.5">
            <span for="password">Пароль</span>
            <InputText
              id="password"
              v-model="password"
              type="password"
              placeholder="Введите пароль"
            />
          </div>

          <!-- Кнопка "Войти" внутри формы -->
          <Button type="submit" class="w-full">Войти</Button>
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
