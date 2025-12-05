# 如何給 Maggie S3 權限 - 詳細步驟

## 準備工作

1. **找到你的 AWS Account ID**
   - 在 AWS Console 右上角點擊你的帳號名稱
   - 會看到 12 位數字的 Account ID
   - 例如：`123456789012`

## 步驟

### 1. 進入 S3 Console

- 在 AWS Console 搜尋框輸入 "S3"
- 點擊進入 S3

### 2. 找到 Bucket

- 在 bucket 列表中找到 `tw-dgr-gov-funding`
- 點擊 bucket 名稱進入

### 3. 進入 Permissions 標籤

- 點擊上方的「Permissions」標籤

### 4. 編輯 Bucket Policy

- 往下滾動找到「Bucket policy」區塊
- 點擊「Edit」按鈕

### 5. 貼上 Policy

複製以下 Policy（記得替換 YOUR_ACCOUNT_ID）：

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowMaggieAccessToDGRFolder",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::YOUR_ACCOUNT_ID:user/maggieyj"
      },
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::tw-dgr-gov-funding/dgr-gov-funding/*",
        "arn:aws:s3:::tw-dgr-gov-funding"
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

**重要**：把 `YOUR_ACCOUNT_ID` 替換成你的 12 位數 Account ID

### 6. 如果已經有其他 Policy

如果 Bucket policy 已經有內容，需要把新的 Statement 加進去：

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      ... 現有的 statement ...
    },
    {
      "Sid": "AllowMaggieAccessToDGRFolder",
      ... 上面的新 statement ...
    }
  ]
}
```

### 7. 儲存

- 點擊「Save changes」
- 如果有錯誤，檢查 JSON 格式是否正確

## 完成！

Maggie 現在可以：
- ✅ 查看 `dgr-gov-funding/` 資料夾
- ✅ 下載資料夾內的檔案
- ✅ 上傳新檔案到資料夾
- ✅ 刪除資料夾內的檔案

## 測試

Maggie 可以：
1. 登入 AWS Console
2. 進入 S3
3. 找到 `tw-dgr-gov-funding` bucket
4. 應該能看到並存取 `dgr-gov-funding/` 資料夾

## 如果只想給讀取權限

如果只想讓 Maggie 讀取檔案，不能上傳或刪除，把 Action 改成：

```json
"Action": [
  "s3:GetObject",
  "s3:ListBucket"
]
```

## 需要幫助？

如果遇到問題，告訴我錯誤訊息，我會幫你解決！
