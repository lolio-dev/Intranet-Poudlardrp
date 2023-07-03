<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import ServerCard from "../components/elements/ServerCard.vue"
import View from "./View.vue";
import { useServersStore } from "../stores/servers.store";
import { storeToRefs } from "pinia";

const serversStore = useServersStore();
const { loadServers } = serversStore;
const { servers } = storeToRefs(serversStore);

const serverTypeItems = ['LOBBY', 'MMO'];
const serverType = ref<string[]>(serverTypeItems);

onMounted(() => {
  loadServers();
});

const filteredServers = computed(() => [...servers.value?.values()].filter((server) => serverTypeItems.includes(server.serverType)));
</script>

<template>
  <View
      title="Serveurs"
  >
    <div class="w-64">
      <v-select
          v-model=serverType
          :items="serverTypeItems"
          chips
          color="primary"
          label="Selection du type"
          multiple
      />
    </div>

    <div class="flex flex-wrap gap-28" v-if="servers">
      <ServerCard v-for="server in filteredServers" :server-id="server.name" :key="server.name"/>
    </div>
    <div v-else class="flex justify-center">
      <v-progress-circular :size="50" :width="5" color="primary" indeterminate/>
    </div>
  </View>
</template>

