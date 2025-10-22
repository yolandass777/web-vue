// src/services/backend.ts
export type User = {
    id: string;
    username: string;
    displayName?: string;
    password: string; // 仅示例（生产请 NEVER 存明文）
    score?: number;
    createdAt: number;
  }
  
  const USERS_KEY = 'tv_users_v1'
  const SCORES_KEY = 'tv_scores_v1'
  const SAVES_KEY = 'tv_saves_v1'
  
  // helper
  function read<K>(key: string): K | null {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) as K : null
  }
  function write(key: string, v: any) {
    localStorage.setItem(key, JSON.stringify(v))
  }
  
  function ensureInit() {
    if (!read<User[]>(USERS_KEY)) {
      write(USERS_KEY, [
        { id: 'u_admin', username: 'admin', displayName: '管理员', password: 'admin', score: 0, createdAt: Date.now() }
      ])
    }
    if (!read<Record<string, any>>(SAVES_KEY)) write(SAVES_KEY, {})
    if (!read<any[]>(SCORES_KEY)) write(SCORES_KEY, [])
  }
  ensureInit()
  
  export const backend = {
    async register(username: string, password: string, displayName?: string): Promise<User> {
      const users = read<User[]>(USERS_KEY) || []
      if (users.find(u => u.username === username)) throw new Error('用户名已存在')
      const id = 'u_' + Date.now().toString(36)
      const user: User = { id, username, password, displayName: displayName || username, score: 0, createdAt: Date.now() }
      users.push(user)
      write(USERS_KEY, users)
      return user
    },
  
    async login(username: string, password: string): Promise<User> {
      const users = read<User[]>(USERS_KEY) || []
      const u = users.find(x => x.username === username && x.password === password)
      if (!u) throw new Error('用户名或密码错误')
      return u
    },
  
    async listUsers(): Promise<User[]> {
      return (read<User[]>(USERS_KEY) || []).slice().sort((a,b) => b.createdAt - a.createdAt)
    },
  
    async saveGame(userId: string | null, saveData: any) {
      const saves = read<Record<string, any>>(SAVES_KEY) || {}
      const key = userId || 'guest'
      saves[key] = { data: saveData, updatedAt: Date.now() }
      write(SAVES_KEY, saves)
      return true
    },
  
    async loadGame(userId: string | null) {
      const saves = read<Record<string, any>>(SAVES_KEY) || {}
      const key = userId || 'guest'
      return saves[key] ? saves[key].data : null
    },
  
    async submitScore(userId: string, username: string, score: number) {
      const list = read<any[]>(SCORES_KEY) || []
      list.push({ userId, username, score, createdAt: Date.now() })
      // 保留 top 100
      list.sort((a,b) => b.score - a.score || a.createdAt - b.createdAt)
      write(SCORES_KEY, list.slice(0, 200))
      // 更新用户score快照
      const users = read<User[]>(USERS_KEY) || []
      const u = users.find(x => x.id === userId)
      if (u) { u.score = Math.max(u.score || 0, score); write(USERS_KEY, users) }
      return true
    },
  
    async getLeaderboard(top = 50) {
      const list = (read<any[]>(SCORES_KEY) || []).slice().sort((a,b)=>b.score-a.score)
      return list.slice(0, top)
    }
  }
  