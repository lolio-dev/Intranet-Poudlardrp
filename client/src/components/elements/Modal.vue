<script lang="ts" setup>
import { CSSProperties } from "vue";

interface Props {
  title: string;
  width?: string;
  height?: string;
  contentClass?: string;
}

interface Emits {
  (e: 'close'): void
}

const {
  title,
  width = "60%",
  height = 'fit-content',
  contentClass
} = defineProps<Props>();
const emit = defineEmits<Emits>();

const closeModal = () => {
  emit('close');
}

const style: CSSProperties = {
  width, height
}
</script>

<template>
  <teleport to="body">
    <div
        class="backdrop"
        :class="$attrs.class"
        @click.self="closeModal"
    >
      <div
          class="modal p-6 rounded-md flex flex-col bg-[#ffffff]"
          :style="style"
      >
        <header>
          <slot name="header">
            <h1 class="text-4xl mb-4">{{ title }}</h1>
          </slot>
        </header>
        <div class="h-full" :class="contentClass">
          <slot/>
        </div>
        <footer class="flex justify-end gap-4 mt-3">
          <slot name="actions"/>
        </footer>
      </div>
    </div>
  </teleport>
</template>


<style scoped lang="scss">
.backdrop {
  z-index: 1010;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  max-height: 95vh;
}
</style>
