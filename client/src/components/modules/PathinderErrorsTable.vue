<script setup lang="ts">
import { capitalize } from "lodash"

interface Props {
  namespace: string;
  keys: string[];
}

interface Emit {
  (e: 'select', key: string): void
}

const {} = defineProps<Props>();
const emit = defineEmits<Emit>();
</script>

<template>
  <div class="w-1/2">
    <h3 class="text-2xl">{{ capitalize(namespace) }}</h3>
    <v-table>
      <thead>
      <tr>
        <th class="text-left">Index</th>
        <th class="text-left">key</th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="(key, index) in keys"
          :key="key"
          class="cursor-pointer"
          @click="emit('select', key)"
      >
        <td>{{ index }}</td>
        <td>{{ key }}</td>
      </tr>
      </tbody>
    </v-table>
  </div>
</template>
