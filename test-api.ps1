# API 測試腳本
$apiUrl = "https://hyeavzp56b.execute-api.us-west-2.amazonaws.com/prod/chat"

Write-Host "測試 API: $apiUrl" -ForegroundColor Cyan
Write-Host ""

# 測試 1: 基本 POST 請求
Write-Host "測試 1: 發送測試訊息" -ForegroundColor Yellow
$body = @{
    message = "你好，請問如何申請政府補助？"
    sessionId = "test-session-$(Get-Date -Format 'yyyyMMddHHmmss')"
} | ConvertTo-Json

Write-Host "請求內容:" -ForegroundColor Gray
Write-Host $body -ForegroundColor Gray
Write-Host ""

try {
    $response = Invoke-WebRequest -Uri $apiUrl -Method Post -Body $body -ContentType "application/json" -UseBasicParsing
    Write-Host "✅ 成功!" -ForegroundColor Green
    Write-Host "狀態碼: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "回應內容:" -ForegroundColor Green
    Write-Host $response.Content -ForegroundColor White
} catch {
    Write-Host "❌ 失敗!" -ForegroundColor Red
    Write-Host "錯誤: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $statusCode = $_.Exception.Response.StatusCode.value__
        Write-Host "狀態碼: $statusCode" -ForegroundColor Red
        
        $result = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($result)
        $responseBody = $reader.ReadToEnd()
        Write-Host "回應內容:" -ForegroundColor Red
        Write-Host $responseBody -ForegroundColor White
    }
}

Write-Host ""
Write-Host "測試 2: 檢查 CORS" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri $apiUrl -Method Options -UseBasicParsing
    Write-Host "✅ CORS 設定正常" -ForegroundColor Green
    Write-Host "CORS 標頭:" -ForegroundColor Green
    $response.Headers.GetEnumerator() | Where-Object { $_.Key -like "*Access-Control*" } | ForEach-Object {
        Write-Host "  $($_.Key): $($_.Value)" -ForegroundColor White
    }
} catch {
    Write-Host "❌ CORS 可能有問題" -ForegroundColor Red
    Write-Host "錯誤: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "診斷完成" -ForegroundColor Cyan