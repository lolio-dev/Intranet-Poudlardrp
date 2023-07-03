<script setup lang="ts">
import { mdiGoogle, mdiArrowLeftThin } from '@mdi/js'
import { onMounted } from 'vue';
import { useRoute } from "vue-router";
import { useToasts } from '../composables/useToasts';
import { intranet_api_uri } from '../constants';
import { getFromSessionStorage, saveToSessionStorage } from '../utils/sesionStorage';
import { Errors } from "../enums/Errors";
import { useUserStore } from '../stores/user.store';
import { useNavigate } from '../composables/useNavigate';

const route = useRoute();
const { getPersistantToken } = useUserStore();

onMounted( async () => {
  const storedToken = getFromSessionStorage("accessToken");
  const queryToken = route.query.access_token?.toString();
  const error = route.query.error?.toString();

  if(storedToken) useNavigate('dashboard')

  if( error ) useToasts().toastError(Errors[error as keyof typeof Errors])

  if(queryToken) {
    const accessToken = await getPersistantToken(queryToken);
    if( accessToken )  {
      saveToSessionStorage({ accessToken });
      useNavigate('dashboard')
    }
  }
})

const connect = () => {
  window.location.href = `${intranet_api_uri}/auth`
}
</script>

<template>
  <main class="main flex h-screen justify-center items-center">
    <img
      class="absolute w-full h-full object-cover z-0"
      src="@/assets/backgrounds/login_background.webp"
      alt="Background that represent the Diagon Alley"
    >
    <div class="modal rounded">
      <img class="block w-1/3" src="@/assets/logo.svg" alt="Wizard Universe logo">
      <v-btn @click="connect" color="primary" class="w-5/6 font-bold">
        <v-icon start :icon="mdiGoogle" /> Connexion
      </v-btn>
      <div class="flex text-white self-end link">
        <v-icon left :icon="mdiArrowLeftThin" />
        <a class="underline" href="https://poudlardrp.fr">Se rendre sur le site</a>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.main {
  user-select: none;
}
.modal {
  @apply
    flex flex-col justify-between items-center
    px-8 py-8 md:w-2/6 sm:w-3/6 w-5/6 h-4/6
    bg-white/40 z-10 drop-shadow-lg
}
.underline {
  position: relative;
  text-decoration: none;
}

.underline::before {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 0;
  height: 1px;
  background-color: #fff;
  transition: width 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}

@media (hover: hover) and (pointer: fine) {
  .underline:hover::before {
    left: 0;
    right: auto;
    width: 100%;
  }
}
</style>

