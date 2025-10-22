<template>
    <div class="relative w-full h-80 rounded-2xl overflow-hidden shadow-lg">
      <div v-if="scene" :style="{ backgroundImage: 'url(' + scene.background + ')' }"
           class="absolute inset-0 bg-cover bg-center transition-opacity duration-700" :key="sceneKey">
        <div class="absolute inset-0 bg-black/30"></div>
        <div class="absolute inset-0 flex flex-col justify-center items-center text-white p-6 text-center">
          <h2 class="text-2xl font-bold mb-3">{{ scene.title || '场景' }}</h2>
          <p class="max-w-2xl">{{ scene.description }}</p>
          <div class="mt-4 flex flex-wrap gap-3 justify-center">
            <button v-for="(c, idx) in choices" :key="idx" @click="onChoice(c)"
                    class="bg-white/90 text-adventure-brown font-bold py-2 px-4 rounded-full shadow hover:scale-105 transition-transform">
              {{ c.text }}
            </button>
          </div>
        </div>
      </div>
      <div v-else class="flex items-center justify-center h-full text-gray-500">未加载场景</div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, watch } from 'vue'
  import { useGameStore } from '@/store/gameStore'
  
  const props = defineProps<{ sceneKey?: string, sceneData?: any }>()
  const emit = defineEmits(['action','navigate'])
  
  const game = useGameStore()
  const scene = computed(() => props.sceneData ?? null)
  const choices = computed(() => scene.value?.choices ?? [])
  function onChoice(c: any) {
    if (c.nextScene) {
      game.goToScene(c.nextScene)
      emit('navigate', c.nextScene)
    } else if (c.action) {
      emit('action', c.action)
    }
  }
  </script>
  
  <style scoped>
  /* small style */
  </style>
  