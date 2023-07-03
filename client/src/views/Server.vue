<script lang='ts' setup>
import Logs from "../components/modules/Logs.vue";
import PlayerItem from "../components/elements/PlayerItem.vue";
import { useServersStore } from "../stores/servers.store";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";
import View from "./View.vue";
import { useLogs } from "../composables/useLogs";
import { LoggedPlayer } from "../types/LoggedPlayer";
import { useNavigate } from "../composables/useNavigate";

interface Props {
  serverId: string;
}

const { serverId } = defineProps<Props>();

const serversStore = useServersStore()
const { loadServers, setSelectedServerId, sendMessageToSelectedServer } = serversStore;
const { selectedServer: server } = storeToRefs(serversStore);

const messageValue = ref<string>("");
const searchPlayerValue = ref<string>("");

const { logs, loadLogs } = useLogs({
  serverName: serverId,
  limit: 50,
  env: 'development',
  instanceType: '',
  interval: 2000
});

onMounted(() => {
  loadServers();
  setSelectedServerId(serverId);

  loadLogs();
});

const sendMessage = async () => {
  await sendMessageToSelectedServer(messageValue.value);
  messageValue.value = ""
};

const filteredPlayers = computed(() => {
  if (server.value?.state.customData.players) {
    return server.value.state.customData.players.filter((p: LoggedPlayer) => p.name.includes(searchPlayerValue.value));
  }
  return []
})
</script>

<template>
  <View
      :title="serverId"
  >
    <v-breadcrumbs class="-mt-6">
      <v-breadcrumbs-item class="cursor-pointer hover:underline" @click="useNavigate('servers')">Servers
      </v-breadcrumbs-item>
      <v-breadcrumbs-divider></v-breadcrumbs-divider>
      <v-breadcrumbs-item disabled>{{ serverId }}</v-breadcrumbs-item>
    </v-breadcrumbs>
    <div v-if="server">
      <div class="flex justify-between overflow-hidden server-content">
        <Logs v-if="logs" :logs="logs"/>
        <div
            class="border border-gray w-[37%] p-2 flex flex-col justify-between h-full"
        >
          <div class="flex flex-col-reverse h-full overflow-auto">
            <p v-for="message in server.chat">{{ message.message }}</p>
          </div>
          <v-text-field
              v-model="messageValue"
              hide-details
              label="Envoyer un message"
              @keyup.enter="sendMessage"
              class="mt-2"
          />
        </div>
        <div class="border border-[#e0e0e0] text-lg flex flex-col w-[10%] overflow-auto h-full">
          <div class="p-2">
            <v-text-field
                v-model="searchPlayerValue"
                density="compact"
                hide-details
                label="Rechercher"
            />
          </div>
          <v-list v-if="filteredPlayers.length" class="overflow-auto">
            <PlayerItem v-for="player in filteredPlayers" :player="player" :server-type="server.serverType"/>
          </v-list>
          <p v-else class="text-base flex justify-center">Aucun joueur</p>
        </div>
      </div>
    </div>
    <div v-else class="flex justify-center">
      <v-progress-circular :size="50" :width="5" color="primary" indeterminate/>
    </div>
  </View>
</template>

<style scoped>
.server-content {
  height: calc(100vh - 235px);
}
</style>
