<template>
    <div class="bg-white/90 rounded-xl p-6 shadow-lg">
      <h3 class="text-xl font-bold mb-4">全景地图</h3>
      <div class="relative w-full h-64 bg-gray-200 rounded overflow-hidden">
        <img src="/photos/无标题.png" class="w-full h-full object-cover" alt="panorama" />
        <button v-for="loc in locations" :key="loc.id"
                :style="loc.style"
                class="absolute p-2 rounded-full border transition-transform transform hover:scale-110"
                :title="loc.title"
                @click="$emit('enter', loc.target)">
          <i :class="loc.icon" class="text-white"></i>
        </button>
      </div>
      <div class="mt-3 text-sm text-gray-600">点击地点快速前往</div>
    </div>
  </template>
  
  <script setup lang="ts">
  const locations = [
    { id: 'cave', title: '洞穴', target: 'cave', icon: 'fa fa-moon-o', style: { left: '50%', top: '50%', transform: 'translate(-50%,-50%)', background: 'rgba(220,38,38,0.6)', width: '56px', height: '56px' } },
    { id: 'beach', title: '海滩', target: 'beach', icon: 'fa fa-ship', style: { left: '50%', top: '85%', transform: 'translate(-50%,-50%)', background: 'rgba(14,165,233,0.6)', width: '56px', height: '56px' } },
    { id: 'forest', title: '森林', target: 'forestEntrance', icon: 'fa fa-tree', style: { left: '30%', top: '50%', transform: 'translate(-50%,-50%)', background: 'rgba(34,197,94,0.6)', width: '56px', height: '56px' } },
    { id: 'statue', title: '石像', target: 'templeEntrance', icon: 'fa fa-university', style: { left: '70%', top: '50%', transform: 'translate(-50%,-50%)', background: 'rgba(234,179,8,0.6)', width: '56px', height: '56px' } }
  ]
  </script>
  
  <style scoped>
  button { display:flex; align-items:center; justify-content:center; color:white; border:2px solid rgba(255,255,255,0.6); }
  </style>
  