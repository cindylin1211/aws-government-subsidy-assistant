# Maggie 本機管理 S3 檔案指南

## 前置作業

### 1. 安裝 AWS CLI

**Windows**:
- 下載：https://aws.amazon.com/cli/
- 或使用 `winget install Amazon.AWSCLI`

**Mac**:
```bash
brew install awscli
```

### 2. 設定 AWS Credentials

```bash
aws configure
```

輸入以下資訊（Cindy 會提供）：
- AWS Access Key ID: `[Cindy 提供]`
- AWS Secret Access Key: `[Cindy 提供]`
- Default region name: `us-west-2`
- Default output format: `json`

---

## 常用指令

### 查看 S3 資料夾內容

```bash
aws s3 ls s3://tw-dgr-gov-funding/dgr-gov-funding/
```

### 上傳單一檔案

```bash
aws s3 cp 本機檔案.pdf s3://tw-dgr-gov-funding/dgr-gov-funding/
```

例如：
```bash
aws s3 cp "SBIR申請須知.pdf" s3://tw-dgr-gov-funding/dgr-gov-funding/
```

### 上傳整個資料夾

```bash
aws s3 sync ./本機資料夾/ s3://tw-dgr-gov-funding/dgr-gov-funding/
```

### 下載檔案到本機

```bash
aws s3 cp s3://tw-dgr-gov-funding/dgr-gov-funding/檔案.pdf ./
```

### 下載整個資料夾

```bash
aws s3 sync s3://tw-dgr-gov-funding/dgr-gov-funding/ ./本機資料夾/
```

### 刪除檔案

```bash
aws s3 rm s3://tw-dgr-gov-funding/dgr-gov-funding/要刪除的檔案.pdf
```

### 刪除多個檔案

```bash
aws s3 rm s3://tw-dgr-gov-funding/dgr-gov-funding/ --recursive --exclude "*" --include "*.txt"
```

---

## 建議工作流程

### 方案 1：直接上傳（簡單）

1. 準備好 PDF 檔案
2. 使用 `aws s3 cp` 上傳
3. 通知 Cindy 同步知識庫

### 方案 2：本機同步（適合大量檔案）

1. **建立本機工作資料夾**
   ```bash
   mkdir dgr-gov-funding
   cd dgr-gov-funding
   ```

2. **首次下載所有檔案**
   ```bash
   aws s3 sync s3://tw-dgr-gov-funding/dgr-gov-funding/ ./
   ```

3. **在本機新增或修改檔案**
   - 直接在資料夾中新增 PDF
   - 或刪除不需要的檔案

4. **同步回 S3**
   ```bash
   aws s3 sync ./ s3://tw-dgr-gov-funding/dgr-gov-funding/
   ```

5. **通知 Cindy 同步知識庫**

---

## 使用 VS Code 或 Kiro（更方便）

如果你使用 VS Code 或 Kiro，可以安裝 AWS Toolkit 擴充功能：

1. 安裝「AWS Toolkit」擴充功能
2. 設定 AWS Credentials（使用上面的 Access Key）
3. 在側邊欄可以直接瀏覽和管理 S3 檔案
4. 右鍵上傳/下載檔案

---

## 重要提醒

### ⚠️ 每次上傳或刪除檔案後

**必須通知 Cindy 同步知識庫**，否則 Agent 不會讀到新檔案！

Cindy 需要：
1. 進入 Bedrock Console → Knowledge bases
2. 點擊「Sync」
3. 等待同步完成

### 🔒 安全注意事項

- **不要分享 Access Key**
- **不要把 Access Key 上傳到 GitHub**
- **如果 Key 洩漏，立即通知 Cindy 刪除並重新建立**

---

## 常見問題

### Q: 如何確認檔案上傳成功？

```bash
aws s3 ls s3://tw-dgr-gov-funding/dgr-gov-funding/
```

### Q: 如何查看檔案大小？

```bash
aws s3 ls s3://tw-dgr-gov-funding/dgr-gov-funding/ --human-readable
```

### Q: 上傳失敗怎麼辦？

1. 檢查網路連線
2. 確認 AWS Credentials 設定正確
3. 確認檔案路徑正確
4. 聯繫 Cindy

### Q: 可以用 GUI 工具嗎？

可以！推薦：
- **AWS Toolkit for VS Code**（最推薦）
- **Cyberduck**（免費）
- **S3 Browser**（Windows）

---

## 需要幫助？

聯繫 Cindy：
- Email: cindyjw@amazon.com
- Slack: @Cindy Lin
