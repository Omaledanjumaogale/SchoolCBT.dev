# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project
npx sv create my-app
```

## 🚀 Enterprise Deployment Features & Upgrades
### Hardened Backend Infrastructure (Convex)
- **Token-Bucket Rate Limiter (`convex/rateLimit.ts`):** Advanced ACID-compliant throttling system that seamlessly gates generic reads and critical mutations to protect against API abuse.
- **Distributed Session Bindings (`convex/sessions.ts`):** Robust tracking logic tying heartbeat signals directly to component lifecycles for true user persistence.
- **Continuous Zod Validation (`convex/validators.ts`):** 100% type-safe edge validators enforcing explicit payload schema schemas directly at the backend API edge.
- **Zero-Latency Lifecycle Triggers (`convex/triggers.ts`):** SQL-style row-level generic audit hooks.
- **Autonomous Garbage Collection (`convex/crons.ts`):** Self-healing, self-cleaning periodic GC scripts neutralizing DB bloat iteratively (strikes down expired sessions and cached blocks automatically).

### Scalable UI Polish 
- **Global Reactive Toasts:** Centralized semantic toast mechanics utilizing `ToastProvider.svelte` backed by `lucide-svelte` iconography globally via a streamlined Svelte 5 runes component state.
- **Informational Tooltips:** Advanced generic HTML `Tooltip.svelte` with full a11y focus and hover logic ensuring high-barrier technical inputs yield intuitive UI knowledge hints.
- **Progressive Web Push Hooks:** Ready-to-use silent Service Worker hooks injected securely to dispatch Real-Time Push messaging architectures targeting Edge devices independently.

### Enterprise Multi-Agent Orchestration
- **Agent Roles & Schema (`convex/agentConfig.ts`):** Strictly typed LLM configuration arrays wrapping `Tutor`, `Predictive Analyst`, `Exam Grader`, and `Curriculum Planner` agent modes with zero-hallucination expected JSON outputs validated runtime via `zod`.
- **Intelligent Fallback Chain (`convex/orchestrator.ts`):** Primary agent executions target `openai` (`gpt-4o-mini`). Should token-overflow or endpoint latency trigger, a meticulously cascaded OpenRouter-backed pipeline drops seamlessly through `gemini`, `deepseek-v3`, `qwen3`, down to `nemotron-super` without disrupting the client application logic.
- **Unified Actions API (`convex/agent.ts`):** Exposes `askAgent` as the singular downstream handler bridging Svelte queries securely to the locked internal action workflows.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
