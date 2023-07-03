<script lang='ts' setup>
import Appbar from "@/components/modules/Appbar.vue";
import Sidebar from '@/components/modules/Sidebar.vue';
import { storeToRefs } from "pinia";
import { useNavigate } from "../composables/useNavigate";
import { useSnackbarStore } from "../stores/snackbar.store";
import { useUserStore } from "../stores/user.store";

const userStore = useUserStore();
const { loadUser } = userStore;
const { user } = storeToRefs(userStore);
const { snackbar } = storeToRefs(useSnackbarStore())
</script>

<template>
  <v-main
      v-if="user"
      class="flex flex-col h-screen"
  >
    <Appbar/>
      <div class="flex w-screen">
        <Sidebar/>
        <router-view/>
      </div>
      <v-snackbar v-model="snackbar" :timeout="-1" color="primary">
        Veuillez complétez votre profil
        <template v-slot:actions>
          <v-btn
            variant="text"
            @click="useNavigate('settings')"
          > Paramètres </v-btn>
        </template>
      </v-snackbar>
    </v-main>
    <v-main v-else class="flex items-center justify-center">
      <v-progress-circular :size="75" :width="7" indeterminate color="primary"/>
    </v-main>
</template>
