<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <AppHeader />
    <main class="flex-1 p-4">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from "@/components/Ui/AppHeader.vue";
import AppFooter from "@/components/Ui/AppFooter.vue";
</script>

  
  <style>
  /* global tweaks */
  </style>
  