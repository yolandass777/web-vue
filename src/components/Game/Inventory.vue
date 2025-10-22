<template>
    <div class="bg-white/90 rounded-lg p-3 shadow">
      <h4 class="font-medium text-sm text-gray-700">已收集物品</h4>
      <div class="flex gap-2 mt-2">
        <div v-if="items.length === 0" class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">—</div>
        <div v-for="it in items" :key="it" @click="$emit('show', it)"
             class="w-10 h-10 bg-adventure-brown/10 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
          <i :class="iconFor(it)"></i>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import { useGameStore } from '@/store/gameStore'
  const game = useGameStore()
  const items = computed(() => game.inventory)
  
  function iconFor(id: string) {
    switch(id) {
      case 'map': return 'fa fa-map'
      case 'key': return 'fa fa-key'
      case 'torch': return 'fa fa-fire'
      case 'stone': return 'fa fa-diamond'
      default: return 'fa fa-circle'
    }
  }
  </script>
  