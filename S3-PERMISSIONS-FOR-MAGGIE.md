# 給 Maggie S3 資料夾權限

## 方法 1：使用 S3 Bucket Policy（推薦）

### 步驟：

1. **進入 S3 Console**
   - 搜尋 "S3"
   - 找到你的 bucket

2. **進入 Permissions 標籤**
   - 點擊 bucket 名稱
   - 點擊「Permissions」標籤

3. **編輯 Bucket Policy**
   - 往下滾動找到「Bucket policy」
   - 點擊「Edit」

4. **加入以下 Policy**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowMaggieAccessToDGRFolder",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::YOUR_ACCOUNT_ID:user/maggie"
      },
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::YOUR_BUCKET_NAME/dgr-gov-funding/*",
        "arn:aws:s3:::YOUR_BUCKET_NAME"
      ],
      "Condition": {
        "StringLike": {
          "s3:prefix": [
            "dgr-gov-funding/*"
          ]
        }
      }
    }
  ]
}
```

5. **替換以下內容**
   - `YOUR_ACCOUNT_ID`: 你的 AWS Account ID
   - `YOUR_BUCKET_NAME`: 你的 S3 bucket 名稱
   - `maggie`: Maggie 的 IAM user 名稱（或使用她的 ARN）

6. **儲存**
   - 點擊「Save changes」

---

## 方法 2：使用 IAM Policy（給 Maggie 的 IAM User）

### 步驟：

1. **進入 IAM Console**
   - 搜尋 "IAM"

2. **找到 Maggie 的 User**
   - 左側選單點擊「Users」
   - 找到 Maggie 的 user 並點擊

3. **加入 Inline Policy**
   - 點擊「Add permissions」→「Create inline policy」
   - 切換到「JSON」標籤

4. **貼上以下 Policy**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AccessDGRGovFundingFolder",
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::YOUR_BUCKET_NAME/dgr-gov-funding/*",
        "arn:aws:s3:::YOUR_BUCKET_NAME"
      ],
      "Condition": {
        "StringLike": {
          "s3:prefix": [
            "dgr-gov-funding/*"
          ]
        }
      }
    }
  ]
}
```

5. **替換 YOUR_BUCKET_NAME**

6. **命名並建立**
   - Policy name: `DGRGovFundingAccess`
   - 點擊「Create policy」

---

## 方法 3：使用 S3 Access Points（最安全）

如果你想要更細緻的控制，可以建立 S3 Access Point：

1. **進入 S3 Console**
2. **點擊左側的「Access Points」**
3. **Create access point**
   - Name: `dgr-gov-funding-access`
   - Bucket: 選擇你的 bucket
   - Network origin: Internet
4. **設定 Access Point Policy**
   - 只允許 Maggie 存取 `dgr-gov-funding/` 資料夾

---

## 權限說明

給 Maggie 的權限包括：

- ✅ **s3:GetObject** - 下載檔案
- ✅ **s3:PutObject** - 上傳檔案
- ✅ **s3:DeleteObject** - 刪除檔案
- ✅ **s3:ListBucket** - 列出資料夾內容

如果只想給讀取權限，只保留 `s3:GetObject` 和 `s3:ListBucket`。

---

## 測試權限

Maggie 可以用以下方式測試：

### 使用 AWS CLI
```bash
# 列出資料夾
aws s3 ls s3://YOUR_BUCKET_NAME/dgr-gov-funding/

# 下載檔案
aws s3 cp s3://YOUR_BUCKET_NAME/dgr-gov-funding/file.pdf ./

# 上傳檔案
aws s3 cp file.pdf s3://YOUR_BUCKET_NAME/dgr-gov-funding/
```

### 使用 S3 Console
- 登入 AWS Console
- 進入 S3
- 應該能看到並存取 `dgr-gov-funding/` 資料夾

---

## 需要的資訊

請提供給我：
1. **S3 Bucket 名稱**
2. **AWS Account ID**
3. **Maggie 的 IAM User 名稱或 ARN**

我可以幫你生成完整的 Policy！
