<script lang='ts' setup>
import { ModalProps } from "../../../types/ModalProps";
import { ModalEmits } from "../../../types/ModalEmits";
import Modal from "../../elements/Modal.vue";
import { onMounted, ref } from "vue";
import { useFetch } from "../../../composables/useFetch";
import { web_api_uri } from "../../../constants";
import { Player } from "../../../types/Player";

interface Emits extends ModalEmits {
  (e: 'partner:added'): void
}

defineProps<ModalProps>();

const emit = defineEmits<Emits>();

const players = ref<Player[]>()
const uuid = ref<string>("");
const stripeId = ref<string>("");

const handleAdd = () => {
  useFetch(`/profile/partners/${uuid.value}`, 'POST', { data: { stripeId: stripeId.value }}, web_api_uri)
  .then(() => emit('partner:added'))
  .finally(() => emit('update:modelValue', false))
}

onMounted(() => {
  useFetch<Player[]>(`/profile/all`, 'GET', {}, web_api_uri)
  .then((playersResponse) => {
    players.value = playersResponse.data;
  })
})

</script>

<template>
  <Modal
      v-if="modelValue"
      title="Ajouter code partenaire"
      @close="emit('update:modelValue', false)"
  >
    <v-select
      v-model="uuid"
      label="Utilisateur"
      :items="players"
      item-title="email"
      item-value="uuid"
    ></v-select>
    <v-text-field
        v-model="stripeId"
        color="primary"
        label="StripeID"
    />
    <template #actions>
      <v-btn
          color="primary"
          variant="outlined"
          @click="emit('update:modelValue', false)"
      >
        Annuler
      </v-btn>
      <v-btn
          :disabled="!uuid || !stripeId"
          color="primary"
          @click="handleAdd"
      >
        Ajouter
      </v-btn>
    </template>
  </Modal>
</template>