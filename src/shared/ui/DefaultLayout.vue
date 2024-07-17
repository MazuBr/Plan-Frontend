<script setup lang="ts">
import { computed, ref, useSlots } from "vue";

const props = withDefaults(
  defineProps<{
    sidebarWidth?: string;
    activeSidebarDefault?: boolean;
    forceDark?: boolean;
  }>(),
  {
    sidebarWidth: "320px",
    activeSidebarDefault: false,
  }
);

defineExpose({
  setSidebarState,
});

const backgroundColor = computed(() => {
  if (props.forceDark)
    return getComputedStyle(document.body).getPropertyValue("--monochrome-9");

  return getComputedStyle(document.body).getPropertyValue("--monochrome-1");
});

const activeSidebar = ref(props.activeSidebarDefault);

const slots = useSlots();

const hasFirstSidebar = computed(() => !!slots.sidebarA);
const hasSecondSidebar = computed(() => !!slots.sidebarB);
const hasLeftSidebar = computed(() => !!slots.sidebarLeft);

function setSidebarState(val: boolean | null) {
  if (val === null) {
    activeSidebar.value = !activeSidebar.value;
    return;
  }

  activeSidebar.value = val;
}
</script>

<template>
  <div class="ui-layout-container">
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

<style lang="scss">
.ui-layout-container {
  min-height: calc(100dvh - 16px);
  overflow: auto;
  border-radius: 16px;
  width: 100%;

  display: flex;
  flex-direction: row;
  gap: 1px;

  & .block-c {
    display: flex;
    gap: 3px;
    flex-wrap: wrap;
  }

  main {
    display: flex;
    flex-direction: column;
    flex: 1 0 0px;

    gap: 1px;

    & .q-panel {
      background: unset !important;
    }

    & .no-bg {
      background: unset;
    }

    & .type-fix {
      flex-grow: 0 !important;
      flex-basis: unset !important;
    }

    & .no-padding {
      padding: 0;
    }

    > div {
      padding: 1.5rem 1.5rem 1rem 1.5rem;
      background: v-bind(backgroundColor);

      > div:only-child {
        overflow-x: auto;
      }
    }

    > div:last-of-type {
      flex: 1;
    }

    & .type-two {
      background: local;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      gap: 1px;
      padding: unset;

      > div {
        background: v-bind(backgroundColor);
        flex: 1 0 0;
      }
    }
  }

  aside {
    transition: width 0.3s ease-in-out;
    width: 0;
    display: flex;
    flex-direction: column;
    overflow-y: auto;

    gap: 1px;

    > div {
      background: v-bind(backgroundColor);
      display: flex;
      flex-direction: column;
    }

    > div:last-child {
      flex: 1;
    }

    &.active {
      width: v-bind(sidebarWidth);
    }
  }
}
</style>
