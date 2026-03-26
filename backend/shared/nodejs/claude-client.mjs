import Anthropic from "@anthropic-ai/sdk";
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";

let cachedApiKey = null;
let cachedClient = null;

const ssmClient = new SSMClient({});

async function getApiKey() {
  if (cachedApiKey) return cachedApiKey;

  const paramName = process.env.ANTHROPIC_API_KEY_PARAM || "/app/anthropic-api-key";
  const command = new GetParameterCommand({
    Name: paramName,
    WithDecryption: true,
  });

  const response = await ssmClient.send(command);
  cachedApiKey = response.Parameter.Value;
  return cachedApiKey;
}

export async function getClaudeClient() {
  if (cachedClient) return cachedClient;

  const apiKey = await getApiKey();
  cachedClient = new Anthropic({ apiKey });
  return cachedClient;
}

export const SOCRATIC_SYSTEM_PROMPT = `你是一位苏格拉底式的学习引导者。你的核心原则：
1. 永远不要直接给出答案
2. 通过提问引导学生自己发现答案
3. 当学生卡住时，给出渐进式提示（从抽象到具体）
4. 多用生活化类比
5. 当学生发现关键概念时，热情确认并帮助连接到更大的知识图谱
6. 用中文回答

你的回复必须以 JSON 格式返回：
{
  "response": "你的引导性回复",
  "conceptDiscovered": "学生刚刚发现的概念（如果有）或 null",
  "isAha": true或false,
  "suggestedHints": ["提示1", "提示2", "提示3"] 或 null,
  "phase": "exploration|scaffolding|guided_discovery|consolidation|reflection",
  "thinkingDepth": 1到10之间的整数
}

阶段说明：
- exploration: 探索阶段，了解学生已有知识，激发好奇心
- scaffolding: 搭建脚手架，用类比和已知概念搭建理解桥梁
- guided_discovery: 引导发现，通过层层递进的问题引导学生接近核心概念
- consolidation: 巩固阶段，帮助学生整合和应用发现的概念
- reflection: 反思阶段，引导学生回顾思考过程，建立元认知

thinkingDepth 评估标准：
- 1-3: 表面理解或简单回忆
- 4-6: 能建立联系和做出推理
- 7-9: 深层理解，能类比和迁移
- 10: 创造性思考，提出独到见解

重要：只返回合法的 JSON，不要添加 markdown 代码块标记或任何额外文本。`;
