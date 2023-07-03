<script lang="ts" setup>
import { LoggedPlayer } from "../../types/LoggedPlayer";
import { usePlayer } from "../../composables/usePlayer";
import { ServerTypes } from "../../enums/ServerTypes";
import { onMounted, ref } from "vue";
import DynamicPlayerInfo from "../../types/DynamicPlayerInfo";
import { storeToRefs } from "pinia";
import { usePlayerModalsStore } from "../../stores/player-modals.store";
import { isATimedSanctionActive } from "../../utils/sanctions.utils";

interface Props {
  player: LoggedPlayer,
  serverType: string
}

const { player, serverType } = defineProps<Props>();

const dynamicInfo = ref<DynamicPlayerInfo>();
const sanctions = ref();

const { redirectToPage, nextStep, skipQuest, reloadQuest, getDynamicInfo, getSanctions } = usePlayer(player.uuid);
const { options } = storeToRefs(usePlayerModalsStore());
const { handleBan, handleMute, handleKick, handleUnban, handleUnmute } = usePlayerModalsStore();

onMounted(async () => {
  sanctions.value = await getSanctions();
})

const handleClick = async () => {
  if (serverType === ServerTypes.MMO) {
    dynamicInfo.value = await getDynamicInfo();
  }
}
</script>

<template>
  <v-list-item
      v-if="sanctions"
      class="p-2 w-full text-center cursor-pointer"
      @click="handleClick"
  >
    {{ player.name }}
    <v-menu
        activator="parent"
        density="compact"
        location="start"
    >
      <v-list density="compact">
        <div v-if="dynamicInfo" class="text-sm">
          <v-list-subheader>Informations</v-list-subheader>
          <v-list-item>
            <p>{{ dynamicInfo.house }}</p>
            <p>{{ dynamicInfo.blood }}</p>
            <p>Lvl - {{ dynamicInfo.level }}</p>
            <p>{{ dynamicInfo.quest ? dynamicInfo.quest.id : 'Aucune quête' }}</p>
          </v-list-item>
        </div>
        <v-list-item title="Aller à la page" @click="redirectToPage"/>
        <v-list-subheader>Modération</v-list-subheader>
        <v-list-item
            v-if="!isATimedSanctionActive(sanctions.bans)"
            title="Bannir"
            @click="handleBan(player.uuid, player.name)"
        />
        <v-list-item
            v-if="!isATimedSanctionActive(sanctions.mutes)"
            title="Mute"
            @click="handleMute(player.uuid, player.name)"
        />
        <v-list-item
          v-else
          title="Annuler le mute"
          @click="handleUnmute(player.uuid, player.name)"
        />
        <v-list-item
          title="Kick"
          @click="handleKick(player.uuid, player.name)"
        />
        <div v-if="serverType === ServerTypes.MMO">
          <v-list-subheader>Quêtes</v-list-subheader>
          <v-list-item title="Reload la quête" @click="reloadQuest"/>
          <v-list-item title="Passer l'étape" @click="nextStep"/>
          <v-list-item title="Passer la quête" @click="skipQuest"/>
        </div>
      </v-list>
    </v-menu>
  </v-list-item>
</template>
