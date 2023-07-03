<script lang='ts' setup>
import { useSessions } from "../../composables/useSessions";
import Modal from "../elements/Modal.vue";
import { ModalProps } from "../../types/ModalProps";
import { ModalEmits } from "../../types/ModalEmits";
import { storeToRefs } from "pinia";
import { usePlayerModalsStore } from "../../stores/player-modals.store";

const { modelValue } = defineProps<ModalProps>()
const emit = defineEmits<ModalEmits>();

const { options } = storeToRefs(usePlayerModalsStore());

const { sessions, status, loadPlayerSessions, selectedDate } = useSessions();

const handleUpdate = async () => {
  await loadPlayerSessions(options.value?.playerId!);
}
</script>

<template>
  <Modal
      v-if="modelValue"
      height="60vh"
      title="Temps de connexion"
      @close="emit('update:modelValue', false)"
  >
    <div class="flex w-full gap-6">
      <div class="w-1/2">
        <Datepicker
            v-model="selectedDate"
            :enable-time-picker="false"
            @update:modelValue="handleUpdate"
        />
        <div class="mt-4">
          <p v-if="status">{{ status }}</p>
          <p v-for="session in sessions" v-else :key="session.id">
            {{ session.login.toDateString() }} -- {{ session.login.getHours() }}:{{ session.login.getMinutes() }} -
            {{ session.logout.getHours() }}:{{ session.logout.getMinutes() }}
          </p>
        </div>
      </div>
    </div>
    <template #actions>
      <v-btn
          color="primary"
          @click="emit('update:modelValue', false)"
      >Fermer
      </v-btn>
    </template>
  </Modal>
</template>
