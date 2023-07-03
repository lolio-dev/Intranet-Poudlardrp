<script lang='ts' setup>
import { ref } from "vue";
import Modal from "../../elements/Modal.vue";
import { usePlayer } from "../../../composables/usePlayer";
import { ModalProps } from "../../../types/ModalProps";
import { ModalEmits } from "../../../types/ModalEmits";
import { storeToRefs } from "pinia";
import { usePlayerModalsStore } from "../../../stores/player-modals.store";
import { requiredValue } from "../../../utils/form-rules";
import { useToasts } from "../../../composables/useToasts";

const { modelValue } = defineProps<ModalProps>();
const emit = defineEmits<ModalEmits>();

const date = ref();
const reason = ref<string>("");

const { options } = storeToRefs(usePlayerModalsStore());
const { toastWarning } = useToasts();

const validateMute = () => {
  if (!date.value) {
    return toastWarning("Vous devez renseigner une date")
  }
  if (options.value?.playerId && reason.value && date.value) {
    const { mutePlayer } = usePlayer(options.value.playerId);

    mutePlayer(reason.value, (date.value?.getTime() - new Date().getTime()) / 1000);

    emit('update:modelValue', false);
  }
}
</script>

<template>
  <Modal
      v-if="modelValue"
      :title="`Muter ${options ? options.playerName : 'player'}`"
      @close="emit('update:modelValue', false)"
  >
    <v-form id="mute-form" @submit.prevent="validateMute">
      <v-textarea v-model="reason" :rules="[requiredValue]" label="Raison" required/>
      <Datepicker v-model="date" :min-date="new Date()" placeholder="Choisir la date de fin"/>
    </v-form>
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
          form="mute-form"
          type="submit"
      >
        Mute
      </v-btn>
    </template>
  </Modal>
</template>
