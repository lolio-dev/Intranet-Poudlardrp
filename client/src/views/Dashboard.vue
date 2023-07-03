<script lang="ts" setup>
import View from '@/views/View.vue'
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user.store";

const { user } = storeToRefs(useUserStore());
</script>

<template>
  <View
      :subtitle="`Bonne journée, ${user?.nickname}`"
      title="Dashboard"
  >
  </View>
</template>
