<script lang="ts">
	import {
		Target,
		FileDigit,
		Brain,
		PenTool,
		CheckSquare,
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
		<div class="relative mb-20 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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

		<!-- ── MULTI-AGENT RAAS ENGINE SECTION ── -->
		<div class="relative">
			<div class="mx-auto mb-12 max-w-3xl text-center">
				<div class="section-badge mb-4">5 Specialized AI Agents</div>
				<h3 class="text-foreground mb-4 text-2xl font-black md:text-3xl">Multi-Agent RaaS Engine</h3>
				<p class="text-muted-foreground leading-relaxed text-lg">
					Our proprietary engine orchestrates specialized AI agents that collaborate to
					generate, validate, and deliver curriculum-accurate examination content securely at scale.
				</p>
			</div>

			<!-- Agents Grid -->
			<div class="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
				{#each agents as agent}
					<div
						class="glass-panel border-card hover:border-[hsl(var(--primary)/0.3)] card-hover flex flex-col items-center p-6 text-center shadow-lg transition-transform hover:-translate-y-2"
					>
						<div
							class="mb-5 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border transition-colors"
							style="background:{agent.color}15; border-color:{agent.color}40"
						>
							<agent.icon class="h-6 w-6" style="color:{agent.color}" />
						</div>
						<h4 class="text-foreground mb-2 text-base font-bold">{agent.name}</h4>
						<p class="text-muted-foreground text-sm leading-relaxed">{agent.desc}</p>
					</div>
				{/each}
			</div>

			<div class="flex justify-center mt-8">
				<a href="/auth/signup" class="btn-primary inline-flex items-center gap-2 px-8 py-4 text-base shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all rounded-full">
					Get Started Free <ArrowRight class="h-5 w-5" />
				</a>
			</div>
		</div>
	</div>
</section>
