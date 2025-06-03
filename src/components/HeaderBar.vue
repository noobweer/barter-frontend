<script setup>
import Toolbar from '@/volt/Toolbar.vue'
import DangerButton from '@/volt/DangerButton.vue'
import Avatar from '@/volt/Avatar.vue'
import router from '@/router'

defineProps({
  account: {
    type: String,
    required: false,
    default: null,
  },
})

const logOut = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  router.push({ name: 'LoginPage' })
}
</script>

<template>
  <Toolbar>
    <template #start>
      <Avatar :label="account?.charAt(0).toUpperCase() || 'U'" class="mr-2" size="small" />
      <span>{{ account || 'Пользователь' }}</span>
    </template>

    <template #end>
      <DangerButton @click="logOut" label="Выйти из аккаунта" variant="text" size="small" />
    </template>
  </Toolbar>
</template>
