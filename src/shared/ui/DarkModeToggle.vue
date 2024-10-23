<script setup lang="ts">
import { useColorMode } from "@vueuse/core"
import { Moon, Sun } from "lucide-vue-next"
import Button from "./design/ui/button/Button.vue"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./design/ui/dropdown-menu"

const mode = useColorMode({ disableTransition: false })
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline">
        <Moon
          class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        />
        <Sun
          class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />
        <span class="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="mode = 'light'">
        Светлая тема
      </DropdownMenuItem>
      <DropdownMenuItem @click="mode = 'dark'"> Тёмная темп </DropdownMenuItem>
      <DropdownMenuItem @click="mode = 'auto'">
        Дефолт системы
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
