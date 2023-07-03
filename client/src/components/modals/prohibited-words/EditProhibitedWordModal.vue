<script lang='ts' setup>
import { ModalProps } from "../../../types/ModalProps";
import { ModalEmits } from "../../../types/ModalEmits";
import Modal from "../../elements/Modal.vue";
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useProhibitedWordStore } from "../../../stores/prohibited-word.store";

const { modelValue } = defineProps<ModalProps>();
const emit = defineEmits<ModalEmits>();

const prohibitedWordStore = useProhibitedWordStore();
const { editWord } = prohibitedWordStore
const { selectedWord } = storeToRefs(prohibitedWordStore)

const value = ref(selectedWord.value?.value);
const replacementValue = ref(selectedWord.value?.replacementValue);

watch(selectedWord, () => {
  value.value = selectedWord.value?.value;
  replacementValue.value = selectedWord.value?.replacementValue;
});

const handleEdit = () => {
  editWord({
    id: selectedWord.value?.id!,
    value: value.value!,
    replacementValue: replacementValue.value!
  });
}
</script>

<template>
  <Modal
      v-if="modelValue"
      title="Modifier un mot interdit"
      @close="emit('update:modelValue', false)"
  >
    <v-text-field
        v-model="value"
        color="primary"
        placeholder="Valeur"
    />
    <v-text-field
        v-model="replacementValue"
        color="primary"
        placeholder="Valeur de remplacement"
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
          @click="handleEdit"
      >
        Modifier
      </v-btn>
    </template>
  </Modal>
</template>

<style scoped>

</style>
