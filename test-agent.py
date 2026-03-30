import boto3
import json

bedrock_agent_runtime = boto3.client(
    service_name='bedrock-agent-runtime',
    region_name='us-west-2'
)

response = bedrock_agent_runtime.invoke_agent(
    agentId='Z56OAA2L3J',
    agentAliasId='TSTALIASID',
    sessionId='test-session-456',
    inputText='有哪些政府補助計畫？'
)

agent_response = ""
event_stream = response['completion']

for event in event_stream:
    if 'chunk' in event:
        chunk = event['chunk']
        if 'bytes' in chunk:
            agent_response += chunk['bytes'].decode('utf-8')

print("Agent 回應:")
print(agent_response)
