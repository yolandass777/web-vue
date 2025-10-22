<template>
    <footer class="mt-8 p-4 text-center text-sm text-gray-600">
      © {{ year }} 神秘岛屿寻宝 — Vue 重构版 · 学生/练习项目
    </footer>
  </template>
  
  <script setup>
  const year = new Date().getFullYear()
  </script>
  