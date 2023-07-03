import { createRouter, createWebHistory } from "vue-router";
import Dashboard from '@/views/Dashboard.vue';
import Login from '@/views/Login.vue';
import Main from '@/views/Main.vue';
import Player from '@/views/Player.vue';
import { base_path } from "../constants";
import Servers from '@/views/Servers.vue'
import Server from '@/views/Server.vue'
import Settings from '@/views/Settings.vue';
import Players from '@/views/Players.vue'
import ProhibitedWords from "@/views/ProhibitedWords.vue";
import PathfinderErrors from "@/views/PathfinderErrors.vue";
import News from "@/views/News.vue";
import Partners from "@/views/Partners.vue";
import { computed } from "vue";
import { Roles } from "../enums/Roles";
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user.store";
import { SidebarCategories } from "../enums/SidebarCategories.enum";

export const router = createRouter({
  history: createWebHistory(base_path),
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        {
          path: '',
          name: "dashboard",
          component: Dashboard,
          meta: {
            category: SidebarCategories.Null,
            icon: "md:dashboard",
            label: "Dashboard"
          }
        },
        {
          path: '/servers',
          name: 'servers',
          component: Servers,
          meta: {
            category: SidebarCategories.Moderation,
            icon: "md:dns",
            label: "Servers"
          }
        },
        {
          path: '/servers/:serverId',
          name: 'server',
          component: Server,
          props: true,
        },
        {
          path: 'players/:playerUUID',
          name: 'player',
          component: Player,
          props: true,
        },
        {
          path: '/settings',
          name: 'settings',
          component: Settings,
        },
        {
          path: '/players',
          name: 'players',
          component: Players,
          meta: {
            category: SidebarCategories.Moderation,
            icon: "md:person",
            label: "Joueurs"
          }
        },
        {
          path: '/prohibited-words',
          name: 'prohibited-words',
          component: ProhibitedWords,
          meta: {
            category: SidebarCategories.Moderation,
            icon: "md:password",
            label: "Mots interdits"
          },
        },
        {
          path: '/pathfinder',
          name: 'pathfinder',
          component: PathfinderErrors,
          meta: {
            category: SidebarCategories.Development,
            icon: "md:explore",
            label: "Erreurs pathfinder"
          }
        },
        {
          path: '/news',
          name: 'news',
          component: News,
          meta: {
            roles: [
              Roles.Admin
            ],
            category: SidebarCategories.Shop,
            icon: "md:feed",
            label: "News"
          },
        },
        {
          path: '/partners',
          name: 'partners',
          component: Partners,
          meta: {
            roles: [
              Roles.Admin
            ],
            category: SidebarCategories.Shop,
            icon: "md:handshake",
            label: "Partenaires"
          },
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
});

router.beforeEach(async (to, _) => {
  const userStore = useUserStore();
  const { user } = storeToRefs(userStore);
  const { loadUser } = userStore;

  if (to.name !== 'login') {
    await loadUser();

    if(user.value && to.meta.roles) {
      if (to.meta.roles.some((role: Roles) => user.value?.roles.includes(role))) {
        return true
      }
      return { name: 'dashboard' }
    }
  }
})

export const useRouteCustom = () => {
  const routeEffect = computed(() => router?.currentRoute || {})
  return { route: router?.currentRoute, routeEffect };
}
