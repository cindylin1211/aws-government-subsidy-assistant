import json
import boto3
import os
from datetime import datetime

# Bedrock Agent 配置
AGENT_ID = "Z56OAA2L3J"
AGENT_ALIAS_ID = "Z1FEZNULZP"
REGION = "us-west-2"

# 初始化 Bedrock Agent Runtime 客戶端
bedrock_agent_runtime = boto3.client(
    service_name='bedrock-agent-runtime',
    region_name=REGION
)

def lambda_handler(event, context):
    """
    Lambda 函數處理器，用於呼叫 Bedrock Agent
    """
    
    # 記錄完整的事件以便調試
    print(f"收到事件: {json.dumps(event)}")
    
    # 處理 CORS preflight 請求
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': get_cors_headers(),
            'body': json.dumps({'message': 'OK'})
        }
    
    try:
        # 解析請求內容 - 處理不同的事件格式
        if isinstance(event.get('body'), str):
            body = json.loads(event.get('body', '{}'))
        else:
            body = event.get('body', {})
        
        # 如果 body 還是空的，嘗試直接從 event 取得
        if not body:
            body = event
        
        print(f"解析後的 body: {json.dumps(body)}")
        
        user_message = body.get('message', '')
        session_id = body.get('sessionId', f"session-{datetime.now().timestamp()}")
        
        if not user_message:
            return {
                'statusCode': 400,
                'headers': get_cors_headers(),
                'body': json.dumps({
                    'error': '請提供訊息內容'
                })
            }
        
        print(f"收到訊息: {user_message}")
        print(f"Session ID: {session_id}")
        
        # 呼叫 Bedrock Agent
        response = bedrock_agent_runtime.invoke_agent(
            agentId=AGENT_ID,
            agentAliasId=AGENT_ALIAS_ID,
            sessionId=session_id,
            inputText=user_message
        )
        
        # 處理串流回應
        agent_response = ""
        event_stream = response['completion']
        
        for event in event_stream:
            if 'chunk' in event:
                chunk = event['chunk']
                if 'bytes' in chunk:
                    agent_response += chunk['bytes'].decode('utf-8')
        
        print(f"Agent 回應: {agent_response}")
        
        return {
            'statusCode': 200,
            'headers': get_cors_headers(),
            'body': json.dumps({
                'response': agent_response,
                'sessionId': session_id,
                'timestamp': datetime.now().isoformat()
            })
        }
        
    except Exception as e:
        print(f"錯誤: {str(e)}")
        return {
            'statusCode': 500,
            'headers': get_cors_headers(),
            'body': json.dumps({
                'error': '處理請求時發生錯誤',
                'details': str(e)
            })
        }

def get_cors_headers():
    """
    返回 CORS 標頭
    """
    return {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'OPTIONS,POST',
        'Content-Type': 'application/json'
    }
