<template>
    <div class="max-w-6xl mx-auto p-6">
      <h2 class="text-2xl font-bold mb-4">用户管理</h2>
      <div v-if="users.length===0">加载中...</div>
      <ul>
        <li v-for="u in users" :key="u.id" class="mb-2 bg-white p-3 rounded shadow flex justify-between items-center">
          <div>
            <div>{{ u.displayName || u.username }}</div>
            <div class="text-sm text-gray-500">注册：{{ new Date(u.createdAt).toLocaleString() }}</div>
          </div>
          <div class="flex gap-2">
            <button @click="viewUser(u)" class="px-2 py-1 bg-blue-500 text-white rounded">查看</button>
            <button @click="deleteUser(u)" class="px-2 py-1 bg-red-500 text-white rounded">删除</button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { backend } from '@/services/backend'
  import { useUserStore } from '@/store/userStore'
  const users = ref<any[]>([])
  async function load(){ users.value = await backend.listUsers() }
  onMounted(load)
  
  const userStore = useUserStore()
  if (userStore.currentUser?.username !== 'admin') {
    // 如果不是 admin，禁止访问（简单处理）
    alert('仅管理员可访问用户管理页面')
    location.href = '/'
  }
  
  function viewUser(u:any){
    alert(JSON.stringify(u, null, 2))
  }
  function deleteUser(u:any) {
    if (!confirm('确认删除用户 '+ u.username +'？（示例操作，仅本地）')) return
    // 从 localStorage 直接删除（仅示例）
    const all = (localStorage.getItem('tv_users_v1') ? JSON.parse(localStorage.getItem('tv_users_v1')!) : [])
    const filtered = all.filter((x:any)=>x.id !== u.id)
    localStorage.setItem('tv_users_v1', JSON.stringify(filtered))
    load()
  }
  </script>
  