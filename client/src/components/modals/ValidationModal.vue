<script setup lang='ts'>
import { ModalProps } from "../../types/ModalProps";
import { ModalEmits } from "../../types/ModalEmits";
import Modal from "../elements/Modal.vue";

interface Props extends ModalProps {
  title: string;
}

interface Emits extends ModalEmits {
  (e: 'valueValidated', value: boolean): void
}

const { modelValue, title } = defineProps<Props>();
const emits = defineEmits<Emits>();

const handleValidateValue = (value: boolean) => {
  emits('valueValidated', value);
  emits('update:modelValue', false);
}
</script>

<template>
  <Modal
      width="45%"
      v-if="modelValue"
      :title="title"
      @close="handleValidateValue(false)"
  >
    <template #actions>
      <v-btn
          @click="handleValidateValue(false)"
          color="error"
      >
        Annuler
      </v-btn>
      <v-btn
          @click="handleValidateValue(true)"
          color="success"
      >
        Valider
      </v-btn>
    </template>
  </Modal>
</template>


<style scoped>

</style>
