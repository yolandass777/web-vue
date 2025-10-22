<template>
    <div class="max-w-6xl mx-auto p-6">
      <section class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 class="text-3xl font-bold mb-3">欢迎来到神秘岛屿</h2>
          <p class="mb-4 text-gray-700">传说中的宝藏等待被发现。点击“开始”进入冒险，或查看排行与用户管理（管理员）。</p>
          <router-link to="/game" class="px-4 py-3 bg-adventure-brown text-white rounded">开始探索</router-link>
        </div>
  
        <div>
          <h3 class="font-bold mb-2">快速登录</h3>
          <UserLogin @logged="onLogged"/>
          <div class="mt-4">
            <UserRegister @registered="onRegistered"/>
          </div>
        </div>
      </section>
  
      <section class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div><router-link to="/leaderboard" class="block bg-white p-4 rounded shadow">排行榜</router-link></div>
        <div><router-link to="/game" class="block bg-white p-4 rounded shadow">继续游戏</router-link></div>
        <div><router-link to="/admin/users" class="block bg-white p-4 rounded shadow">用户管理（仅管理员可操作）</router-link></div>
      </section>
    </div>
  </template>
  
  <script setup>
  import UserLogin from '@/components/User/UserLogin.vue'
  import UserRegister from '@/components/User/UserRegister.vue'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  function onLogged(){ router.push('/game') }
  function onRegistered(){ router.push('/game') }
  </script>
  