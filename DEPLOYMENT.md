# AWS Bedrock Agent 部署指南

## 📋 前置需求

- AWS 帳號
- Bedrock Agent ARN: `arn:aws:bedrock:us-west-2:640223110023:agent/Z56OAA2L3J`
- Agent Alias ID: `Z1FEZNULZP`

## 🚀 部署步驟

### 1. 創建 Lambda 函數

1. **登入 AWS Console**，搜尋 "Lambda"

2. **創建新函數**
   - 點擊 "Create function"
   - 選擇 "Author from scratch"
   - Function name: `bedrock-agent-chat-handler`
   - Runtime: `Python 3.12`
   - Architecture: `x86_64`

3. **上傳代碼**
   - 複製 `lambda/bedrock-agent-handler.py` 的內容
   - 貼到 Lambda 函數編輯器中
   - 點擊 "Deploy"

4. **設定環境變數**（可選）
   - 在 Configuration → Environment variables 中添加：
     - `AGENT_ID`: `Z56OAA2L3J`
     - `AGENT_ALIAS_ID`: `Z1FEZNULZP`

5. **設定 IAM 權限**
   - 在 Configuration → Permissions 中
   - 點擊 Role name 進入 IAM
   - 添加以下政策：

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

6. **設定超時時間**
   - Configuration → General configuration
   - Timeout: 設定為 `60 秒`

### 2. 創建 API Gateway

1. **創建 REST API**
   - 搜尋 "API Gateway"
   - 點擊 "Create API"
   - 選擇 "REST API" → "Build"
   - API name: `bedrock-agent-api`
   - Endpoint Type: `Regional`

2. **創建資源和方法**
   - 點擊 "Actions" → "Create Resource"
   - Resource Name: `chat`
   - 勾選 "Enable API Gateway CORS"
   - 點擊 "Create Resource"

3. **創建 POST 方法**
   - 選擇 `/chat` 資源
   - 點擊 "Actions" → "Create Method"
   - 選擇 "POST"
   - Integration type: `Lambda Function`
   - Lambda Function: 選擇你的 Lambda 函數
   - 點擊 "Save"

4. **啟用 CORS**
   - 選擇 `/chat` 資源
   - 點擊 "Actions" → "Enable CORS"
   - 保持預設設定
   - 點擊 "Enable CORS and replace existing CORS headers"

5. **部署 API**
   - 點擊 "Actions" → "Deploy API"
   - Deployment stage: `[New Stage]`
   - Stage name: `prod`
   - 點擊 "Deploy"

6. **取得 API URL**
   - 部署後會顯示 "Invoke URL"
   - 格式類似：`https://xxxxxx.execute-api.us-west-2.amazonaws.com/prod`
   - 完整的 endpoint 是：`https://xxxxxx.execute-api.us-west-2.amazonaws.com/prod/chat`

### 3. 驗證 Agent 配置

Lambda 函數已經配置好以下資訊：
- **Agent ID**: `Z56OAA2L3J`
- **Agent Alias ID**: `Z1FEZNULZP`
- **Region**: `us-west-2`

確認你的 Bedrock Agent 已經部署並處於 "Prepared" 狀態。

### 4. 更新前端配置

1. **本地開發**
   - 創建 `.env` 文件：
   ```
   VITE_API_URL=https://your-api-gateway-url.execute-api.us-west-2.amazonaws.com/prod/chat
   ```

2. **Amplify 部署**
   - 在 Amplify Console 中
   - 前往 "Environment variables"
   - 添加：
     - Key: `VITE_API_URL`
     - Value: 你的 API Gateway URL

### 5. 測試

1. **測試 Lambda 函數**
   - 在 Lambda Console 中點擊 "Test"
   - 使用以下測試事件：
   ```json
   {
     "httpMethod": "POST",
     "body": "{\"message\": \"你好，請問如何申請政府補助？\"}"
   }
   ```

2. **測試 API Gateway**
   - 使用 Postman 或 curl：
   ```bash
   curl -X POST https://your-api-url/prod/chat \
     -H "Content-Type: application/json" \
     -d '{"message": "你好，請問如何申請政府補助？"}'
   ```

3. **測試前端**
   - 啟動開發服務器：`npm run dev`
   - 在聊天介面中發送訊息
   - 檢查瀏覽器 Console 是否有錯誤

## 🔧 故障排除

### Lambda 函數錯誤
- 檢查 CloudWatch Logs
- 確認 IAM 權限正確
- 確認 Agent Alias ID 正確

### CORS 錯誤
- 確認 API Gateway 已啟用 CORS
- 檢查 Lambda 函數的回應標頭

### Agent 無回應
- 確認 Agent 已部署並處於 "Prepared" 狀態
- 檢查 Agent Alias 是否正確
- 確認 AWS 帳號有權限呼叫 Bedrock

## 📊 成本估算

- Lambda: 前 100 萬次請求免費
- API Gateway: 前 100 萬次 API 呼叫免費
- Bedrock Agent: 依使用量計費
- Amplify: 每月 1000 建置分鐘免費

## 🔐 安全建議

1. 在生產環境中，限制 CORS 來源為你的網域
2. 考慮添加 API Key 或 Cognito 認證
3. 設定 API Gateway 的速率限制
4. 定期檢查 CloudWatch Logs
