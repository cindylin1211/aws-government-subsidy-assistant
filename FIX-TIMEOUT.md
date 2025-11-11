# 修正 API Gateway Timeout 問題

## 問題
Agent 搜尋知識庫時可能超過 API Gateway 的 30 秒預設超時限制，導致 504 錯誤。

## 解決方案

### 方案 1：增加 API Gateway Integration Timeout（推薦）

1. **進入 API Gateway Console**
   - 搜尋 "API Gateway"
   - 找到你的 API

2. **修改 Integration Timeout**
   - 點擊 `/chat` 路由
   - 點擊 `POST` 方法
   - 點擊「Integration Request」
   - 找到「Timeout」設定
   - 將超時時間從 30 秒改為 **29 秒**（API Gateway 最大值）

3. **部署 API**
   - 點擊「Actions」→「Deploy API」
   - 選擇 Stage: `prod`
   - 點擊「Deploy」

### 方案 2：優化 Lambda 和 Agent（長期方案）

#### 2.1 增加 Lambda Timeout

1. 進入 Lambda Console
2. 找到你的 Lambda 函數
3. 點擊「Configuration」→「General configuration」
4. 點擊「Edit」
5. 將 Timeout 改為 **60 秒**
6. 儲存

#### 2.2 優化知識庫設定

1. **減少 Chunk Size**
   - 進入 Knowledge bases
   - 編輯 Data source
   - 調整 Chunking strategy
   - 使用較小的 chunk size（例如 300-500 tokens）

2. **調整 Max Results**
   - 在 Agent 的 Knowledge base 設定中
   - 限制返回的結果數量（例如 3-5 個）

3. **優化 PDF 內容**
   - 確保 PDF 是文字檔，不是掃描檔
   - 移除不必要的圖片和格式
   - 確保文字編碼正確

### 方案 3：前端增加 Loading 提示

讓使用者知道系統正在處理，而不是以為卡住了。

## 目前狀況

- ✅ Agent 可以正確使用知識庫
- ✅ 簡單查詢可以成功回答
- ⚠️ 複雜查詢可能會 timeout

## 建議

1. **立即執行**：增加 API Gateway 和 Lambda 的 timeout
2. **長期優化**：調整知識庫的 chunking 策略
3. **使用者體驗**：前端增加更明確的 loading 狀態

## 注意事項

- API Gateway 的最大 timeout 是 29 秒（無法再增加）
- 如果查詢真的需要超過 29 秒，需要考慮使用異步架構（WebSocket 或輪詢）
- 目前大部分查詢都能在時間內完成，只有少數複雜查詢會 timeout
