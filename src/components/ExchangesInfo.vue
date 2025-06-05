<script setup>
import Button from '@/volt/Button.vue'
import MultiSelect from '@/volt/MultiSelect.vue'
import InputText from '@/volt/InputText.vue'
import ExchangeCard from './ExchangeCard.vue'
import { useExchangesStore } from '@/stores/exchangesStore'
import { onMounted, ref } from 'vue'
import router from '@/router'

const exchangesStore = useExchangesStore()
const exchanges = ref([])
const statuses = exchangesStore.getStatuses
const selectedStatuses = ref(null)
const senderUsername = ref('')
const receiverUsername = ref('')

onMounted(async () => {
  await exchangesStore.fetchExchanges()
  exchanges.value = exchangesStore.getExchanges
})

const applyFilters = async () => {
  exchangesStore.setFilter('receiver_username', receiverUsername.value || null)
  exchangesStore.setFilter('sender_username', senderUsername.value || null)
  exchangesStore.setFilter('status', selectedStatuses.value || [])

  await exchangesStore.applyFilters()
  exchanges.value = exchangesStore.getExchanges
}

const removeFilters = async () => {
  exchangesStore.setFilter('receiver_username', null)
  exchangesStore.setFilter('sender_username', null)
  exchangesStore.setFilter('status', [])
  receiverUsername.value = null
  senderUsername.value = null
  selectedStatuses.value = null

  await exchangesStore.applyFilters()
  exchanges.value = exchangesStore.getExchanges
}

const pushCreateExchange = () => {
  router.push({ name: 'CreateExchangePage' })
}
</script>

<template>
  <div class="exchanges">
    <div class="buttons">
      <Button
        @click="pushCreateExchange"
        label="Создать предложение обмена"
        class="w-[15rem]"
        size="small"
      />
    </div>
    <div class="buttons">
      <Button label="Применить фильтр" @click="applyFilters" class="w-[10rem]" size="small" />
      <Button label="Убрать фильтр" @click="removeFilters" class="w-[10rem]" size="small" />
      <MultiSelect
        v-model="selectedStatuses"
        :options="statuses"
        filter
        placeholder="Выберите статусы"
        :maxSelectedLabels="2"
        class="w-full md:w-60"
        size="small"
      />
      <InputText
        v-model="senderUsername"
        placeholder="Введите логин отпровителя"
        class="w-full md:w-60"
        size="small"
      />
      <InputText
        v-model="receiverUsername"
        placeholder="Введите логин получателя"
        class="w-full md:w-60"
        size="small"
      />
    </div>
    <div class="exchanges-cards">
      <!-- defineProps({
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
      }) -->
      <ExchangeCard
        v-for="exchange in exchanges"
        :key="exchange.id"
        :id="exchange.id"
        :sender_id="exchange.ad_sender.id"
        :sender_user="exchange.ad_sender.user"
        :sender_title="exchange.ad_sender.title"
        :sender_category="exchange.ad_sender.category.name"
        :sender_condition="exchange.ad_sender.condition.name"
        :receiver_id="exchange.ad_receiver.id"
        :receiver_user="exchange.ad_receiver.user"
        :receiver_title="exchange.ad_receiver.title"
        :receiver_category="exchange.ad_receiver.category.name"
        :receiver_condition="exchange.ad_receiver.condition.name"
        :status="exchange.status_display"
        :comment="exchange.comment"
      />
    </div>
  </div>
</template>

<style scoped>
.exchanges {
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
.exchanges-cards {
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
  gap: 1rem;
  align-self: stretch;
  flex-wrap: wrap;
}
</style>
