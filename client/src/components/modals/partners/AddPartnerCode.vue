<script lang='ts' setup>
import { ModalProps } from "../../../types/ModalProps";
import { ModalEmits } from "../../../types/ModalEmits";
import Modal from "../../elements/Modal.vue";
import { ref, toRef } from "vue";
import { useFetch } from "../../../composables/useFetch";
import { web_api_uri } from "../../../constants";
interface Props extends ModalProps {
  uuid?: string
}

interface Emits extends ModalEmits {
  (e: 'partnerCode:added'): void
}


const props = defineProps<Props>();
const uuid = toRef(props, 'uuid');

const emit = defineEmits<Emits>();

const codeId = ref<string>("");
const percentage = ref<string>("");
const discount = ref<string>("");

const handleAdd = () => {
  useFetch(`/partner_code`, 'POST', { data: {
      codeId: codeId.value,
      uuid: uuid.value,
      percentage: parseInt(percentage.value),
      discount: parseInt(discount.value)
    }}, web_api_uri)
  .then(() => {
    emit('partnerCode:added')
  })
  .finally(() => {
    emit('update:modelValue', false)
  })
}

const checkPercentage = () => {
  return percentage.value && /^\d+$/.test(percentage.value) && discount.value && /^\d+$/.test(discount.value)
}
</script>

<template>
  <Modal
      v-if="modelValue"
      title="Ajouter code partenaire"
      @close="emit('update:modelValue', false)"
  >
    <v-text-field
        v-model="codeId"
        color="primary"
        label="Code"
    />
    <v-text-field
        v-model="percentage"
        color="primary"
        label="Pourcentage"
    />
    <v-text-field
      v-model="discount"
      color="primary"
      label="Pourcentage"
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
          :disabled="!codeId || !checkPercentage()"
          color="primary"
          @click="handleAdd"
      >
        Ajouter
      </v-btn>
    </template>
  </Modal>
</template>
