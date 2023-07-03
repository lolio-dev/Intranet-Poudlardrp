<script setup lang='ts'>
import { useNavigate } from '../../composables/useNavigate';

interface Props {
  to: string;
  label: string;
  icon: string;
}

const { to, label, icon } = defineProps<Props>();

</script>

<template>
  <v-list-item
      @click="useNavigate(to)"
      :prepend-icon="icon"
      :title="label"
  />
</template>

<style scoped>

</style>
