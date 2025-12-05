# 給 Maggie IAM Policy（推薦方法）

Bucket Policy 有問題，改用 IAM Policy 更簡單！

## 步驟：

### 1. 進入 IAM Console
- 搜尋 "IAM"
- 點擊進入

### 2. 找到 Maggie 的 User
- 左側選單點擊「Users」
- 搜尋或找到 `maggieyj`
- 點擊進入

### 3. 加入 Inline Policy
- 點擊「Permissions」標籤
- 點擊「Add permissions」下拉選單
- 選擇「Create inline policy」

### 4. 切換到 JSON 模式
- 點擊「JSON」標籤

### 5. 貼上 Policy
複製 `MAGGIE-IAM-POLICY.json` 的內容並貼上

### 6. 命名並建立
- 點擊「Next」
- Policy name: `DGRGovFundingAccess`
- 點擊「Create policy」

## 完成！

Maggie 現在可以：
- ✅ 存取 `tw-dgr-gov-funding` bucket 的 `dgr-gov-funding/` 資料夾
- ✅ 讀取、上傳、刪除資料夾內的檔案
- ✅ 列出資料夾內容

## 為什麼用 IAM Policy 而不是 Bucket Policy？

- IAM Policy 更簡單，不會有 Principal 的問題
- 直接附加到 user，權限管理更清楚
- 不需要修改 bucket 的設定

## 測試

Maggie 登入後：
1. 進入 S3 Console
2. 找到 `tw-dgr-gov-funding` bucket
3. 應該能看到並存取 `dgr-gov-funding/` 資料夾
