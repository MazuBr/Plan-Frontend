<script setup lang="ts">
import { computed, defineAsyncComponent } from "vue"
import { RouterView } from "vue-router"

import AuthLayout from "../shared/ui/AuthLayout.vue"
import MainLayout from "../shared/ui/MainLayout.vue"
import { useSessionState } from "../entities/user/model"

const session = useSessionState()

const layout: Record<
  "MainLayout" | "EditorLayout" | "AuthLayout",
  ReturnType<typeof defineAsyncComponent> | "div"
> = {
  EditorLayout: "div",
  AuthLayout: AuthLayout,
  MainLayout: MainLayout,
}
</script>

<template>
  <component
    :is="layout[$route.meta.layoutOverride || 'MainLayout']"
    v-if="session.isAuth"
  >
    <template #default>
      <router-view v-slot="{ Component }">
        <Suspense>
          <component :is="Component" />

          <template #fallback> Загрузка... </template>
        </Suspense>
      </router-view>
    </template>
  </component>

  <AuthLayout v-else>
    <router-view />
  </AuthLayout>
</template>
