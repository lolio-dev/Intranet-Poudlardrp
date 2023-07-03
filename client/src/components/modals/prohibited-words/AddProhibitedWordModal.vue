<script lang='ts' setup>
import { ModalProps } from "../../../types/ModalProps";
import { ModalEmits } from "../../../types/ModalEmits";
import Modal from "../../elements/Modal.vue";
import { ref } from "vue";
import { useProhibitedWordStore } from "../../../stores/prohibited-word.store";

const { modelValue } = defineProps<ModalProps>();
const emit = defineEmits<ModalEmits>();

const { addWord } = useProhibitedWordStore();

const value = ref<string>("");
const replacementValue = ref<string>("");

const handleAdd = () => {
  addWord(value.value, replacementValue.value);
  value.value = "";
  replacementValue.value = "";
}
</script>

<template>
  <Modal
      v-if="modelValue"
      title="Ajouter un nouveau mot interdit"
      @close="emit('update:modelValue', false)"
  >
    <v-text-field
        v-model="value"
        color="primary"
        label="Valeur"
    />
    <v-text-field
        v-model="replacementValue"
        color="primary"
        label="Valeur de remplacement"
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
          :disabled="!value"
          color="primary"
          @click="handleAdd"
      >
        Ajouter
      </v-btn>
    </template>
  </Modal>
</template>

<style scoped>

</style>
