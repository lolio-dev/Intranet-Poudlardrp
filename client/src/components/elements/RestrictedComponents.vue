<script setup lang="ts">
interface Props {
  restrictedLinks: string[]
}

const { restrictedLinks } = defineProps<Props>();
const pathname = window.location.pathname;
</script>

<template>
  <slot v-if="!restrictedLinks.includes(pathname)" />
</template>
