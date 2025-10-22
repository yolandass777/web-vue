<template>
    <div class="bg-white p-4 rounded shadow">
      <h4 class="font-medium mb-2">注册</h4>
      <div class="flex flex-col gap-2">
        <input v-model="username" placeholder="用户名" class="px-3 py-2 border rounded" />
        <input v-model="displayName" placeholder="显示名称" class="px-3 py-2 border rounded" />
        <input type="password" v-model="password" placeholder="密码" class="px-3 py-2 border rounded" />
        <div class="flex gap-2">
          <button @click="doRegister" class="px-3 py-2 bg-green-600 text-white rounded">注册</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useUserStore } from '@/store/userStore'
  const username = ref('')
  const password = ref('')
  const displayName = ref('')
  const userStore = useUserStore()
  const emit = defineEmits(['registered'])
  
  async function doRegister() {
    try {
      await userStore.register(username.value, password.value, displayName.value)
      emit('registered')
    } catch (e:any) {
      alert(e.message || '注册失败')
    }
  }
  </script>
  