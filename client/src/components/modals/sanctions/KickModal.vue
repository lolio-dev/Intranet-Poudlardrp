<script lang='ts' setup>
import { ref } from "vue";
import Modal from "../../elements/Modal.vue";
import { usePlayer } from "../../../composables/usePlayer";
import { ModalProps } from "../../../types/ModalProps";
import { ModalEmits } from "../../../types/ModalEmits";
import { storeToRefs } from "pinia";
import { usePlayerModalsStore } from "../../../stores/player-modals.store";
import { requiredValue } from "../../../utils/form-rules";

const { modelValue } = defineProps<ModalProps>();
const emit = defineEmits<ModalEmits>();

const { options } = storeToRefs(usePlayerModalsStore());
const reason = ref<string>("");

const validateKick = () => {
  if (options.value?.playerId && reason.value) {
    const { kickPlayer } = usePlayer(options.value.playerId);
    kickPlayer(reason.value);
    emit('update:modelValue', false);
  }
}

</script>

<template>
  <Modal
      :title="`Kick ${options ? options.playerName : 'player'}`"
      @close="emit('update:modelValue', false)"
      v-if="modelValue"
  >
    <div>
      <v-form id="kick-form" @submit.prevent="validateKick">
        <v-textarea v-model="reason" label="Raison" :rules="[requiredValue]"/>
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
          type="submit"
          form="kick-form"
      >
        Kick
      </v-btn>
    </template>
  </Modal>
</template>
