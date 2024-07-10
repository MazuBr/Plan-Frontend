import { createMemoryHistory, createRouter, RouteRecordRaw } from "vue-router";

type Subjects = "task" | "calendar" | "settings";

declare module "vue-router" {
  interface RouteMeta {
    label: string;
    visible: boolean;
    breadCrumb: string;
    protection?: Subjects[];
    icon?: string;
    breadCrumbExtra?: string[];
    layoutOverride?: "AuthLayout" | "MainLayout" | "EditorLayout";
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    component: () => import("../login/LoginPage.vue"),
    meta: {
      label: "Авторизация",
      breadCrumb: "Авторизация",
      visible: false,
      layoutOverride: "AuthLayout",
    },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../dashboard/Dashboard.vue"),
    meta: {
      breadCrumb: "Дашборд",
      label: "Дашборд",
      visible: true,
    },
  },
  {
    // path: "*",
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: () => import("../not-found/PageNotFound.vue"),
  },
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
