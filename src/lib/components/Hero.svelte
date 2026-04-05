<script lang="ts">
	import {
		ArrowRight,
		PlayCircle,
		Award,
		CheckCircle2,
		Bot,
		Zap,
		TrendingUp,
		Users
	} from 'lucide-svelte';
	import { onMount } from 'svelte';

	let statsVisible = $state(false);

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) statsVisible = true;
			},
			{ threshold: 0.4 }
		);
		const el = document.getElementById('stats-row');
		if (el) observer.observe(el);
		return () => observer.disconnect();
	});

	const stats = [
		{ label: 'Curriculum Questions', value: '1.2M+', color: 'text-foreground' },
		{ label: 'Student Pass Rate', value: '94%', color: 'text-[hsl(var(--primary))]' },
		{ label: 'AI Accuracy Score', value: '99.1%', color: 'text-[hsl(var(--accent))]' },
		{ label: 'Students Enrolled', value: '18K+', color: 'text-foreground' }
	];
</script>

<!-- ── HERO ─────────────────────────────────────── -->
<section class="relative overflow-hidden pt-16 pb-16 md:pt-24 md:pb-28">
	<!-- Premium background layers -->
	<div class="pointer-events-none absolute inset-0">
		<div
			class="absolute -top-32 right-0 h-[700px] w-[700px] rounded-full bg-[hsl(var(--primary)/0.07)] blur-[100px]"
		></div>
		<div
			class="absolute -bottom-20 -left-20 h-[500px] w-[500px] rounded-full bg-[hsl(var(--accent)/0.06)] blur-[80px]"
		></div>
		<div
			class="absolute top-1/2 left-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(var(--secondary)/0.04)] blur-[60px]"
		></div>
	</div>

	<div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
			<!-- LEFT CONTENT -->
			<div class="animate-fade-up max-w-xl">
				<!-- Badge -->
				<div
					class="mb-6 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--primary)/0.2)] bg-[hsl(var(--primary)/0.08)] px-4 py-1.5"
				>
					<Award class="h-3.5 w-3.5 text-[hsl(var(--primary))]" />
					<span class="text-xs font-bold tracking-widest text-[hsl(var(--primary))] uppercase"
						>Nigeria's Premier AI RaaS Platform</span
					>
				</div>

				<!-- Headline -->
				<h1
					class="text-foreground mb-6 text-4xl leading-[1.12] font-black tracking-tight sm:text-5xl lg:text-[56px]"
				>
					Crack
					<span class="shimmer-text"> JAMB, WAEC</span>
					<br />& NECO with
					<span class="gradient-text-primary"> AI Precision</span>
				</h1>

				<!-- Supporting copy -->
				<p class="text-muted-foreground mb-8 text-lg leading-relaxed">
					Fully curriculum-grounded CBT practice for JSS and SSS students. Personalized 50-question
					batches, instant AI feedback, predictive analytics, and guaranteed exam readiness.
				</p>

				<!-- CTAs -->
				<div class="mb-10 flex flex-col gap-4 sm:flex-row">
					<a
						href="/auth/signup"
						class="btn-primary rounded-2xl px-8 py-4 text-base shadow-lg shadow-[hsl(var(--primary)/0.25)]"
					>
						Start Free Trial <ArrowRight class="ml-1 h-5 w-5" />
					</a>
					<a href="/exam" class="btn-outline bg-card rounded-2xl px-8 py-4 text-base">
						<PlayCircle class="mr-2 h-5 w-5 text-[hsl(var(--accent))]" />
						Open CBT Center
					</a>
				</div>

				<!-- Social proof strip -->
				<div class="text-muted-foreground flex items-center gap-4 text-sm">
					<div class="avatar-stack flex items-center">
						{#each ['A', 'B', 'C', 'D'] as initial, i}
							<div
								class="border-background flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold text-white"
								style="background: hsl({145 + i * 10}, 60%, {35 + i * 5}%); margin-left: {i === 0
									? 0
									: -8}px"
							>
								{initial}
							</div>
						{/each}
					</div>
					<span
						><strong class="text-foreground font-semibold">18,000+</strong> students studying now</span
					>
				</div>
			</div>

			<!-- RIGHT CONTENT — CBT Preview Card -->
			<div class="animate-fade-up relative delay-200">
				<!-- Floating badges -->
				<div
					class="bg-card absolute -top-5 -right-3 z-20 hidden items-center gap-2 rounded-xl border border-[hsl(var(--primary)/0.2)] px-4 py-2 shadow-xl sm:flex"
				>
					<Bot class="h-5 w-5 text-[hsl(var(--primary))]" />
					<span class="text-foreground text-sm font-bold">AI-Powered Engine</span>
				</div>
				<div
					class="bg-card absolute -bottom-5 -left-3 z-20 hidden items-center gap-2 rounded-xl border border-[hsl(var(--accent)/0.3)] px-4 py-2 shadow-xl sm:flex"
				>
					<TrendingUp class="h-4 w-4 text-[hsl(var(--accent))]" />
					<span class="text-foreground text-sm font-bold">87% Pass Probability</span>
				</div>

				<!-- Main CBT Preview Card -->
				<div class="glass-panel border-t-2 border-t-[hsl(var(--primary)/0.4)] p-6 shadow-2xl">
					<!-- Header -->
					<div class="mb-5 flex items-center justify-between">
						<div>
							<span
								class="mb-1 inline-block rounded-lg bg-[hsl(var(--primary)/0.1)] px-2.5 py-1 text-xs font-bold tracking-wider text-[hsl(var(--primary))] uppercase"
								>JAMB 2025 · Physics</span
							>
							<p class="text-foreground text-sm font-semibold">Question 12 of 50</p>
						</div>
						<!-- Timer -->
						<div class="relative flex h-14 w-14 items-center justify-center">
							<svg class="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 56 56">
								<circle cx="28" cy="28" r="24" class="stroke-muted fill-none" stroke-width="4" />
								<circle
									cx="28"
									cy="28"
									r="24"
									class="fill-none"
									stroke="hsl(38,100%,50%)"
									stroke-width="4"
									stroke-dasharray="150.8"
									stroke-dashoffset="45"
									stroke-linecap="round"
								/>
							</svg>
							<span class="relative text-sm font-black text-[hsl(var(--accent))]">34s</span>
						</div>
					</div>

					<!-- Progress bar -->
					<div class="progress-bar mb-5">
						<div class="progress-bar-fill" style="width: 24%"></div>
					</div>

					<!-- Question text -->
					<div class="border-border bg-muted/40 mb-5 rounded-xl border p-4">
						<p class="text-foreground text-sm leading-relaxed font-medium">
							If <strong class="text-[hsl(var(--accent))]">P = {'{x : 2 ≤ x ≤ 8}'}</strong> and
							<strong class="text-[hsl(var(--accent))]">Q = {'{x : 4 ≤ x ≤ 12}'}</strong>
							are subsets of
							<strong class="text-[hsl(var(--accent))]">U = {'{x : 1 ≤ x ≤ 15}'}</strong>, find
							<strong class="text-[hsl(var(--accent))]">P ∩ Q'</strong>.
						</p>
					</div>

					<!-- Options -->
					<div class="mb-5 space-y-2.5">
						{#each ['{2, 3}', '{2, 3, 4}', '{5, 6, 7, 8}'] as opt, i}
							<div
								class="flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all
                {i === 1
									? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.08)]'
									: 'border-border bg-card hover:border-[hsl(var(--primary)/0.4)]'}"
							>
								<span
									class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold
                  {i === 1 ? 'bg-[hsl(var(--primary))] text-white' : 'bg-muted text-foreground'}"
								>
									{['A', 'B', 'C'][i]}
								</span>
								<span class="text-foreground">{opt}</span>
								{#if i === 1}<CheckCircle2
										class="ml-auto h-4 w-4 text-[hsl(var(--primary))]"
									/>{/if}
							</div>
						{/each}
					</div>

					<!-- Footer -->
					<div class="border-border flex items-center justify-between border-t pt-4">
						<div class="flex items-center gap-2">
							<span
								class="rounded-lg bg-[hsl(var(--primary)/0.1)] px-2.5 py-1 text-xs font-bold text-[hsl(var(--primary))]"
								>+2 pts ✓</span
							>
							<span class="text-muted-foreground text-xs font-medium">Score: 22/24</span>
						</div>
						<button class="btn-primary rounded-lg px-4 py-2 text-xs">Next →</button>
					</div>
				</div>
			</div>
		</div>

		<!-- ── STATS ROW ── -->
		<div id="stats-row" class="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4">
			{#each stats as stat}
				<div class="glass-panel card-hover p-6 text-center">
					<div
						class="mb-1 text-3xl font-black {stat.color} {statsVisible
							? 'animate-scale-in'
							: 'opacity-0'}"
					>
						{stat.value}
					</div>
					<div class="text-muted-foreground text-sm font-medium">{stat.label}</div>
				</div>
			{/each}
		</div>

		<!-- ── TRUST BADGES ── -->
		<div class="mt-12 flex flex-wrap items-center justify-center gap-6 opacity-60">
			{#each ['Firebase Auth', 'Cloudflare CDN', 'Vertex AI', 'Convex Backend', 'NERDC Aligned'] as badge}
				<div class="text-muted-foreground flex items-center gap-2 text-xs font-semibold">
					<div class="h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))]"></div>
					{badge}
				</div>
			{/each}
		</div>
	</div>
</section>
