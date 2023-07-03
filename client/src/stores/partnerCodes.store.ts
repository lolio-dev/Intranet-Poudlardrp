import { defineStore } from "pinia";
import { ref } from "vue";

export const usePartnerCodeStore = defineStore('prohibited-store', () => {
  const showAddCodeModal = ref<boolean>();
  return { showAddCodeModal }
})
