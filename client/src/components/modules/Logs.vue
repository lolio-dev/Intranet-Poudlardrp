<script setup lang="ts">
import { Logs } from "../../types/Logs";
import { computed, ref } from "vue";
import { LogType } from "../../types/LogType";
import { LogTypes } from "../../enums/LogTypes";

interface Props {
  logs: Logs;
}

const props = defineProps<Props>();
const selectedLogsTypes = ref<LogType[]>(['error', 'warning', 'info']);

const logs = computed(() => props.logs);

const filteredLogs = computed(() => {
  return { ...logs, logs: logs.value.logs.filter((log: any) => selectedLogsTypes.value.includes(log.level))}
})
</script>

<template>
  <div
      class="border border-[#e0e0e0] p-2 w-1/2 overflow-auto"
  >
    <div class="flex">
      <v-select
          hide-details
          class="w-[350px] mb-2"
          v-model="selectedLogsTypes"
          :items="Object.values(LogTypes)"
          chips
          color="primary"
          label="Filtrer"
          multiple
          density="compact"
      />
    </div>
    <div v-if="filteredLogs.logs.length">
      <p v-for="log in filteredLogs.logs">{{ log.time }} - {{ log.message }}</p>
    </div>
    <p v-else>Aucun log à afficher</p>
  </div>
</template>


<style scoped>

</style>