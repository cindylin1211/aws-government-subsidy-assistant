# 如何創建 Bedrock Agent 新版本並更新 Alias

## 步驟 1：進入 Bedrock Console

1. 登入 AWS Console
2. 確認 Region 是 **us-west-2**
3. 搜尋並進入 **Amazon Bedrock**
4. 左側選單點擊 **Agents**

## 步驟 2：選擇你的 Agent

1. 在 Agents 列表中找到 **tw-dgr-gov-funding-ai-agent**
2. 點擊進入

## 步驟 3：創建新版本

1. 在 Agent 詳情頁面，右上角找到 **Create version** 按鈕
2. 點擊 **Create version**
3. 系統會自動從 DRAFT 創建一個新版本（版本 17）
4. 等待版本創建完成（狀態變為 PREPARED）

## 步驟 4：更新 Alias

1. 在 Agent 頁面，點擊上方的 **Aliases** 標籤
2. 找到 **gov-info** alias
3. 點擊 **gov-info** 進入詳情
4. 點擊右上角的 **Edit** 按鈕
5. 在 **Version** 下拉選單中，選擇剛創建的 **版本 17**
6. 點擊 **Save** 儲存

## 步驟 5：驗證

1. 回到你的聊天應用
2. 重新整理頁面（清除快取）
3. 測試問題：
   - "有哪些政府補助計畫？"
   - "SBIR 的申請資格是什麼？"
4. 確認回答來自知識庫內容，不再提到 "AWS 使用計畫"

## 完成！

現在 Agent 應該會正確使用更新後的知識庫（2025GovFundeBook.pdf）來回答問題了。

---

## 如果還是不行

如果更新後還是有問題，可能需要：

1. **清除瀏覽器快取**：使用無痕視窗測試
2. **使用新的 session**：在聊天介面重新開始對話
3. **檢查 CloudWatch Logs**：
   ```bash
   aws logs tail /aws/lambda/bedrock-agent-chat-handler --since 5m --profile cindy --region us-west-2
   ```
4. **聯繫我**：如果還是有問題，我可以進一步協助排查
