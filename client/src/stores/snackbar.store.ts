import { defineStore } from "pinia";
import { ref } from "vue";

export const useSnackbarStore = defineStore('snackbar', () => {
  const snackbar = ref<boolean>(false);

  const setSnackbarTo = (value: boolean) => {
    snackbar.value = value;
  }

  return { snackbar, setSnackbarTo }
});
