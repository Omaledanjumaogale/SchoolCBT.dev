<script lang="ts">
	import {
		Target,
		FileDigit,
		Brain,
		PenTool,
		CheckSquare,
		Server,
		Cpu,
		CreditCard,
		Database,
		ArrowRight
	} from 'lucide-svelte';

	const steps = [
		{
			n: 1,
			title: 'Sign Up & Profile',
			desc: 'Create your account, submit school info and upload academic reports for AI personalization.',
			color: 'hsl(var(--primary))',
			bg: 'hsl(var(--primary)/0.1)'
		},
		{
			n: 2,
			title: 'AI Intake & Setup',
			desc: 'Multi-agent system analyzes your profile, grounding questions against your specific exam goals.',
			color: 'hsl(var(--accent))',
			bg: 'hsl(var(--accent)/0.1)'
		},
		{
			n: 3,
			title: 'Take CBT Batches',
			desc: '50-question batches with 50s per question timer. Instant feedback and score tracking after each batch.',
			color: 'hsl(174,60%,28%)',
			bg: 'hsl(174,60%,28%,0.1)'
		},
		{
			n: 4,
			title: 'Track & Improve',
			desc: 'Review AI report cards, follow your study plan, request tutor support, and watch your pass probability grow.',
			color: 'hsl(var(--primary))',
			bg: 'hsl(var(--primary)/0.1)'
		}
	];

	const agents = [
		{
			icon: Target,
			name: 'Coordinator Agent',
			desc: 'Orchestrates all agents and manages student intake workflows.',
			color: 'hsl(var(--primary))'
		},
		{
			icon: FileDigit,
			name: 'Intake Agent',
			desc: 'Extracts level, subjects, and exam goals from uploaded reports.',
			color: 'hsl(174,60%,28%)'
		},
		{
			icon: Brain,
			name: 'Researcher Agent',
			desc: 'Queries the Nigerian curricula RAG system for verified content.',
			color: 'hsl(var(--accent))'
		},
		{
			icon: PenTool,
			name: 'Question Composer',
			desc: 'Generates randomised 50-Q batches using the COSTAR methodology.',
			color: 'hsl(262,80%,60%)'
		},
		{
			icon: CheckSquare,
			name: 'Quality Evaluator',
			desc: 'Ensures 90%+ grounding accuracy against West African exam syllabuses.',
			color: 'hsl(142,71%,40%)'
		}
	];

	const techStack = [
		{
			name: 'Google Vertex AI',
			sub: 'Gemini 1.5 Pro multimodal reasoning',
			color: 'hsl(210,80%,55%)'
		},
		{
			name: 'Vertex AI Agent Builder',
			sub: 'Scalable agentic workflow runtime',
			color: 'hsl(262,80%,60%)'
		},
		{
			name: 'Stripe / Paystack',
			sub: 'Naira billing & tutor wallet system',
			color: 'hsl(142,71%,40%)'
		},
		{ name: 'Convex Backend', sub: 'Real-time reactive database', color: 'hsl(var(--primary))' },
		{
			name: 'Firebase Auth',
			sub: 'Secure authentication & session management',
			color: 'hsl(38,100%,50%)'
		},
		{
			name: 'Multi-Tenant RAG',
			sub: 'Verified Nigerian curricula vector database',
			color: 'hsl(174,60%,28%)'
		}
	];
</script>

<!-- ── HOW IT WORKS ──────────────────────────── -->
<section id="how-it-works" class="relative overflow-hidden py-20 md:py-28">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mx-auto mb-16 max-w-3xl text-center">
			<div class="section-badge mb-4">Process</div>
			<h2 class="text-foreground mb-4 text-3xl font-black tracking-tight md:text-4xl">
				How <span class="gradient-text-primary">SchoolCBT</span> Delivers Results
			</h2>
			<p class="text-muted-foreground text-lg">
				From sign-up to exam day in four intelligent steps, powered by multi-agent AI orchestration.
			</p>
		</div>

		<!-- 4-Step Grid -->
		<div class="relative mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
			<!-- Connector (desktop) -->
			<div
				class="absolute top-[52px] right-[12.5%] left-[12.5%] z-0 hidden h-px bg-gradient-to-r from-transparent via-[hsl(var(--primary)/0.3)] to-transparent lg:block"
			></div>

			{#each steps as step, i}
				<div
					class="glass-panel card-hover relative z-10 p-6 text-center"
					style="animation-delay:{i * 100}ms"
				>
					<div
						class="border-card mx-auto mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-full border-4 text-xl font-black shadow-md"
						style="background:{step.bg}; color:{step.color}; box-shadow: 0 0 0 2px {step.color}33"
					>
						{step.n}
					</div>
					<h3 class="text-foreground mb-3 text-base font-bold">{step.title}</h3>
					<p class="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
				</div>
			{/each}
		</div>

		<!-- ── AI AGENTS SECTION ── -->
		<div class="mt-20 mb-6">
			<div
				class="glass-panel from-card border-[hsl(var(--primary)/0.2)] bg-gradient-to-br to-[hsl(var(--primary)/0.03)] p-8 shadow-xl md:p-12"
			>
				<div class="grid items-start gap-12 lg:grid-cols-2">
					<!-- Left: Agents -->
					<div>
						<div class="section-badge mb-4">5 Specialized AI Agents</div>
						<h3 class="text-foreground mb-3 text-2xl font-black">Multi-Agent RaaS Engine</h3>
						<p class="text-muted-foreground mb-8 leading-relaxed">
							Our proprietary engine orchestrates 5 specialized AI agents that collaborate to
							generate, validate, and deliver curriculum-accurate examination content at scale.
						</p>

						<div class="space-y-5">
							{#each agents as agent}
								<div class="flex items-start gap-4">
									<div
										class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border"
										style="background:{agent.color}12; border-color:{agent.color}33"
									>
										<agent.icon class="h-5 w-5" style="color:{agent.color}" />
									</div>
									<div>
										<p class="text-foreground text-sm font-bold">{agent.name}</p>
										<p class="text-muted-foreground mt-0.5 text-sm">{agent.desc}</p>
									</div>
								</div>
							{/each}
						</div>
					</div>

					<!-- Right: Tech Stack -->
					<div class="space-y-3">
						<h4 class="text-muted-foreground mb-5 text-sm font-bold tracking-widest uppercase">
							Technology Stack
						</h4>
						{#each techStack as tech}
							<div
								class="border-border bg-card group flex items-center gap-4 rounded-xl border px-4 py-3.5 transition-all hover:border-[hsl(var(--primary)/0.4)] hover:shadow-md"
							>
								<div
									class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
									style="background:{tech.color}15"
								>
									<div class="h-2.5 w-2.5 rounded-full" style="background:{tech.color}"></div>
								</div>
								<div class="flex-grow">
									<p class="text-foreground text-sm font-bold">{tech.name}</p>
									<p class="text-muted-foreground text-xs">{tech.sub}</p>
								</div>
								<span class="status-badge-green">Active</span>
							</div>
						{/each}

						<a href="/auth/signup" class="btn-primary mt-4 w-full py-3.5 text-sm">
							Get Started Free <ArrowRight class="ml-1.5 h-4 w-4" />
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
