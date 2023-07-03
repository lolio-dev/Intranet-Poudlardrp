<script lang="ts" setup>
import EditProhibitedWordModal from "./components/modals/prohibited-words/EditProhibitedWordModal.vue";
import { storeToRefs } from "pinia";
import { useProhibitedWordStore } from "./stores/prohibited-word.store";
import AddProhibitedWordModal from "./components/modals/prohibited-words/AddProhibitedWordModal.vue";
import { usePlayerModalsStore } from "./stores/player-modals.store";
import MuteModal from "./components/modals/sanctions/MuteModal.vue";
import KickModal from "./components/modals/sanctions/KickModal.vue";
import BanModal from "./components/modals/sanctions/BanModal.vue";
import PlayerConnectionTimeModal from "./components/modals/PlayerConnectionTimeModal.vue";
import UnbanModal from "./components/modals/sanctions/UnbanModal.vue";
import UnmuteModal from "./components/modals/sanctions/UnmuteModal.vue";

const { selectedWord, showEditWordModal, showAddWordModal } = storeToRefs(useProhibitedWordStore());
const { modalsState } = storeToRefs(usePlayerModalsStore())
</script>

<template>
  <v-app>
    <router-view/>

    <!-- Prohibited words -->
    <EditProhibitedWordModal v-if="selectedWord" v-model="showEditWordModal"/>
    <AddProhibitedWordModal v-model="showAddWordModal"/>

    <!-- Sanctions -->
    <KickModal v-model="modalsState.showKickModal"/>
    <BanModal v-model="modalsState.showBanModal"/>
    <MuteModal v-model="modalsState.showMuteModal"/>
    <UnbanModal v-model="modalsState.showUnbanModal"/>
    <UnmuteModal v-model="modalsState.showUnmuteModal"/>

    <!-- Temps de connexion  -->
    <PlayerConnectionTimeModal v-model="modalsState.showConnectionTimeModal"/>
  </v-app>
</template>

<style>

</style>
