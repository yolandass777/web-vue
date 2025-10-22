<template>
    <div class="max-w-4xl mx-auto p-6">
      <h2 class="text-2xl font-bold mb-4">排行榜</h2>
      <div v-if="list.length === 0" class="text-sm text-gray-500">暂无成绩</div>
      <ol class="list-decimal pl-6">
        <li v-for="(r, idx) in list" :key="idx" class="mb-2 bg-white p-3 rounded shadow flex justify-between items-center">
          <div>
            <div class="font-medium">{{ r.username }}</div>
            <div class="text-sm text-gray-500">{{ new Date(r.createdAt).toLocaleString() }}</div>
          </div>
          <div class="text-xl font-bold text-gray-700">{{ r.score }}</div>
        </li>
      </ol>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { backend } from '@/services/backend'
  const list = ref<any[]>([])
  async function load(){
    list.value = await backend.getLeaderboard(50)
  }
  onMounted(load)
  </script>
  