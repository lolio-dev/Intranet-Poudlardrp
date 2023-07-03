<script lang='ts' setup>
import { useSidebarStore } from "../../stores/sidebar.store";
import { useUserStore } from "../../stores/user.store";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useNavigate } from "../../composables/useNavigate";

const { user } = storeToRefs(useUserStore());
const { logout } = useUserStore();
const { toggleSidebar } = useSidebarStore();

const getAltPicture = computed(() => `${user.value?.nickname} picture image`);

</script>

<template>
  <v-app-bar color="background" elevation="0" extension-height="1">
    <template #prepend>
      <v-app-bar-nav-icon @click="toggleSidebar"/>
    </template>
    <template #append>
      <v-menu>
        <template v-slot:activator="{ props }">
          <img :alt="getAltPicture" class="h-10 w-10 cursor-pointer mr-4 rounded-full"
               :src="user?.picture"
               v-bind="props"
               referrerpolicy="no-referrer"
          />
        </template>
        <v-list>
          <v-list-item>
            <div class="flex items-center mb-2">
              <img :alt="getAltPicture"
                   :src="user?.picture"
                   class="w-11 h-11 mr-3 rounded-full"
                   referrerpolicy="no-referrer"
              >
              <div>
                <v-list-item-title>{{ user?.nickname }}</v-list-item-title>
                <v-list-item-subtitle>{{ user?.email }}</v-list-item-subtitle>
              </div>
            </div>
          </v-list-item>
          <v-divider/>
          <v-list-item prepend-icon="md:settings" title="Paramètres" value="settings" @click="useNavigate('settings')"/>
          <v-list-item prepend-icon="md:logout" title="Se déconnecter" value="logout" @click="logout"/>
        </v-list>
      </v-menu>
    </template>
    <template #extension>
      <v-divider/>
    </template>
  </v-app-bar>
</template>
