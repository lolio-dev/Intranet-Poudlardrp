<script setup lang="ts">
import { ModalProps } from "../../types/ModalProps";
import { ModalEmits } from "../../types/ModalEmits";
import { ref, toRef, watch } from "vue";
import { usePathfinderStore } from "../../stores/pathfinder.store";
import Modal from "../elements/Modal.vue";
import { AstarError } from "../../types/pathfinder/AstarError";

interface Props extends ModalProps {
  keyString?: string;
  namespace?: string;
}

const props = defineProps<Props>();

const key = toRef(props, 'keyString');
const namespace = toRef(props, 'namespace');

const emit = defineEmits<ModalEmits>();

const { getKey, formatTrace, formatLocation, formatCommand } = usePathfinderStore();

const keyData = ref<AstarError>();
const loading = ref<boolean>();

watch(() => key.value, async () => {
  if (key.value && namespace.value) {
    loading.value = true;
    keyData.value = await getKey(key.value!, namespace.value!);
    loading.value = false;
  }
})
</script>

<template>
    <Modal
        v-if="modelValue"
        title="Erreur gps"
        @close="emit('update:modelValue', false)"
        :loading="loading"
        width="50%"
        content-class="overflow-y-auto"
    >
      <div v-if="keyData">
        <p><b>Commande:</b> {{ formatCommand(keyData) }}</p>
        <p><b>Start:</b> {{ formatLocation(keyData.start) }}</p>
        <p><b>End:</b> {{ formatLocation(keyData.end) }}</p>
        <p class="font-bold mt-2">Trace</p>
        <div class="bg-[#e7e5e4] p-2 text-sm">
          <p v-for="trace in keyData.stackTrace">{{ formatTrace(trace) }}</p>
        </div>
        <v-expansion-panels class="flex mt-4 gap-6 p-2" multiple>
          <v-expansion-panel title="Neighbours" v-if="keyData.neighbours.length">
            <v-expansion-panel-text>
              <p v-for="neighbour in keyData.neighbours">{{ formatLocation(neighbour) }}</p>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel title="Nodes" v-if="keyData.nodes.length">
            <v-expansion-panel-text>
              <p v-for="node in keyData.nodes">{{ formatLocation(node) }}</p>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
      <template #actions>
        <v-btn @click="emit('update:modelValue', false)" color="primary">Fermer</v-btn>
      </template>
    </Modal>
</template>
