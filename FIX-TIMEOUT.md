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
- ✅ Lambda Timeout 已改為 10 分鐘
- ❌ API Gateway 有 29 秒硬限制（無法突破）
- ❌ Agent 搜尋知識庫經常超過 29 秒

## 根本問題

API Gateway 的 29 秒限制是 AWS 的硬限制，無法增加。Agent 搜尋 23 份 PDF 需要的時間經常超過這個限制。

## 立即可行的解決方案

### 選項 A：優化知識庫設定（推薦）

1. **進入 Bedrock Console → Knowledge bases**
2. **點擊你的知識庫**
3. **點擊 Data source**
4. **點擊 Edit**
5. **調整 Chunking configuration**：
   - Chunking strategy: Fixed-size chunking
   - Max tokens: **300**（降低，原本可能是 500-1000）
   - Overlap percentage: **20%**
6. **儲存並 Sync**

這會讓搜尋更快，但可能需要多次查詢才能找到完整資訊。

### 選項 B：在 Agent 設定中限制知識庫搜尋結果

1. **進入 Bedrock Console → Agents → 你的 Agent**
2. **點擊 Knowledge bases 標籤**
3. **編輯知識庫設定**
4. **設定 Maximum number of results**：改為 **3**（原本可能是 5-10）
5. **Prepare → Create Version → 更新 Alias**

這會讓 Agent 只看前 3 個最相關的結果，加快速度。

### 選項 C：減少 PDF 數量（最有效）

如果 23 份 PDF 中有些不常用：
1. 移到另一個 S3 資料夾
2. 只保留最常查詢的 10-15 份
3. Sync 知識庫

### 選項 D：使用異步架構（需要重構）

改用 WebSocket 或輪詢機制，但需要大幅修改架構。

## 注意事項

- API Gateway 的最大 timeout 是 29 秒（無法再增加）
- 如果查詢真的需要超過 29 秒，需要考慮使用異步架構（WebSocket 或輪詢）
- 目前大部分查詢都能在時間內完成，只有少數複雜查詢會 timeout
