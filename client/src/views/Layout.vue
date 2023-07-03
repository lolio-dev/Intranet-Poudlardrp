<script setup lang='ts'>
import Appbar from "@/components/modules/Appbar.vue";
import Sidebar from '@/components/modules/Sidebar.vue';
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useUserStore } from "../stores/user.store";

const { loadUser } = useUserStore();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

onMounted(() => {
  loadUser();
})

</script>

<template>
    <v-main v-if="user" class="flex flex-col">
      <Appbar/>

      <div class="flex w-screen">
        <Sidebar/>
        <router-view/>
      </div>
    </v-main>
    <v-main v-else class="flex items-center justify-center">
      <v-progress-circular :size="75" :width="7" indeterminate color="primary"/>
    </v-main>
</template>

<style scoped>

</style>
