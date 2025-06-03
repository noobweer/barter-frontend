<script setup>
import Card from '@/volt/Card.vue'
import router from '@/router'
import { onMounted, ref } from 'vue'
import { useAdsStore } from '@/stores/adsStore'

defineProps({
  id: Number,
  sender_id: Number,
  sender_user: String,
  sender_title: String,
  sender_category: String,
  sender_condition: String,
  receiver_id: Number,
  receiver_user: String,
  receiver_title: String,
  receiver_category: String,
  receiver_condition: String,
  status: String,
  comment: String,
})

const adsStore = useAdsStore()
const account = ref('')

onMounted(async () => {
  account.value = adsStore.getAccount
})

const editAd = async (id) => {
  router.push({
    name: 'EditAdPage',
    params: {
      id: id,
    },
  })
}
</script>

<template>
  <Card class="w-[15rem]">
    <template #header>
      <div class="header-wrapper">
        <img
          alt="header img"
          class="w-full h-[100px] rounded-tl-xl rounded-tr-xl"
          src="@/assets/template.jpg"
        />
        <span class="id">ID: {{ id }}</span>
        <span v-if="account === sender_user" @click="editAd(id)" class="edit">Изменить</span>
      </div>
    </template>
    <template #title>
      <div class="text-sm exchange-side">
        <span class="user">Создатель {{ sender_user }} отдает</span>
        [ID: {{ sender_id }}] {{ sender_title }}
      </div>
    </template>
    <template #subtitle>{{ sender_category }} – {{ sender_condition }}</template>
    <template #content>
      <div class="text-sm mt-2 exchange-side">
        <span class="user">Получит от {{ receiver_user }}</span>
        <span>[ID: {{ receiver_id }}] {{ receiver_title }}</span>
        <span class="text-surface-500 dark:text-surface-400 text-sm"
          >{{ receiver_category }} – {{ receiver_condition }}</span
        >
      </div>
    </template>
    <template #footer>
      <div class="footer">
        <div>
          Статус: <span class="user">{{ status }}</span>
        </div>
        <div>
          Комментарий: <span class="user">{{ comment }}</span>
        </div>
      </div>
    </template>
  </Card>
</template>

<style scoped>
.footer {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  gap: 0.5rem;
}
.icon {
  width: 20px;
  height: 20px;
}
.header-wrapper {
  position: relative;
}
.id {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 0.2rem 0.4rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  /* font-weight: bold; */
  z-index: 10;
}
.user {
  width: fit-content;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  padding: 0.2rem 0.4rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  z-index: 10;
}
.exchange-side {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.edit {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 0.2rem 0.4rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  /* font-weight: bold; */
  z-index: 10;
  cursor: pointer;
}
</style>
