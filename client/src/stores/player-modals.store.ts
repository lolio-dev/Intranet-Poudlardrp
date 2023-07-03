import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const usePlayerModalsStore = defineStore('player-modals', () => {
  const modalsState = reactive({
    showMuteModal: false,
    showBanModal: false,
    showKickModal: false,
    showUnbanModal: false,
    showUnmuteModal: false,
    showConnectionTimeModal: false
  })

  const options = ref<{ playerId: string, playerName: string }>();

  const openPlayerModal = (sanction: 'ban' | 'kick' | 'mute' | 'unban' | 'unmute' | 'connectionTime') => {
    switch (sanction) {
      case "ban":
        return modalsState.showBanModal = true
      case "kick":
        return modalsState.showKickModal = true
      case "mute":
        return modalsState.showMuteModal = true
      case "unmute":
        return modalsState.showUnmuteModal = true
      case "unban":
        return modalsState.showUnbanModal = true
      case "connectionTime":
        return modalsState.showConnectionTimeModal = true
    }
  }

  const handleBan = (playerId: string, playerName: string) => {
    options.value = { playerId, playerName }
    openPlayerModal("ban")
  }

  const handleMute = (playerId: string, playerName: string) => {
    options.value = { playerId, playerName }
    openPlayerModal("mute")
  }

  const handleKick = (playerId: string, playerName: string) => {
    options.value = { playerId, playerName }
    openPlayerModal("kick")
  }

  const handleUnmute = (playerId: string, playerName: string) => {
    options.value = { playerId, playerName }
    openPlayerModal("unmute")
  }

  const handleUnban = (playerId: string, playerName: string) => {
    options.value = { playerId, playerName }
    openPlayerModal("unban")
  }

  return { modalsState, options, openPlayerModal, handleBan, handleMute, handleKick, handleUnmute, handleUnban }
});
