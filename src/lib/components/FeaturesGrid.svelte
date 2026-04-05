<script lang="ts">
	import {
		Brain,
		LineChart,
		Award,
		Users,
		BookOpen,
		FileText,
		Zap,
		Shield,
		CheckCircle2
	} from 'lucide-svelte';

	const features = [
		{
			icon: Brain,
			title: 'Smart CBT Engine',
			desc: '50-question AI-curated batches per subject with 50s countdown timer, instant scoring, and curriculum-verified accuracy.',
			color: 'hsl(var(--primary))',
			bg: 'hsl(var(--primary)/0.08)',
			tags: ['JAMB', 'WAEC', 'NECO', 'NABTEB']
		},
		{
			icon: LineChart,
			title: 'Predictive Analytics',
			desc: 'AI-powered pass probability cards, topic-level breakdowns, and time-per-question analytics to track study ROI.',
			color: 'hsl(174,60%,28%)',
			bg: 'hsl(174,60%,28%,0.08)',
			stat: { label: 'Pass Probability', value: 87 }
		},
		{
			icon: Award,
			title: 'Awards & Star Ratings',
			desc: 'Earn achievement badges and star ratings for batches scoring 75%+. Visual awards motivate consistent improvement.',
			color: 'hsl(var(--accent))',
			bg: 'hsl(var(--accent)/0.08)',
			stars: 4.2
		},
		{
			icon: Users,
			title: 'AI Tutor Matching',
			desc: 'Automated matching to certified subject tutors based on your performance gaps, for live 1-on-1 sessions.',
			color: 'hsl(210,80%,55%)',
			bg: 'hsl(210,80%,55%,0.08)',
			tutors: 240
		},
		{
			icon: BookOpen,
			title: 'Personalized Study Plans',
			desc: 'AI-generated study timelines from your academic reports, with topic modules and weekly guided learning paths.',
			color: 'hsl(262,80%,60%)',
			bg: 'hsl(262,80%,60%,0.08)',
			weeks: ['Number Theory', 'Algebra & Sets']
		},
		{
			icon: FileText,
			title: 'Automated Report Cards',
			desc: 'Detailed performance reports generated after every batch — strengths, weaknesses, scores, and improvement tips.',
			color: 'hsl(0,70%,55%)',
			bg: 'hsl(0,70%,55%,0.08)',
			score: 88
		},
		{
			icon: Zap,
			title: 'AI Explanation Engine',
			desc: 'Every wrong answer receives a structured AI explanation grounded in the Nigerian curriculum for deep understanding.',
			color: 'hsl(var(--primary))',
			bg: 'hsl(var(--primary)/0.08)'
		},
		{
			icon: Shield,
			title: 'Curriculum Verified',
			desc: '99.1% accuracy guarantee — all questions verified against NERDC, JAMB, WAEC and NECO official syllabuses.',
			color: 'hsl(174,60%,28%)',
			bg: 'hsl(174,60%,28%,0.08)'
		},
		{
			icon: CheckCircle2,
			title: 'Progress Streak Tracker',
			desc: 'Maintain daily study streaks and unlock milestone rewards. Gamification to keep you consistent until exam day.',
			color: 'hsl(var(--accent))',
			bg: 'hsl(var(--accent)/0.08)'
		}
	];
</script>

<section
	id="features"
	class="border-border relative border-y bg-[hsl(var(--background-alt,120,20%,97%))] py-20 md:py-28"
>
	<div
		class="absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[hsl(var(--primary)/0.3)] to-transparent"
	></div>

	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- Header -->
		<div class="mx-auto mb-16 max-w-3xl text-center">
			<div class="section-badge mb-4">Platform Features</div>
			<h2 class="text-foreground mb-4 text-3xl font-black tracking-tight md:text-4xl">
				Everything You Need to <span class="shimmer-text">Pass</span>
			</h2>
			<p class="text-muted-foreground text-lg">
				A complete RaaS ecosystem — AI intelligence, tutor support, and exam-focused tools built for
				Nigerian secondary and tertiary students.
			</p>
		</div>

		<!-- Grid -->
		<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
			{#each features as f, i}
				<div class="glass-panel feature-card card-hover" style="animation-delay: {i * 60}ms">
					<!-- Icon -->
					<div
						class="mb-2 flex h-12 w-12 items-center justify-center rounded-xl border"
						style="background:{f.bg}; border-color:{f.color}22"
					>
						<f.icon class="h-6 w-6" style="color:{f.color}" />
					</div>

					<h3 class="text-foreground text-base font-bold">{f.title}</h3>
					<p class="text-muted-foreground flex-grow text-sm leading-relaxed">{f.desc}</p>

					<!-- Dynamic mini-visual per card -->
					{#if f.tags}
						<div class="mt-1 flex flex-wrap gap-1.5">
							{#each f.tags as tag}
								<span
									class="rounded-md px-2 py-0.5 text-xs font-bold"
									style="background:{f.bg}; color:{f.color}">{tag}</span
								>
							{/each}
						</div>
					{:else if f.stat}
						<div class="mt-1 space-y-1.5">
							<div class="flex justify-between text-xs font-semibold">
								<span class="text-muted-foreground">{f.stat.label}</span>
								<span style="color:{f.color}">{f.stat.value}%</span>
							</div>
							<div class="bg-muted h-2 w-full overflow-hidden rounded-full">
								<div
									class="h-full rounded-full"
									style="width:{f.stat.value}%; background:{f.color}"
								></div>
							</div>
						</div>
					{:else if f.stars}
						<div class="mt-1 flex items-center gap-2">
							<div class="flex text-[hsl(var(--accent))]">
								{#each [1, 2, 3, 4] as _}<span class="text-base">★</span>{/each}
								<span class="text-muted text-base">★</span>
							</div>
							<span class="text-muted-foreground text-xs">{f.stars} avg batch rating</span>
						</div>
					{:else if f.tutors}
						<div class="mt-1 flex items-center gap-3">
							<div class="avatar-stack">
								{#each [0, 1, 2] as j}
									<div
										class="border-card flex h-7 w-7 items-center justify-center rounded-full border-2 text-[10px] font-bold text-white"
										style="background:hsl({145 + j * 15},{60 + j * 5}%,{35 +
											j * 5}%); margin-left:{j === 0 ? 0 : -6}px"
									>
										T
									</div>
								{/each}
							</div>
							<span class="text-muted-foreground text-xs">{f.tutors}+ certified tutors</span>
						</div>
					{:else if f.weeks}
						<div class="mt-1 space-y-1">
							{#each f.weeks as w, wi}
								<div class="text-foreground flex items-center gap-2 text-xs font-medium">
									<div
										class="h-2 w-2 rounded-full"
										style="background:{wi === 0 ? 'hsl(var(--primary))' : 'hsl(var(--accent))'}"
									></div>
									Week {wi === 0 ? '1–2' : '3–4'}: {w}
								</div>
							{/each}
						</div>
					{:else if f.score}
						<div class="mt-1 flex flex-wrap gap-2">
							<span
								class="rounded-lg bg-[hsl(var(--primary)/0.1)] px-2 py-0.5 text-xs font-bold text-[hsl(var(--primary))]"
								>Score: {f.score}/100</span
							>
							<span
								class="rounded-lg bg-[hsl(0,70%,55%,0.1)] px-2 py-0.5 text-xs font-bold text-[hsl(0,70%,45%)]"
								>Improve: Geometry</span
							>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>
