import { z } from "zod";

// Provider Configuration
export type LLMProvider = "openai" | "gemini" | "openrouter";

export interface ModelConfig {
  provider: LLMProvider;
  model: string;
  apiKeyEnvVar: string;
  baseUrl: string;
}

// Model Registry based on Environmental Constants
export const MODEL_REGISTRY: Record<string, ModelConfig> = {
  primary: {
    provider: "openai",
    model: "gpt-4o-mini",
    apiKeyEnvVar: "OPENAI_API_KEY",
    baseUrl: "https://api.openai.com/v1",
  },
  gemini: {
    provider: "gemini",
    model: "gemini-1.5-flash",
    apiKeyEnvVar: "GEMINI_API_KEY",
    baseUrl: "https://generativelanguage.googleapis.com/v1beta/openai",
  },
  "deepseek-v3-1": {
    provider: "openrouter",
    model: "deepseek/deepseek-chat-v3-0324",
    apiKeyEnvVar: "DEEPSEEK_V3_1_KEY",
    baseUrl: "https://openrouter.ai/api/v1",
  },
  "deepseek-v3": {
    provider: "openrouter",
    model: "deepseek/deepseek-chat",
    apiKeyEnvVar: "DEEPSEEK_V3_KEY",
    baseUrl: "https://openrouter.ai/api/v1",
  },
  "deepseek-r1": {
    provider: "openrouter",
    model: "deepseek/deepseek-r1",
    apiKeyEnvVar: "DEEPSEEK_R1_KEY",
    baseUrl: "https://openrouter.ai/api/v1",
  },
  "qwen3-235b": {
    provider: "openrouter",
    model: "qwen/qwen3-235b-a22b",
    apiKeyEnvVar: "QWEN_3_235B_KEY",
    baseUrl: "https://openrouter.ai/api/v1",
  },
  "nemotron-super": {
    provider: "openrouter",
    model: "nvidia/llama-3.1-nemotron-70b-instruct",
    apiKeyEnvVar: "NVIDIA_NEMOTRON_SUPER_KEY",
    baseUrl: "https://openrouter.ai/api/v1",
  },
  "glm-4-5-air": {
    provider: "openrouter",
    model: "thudm/glm-4-plus",
    apiKeyEnvVar: "GLM_4_5_AIR_KEY",
    baseUrl: "https://openrouter.ai/api/v1",
  },
};

// Fallback Chain Sequence Priority
export const ORCHESTRATION_FALLBACK_CHAIN = [
  "gemini",
  "deepseek-v3-1",
  "deepseek-v3",
  "deepseek-r1",
  "qwen3-235b",
  "nemotron-super",
  "glm-4-5-air",
];

// Agent Architectures
export const AGENT_PROFILES = {
  MarketAnalyst: {
    systemPrompt: "You are an expert Predictive Analyst Agent. Your objective is to process CBT student results, analyze historical pass trajectories, and generate a probabilistic prediction outlining clear study deficits.",
    temperature: 0.2,
    schema: z.object({
      passProbability: z.number().min(0).max(100),
      summary: z.string(),
      recommendedFocusTopics: z.array(z.string()),
    })
  },
  Tutor: {
    systemPrompt: "You are an elite academic Tutor Agent specializing in Nigerian curriculums (JAMB/WAEC). Explain concepts with high precision, referencing standard syllabuses.",
    temperature: 0.5,
    schema: z.object({
      explanation: z.string(),
      keyTakeaways: z.array(z.string()),
      confidenceScore: z.number(),
    })
  },
  ExamGrader: {
    systemPrompt: "You are a deterministic Exam Grader Agent. You evaluate short answers against a rubric and output absolute scores and correction breakdowns.",
    temperature: 0.0,
    schema: z.object({
      isCorrect: z.boolean(),
      score: z.number(),
      feedback: z.string(),
    })
  },
  CurriculumPlanner: {
    systemPrompt: "You are a Curriculum Planner Agent. Based on the student's weaknesses, output a highly structured daily study plan schedule for independent learning.",
    temperature: 0.3,
    schema: z.object({
      studyPlan: z.array(z.object({
        day: z.number(),
        topic: z.string(),
        rationale: z.string()
      }))
    })
  }
};

export type AgentRole = keyof typeof AGENT_PROFILES;
