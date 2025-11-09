# 📦 GitHub 上傳文件清單

## ⚠️ 重要提醒

**不要上傳 `.env` 文件**（包含敏感資訊）

## 📁 需要上傳的文件和資料夾

### 根目錄文件（直接上傳）

```
✅ .env.example
✅ .gitignore
✅ amplify.yml
✅ index.html
✅ package.json
✅ package-lock.json
✅ postcss.config.js
✅ tailwind.config.js
✅ tsconfig.json
✅ tsconfig.node.json
✅ vite.config.ts
✅ README.md
✅ AMPLIFY-DEPLOYMENT.md
✅ DEPLOYMENT.md
✅ FIX-PERMISSIONS.md
✅ QUICK-DEPLOY.md
✅ TESTING.md
✅ TROUBLESHOOTING.md
✅ test-api.html
✅ test-api.ps1
```

### src 資料夾（需要保持資料夾結構）

```
src/
  ✅ App.tsx
  ✅ main.tsx
  ✅ index.css
  
  src/components/
    ✅ ChatInterface.tsx
    ✅ Header.tsx
    ✅ Footer.tsx
    ✅ SubsidyInfo.tsx
```

### lambda 資料夾（參考用，不影響前端部署）

```
lambda/
  ✅ bedrock-agent-handler.py
  ✅ iam-policy.json
```

## 🚫 不要上傳的文件/資料夾

```
❌ .env （包含 API URL，但 Amplify 會用環境變數）
❌ node_modules/ （太大，Amplify 會自動安裝）
❌ .git/ （GitHub 會自動處理）
❌ dist/ （建置產物，Amplify 會自動生成）
```

## 📝 上傳步驟

### 方法 1: 使用 GitHub 網頁介面（推薦）

1. **前往你的倉庫**: https://github.com/cindylin1211/aws-government-subsidy-assistant

2. **上傳根目錄文件**:
   - 點擊 "Add file" → "Upload files"
   - 拖曳所有根目錄的文件（不包括資料夾）
   - 提交

3. **創建 src 資料夾並上傳**:
   - 點擊 "Add file" → "Create new file"
   - 在文件名輸入: `src/App.tsx`
   - 複製 `src/App.tsx` 的內容貼上
   - 提交
   - 重複此步驟上傳其他 src 文件

4. **創建 src/components 資料夾並上傳**:
   - 點擊 "Add file" → "Create new file"
   - 在文件名輸入: `src/components/ChatInterface.tsx`
   - 複製內容貼上
   - 提交
   - 重複此步驟上傳其他 components 文件

5. **創建 lambda 資料夾並上傳**:
   - 同樣方式上傳 lambda 資料夾的文件

### 方法 2: 使用 ZIP 壓縮上傳（更快）

1. **創建 ZIP 文件**:
   - 選擇所有需要的文件和資料夾
   - 右鍵 → "壓縮為 ZIP"
   - 確保不包含 `node_modules`, `.git`, `.env`

2. **上傳到 GitHub**:
   - 前往倉庫
   - 點擊 "Add file" → "Upload files"
   - 拖曳 ZIP 文件
   - GitHub 會自動解壓縮
   - 提交

## ✅ 驗證清單

上傳完成後，檢查 GitHub 倉庫是否有：

- [ ] 根目錄有 `package.json`
- [ ] 根目錄有 `amplify.yml`
- [ ] 根目錄有 `index.html`
- [ ] 有 `src/` 資料夾
- [ ] `src/` 資料夾中有 `App.tsx`, `main.tsx`, `index.css`
- [ ] 有 `src/components/` 資料夾
- [ ] `src/components/` 中有 4 個組件文件
- [ ] 沒有 `.env` 文件（敏感資訊）
- [ ] 沒有 `node_modules/` 資料夾

## 🎯 完成後

上傳完成後，你就可以：

1. ✅ 前往 AWS Amplify Console
2. ✅ 連接 GitHub 倉庫
3. ✅ 設定環境變數
4. ✅ 開始部署

## 💡 小技巧

如果 GitHub 網頁上傳太慢，可以：
1. 使用 GitHub Desktop（圖形化介面）
2. 等待 Code Defender 批准後用 Git 命令
3. 分批上傳（先上傳重要文件）

## 🆘 需要幫助？

如果上傳過程中遇到問題：
1. 確認文件大小不超過 100MB
2. 確認網路連線穩定
3. 可以分批上傳，不用一次全部上傳
