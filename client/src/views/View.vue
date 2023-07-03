<script setup lang='ts'>
interface Props {
  title?: string;
  subtitle?: string;
}

const { title, subtitle } = defineProps<Props>()
</script>

<template>
  <main class="w-screen px-20 py-8">
    <header>
      <h1 class="text-5xl" v-if="title">{{ title }}</h1>
      <h3 class="text-lg text-gray-500" v-if="subtitle">{{ subtitle }}</h3>
    </header>
    <section class="mt-6">
      <slot />
    </section>
  </main>
</template>
