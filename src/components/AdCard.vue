<script setup>
import Card from '@/volt/Card.vue'
import router from '@/router'

defineProps({
  id: Number,
  account: String,
  user: String,
  title: String,
  description: String,
  category: String,
  condition: String,
  createdAt: Date,
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
        <span v-if="account === user" @click="editAd(id)" class="edit">Изменить</span>
      </div>
    </template>
    <template #title>{{ title }}</template>
    <template #subtitle>{{ category }} – {{ condition }}</template>
    <template #content>
      {{ description }}
    </template>
    <template #footer>
      <div class="footer">
        <span>Создатель: {{ user }}</span>
      </div>
    </template>
  </Card>
</template>

<style scoped>
.footer {
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
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
