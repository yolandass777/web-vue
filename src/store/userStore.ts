import { defineStore } from 'pinia'
import { backend, User } from '@/services/backend'

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: null as User | null,
    token: null as string | null,
  }),
  actions: {
    async register(username: string, password: string, displayName?: string) {
      const u = await backend.register(username, password, displayName)
      this.currentUser = u
      localStorage.setItem('tv_user', JSON.stringify(u))
      return u
    },
    async login(username: string, password: string) {
      const u = await backend.login(username, password)
      this.currentUser = u
      localStorage.setItem('tv_user', JSON.stringify(u))
      return u
    },
    logout() {
      this.currentUser = null
      localStorage.removeItem('tv_user')
    },
    restoreFromLocal() {
      const raw = localStorage.getItem('tv_user')
      if (raw) this.currentUser = JSON.parse(raw)
    }
  }
})
