# 測試 Lambda 是否正常呼叫 Bedrock Agent

$apiUrl = "https://hyeavzp56b.execute-api.us-west-2.amazonaws.com/prod/chat"

$body = @{
    message = "SBIR 計畫的申請資格是什麼？"
    sessionId = "test-session-$(Get-Date -Format 'yyyyMMddHHmmss')"
} | ConvertTo-Json

Write-Host "測試 API: $apiUrl" -ForegroundColor Cyan
Write-Host "發送訊息: SBIR 計畫的申請資格是什麼？" -ForegroundColor Cyan
Write-Host ""

try {
    $response = Invoke-RestMethod -Uri $apiUrl -Method Post -Body $body -ContentType "application/json"
    
    Write-Host "✅ API 呼叫成功" -ForegroundColor Green
    Write-Host ""
    Write-Host "Agent 回應:" -ForegroundColor Yellow
    Write-Host $response.response
    Write-Host ""
    Write-Host "Session ID: $($response.sessionId)" -ForegroundColor Gray
    Write-Host "時間戳記: $($response.timestamp)" -ForegroundColor Gray
    
} catch {
    Write-Host "❌ API 呼叫失敗" -ForegroundColor Red
    Write-Host "錯誤訊息: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "詳細錯誤:" -ForegroundColor Yellow
    Write-Host $_.Exception
}
