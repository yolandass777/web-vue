# 神秘岛屿寻宝 - Vue 重构

## 运行
1. npm install
2. npm run dev
3. 打开 http://localhost:5173

## 说明
- 使用 Pinia 管理游戏与用户状态
- 使用 localStorage 作为简易后端（位于 src/services/backend.ts）
- 可注册/登录，登录后可以保存并提交分数
- 管理页面仅示例（admin 用户）

## TODO（可扩展）
- 把 backend.ts 替换成真实后端（REST API / Firebase）
- 增加音效、动画、关卡数据外部化
- 使用 WebAudio API 做更复杂的声效管理
