# 測試指南

## ✅ 已配置的資訊

- **API Gateway URL**: `https://hyeavzp56b.execute-api.us-west-2.amazonaws.com/prod/chat`
- **Bedrock Agent ID**: `Z56OAA2L3J`
- **Agent Alias ID**: `Z1FEZNULZP`
- **Region**: `us-west-2`

## 🧪 測試步驟

### 1. 測試 API Gateway (使用 curl)

```bash
curl -X POST https://hyeavzp56b.execute-api.us-west-2.amazonaws.com/prod/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "你好，請問如何申請政府補助？", "sessionId": "test-session-1"}'
```

**預期回應**:
```json
{
  "response": "Agent 的回應內容...",
  "sessionId": "test-session-1",
  "timestamp": "2025-01-01T00:00:00.000000"
}
```

### 2. 測試前端應用

1. **啟動開發服務器**
   ```bash
   npm run dev
   ```

2. **打開瀏覽器**
   - 訪問: `http://localhost:5173/`

3. **測試聊天功能**
   - 在聊天框中輸入: "你好，請問如何申請政府補助？"
   - 點擊發送
   - 查看是否收到 Bedrock Agent 的回應

4. **檢查開發者工具**
   - 按 F12 打開開發者工具
   - 切換到 Console 標籤
   - 查看 API 呼叫日誌
   - 確認沒有 CORS 錯誤

### 3. 測試問題範例

試試以下問題來測試 Agent 的回應：

1. **基本問候**
   - "你好"
   - "請問你可以幫我什麼？"

2. **補助申請相關**
   - "如何申請 AWS 政府補助？"
   - "申請補助需要什麼文件？"
   - "補助的申請資格是什麼？"

3. **費用相關**
   - "補助金額有多少？"
   - "可以補助多久？"
   - "補助比例是多少？"

4. **流程相關**
   - "申請流程是什麼？"
   - "需要多久時間？"
   - "如何追蹤申請進度？"

## 🔍 故障排除

### 問題 1: CORS 錯誤
**症狀**: 瀏覽器 Console 顯示 CORS 錯誤

**解決方案**:
1. 確認 Lambda 函數的 `get_cors_headers()` 正確設定
2. 確認 API Gateway 已啟用 CORS
3. 重新部署 API Gateway

### 問題 2: 401/403 錯誤
**症狀**: API 回應 401 或 403 錯誤

**解決方案**:
1. 檢查 Lambda 函數的 IAM 角色
2. 確認有 `bedrock:InvokeAgent` 權限
3. 確認 Agent ARN 正確

### 問題 3: 500 錯誤
**症狀**: API 回應 500 錯誤

**解決方案**:
1. 查看 CloudWatch Logs
2. 檢查 Lambda 函數代碼
3. 確認 Agent ID 和 Alias ID 正確
4. 確認 Agent 已部署並處於 "Prepared" 狀態

### 問題 4: 超時錯誤
**症狀**: 請求超時

**解決方案**:
1. 增加 Lambda 函數的超時時間（建議 60 秒）
2. 增加 API Gateway 的超時時間
3. 檢查 Bedrock Agent 的回應時間

### 問題 5: 前端顯示回退回應
**症狀**: 前端顯示本地的回退回應而不是 Agent 回應

**解決方案**:
1. 檢查 API URL 是否正確
2. 檢查網路連線
3. 查看瀏覽器 Console 的錯誤訊息
4. 確認 `.env` 文件已正確設定

## 📊 監控和日誌

### CloudWatch Logs
1. 前往 AWS Console → CloudWatch → Log groups
2. 找到 `/aws/lambda/bedrock-agent-chat-handler`
3. 查看最新的日誌串流
4. 檢查錯誤訊息和 Agent 回應

### API Gateway 監控
1. 前往 AWS Console → API Gateway
2. 選擇你的 API
3. 查看 Dashboard 和 Logs
4. 檢查請求數量和錯誤率

## ✅ 成功指標

如果一切正常，你應該看到：

1. ✅ API Gateway 回應 200 狀態碼
2. ✅ Lambda 函數成功執行
3. ✅ Bedrock Agent 回應訊息
4. ✅ 前端顯示 Agent 的回應
5. ✅ 沒有 CORS 錯誤
6. ✅ 沒有 Console 錯誤

## 🎉 下一步

測試成功後，你可以：

1. **部署到 Amplify**
   - 推送代碼到 GitHub
   - 在 Amplify Console 連接倉庫
   - 設定環境變數 `VITE_API_URL`

2. **優化 Agent**
   - 在 Bedrock Console 中調整 Agent 設定
   - 添加更多知識庫
   - 優化提示詞

3. **添加功能**
   - 用戶認證
   - 對話歷史記錄
   - 多語言支援
   - 檔案上傳功能
