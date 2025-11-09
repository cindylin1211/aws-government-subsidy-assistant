# ⚡ 快速部署指南

## 🎯 你現在的位置

✅ Git 倉庫已初始化
✅ 代碼已提交
✅ 準備推送到 GitHub

## 📝 接下來的步驟

### 1️⃣ 在 GitHub 創建倉庫

1. **打開瀏覽器，前往**: https://github.com/new
2. **填寫資訊**:
   - Repository name: `aws-government-subsidy-assistant`
   - Description: `AWS 政府補助小助手 - 整合 Bedrock Agent`
   - 選擇 Public 或 Private
   - **不要勾選** "Add a README file"
3. **點擊 "Create repository"**

### 2️⃣ 推送代碼到 GitHub

GitHub 會顯示指令，或者使用以下指令（**替換你的 GitHub 用戶名**）:

```bash
git remote add origin https://github.com/你的用戶名/aws-government-subsidy-assistant.git
git branch -M main
git push -u origin main
```

**範例**（如果你的用戶名是 `john`）:
```bash
git remote add origin https://github.com/john/aws-government-subsidy-assistant.git
git branch -M main
git push -u origin main
```

### 3️⃣ 在 AWS Amplify 部署

#### 步驟 A: 進入 Amplify

1. 登入 AWS Console: https://console.aws.amazon.com
2. 搜尋 "Amplify"
3. 點擊 "AWS Amplify"

#### 步驟 B: 創建應用

1. 點擊 **"New app" → "Host web app"**
2. 選擇 **"GitHub"**
3. 點擊 **"Continue"**

#### 步驟 C: 授權並選擇倉庫

1. 授權 AWS Amplify 存取 GitHub
2. 選擇倉庫: `aws-government-subsidy-assistant`
3. 選擇分支: `main`
4. 點擊 **"Next"**

#### 步驟 D: 配置建置（重要！）

1. App name: `aws-government-subsidy-assistant`
2. **展開 "Advanced settings"**
3. **添加環境變數**:
   ```
   Key: VITE_API_URL
   Value: https://hyeavzp56b.execute-api.us-west-2.amazonaws.com/prod/chat
   ```
4. 點擊 **"Next"**

#### 步驟 E: 部署

1. 檢查設定
2. 點擊 **"Save and deploy"**
3. 等待 3-5 分鐘

### 4️⃣ 完成！

部署完成後，你會獲得一個網址，例如：
```
https://main.d1234567890.amplifyapp.com
```

## 🧪 測試部署

1. 點擊 Amplify 提供的網址
2. 在聊天框輸入: "你好，請問如何申請政府補助？"
3. 確認 Bedrock Agent 正常回應

## 🔄 後續更新

每次修改代碼後：

```bash
git add .
git commit -m "更新描述"
git push
```

Amplify 會自動重新部署（約 2-3 分鐘）

## 📋 重要資訊

### API Gateway URL
```
https://hyeavzp56b.execute-api.us-west-2.amazonaws.com/prod/chat
```

### Bedrock Agent
- Agent ID: `Z56OAA2L3J`
- Agent Alias ID: `Z1FEZNULZP`

### 環境變數（在 Amplify 中設定）
```
VITE_API_URL=https://hyeavzp56b.execute-api.us-west-2.amazonaws.com/prod/chat
```

## 🆘 需要幫助？

查看詳細文件：
- 📖 完整部署指南: `AMPLIFY-DEPLOYMENT.md`
- 🔧 故障排除: `TROUBLESHOOTING.md`
- 🧪 測試指南: `TESTING.md`

## ✅ 檢查清單

部署前：
- [x] Git 倉庫已初始化
- [x] 代碼已提交
- [ ] GitHub 倉庫已創建
- [ ] 代碼已推送到 GitHub
- [ ] Amplify 應用已創建
- [ ] 環境變數已設定
- [ ] 部署成功

## 🎉 預期結果

部署成功後，你將擁有：
- ✅ 一個公開的網址
- ✅ 自動 HTTPS 加密
- ✅ 全球 CDN 加速
- ✅ 自動部署（推送即部署）
- ✅ 完整的 Bedrock Agent 整合

祝你部署順利！🚀
