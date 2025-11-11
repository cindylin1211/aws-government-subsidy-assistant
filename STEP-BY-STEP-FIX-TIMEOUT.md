# 修正 Timeout 問題 - 詳細步驟

## 第一部分：優化知識庫設定

### 步驟 1：調整 Chunking（讓搜尋更快）

1. **進入 Bedrock Console**
   - 在 AWS Console 搜尋 "Bedrock"
   - 確認 Region 是 `us-west-2`

2. **進入 Knowledge bases**
   - 左側選單點擊「Knowledge bases」
   - 找到你的知識庫並點擊進入

3. **編輯 Data source**
   - 點擊「Data sources」標籤
   - 找到你的 S3 data source
   - 點擊右側的「Edit」按鈕

4. **修改 Chunking configuration**
   - 往下滾動找到「Chunking and parsing configurations」
   - Chunking strategy: 選擇「Fixed-size chunking」
   - Max tokens: 改為 **300**
   - Overlap percentage: 設為 **20**

5. **儲存並同步**
   - 點擊「Save and sync」
   - 等待同步完成（可能需要 5-10 分鐘）
   - 確認 Status 變成「Completed」

---

### 步驟 2：限制搜尋結果數量（讓 Agent 更快）

1. **進入 Agents**
   - 左側選單點擊「Agents」
   - 找到你的 Agent（AWS_Gov_Funding_Specialist）
   - 點擊進入

2. **編輯 Knowledge base 設定**
   - 點擊「Knowledge bases」標籤
   - 找到你的知識庫
   - 點擊右側的「Edit」按鈕

3. **修改搜尋設定**
   - 找到「Search configuration」
   - Maximum number of results: 改為 **3**
   - （原本可能是 5 或更多）

4. **儲存**
   - 點擊「Save」

5. **建立新版本**
   - 回到 Agent 主頁
   - 點擊「Prepare」
   - 點擊「Create version」
   - 記下版本號（例如 Version 6）

6. **更新 Alias**
   - 點擊「Aliases」標籤
   - 找到 Alias (Z1FEZNULZP)
   - 點擊「Edit」
   - Agent version 選擇剛建立的版本號
   - 點擊「Save」

---

## 第二部分：調整 API Gateway Timeout

### 步驟 3：增加 API Gateway Integration Timeout

1. **進入 API Gateway Console**
   - 在 AWS Console 搜尋 "API Gateway"
   - 找到你的 API（應該包含 chat 或類似名稱）
   - 點擊進入

2. **找到 /chat 路由**
   - 左側選單點擊「Resources」
   - 展開資源樹，找到 `/chat`
   - 點擊 `/chat` 下的 `POST` 方法

3. **編輯 Integration Request**
   - 點擊「Integration Request」
   - 往下滾動找到「HTTP Settings」或「Integration timeout」

4. **修改 Timeout**
   - Timeout: 改為 **29000** 毫秒（29 秒，這是最大值）
   - 點擊「Save」

5. **部署 API**
   - 點擊左上角的「Actions」下拉選單
   - 選擇「Deploy API」
   - Deployment stage: 選擇 **prod**
   - 點擊「Deploy」

6. **確認部署成功**
   - 應該會看到「Successfully deployed API」訊息

---

## 完成後測試

### 等待時間
- Knowledge base sync: 5-10 分鐘
- Agent version 更新: 立即生效
- API Gateway 部署: 立即生效

### 測試步驟

1. **等待知識庫同步完成**
   - 回到 Knowledge bases
   - 確認 Last sync status 是「Completed」

2. **測試前端**
   - 開啟你的網站
   - 輸入：「SBIR 計畫的補助比例是多少？」
   - 應該在 20-25 秒內得到回應

3. **如果還是 timeout**
   - 檢查 CloudWatch Logs 看 Lambda 執行時間
   - 可能需要進一步減少 PDF 數量

---

## 預期效果

✅ **搜尋速度提升 50-70%**
- Chunking 從大改小，搜尋更快
- 只看前 3 個結果，不看全部

✅ **大部分查詢能在 25 秒內完成**
- 簡單查詢：5-10 秒
- 複雜查詢：15-25 秒

⚠️ **極少數查詢可能還是會 timeout**
- 如果查詢需要搜尋多個文件
- 這時需要考慮減少 PDF 數量

---

## 如果還是有問題

### 最後手段：減少 PDF 數量

1. 分析哪些 PDF 最常被查詢
2. 把不常用的 PDF 移到另一個資料夾
3. 只保留 10-15 份最重要的
4. Sync 知識庫

這樣可以確保 100% 不會 timeout。

---

## 需要幫助？

如果在執行過程中遇到問題，可以：
1. 截圖給我看
2. 告訴我卡在哪一步
3. 我會協助你解決
