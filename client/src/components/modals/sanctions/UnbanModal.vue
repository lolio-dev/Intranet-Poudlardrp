<script lang='ts' setup>
import { ref } from "vue";
import Modal from "../../elements/Modal.vue";
import { usePlayer } from "../../../composables/usePlayer";
import { ModalProps } from "../../../types/ModalProps";
import { ModalEmits } from "../../../types/ModalEmits";
import { storeToRefs } from "pinia";
import { usePlayerModalsStore } from "../../../stores/player-modals.store";

const { modelValue } = defineProps<ModalProps>();
const emit = defineEmits<ModalEmits>();

const { options } = storeToRefs(usePlayerModalsStore());
const reason = ref<string>("");

const validateUnban = () => {
  if (options.value?.playerId) {
    const { unbanPlayer } = usePlayer(options.value.playerId);
    unbanPlayer(reason.value);
    emit('update:modelValue', false);
  }
}

</script>

<template>
  <Modal
      v-if="modelValue"
      :title="`Annuler le ban de ${options ? options.playerName : 'player'}`"
      @close="emit('update:modelValue', false)"
  >
    <div>
      <v-form id="unban-form" @submit.prevent="validateUnban">
        <v-textarea v-model="reason" label="Raison (peut être vide)"/>
      </v-form>
    </div>
    <template #actions>
      <v-btn
          color="primary"
          variant="outlined"
          @click="emit('update:modelValue', false)"
      >
        Annuler
      </v-btn>
      <v-btn
          color="primary"
          form="unban-form"
          type="submit"
      >
        Annuler le ban
      </v-btn>
    </template>
  </Modal>
</template>
