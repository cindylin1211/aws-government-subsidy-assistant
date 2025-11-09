# 🔧 修復 Lambda 權限問題

## 問題

Lambda 函數無法呼叫 Bedrock Agent，錯誤訊息：
```
AccessDeniedException: User is not authorized to perform: bedrock:InvokeAgent
```

## 解決方案

### 方法 1: 使用 AWS Console（推薦）

1. **前往 IAM Console**
   - 在 AWS Console 搜尋 "IAM"
   - 點擊進入 IAM

2. **找到 Lambda 執行角色**
   - 點擊左側選單的 "Roles"
   - 搜尋 `bedrock-agent-chat-handler-role`
   - 點擊該角色

3. **添加權限**
   - 點擊 "Add permissions" → "Create inline policy"
   - 點擊 "JSON" 標籤
   - 貼上以下政策：

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "bedrock:InvokeAgent"
            ],
            "Resource": [
                "arn:aws:bedrock:us-west-2:640223110023:agent/Z56OAA2L3J",
                "arn:aws:bedrock:us-west-2:640223110023:agent-alias/Z56OAA2L3J/Z1FEZNULZP"
            ]
        }
    ]
}
```

4. **儲存政策**
   - 點擊 "Review policy"
   - Policy name: `BedrockAgentInvokePolicy`
   - 點擊 "Create policy"

### 方法 2: 使用 Lambda Console（更快）

1. **前往 Lambda Console**
   - 搜尋 "Lambda"
   - 選擇你的函數 `bedrock-agent-chat-handler`

2. **進入 Configuration**
   - 點擊 "Configuration" 標籤
   - 點擊左側的 "Permissions"

3. **編輯角色**
   - 點擊 "Execution role" 下的角色名稱（會在新視窗開啟 IAM）
   - 點擊 "Add permissions" → "Create inline policy"
   - 選擇 "JSON" 標籤
   - 貼上上面的政策
   - 點擊 "Review policy"
   - Policy name: `BedrockAgentInvokePolicy`
   - 點擊 "Create policy"

### 方法 3: 使用 AWS CLI

如果你有安裝 AWS CLI，可以執行：

```bash
# 取得角色名稱
aws lambda get-function --function-name bedrock-agent-chat-handler --query 'Configuration.Role'

# 創建政策文件（已在 lambda/iam-policy.json）
# 附加政策到角色
aws iam put-role-policy \
  --role-name bedrock-agent-chat-handler-role-xptjaqo4 \
  --policy-name BedrockAgentInvokePolicy \
  --policy-document file://lambda/iam-policy.json
```

## 驗證

完成後，等待約 10 秒讓權限生效，然後測試：

### 使用 PowerShell 測試：

```powershell
$body = '{"message":"hello, how can I apply for government subsidy?","sessionId":"test-123"}'
$response = Invoke-WebRequest -Uri "https://hyeavzp56b.execute-api.us-west-2.amazonaws.com/prod/chat" -Method Post -Body $body -ContentType "application/json" -UseBasicParsing
$response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 10
```

### 預期結果：

```json
{
    "response": "Agent 的回應內容...",
    "sessionId": "test-123",
    "timestamp": "2025-01-01T00:00:00.000000"
}
```

## 完整的 IAM 政策

完整的政策文件已保存在 `lambda/iam-policy.json`，包含：
- ✅ Bedrock Agent 呼叫權限
- ✅ CloudWatch Logs 權限

## 故障排除

### 如果還是失敗：

1. **檢查角色名稱**
   - 確認你編輯的是正確的角色
   - 角色名稱應該類似：`bedrock-agent-chat-handler-role-xxxxx`

2. **檢查 Agent ARN**
   - Agent ID: `Z56OAA2L3J`
   - Agent Alias ID: `Z1FEZNULZP`
   - Region: `us-west-2`
   - Account ID: `640223110023`

3. **檢查 Agent 狀態**
   - 前往 Bedrock Console
   - 確認 Agent 處於 "Prepared" 狀態
   - 確認 Alias 存在且正確

4. **查看 CloudWatch Logs**
   - 前往 CloudWatch → Log groups
   - 找到 `/aws/lambda/bedrock-agent-chat-handler`
   - 查看最新的錯誤訊息

## 下一步

權限修復後，你就可以：
1. ✅ 測試 API 呼叫
2. ✅ 在前端應用中使用
3. ✅ 部署到 Amplify
