<script setup>
import Tabs from '@/volt/Tabs.vue'
import TabList from '@/volt/TabList.vue'
import Tab from '@/volt/Tab.vue'
import TabPanels from '@/volt/TabPanels.vue'
import TabPanel from '@/volt/TabPanel.vue'
import AdsInfo from '@/components/AdsInfo.vue'
import ExchangesInfo from '@/components/ExchangesInfo.vue'
import HeaderBar from '@/components/HeaderBar.vue'
import { useAdsStore } from '@/stores/adsStore'
import { computed } from 'vue'

const adsStore = useAdsStore()
const account = computed(() => adsStore.getAccount)
</script>

<template>
  <div class="ads-page">
    <HeaderBar :account="account" />
    <Tabs :value="0">
      <TabList>
        <Tab :value="0">Объявления</Tab>
        <Tab :value="1">Предложения обмена</Tab>
      </TabList>
      <TabPanels class="tabs">
        <TabPanel :value="0">
          <AdsInfo />
        </TabPanel>
        <TabPanel :value="1">
          <ExchangesInfo />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<style scoped>
.ads-page {
  background-color: #18181b;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
}
</style>
