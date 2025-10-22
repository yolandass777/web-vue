<template>
    <header class="bg-white/80 backdrop-blur p-3 shadow-md flex justify-between items-center">
      <div class="flex items-center gap-3">
        <img src="/favicon.ico" alt="logo" class="w-10 h-10" />
        <div>
          <h1 class="text-xl font-bold text-[--adventure-brown]">神秘岛屿寻宝</h1>
          <p class="text-sm text-gray-600">探索 · 解谜 · 收集</p>
        </div>
      </div>
  
      <nav class="flex items-center gap-3">
        <router-link to="/" class="btn">首页</router-link>
        <router-link to="/game" class="btn">开始</router-link>
        <router-link to="/leaderboard" class="btn">排行</router-link>
        <router-link v-if="isAdmin" to="/admin/users" class="btn">用户管理</router-link>
  
        <div v-if="user" class="flex items-center gap-2">
          <span class="text-sm text-gray-700">Hi，{{ user.displayName || user.username }}</span>
          <button @click="logout" class="px-3 py-1 bg-red-500 text-white rounded">登出</button>
        </div>
        <div v-else>
          <router-link to="/" @click.native="openLogin" class="px-3 py-1 bg-green-600 text-white rounded">登录 / 注册</router-link>
        </div>
      </nav>
    </header>
  </template>
  
  <script setup lang="ts">
  import { useUserStore } from '@/store/userStore'
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  
  const userStore = useUserStore()
  userStore.restoreFromLocal()
  const user = computed(() => userStore.currentUser)
  const router = useRouter()
  const isAdmin = computed(() => user.value?.username === 'admin')
  
  function logout(){
    userStore.logout()
    router.push('/')
  }
  function openLogin() {
    router.push('/')
  }
  </script>
  
  <style scoped>
  .btn { padding: 6px 10px; border-radius: 8px; background: white; border: 1px solid rgba(0,0,0,0.06); color: #333; text-decoration: none; }
  </style>
  