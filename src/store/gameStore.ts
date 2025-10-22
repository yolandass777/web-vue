import { defineStore } from 'pinia'
import { backend } from '@/services/backend'

export type InventoryItem = 'map'|'key'|'torch'|'stone'
export const useGameStore = defineStore('game', {
  state: () => ({
    progress: 0,
    inventory: [] as InventoryItem[],
    currentScene: 'start',
    scenesCompleted: [] as string[],
    hintsUsed: {} as Record<string, number>,
    soundEnabled: true,
    lastSaveAt: 0
  }),
  actions: {
    addItem(id: InventoryItem) {
      if (!this.inventory.includes(id)) {
        this.inventory.push(id)
        this.saveLocal()
        return true
      }
      return false
    },
    hasItem(id: InventoryItem) {
      return this.inventory.includes(id)
    },
    updateProgress(p: number) {
      this.progress = p
      this.saveLocal()
    },
    goToScene(scene: string) {
      this.currentScene = scene
      if (!this.scenesCompleted.includes(scene)) this.scenesCompleted.push(scene)
      this.updateProgress((this.scenesCompleted.length / 11) * 100) // 11 scene baseline，可调整
      this.saveLocal()
    },
    async saveToServer(userId: string | null) {
      const payload = {
        progress: this.progress,
        inventory: this.inventory,
        currentScene: this.currentScene,
        scenesCompleted: this.scenesCompleted,
        hintsUsed: this.hintsUsed,
        savedAt: Date.now()
      }
      await backend.saveGame(userId, payload)
      this.lastSaveAt = Date.now()
    },
    async loadFromServer(userId: string | null) {
      const d = await backend.loadGame(userId)
      if (d) {
        this.progress = d.progress ?? this.progress
        this.inventory = d.inventory ?? this.inventory
        this.currentScene = d.currentScene ?? this.currentScene
        this.scenesCompleted = d.scenesCompleted ?? this.scenesCompleted
        this.hintsUsed = d.hintsUsed ?? this.hintsUsed
      }
    },
    saveLocal() {
      localStorage.setItem('tv_game_save', JSON.stringify({
        progress: this.progress,
        inventory: this.inventory,
        currentScene: this.currentScene,
        scenesCompleted: this.scenesCompleted,
        hintsUsed: this.hintsUsed,
        savedAt: Date.now()
      }))
    },
    loadLocal() {
      const raw = localStorage.getItem('tv_game_save')
      if (!raw) return false
      try {
        const d = JSON.parse(raw)
        this.progress = d.progress ?? this.progress
        this.inventory = d.inventory ?? this.inventory
        this.currentScene = d.currentScene ?? this.currentScene
        this.scenesCompleted = d.scenesCompleted ?? this.scenesCompleted
        this.hintsUsed = d.hintsUsed ?? this.hintsUsed
        return true
      } catch {
        return false
      }
    },
    clear() {
      this.progress = 0; this.inventory = []; this.currentScene = 'start'; this.scenesCompleted = []; this.hintsUsed = {}
      localStorage.removeItem('tv_game_save')
    }
  }
})
