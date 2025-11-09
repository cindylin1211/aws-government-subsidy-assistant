# 故障排除指南

## 🔍 當前問題診斷

根據測試結果，Lambda 函數回應 400 錯誤：「請提供訊息內容」

這表示 API Gateway 沒有正確將請求 body 傳遞給 Lambda 函數。

## 🛠️ 解決方案

### 步驟 1: 檢查 API Gateway 整合設定

1. **登入 AWS Console** → API Gateway
2. **選擇你的 API**
3. **選擇 `/chat` 資源下的 POST 方法**
4. **點擊 "Integration Request"**
5. **檢查以下設定**：

#### 重要設定：
- **Integration type**: Lambda Function
- **Use Lambda Proxy integration**: ✅ **必須勾選**

如果沒有勾選 "Use Lambda Proxy integration"，請：
1. 點擊 "Integration Request"
2. 勾選 "Use Lambda Proxy integration"
3. 點擊 "Save"
4. 重新部署 API (Actions → Deploy API)

### 步驟 2: 更新 Lambda 函數

我已經更新了 `lambda/bedrock-agent-handler.py` 來處理不同的事件格式。

請將更新後的代碼重新部署到 Lambda：

1. 複製 `lambda/bedrock-agent-handler.py` 的完整內容
2. 前往 AWS Lambda Console
3. 選擇你的函數
4. 貼上新代碼
5. 點擊 "Deploy"

### 步驟 3: 檢查 Lambda 日誌

1. 前往 **CloudWatch** → **Log groups**
2. 找到 `/aws/lambda/bedrock-agent-chat-handler`
3. 查看最新的日誌串流
4. 檢查 "收到事件" 的日誌，確認事件結構

## 📋 正確的 API Gateway 設定檢查清單

### POST 方法設定：
- ✅ Method: POST
- ✅ Integration type: Lambda Function
- ✅ Use Lambda Proxy integration: **已勾選**
- ✅ Lambda Function: 選擇正確的函數

### CORS 設定：
- ✅ Access-Control-Allow-Origin: *
- ✅ Access-Control-Allow-Headers: Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token
- ✅ Access-Control-Allow-Methods: OPTIONS,POST

### 部署：
- ✅ 已部署到 `prod` stage

## 🧪 測試步驟

### 1. 測試 Lambda 函數（直接測試）

在 Lambda Console 中使用以下測試事件：

```json
{
  "httpMethod": "POST",
  "body": "{\"message\": \"你好，請問如何申請政府補助？\", \"sessionId\": \"test-123\"}",
  "headers": {
    "Content-Type": "application/json"
  }
}
```

**預期結果**：
- 狀態碼 200
- 回應包含 `response` 欄位

### 2. 測試 API Gateway

使用 PowerShell：

```powershell
$body = '{"message":"hello test","sessionId":"test-123"}'
$response = Invoke-WebRequest -Uri "https://hyeavzp56b.execute-api.us-west-2.amazonaws.com/prod/chat" -Method Post -Body $body -ContentType "application/json" -UseBasicParsing
$response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 10
```

**預期結果**：
```json
{
  "response": "Agent 的回應...",
  "sessionId": "test-123",
  "timestamp": "2025-01-01T00:00:00.000000"
}
```

### 3. 測試前端應用

1. 確保開發服務器正在運行：`npm run dev`
2. 打開 `http://localhost:5173/`
3. 發送測試訊息
4. 按 F12 查看 Console 日誌

## ❌ 常見錯誤和解決方案

### 錯誤 1: "請提供訊息內容"
**原因**: Lambda Proxy integration 未啟用

**解決方案**:
1. 在 API Gateway 中啟用 "Use Lambda Proxy integration"
2. 重新部署 API

### 錯誤 2: CORS 錯誤
**原因**: CORS 標頭未正確設定

**解決方案**:
1. 在 API Gateway 中啟用 CORS
2. 確認 Lambda 函數回應包含 CORS 標頭
3. 重新部署 API

### 錯誤 3: 403 Forbidden
**原因**: Lambda 函數沒有權限呼叫 Bedrock Agent

**解決方案**:
1. 前往 IAM Console
2. 找到 Lambda 函數的執行角色
3. 添加以下政策：

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "bedrock:InvokeAgent"
            ],
            "Resource": "arn:aws:bedrock:us-west-2:640223110023:agent/Z56OAA2L3J"
        }
    ]
}
```

### 錯誤 4: 超時
**原因**: Lambda 函數超時時間太短

**解決方案**:
1. 前往 Lambda Console
2. Configuration → General configuration
3. 將 Timeout 設定為 60 秒

## 📊 檢查清單

完成以下檢查：

- [ ] Lambda 函數已部署最新代碼
- [ ] Lambda 函數有正確的 IAM 權限
- [ ] Lambda 函數超時時間設定為 60 秒
- [ ] API Gateway 啟用了 Lambda Proxy integration
- [ ] API Gateway 啟用了 CORS
- [ ] API Gateway 已重新部署到 prod stage
- [ ] Bedrock Agent 處於 "Prepared" 狀態
- [ ] Agent Alias ID 正確 (Z1FEZNULZP)
- [ ] 前端 API URL 正確 (包含 /chat)

## 🎯 下一步

完成上述設定後：

1. 重新測試 Lambda 函數
2. 重新測試 API Gateway
3. 重新測試前端應用
4. 查看 CloudWatch Logs 確認沒有錯誤

如果問題仍然存在，請提供：
- CloudWatch Logs 的錯誤訊息
- 瀏覽器 Console 的錯誤訊息
- API Gateway 的測試結果
