<template>
    <div v-if="visible" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 w-96">
        <h3 class="text-xl font-bold mb-2">{{ itemData.name }}</h3>
        <div class="text-3xl text-adventure-brown mb-3"><i :class="itemData.icon"></i></div>
        <p class="mb-3">{{ itemData.detailedDescription }}</p>
        <div v-if="itemData.uses?.length" class="text-sm text-gray-600 mb-4">
          <strong>用途：</strong>
          <ul class="list-disc list-inside">
            <li v-for="(u, i) in itemData.uses" :key="i">{{ u }}</li>
          </ul>
        </div>
        <button class="w-full py-2 bg-adventure-brown text-white rounded" @click="$emit('close')">关闭</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from "vue"
  const props = defineProps<{ visible: boolean, itemId: string | null }>()
  const emit = defineEmits(['close'])
  import itemsData from '@/data/items'
  const itemData = computed(() => props.itemId ? itemsData[props.itemId] : { name: '', icon: '', detailedDescription: '' })
  </script>
  