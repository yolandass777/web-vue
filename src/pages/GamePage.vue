<template>
  <div class="max-w-6xl mx-auto p-6">
    <div class="grid md:grid-cols-3 gap-4">
      <div class="md:col-span-2 space-y-4">
        <!-- 游戏主视图 -->
        <SceneView
          :sceneData="currentSceneData"
          @action="performAction"
          @navigate="onNavigate"
        />
        <div class="bg-white p-4 rounded shadow">
          <div class="mb-2 text-lg font-medium">叙述</div>
          <div class="text-gray-700 min-h-[60px]">{{ narration }}</div>
          <div class="mt-4">
            <button
              @click="showPanorama = !showPanorama"
              class="px-4 py-2 bg-gray-100 rounded"
            >
              全景地图
            </button>
            <button
              @click="save"
              class="px-4 py-2 bg-green-500 text-white rounded ml-2"
            >
              保存
            </button>
            <button
              @click="restart"
              class="px-4 py-2 bg-red-500 text-white rounded ml-2"
            >
              重启
            </button>
          </div>
        </div>

        <div v-if="showPanorama" class="mt-4">
          <PanoramaMap @enter="enterLocation" />
        </div>
      </div>

      <aside class="space-y-4">
        <Inventory @show="openItemDetail" />
        <div class="bg-white p-3 rounded shadow">
          <div class="text-sm text-gray-600">
            进度: {{ Math.round(game.progress) }}%
          </div>
          <div class="h-2 bg-gray-200 rounded mt-2">
            <div
              :style="{ width: game.progress + '%' }"
              class="h-2 bg-adventure-brown rounded"
            ></div>
          </div>
        </div>
      </aside>
    </div>

    <ItemDetailModal
      :visible="detailVisible"
      :itemId="detailItem"
      @close="detailVisible = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import SceneView from "@/components/Game/SceneView.vue";
import PanoramaMap from "@/components/Game/PanoramaMap.vue";
import Inventory from "@/components/Game/Inventory.vue";
import ItemDetailModal from "@/components/Game/ItemDetailModal.vue";
import { useGameStore } from "@/store/gameStore";
import { useUserStore } from "@/store/userStore";
import { backend } from "@/services/backend";

const game = useGameStore();
const userStore = useUserStore();
userStore.restoreFromLocal();

const narration = ref("点击开始进入冒险！");
const showPanorama = ref(false);
const detailVisible = ref(false);
const detailItem = ref<string | null>(null);

const scenes: Record<string, any> = {
  start: {
    background: "https://picsum.photos/id/1015/1200/800",
    title: "欢迎",
    description: "欢迎来到神秘岛屿",
    choices: [{ text: "开始冒险", nextScene: "beach" }],
  },
  beach: {
    background: "https://picsum.photos/id/1036/1200/800",
    title: "海滩",
    description: "海浪拍打着岸边。",
    choices: [
      { text: "进入森林", nextScene: "forestEntrance" },
      { text: "探索洞穴", nextScene: "cave" },
      { text: "检查岸边", action: "searchShore" },
    ],
  },
  cave: {
    background: "https://picsum.photos/id/1039/1200/800",
    title: "洞穴",
    description: "洞穴阴暗潮湿。",
    choices: [
      { text: "深入洞穴", action: "exploreCaveDeep" },
      { text: "检查墙壁刻痕", action: "examineCaveWall" },
      { text: "返回海滩", nextScene: "beach" },
    ],
  },
};

const currentSceneData = computed(() => scenes[game.currentScene] ?? scenes.start);

function enterLocation(loc: string) {
  game.goToScene(loc);
}

function onNavigate(next: string) {
  narration.value = scenes[next]?.description ?? "";
}

function performAction(action: string) {
  switch (action) {
    case "searchShore":
      narration.value = "你仔细搜索岸边……发现了一张泛黄的地图！";
      game.addItem("map");
      break;
    case "examineCaveWall":
      narration.value = "你在洞壁上看到奇怪符号。";
      break;
    case "exploreCaveDeep":
      narration.value = "你发现一颗闪闪发光的石头！";
      game.addItem("stone");
      break;
    default:
      narration.value = "……";
  }
}

function openItemDetail(itemId: string) {
  detailItem.value = itemId;
  detailVisible.value = true;
}

async function save() {
  await game.saveToServer(userStore.currentUser?.id ?? null);
  narration.value = "进度已保存";
}

function restart() {
  game.clear();
  narration.value = "游戏已重置";
}
</script>
