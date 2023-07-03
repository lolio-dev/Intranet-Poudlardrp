/// <reference types="vite/client" />

import 'vue-router';
import { Roles } from "./enums/Roles";
import { SidebarCategories } from "./enums/SidebarCategories.enum";

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue-router' {
  interface RouteMeta {
    icon: string,
    roles?: Roles[],
    category: SidebarCategories,
    label?: string
  }
}

interface ImportMetaEnv {
  readonly VITE_INTRANET_API_URI: string
  readonly VITE_WEB_API_URI: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
