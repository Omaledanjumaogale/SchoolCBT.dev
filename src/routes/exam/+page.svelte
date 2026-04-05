<script lang="ts">
	import { onMount } from 'svelte';
	import {
		ArrowLeft,
		ArrowRight,
		Clock,
		CheckCircle2,
		XCircle,
		Brain,
		RotateCcw,
		Trophy
	} from 'lucide-svelte';

	interface Question {
		id: number;
		subject: string;
		q: string;
		options: string[];
		correct: number;
		explanation: string;
	}

	const questions: Question[] = [
		{
			id: 1,
			subject: 'Mathematics',
			q: "If P = {x:2≤x≤8} and Q = {x:4≤x≤12} are subsets of U = {x:1≤x≤15}, find P∩Q'.",
			options: ['{2,3}', '{2,3,4}', '{5,6,7,8}', '{9,10,11,12}'],
			correct: 0,
			explanation:
				"P∩Q' means elements in P but NOT in Q. P={2,3,4,5,6,7,8}, Q={4,5,6,7,8,9,10,11,12}. So Q'={1,2,3,13,14,15}. P∩Q'={2,3}."
		},
		{
			id: 2,
			subject: 'Physics',
			q: 'A body of mass 5kg moves at 4m/s. A force acts for 3s giving it velocity 10m/s. Find the force.',
			options: ['10N', '8N', '6N', '12N'],
			correct: 0,
			explanation: 'Impulse = change in momentum. F×t = m(v-u) → F×3 = 5×(10-4) = 30 → F = 10N.'
		},
		{
			id: 3,
			subject: 'Chemistry',
			q: 'Which of the following is an example of a physical change?',
			options: ['Burning wood', 'Rusting of iron', 'Dissolving sugar in water', 'Cooking an egg'],
			correct: 2,
			explanation:
				'Dissolving sugar in water is a physical change because no new substance is formed. The sugar can be recovered by evaporation.'
		},
		{
			id: 4,
			subject: 'English',
			q: 'Choose the word that best fills the blank: The committee ___ unable to reach a decision.',
			options: ['was', 'were', 'are', 'have been'],
			correct: 0,
			explanation:
				'"Committee" is a collective noun used as a singular unit here, so "was" is correct.'
		},
		{
			id: 5,
			subject: 'Biology',
			q: 'The process by which plants manufacture food using sunlight is called:',
			options: ['Respiration', 'Transpiration', 'Photosynthesis', 'Digestion'],
			correct: 2,
			explanation:
				'Photosynthesis is the process where plants use sunlight, water and CO₂ to produce glucose and oxygen.'
		}
	];

	let current = $state(0);
	let selected = $state<number | null>(null);
	let answered = $state<Record<number, number>>({});
	let revealed = $state(false);
	let timeLeft = $state(50);
	let score = $state(0);
	let finished = $state(false);
	let timerInterval: ReturnType<typeof setInterval>;

	const q = $derived(questions[current]);
	const totalAnswered = $derived(Object.keys(answered).length);
	const progress = $derived(Math.round((totalAnswered / questions.length) * 100));

	function startTimer() {
		clearInterval(timerInterval);
		timeLeft = 50;
		timerInterval = setInterval(() => {
			timeLeft--;
			if (timeLeft <= 0) {
				clearInterval(timerInterval);
				if (selected === null) revealAnswer();
			}
		}, 1000);
	}

	function selectOption(i: number) {
		if (revealed || answered[current] !== undefined) return;
		selected = i;
		answered[current] = i;
		revealed = true;
		clearInterval(timerInterval);
		if (i === q.correct) score++;
	}

	function revealAnswer() {
		if (answered[current] === undefined) answered[current] = -1;
		revealed = true;
	}

	function next() {
		if (current < questions.length - 1) {
			current++;
			selected = answered[current] ?? null;
			revealed = answered[current] !== undefined;
			if (!revealed) startTimer();
		} else {
			finished = true;
			clearInterval(timerInterval);
		}
	}

	function prev() {
		if (current > 0) {
			current--;
			selected = answered[current] ?? null;
			revealed = answered[current] !== undefined;
			clearInterval(timerInterval);
		}
	}

	function restart() {
		current = 0;
		selected = null;
		answered = {};
		revealed = false;
		timeLeft = 50;
		score = 0;
		finished = false;
		startTimer();
	}

	onMount(() => {
		startTimer();
		return () => clearInterval(timerInterval);
	});

	const timerPercent = $derived(Math.round((timeLeft / 50) * 151));
	const timerColor = $derived(
		timeLeft > 20 ? 'hsl(145,100%,39%)' : timeLeft > 10 ? 'hsl(38,100%,50%)' : 'hsl(0,84%,55%)'
	);

	const pct = $derived((score / questions.length) * 100);
	const gradeLabel = $derived(
		pct >= 75 ? '★ Excellent' : pct >= 50 ? '✓ Good' : '↑ Keep Practicing'
	);
	const gradeColor = $derived(
		pct >= 75 ? 'hsl(145,100%,39%)' : pct >= 50 ? 'hsl(38,100%,50%)' : 'hsl(0,84%,55%)'
	);
</script>

<svelte:head>
	<title>CBT Demo – SchoolCBT</title>
	<meta
		name="description"
		content="Try a live AI-powered CBT practice session with instant feedback and AI explanations."
	/>
</svelte:head>

<div class="bg-background min-h-[calc(100vh-64px)] px-4 py-8">
	<div class="mx-auto max-w-2xl">
		{#if finished}
			<!-- ── RESULTS SCREEN ── -->
			<div class="glass-panel animate-scale-in p-8 text-center shadow-2xl">
				<div
					class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full shadow-lg"
					style="background:{gradeColor}18; border:3px solid {gradeColor}"
				>
					<Trophy class="h-9 w-9" style="color:{gradeColor}" />
				</div>
				<h2 class="text-foreground mb-1 text-2xl font-black">Batch Complete!</h2>
				<p class="text-muted-foreground mb-6 text-sm">
					Demo session · {questions.length} questions
				</p>

				<div class="mb-2 text-6xl font-black" style="color:{gradeColor}">
					{score}/{questions.length}
				</div>
				<p class="mb-1 text-lg font-bold" style="color:{gradeColor}">{gradeLabel}</p>
				<p class="text-muted-foreground mb-8 text-sm">
					You scored <strong>{Math.round(pct)}%</strong> — Full session tracks progress across 50 questions
				</p>

				<div class="mb-8 grid grid-cols-3 gap-4">
					{#each [{ label: 'Correct', value: score, color: 'hsl(145,100%,39%)' }, { label: 'Wrong', value: questions.length - score, color: 'hsl(0,84%,55%)' }, { label: 'Score %', value: Math.round(pct) + '%', color: 'hsl(var(--accent))' }] as stat}
						<div class="border-border bg-card rounded-xl border px-3 py-4">
							<div class="mb-1 text-2xl font-black" style="color:{stat.color}">{stat.value}</div>
							<div class="text-muted-foreground text-xs font-semibold">{stat.label}</div>
						</div>
					{/each}
				</div>

				<div class="flex flex-col gap-3 sm:flex-row">
					<button onclick={restart} class="btn-outline flex-1 gap-2 rounded-xl py-3.5 text-sm"
						><RotateCcw class="h-4 w-4" /> Try Again</button
					>
					<a href="/auth/signup" class="btn-primary flex-1 rounded-xl py-3.5 text-sm"
						>Get Full Access — Free</a
					>
				</div>
			</div>
		{:else}
			<!-- ── CBT INTERFACE ── -->

			<!-- Sticky progress bar -->
			<div class="mb-6">
				<div class="mb-2 flex items-center justify-between text-sm font-semibold">
					<span class="text-muted-foreground"
						>Question <span class="text-foreground">{current + 1}</span> of {questions.length}</span
					>
					<span class="text-muted-foreground"
						>Score: <span class="font-bold text-[hsl(var(--primary))]">{score}</span></span
					>
				</div>
				<div class="progress-bar">
					<div
						class="progress-bar-fill transition-all duration-500"
						style="width:{progress}%"
					></div>
				</div>
				<div class="mt-2 flex gap-1.5">
					{#each questions as _, i}
						<div
							class="h-1.5 flex-1 rounded-full transition-all {answered[i] !== undefined
								? answered[i] === questions[i].correct
									? 'bg-[hsl(145,100%,39%)]'
									: 'bg-[hsl(0,84%,55%)]'
								: i === current
									? 'bg-[hsl(var(--primary)/0.4)]'
									: 'bg-muted'}"
						></div>
					{/each}
				</div>
			</div>

			<!-- Question Card -->
			<div class="glass-panel p-6 shadow-xl md:p-8">
				<!-- Subject + Timer row -->
				<div class="mb-6 flex items-center justify-between">
					<div>
						<span
							class="mb-1 inline-block rounded-lg bg-[hsl(var(--primary)/0.1)] px-2.5 py-1 text-xs font-bold tracking-wider text-[hsl(var(--primary))] uppercase"
							>{q.subject}</span
						>
						<p class="text-muted-foreground text-xs font-medium">JAMB 2025 Demo</p>
					</div>
					<!-- SVG Countdown Timer -->
					<div
						class="relative flex h-16 w-16 items-center justify-center"
						aria-label="Time remaining: {timeLeft} seconds"
					>
						<svg class="h-full w-full -rotate-90" viewBox="0 0 56 56">
							<circle
								cx="28"
								cy="28"
								r="24"
								fill="none"
								stroke="hsl(var(--muted))"
								stroke-width="4"
							/>
							<circle
								cx="28"
								cy="28"
								r="24"
								fill="none"
								stroke={timerColor}
								stroke-width="4"
								stroke-dasharray="151"
								stroke-dashoffset={151 - timerPercent}
								stroke-linecap="round"
								style="transition: stroke-dashoffset 1s linear, stroke 0.5s ease"
							/>
						</svg>
						<span class="absolute text-sm font-black" style="color:{timerColor}">{timeLeft}s</span>
					</div>
				</div>

				<!-- Question text -->
				<div class="border-border bg-muted/40 mb-6 rounded-xl border p-4 md:p-5">
					<p class="text-foreground text-base leading-relaxed font-semibold">{q.q}</p>
				</div>

				<!-- Options -->
				<div class="mb-6 space-y-3">
					{#each q.options as opt, i}
						<button
							class="option-btn {answered[current] !== undefined
								? i === q.correct
									? 'correct'
									: answered[current] === i && i !== q.correct
										? 'wrong'
										: ''
								: selected === i
									? 'selected'
									: ''}"
							onclick={() => selectOption(i)}
							disabled={answered[current] !== undefined}
						>
							<span
								class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-black
                {answered[current] !== undefined
									? i === q.correct
										? 'bg-[hsl(145,100%,39%)] text-white'
										: answered[current] === i
											? 'bg-[hsl(0,84%,55%)] text-white'
											: 'bg-muted text-foreground'
									: selected === i
										? 'bg-[hsl(var(--primary))] text-white'
										: 'bg-muted text-foreground'}"
							>
								{['A', 'B', 'C', 'D'][i]}
							</span>
							<span class="flex-grow text-left text-sm font-medium">{opt}</span>
							{#if answered[current] !== undefined}
								{#if i === q.correct}
									<CheckCircle2 class="h-5 w-5 shrink-0 text-[hsl(145,100%,39%)]" />
								{:else if answered[current] === i}
									<XCircle class="h-5 w-5 shrink-0 text-[hsl(0,84%,55%)]" />
								{/if}
							{/if}
						</button>
					{/each}
				</div>

				<!-- AI Explanation (revealed after answering) -->
				{#if revealed}
					<div
						class="mb-6 rounded-xl border border-[hsl(var(--primary)/0.2)] bg-[hsl(var(--primary)/0.05)] p-4"
					>
						<div class="mb-2 flex items-center gap-2">
							<Brain class="h-4 w-4 text-[hsl(var(--primary))]" />
							<span class="text-sm font-bold text-[hsl(var(--primary))]">AI Explanation</span>
						</div>
						<p class="text-foreground text-sm leading-relaxed">{q.explanation}</p>
					</div>
				{/if}

				<!-- Navigation -->
				<div class="flex items-center justify-between">
					<button
						onclick={prev}
						disabled={current === 0}
						class="btn-ghost rounded-xl px-4 py-2.5 text-sm disabled:opacity-40"
					>
						<ArrowLeft class="h-4 w-4" /> Previous
					</button>
					{#if answered[current] === undefined}
						<button
							onclick={revealAnswer}
							class="btn-outline rounded-xl border-[hsl(var(--primary)/0.4)] px-4 py-2.5 text-sm text-[hsl(var(--primary))]"
						>
							Skip
						</button>
					{/if}
					<button onclick={next} class="btn-primary rounded-xl px-6 py-2.5 text-sm">
						{current === questions.length - 1 ? 'Finish' : 'Next'}
						<ArrowRight class="h-4 w-4" />
					</button>
				</div>
			</div>

			<!-- CTA under demo -->
			<div
				class="glass-panel mt-6 flex flex-col items-center justify-between gap-4 p-5 sm:flex-row"
			>
				<div>
					<p class="text-foreground text-sm font-bold">Enjoying the demo?</p>
					<p class="text-muted-foreground mt-0.5 text-xs">
						Get access to 1.2M+ questions across all subjects
					</p>
				</div>
				<a href="/auth/signup" class="btn-primary shrink-0 px-5 py-2.5 text-sm">Start Free →</a>
			</div>
		{/if}
	</div>
</div>
