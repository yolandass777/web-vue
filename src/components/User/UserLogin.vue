<template>
    <div class="bg-white p-4 rounded shadow">
      <h4 class="font-medium mb-2">登录</h4>
      <div class="flex flex-col gap-2">
        <input v-model="username" placeholder="用户名" class="px-3 py-2 border rounded" />
        <input type="password" v-model="password" placeholder="密码" class="px-3 py-2 border rounded" />
        <div class="flex gap-2">
          <button @click="doLogin" class="px-3 py-2 bg-blue-600 text-white rounded">登录</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useUserStore } from '@/store/userStore'
  const username = ref('')
  const password = ref('')
  const userStore = useUserStore()
  const emit = defineEmits(['logged'])
  
  async function doLogin(){
    try {
      await userStore.login(username.value, password.value)
      emit('logged')
    } catch (e:any) {
      alert(e.message || '登录失败')
    }
  }
  </script>
  