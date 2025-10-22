import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/pages/HomePage.vue'
import GamePage from '@/pages/GamePage.vue'
import LeaderboardPage from '@/pages/LeaderboardPage.vue'
import AdminUsersPage from '@/pages/AdminUsersPage.vue'

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/game', name: 'game', component: GamePage },
  { path: '/leaderboard', name: 'leaderboard', component: LeaderboardPage },
  { path: '/admin/users', name: 'adminUsers', component: AdminUsersPage },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
