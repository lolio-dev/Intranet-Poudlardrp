<script setup lang="ts">
import { computed } from 'vue';
import { stringDateRelative } from '../../utils/relativeDate';

const { data } = defineProps<{
  data: {
    content: string;
    poster: {
      username: string;
      avatar: string;
    }
    when: Date;
  }
}>();

const emit = defineEmits<{
  (e: 'delete'): void;
}>();

const stringifiedDate = computed(() => {
  const date = new Date(data.when);
  return stringDateRelative(date);
});
</script>

<template>
  <div class="flex items-start mb-4 max-w-full">
    <div class="flex-none flex flex-col items-center space-y-1 mr-4">
      <img class="rounded-full w-10 h-10" :src="data.poster.avatar" />
      <a href="#" class="block text-xs hover:underline">{{ data.poster.username }}</a>
    </div>
    <div class="flex-1 bg-teal-600 text-white p-2 rounded-lg relative overflow-ellipsis max-w-7xl break-words">
      <div class="ml-1">{{ data.content }}</div>
      <div class="absolute bottom-1 right-2 text-xs opacity-60">{{ stringifiedDate }}</div>
      <div class="absolute left-0 top-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-teal-600"></div>
    </div>
    <div class="flex-none flex flex-col items-center justify-center space-y-1 ml-2 mt-2">
      <v-icon class="cursor-pointer text-black opacity-30 hover:opacity-100" icon="md:delete" @click="emit('delete')" />
    </div>
  </div>
</template>