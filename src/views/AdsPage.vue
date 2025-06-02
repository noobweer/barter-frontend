<script setup>
import Tabs from '@/volt/Tabs.vue'
import TabList from '@/volt/TabList.vue'
import Tab from '@/volt/Tab.vue'
import TabPanels from '@/volt/TabPanels.vue'
import TabPanel from '@/volt/TabPanel.vue'
import AdsInfo from '@/components/AdsInfo.vue'
</script>

<template>
  <Tabs :value="0">
    <TabList>
      <Tab :value="0">Объявления</Tab>
      <Tab :value="1">Предложения</Tab>
    </TabList>
    <TabPanels>
      <TabPanel :value="0">
        <AdsInfo />
      </TabPanel>
    </TabPanels>
  </Tabs>
</template>

<style scoped></style>
