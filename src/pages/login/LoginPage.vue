<script setup lang="ts">
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/shared/ui/design/ui/card";
</script>

<template>
  <div class="flex justify-evenly items-center h-full">
    <Card class="w-[320px]">
      <CardHeader>
        <div>
          <router-link v-if="$route.name !== 'login'" :to="{ name: 'login' }">
            <div class="text-monochrome-5">← назад</div>
          </router-link>
        </div>
        <CardTitle>Планирунчик 🎇</CardTitle>
        <CardDescription>v.beta.0.0.0</CardDescription>
      </CardHeader>

      <CardContent class="max-h-[80vh] overflow-auto">
        <router-view></router-view>
      </CardContent>
    </Card>

    <div>
      <img
        src="./abstract_cube-Photoroom.png"
        alt="random cube"
        class="animate-spin object-cover h-[400px] w-[400px]"
        style="animation-duration: 30000ms"
      />
    </div>
  </div>
</template>
