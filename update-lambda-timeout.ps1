# 更新 Lambda Timeout 的腳本
# 使用前請確認已設定 AWS CLI credentials

# 請替換成你的 Lambda 函數名稱
$FUNCTION_NAME = "你的Lambda函數名稱"  # 例如: "bedrock-agent-handler"

Write-Host "正在更新 Lambda Timeout..." -ForegroundColor Cyan

try {
    # 更新 Lambda 設定，將 timeout 改為 60 秒
    aws lambda update-function-configuration `
        --function-name $FUNCTION_NAME `
        --timeout 60 `
        --region us-west-2
    
    Write-Host "✅ Lambda Timeout 已更新為 60 秒" -ForegroundColor Green
    
} catch {
    Write-Host "❌ 更新失敗" -ForegroundColor Red
    Write-Host "錯誤訊息: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "請確認：" -ForegroundColor Yellow
    Write-Host "1. 已安裝 AWS CLI" -ForegroundColor Yellow
    Write-Host "2. 已執行 'aws configure' 設定 credentials" -ForegroundColor Yellow
    Write-Host "3. Lambda 函數名稱正確" -ForegroundColor Yellow
    Write-Host "4. 有權限修改 Lambda 設定" -ForegroundColor Yellow
}
