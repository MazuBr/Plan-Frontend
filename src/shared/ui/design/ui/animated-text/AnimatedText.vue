<script setup lang="ts">
import { computed } from "vue";
const props = defineProps<{
  active?: boolean;
  text: string;
  activeText?: string;
}>();

const textContent = computed(() =>
  props.active ? props.activeText || props.text : props.text
);
</script>

<template>
  <div class="flex">
    <div>
      {{ textContent }}
    </div>
    <div v-if="active" class="inline-block">
      <div class="typewriter">....</div>
    </div>
  </div>
</template>

<style scoped>
.typewriter {
  height: 1.5rem;
  animation-name: typewriter-loading;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: steps(2);
}

@keyframes typewriter-loading {
  0% {
    width: 0ch;
    overflow: hidden;
    word-break: break-all;
  }
  33% {
    width: 1ch;
    overflow: hidden;
    word-break: break-all;
  }
  66% {
    width: 2ch;
    overflow: hidden;
    word-break: break-all;
  }
  100% {
    width: 0ch;
    overflow: hidden;
    word-break: break-all;
  }
}
</style>
