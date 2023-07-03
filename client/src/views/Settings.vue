<script setup lang="ts">
import View from '@/views/View.vue'
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useFetch } from '../composables/useFetch';
import { useSnackbarStore } from '../stores/snackbar.store';
import { useUserStore } from '../stores/user.store';

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const { setSnackbarTo } = useSnackbarStore();

const nickname = ref(user.value?.mcNickname);
const uuid = ref(user.value?.uuid);
const errUuid = ref();
const errNickname = ref();
const isMinecraftLinked = ref(!!user.value?.uuid)

const sendNickname = async () => {
  if(nickname.value) {
    const res = await useFetch(`/mojang/decodeUsername/${nickname.value}`);
    uuid.value = res.data?.uuid;
  }
  errNickname.value = uuid.value ? "" : "Pseudo Minecraft introuvable";
}

const sendUUID = async () => {
  if(uuid.value) {
    const res = await useFetch(`/mojang/decodeUUID/${uuid.value}`);
    nickname.value = res.data?.nickname;
  }
  errUuid.value = nickname.value ? "" : "UUID Minecraft introuvable";
}

const checkValues = () => {
  if (uuid.value) {
    errUuid.value = errUuid.value?.includes("introuvable") ? errUuid.value : "";
  }
  if (nickname.value) {
    errNickname.value = errNickname.value?.includes("introuvable") ? errNickname.value : "";
  }

  return !errUuid.value && !errNickname.value;
}

const submit = async () => {
  await sendUUID();
  await sendNickname();
  if(checkValues()) {
    setSnackbarTo(false);
    isMinecraftLinked.value = true;
    userStore.patch({
      mcNickname: nickname.value,
      uuid: uuid.value
    })
  }
}

</script>

<template>
  <View>
    <v-navigation-drawer permanent>
      <v-list density="compact" nav>
        <v-list-item title="Profil" value="profil"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <div class="flex justify-between">
      <div>
        <h1 class="text-3xl mb-8">{{user?.nickname}}</h1>
        <v-form class="flex flex-col gap-y-4" @submit.prevent="submit">
          <v-text-field
            class="w-96 test"
            label="Email"
            variant="outlined"
            :model-value="user?.email"
            disabled>
          </v-text-field>
          <v-text-field
            v-model="nickname"
            class="w-96"
            label="Pseudo Minecraft"
            variant="outlined"
            append-inner-icon="md:downloading"
            @click:append-inner="sendNickname"
            :error-messages="errNickname"
            :disabled="isMinecraftLinked">
          </v-text-field>
          <v-text-field
          v-model="uuid"
            class="w-96 test"
            label="UUID"
            variant="outlined"
            append-inner-icon="md:downloading"
            @click:append-inner="sendUUID"
            :error-messages="errUuid"
            :disabled="isMinecraftLinked"
            >
          </v-text-field>
          <v-text-field
            class="w-96 test"
            label="Pseudo Discord"
            variant="outlined"
            model-value="">
          </v-text-field>
          <v-btn
          block
          color="primary"
          size="large"
          type="submit"
          variant="elevated"
        >
          Envoyer
        </v-btn>
        </v-form>
      </div>
    </div>
  </View>
</template>

<style scoped lang="scss">
</style>

