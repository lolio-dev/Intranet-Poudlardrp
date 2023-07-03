<script lang='ts' setup>
import { CSSProperties } from "vue";
import { OhVueIcon } from "oh-vue-icons";

interface Props {
  icon: string;
  title: string;
  subtitle: string;
  iconColor: string;
  backgroundColor: string;
}

const { icon, title, subtitle, iconColor, backgroundColor } = defineProps<Props>();

const style: CSSProperties = {
  backgroundColor: backgroundColor,
  color: iconColor
};
</script>

<template>
  <div class="flex h-16 shadow-lg rounded-lg">
    <div :style="style" class="rounded-l-lg w-14 flex justify-center items-center">
      <OhVueIcon :name="icon" class="w-8 h-8" />
    </div>
    <div class="flex flex-col justify-center gap-[0.5px] pl-4 pr-10">
      <h5 class="leading-none text-lg">{{ title }}</h5>
      <p class="text-gray-400 text-sm">{{ subtitle }}</p>
    </div>
  </div>
</template>
