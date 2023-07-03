<script lang='ts' setup>
import { ref } from "vue";
import Modal from "../../elements/Modal.vue";
import { ModalProps } from "../../../types/ModalProps";
import { ModalEmits } from "../../../types/ModalEmits";
import { storeToRefs } from "pinia";
import { usePlayerModalsStore } from "../../../stores/player-modals.store";
import { requiredValue } from "../../../utils/form-rules";
import { useToasts } from "../../../composables/useToasts";
import { usePlayer } from "../../../composables/usePlayer";

const { modelValue } = defineProps<ModalProps>();
const emit = defineEmits<ModalEmits>();

const date = ref<Date>();
const reason = ref<string>("");
const isDefinitive = ref<boolean>(false);

const { options } = storeToRefs(usePlayerModalsStore());
const { toastWarning } = useToasts();

const validateBan = () => {
  if (!date.value && !isDefinitive.value) {
    return toastWarning("Vous devez renseigner une date")
  }
  if (options.value?.playerId && reason.value && (date.value || isDefinitive)) {
    const { banPlayer, banDefPlayer } = usePlayer(options.value.playerId);

    if (isDefinitive.value) {
      banDefPlayer(reason.value);
    } else {
      banPlayer(reason.value, (date.value?.getTime() - new Date().getTime()) / 1000);
    }

    emit('update:modelValue', false);
  }
}
</script>

<template>
  <Modal
      v-if="modelValue"
      :title="`Bannir ${options ? options.playerName : 'player'}`"
      @close="emit('update:modelValue', false)"
  >
    <v-form id="ban-form" @submit.prevent="validateBan">
      <v-textarea v-model="reason" :rules="[requiredValue]" label="Raison" required/>
      <v-switch v-model="isDefinitive" color="primary" density="compact" label="Définitif"/>
      <div v-if="!isDefinitive">
        <Datepicker v-model="date" :min-date="new Date()" placeholder="Choisir la date de fin" required/>
      </div>
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
          form="ban-form"
          type="submit"
      >
        Bannir
      </v-btn>
    </template>
  </Modal>
</template>
