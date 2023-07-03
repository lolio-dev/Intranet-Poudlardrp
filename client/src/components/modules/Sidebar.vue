<script lang='ts' setup>
import { useSidebarStore } from "../../stores/sidebar.store";
import NavItem from "../elements/NavItem.vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import { useUserStore } from "../../stores/user.store";
import { Roles } from "../../enums/Roles";

const { sidebar } = storeToRefs(useSidebarStore());
const router = useRouter();
const routes = new Map();

const { user } = storeToRefs(useUserStore());

onMounted(() => {
  router.options.routes[0].children?.forEach(route => {
    if (
      route.meta &&
      route.meta.category
    ) {
      const existingCategory = routes.get(route.meta.category);
      if (!route.meta.roles || (route.meta.roles && route.meta.roles?.some((role: Roles) => user.value!.roles.includes(role)))) {
        routes.set(route.meta.category, existingCategory ? existingCategory.concat([route]) : [route]);
      }
    }
  })
})
</script>

<template>
  <v-navigation-drawer
      v-model="sidebar"
      temporary
  >
    <v-list density="compact">
      <div v-for="[index, values] in routes">
        <v-list-subheader v-if="index != 'null'">{{ index }}</v-list-subheader>
        <NavItem
            v-for="route in values"
            :icon="route.meta.icon"
            :label="route.meta.label"
            :to="route.name"
        />
      </div>
    </v-list>

  </v-navigation-drawer>
</template>
