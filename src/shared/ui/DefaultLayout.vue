<script setup lang="ts">
import { computed, ref, useSlots } from "vue"
import { getMonochromeHex } from "../lib/tailwind-property-getter"
import { useColorMode } from "@vueuse/core"

const props = withDefaults(
  defineProps<{
    sidebarWidth?: string
    activeSidebarDefault?: boolean
    forceDark?: boolean
  }>(),
  {
    sidebarWidth: "320px",
    activeSidebarDefault: false,
  }
)

const mode = useColorMode()

defineExpose({
  setSidebarState,
})

const backgroundColor = computed(() => {
  if (props.forceDark) return getMonochromeHex(9)

  return mode.value === "light"
    ? getMonochromeHex(1)
    : mode.value === "dark"
      ? getMonochromeHex(9)
      : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? getMonochromeHex(9)
        : getMonochromeHex(1)
})

const activeSidebar = ref(props.activeSidebarDefault)

const slots = useSlots()

const hasFirstSidebar = computed(() => !!slots.sidebarA)
const hasSecondSidebar = computed(() => !!slots.sidebarB)
const hasLeftSidebar = computed(() => !!slots.sidebarLeft)

function setSidebarState(val: boolean | null) {
  if (val === null) {
    activeSidebar.value = !activeSidebar.value
    return
  }

  activeSidebar.value = val
}
</script>

<template>
  <div class="ui-layout-container dark:border dark:border-l-0 dark:border-t-0 border border-monochrome-4 dark:border-monochrome-9.5">
    <aside
      v-if="hasLeftSidebar"
      aria-label="Main Layout left sidebar"
      style="overflow-y: auto"
      :class="{ active: !!activeSidebar }"
    >
      <slot
        name="sidebarLeft"
        :active-sidebar="activeSidebar"
        :set-sidebar-state="setSidebarState"
      />
    </aside>

    <main style="overflow-y: auto">
      <slot
        name="main-content"
        :active-sidebar="activeSidebar"
        :set-sidebar-state="setSidebarState"
      />
    </main>

    <aside
      v-if="hasSecondSidebar"
      aria-label="Main Layout second right sidebar"
      style="overflow-y: auto"
      :class="{ active: !!activeSidebar }"
    >
      <slot
        name="sidebarB"
        :active-sidebar="activeSidebar"
        :set-sidebar-state="setSidebarState"
      />
    </aside>

    <aside
      v-if="hasFirstSidebar"
      aria-label="Main Layout first right sidebar"
      style="overflow: auto"
      :class="{ active: !!activeSidebar }"
    >
      <slot
        name="sidebarA"
        :active-sidebar="activeSidebar"
        :set-sidebar-state="setSidebarState"
      />
    </aside>
  </div>
</template>

<style>
.ui-layout-container {
  min-height: calc(100dvh - 16px);
  overflow: auto;
  border-radius: 16px;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 1px;
}

.ui-layout-container .block-c {
  display: flex;
  gap: 3px;
  flex-wrap: wrap;
}

.ui-layout-container main {
  display: flex;
  flex-direction: column;
  flex: 1 0 0px;
  gap: 1px;
}

.ui-layout-container main .q-panel {
  background: unset !important;
}

.ui-layout-container main .no-bg {
  background: unset;
}

.ui-layout-container main .type-fix {
  flex-grow: 0 !important;
  flex-basis: unset !important;
}

.ui-layout-container main .no-padding {
  padding: 0;
}

.ui-layout-container main > div {
  padding: 1.5rem 1.5rem 1rem 1.5rem;
  background: v-bind(backgroundColor);
}

.ui-layout-container main > div > div:only-child {
  overflow-x: auto;
}

.ui-layout-container main > div:last-of-type {
  flex: 1;
}

.ui-layout-container main .type-two {
  background: local;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 1px;
  padding: unset;
}

.ui-layout-container main .type-two > div {
  background: v-bind(backgroundColor);
  flex: 1 0 0;
}

.ui-layout-container aside {
  transition: width 0.3s ease-in-out;
  width: 0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  gap: 1px;
}

.ui-layout-container aside > div {
  background: v-bind(backgroundColor);
  display: flex;
  flex-direction: column;
}

.ui-layout-container aside > div:last-child {
  flex: 1;
}

.ui-layout-container aside.active {
  width: v-bind(sidebarWidth);
}
</style>
