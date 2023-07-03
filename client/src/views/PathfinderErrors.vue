<script setup lang="ts">
import View from "./View.vue";
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import GpsErrorModal from "../components/modals/PathfinderErrorModal.vue";
import { usePathfinderStore } from "../stores/pathfinder.store";
import PathinderErrorsTable from "../components/modules/PathinderErrorsTable.vue";

const pathfinderStore = usePathfinderStore();
const { keys } = storeToRefs(pathfinderStore);
const { loadKeys } = pathfinderStore;

const showDetailModal = ref<Boolean>();
const key = ref<string>();
const namespace = ref<string>();

const namespaces = ['dev', 'prod']

const router = useRouter();

onMounted(() => {
  loadKeys();
})

const handleSelect = (keyValue: string, namespaceValue: string) => {
  key.value = keyValue;
  namespace.value = namespaceValue;
  showDetailModal.value = true;
}

</script>

<template>
  <View
      title="Erreurs pathfinder"
  >
    <div v-if="keys" class="flex gap-16">
      <PathinderErrorsTable
          v-for="namespace in namespaces"
          :keys="keys[namespace]"
          :namespace="namespace"
          @select="handleSelect($event, namespace)"
      />
    </div>
  </View>
  <GpsErrorModal v-model="showDetailModal" :namespace="namespace"  :keyString="key"/>
</template>

<style scoped>

</style>