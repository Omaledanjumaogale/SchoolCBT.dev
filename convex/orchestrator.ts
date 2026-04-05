import { internalAction } from "./_generated/server";
import { v } from "convex/values";
import { AGENT_PROFILES, MODEL_REGISTRY, ORCHESTRATION_FALLBACK_CHAIN, type AgentRole, type ModelConfig } from "./agentConfig";

/**
 * Enterprise Agent Orchestration Engine
 * Recursively attempts the primary model and steps through the OpenRouter fallback chain upon errors.
 */

import { z } from "zod";

export const orchestrateTask = internalAction({
  args: {
    agentRole: v.string(), // keyof typeof AGENT_PROFILES
    payload: v.string(), // Context or task details
  },
  handler: async (ctx, args) => {
    const role = args.agentRole as AgentRole;
    const profile = AGENT_PROFILES[role];
    if (!profile) throw new Error(`Unknown agent role: ${role}`);

    const primaryModel = MODEL_REGISTRY["primary"];
    const fallbackChain = ORCHESTRATION_FALLBACK_CHAIN.map(key => MODEL_REGISTRY[key]).filter(Boolean);

    let lastError: unknown;

    // 1. Try Primary
    try {
      const resp = await executeLLM(primaryModel, profile, args.payload);
      return { success: true, model: primaryModel.model, data: resp };
    } catch (e) {
      lastError = e;
      console.warn(`Primary model ${primaryModel.model} failed. Executing fallback chain. Error:`, e);
    }

    // 2. Fallback execution
    for (const fallbackModel of fallbackChain) {
      try {
        console.log(`Attempting fallback to ${fallbackModel.model}...`);
        const resp = await executeLLM(fallbackModel, profile, args.payload);
        return { success: true, model: fallbackModel.model, data: resp, wasFallback: true };
      } catch (e) {
        lastError = e;
        console.warn(`Fallback model ${fallbackModel.model} failed. Cascading...`);
      }
    }

    // 3. Exhausted
    console.error("AGENT ORCHESTRATOR ERROR: Exhausted all fallback models.", lastError);
    throw new Error(`Enterprise AI Orchestration Failed: All fallback models exhausted. Last error: ${lastError instanceof Error ? lastError.message : String(lastError)}`);
  }
});

async function executeLLM(config: ModelConfig, profile: { systemPrompt: string; temperature: number; schema: z.ZodObject<any> }, payload: string) {
  // Extract API key dynamically from Convex environment variables
  const apiKey = process.env[config.apiKeyEnvVar];
  if (!apiKey) throw new Error(`Missing environment variable: ${config.apiKeyEnvVar}`);

  // Unified OpenAI-compatible payload architecture
  const messages = [
    { role: "system", content: `${profile.systemPrompt}\n\nIMPORTANT: Return ONLY a raw JSON object string matching expectations. No markdown formatting. No \`\`\`json wrappers.` },
    { role: "user", content: payload }
  ];

  const reqBody = {
    model: config.model,
    messages,
    temperature: profile.temperature,
    response_format: { type: "json_object" } 
  };

  const response = await fetch(`${config.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify(reqBody)
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`${config.provider} HTTP ${response.status}: ${errText}`);
  }

  const jsonResponse = await response.json();
  const rawText = jsonResponse.choices?.[0]?.message?.content || "";

  // Sanitize potential markdown injection from non-compliant models
  const cleanJsonText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();

  try {
    const parsed = JSON.parse(cleanJsonText);
    // Bind robust validation check
    const validData = profile.schema.parse(parsed);
    return validData;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(`LLM Output parsing or schema validation failed: ${err.message}`, { cause: err });
    }
    throw new Error("LLM Output parsing or schema validation failed due to an unknown error", { cause: err });
  }
}
