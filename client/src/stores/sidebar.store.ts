import { defineStore } from "pinia";
import { ref } from "vue";

export const useSidebarStore = defineStore('sidebar', () => {
  const sidebar = ref<boolean>(false);

  const toggleSidebar = () => {
    sidebar.value = !sidebar.value;
  }

  return { sidebar, toggleSidebar }
});
