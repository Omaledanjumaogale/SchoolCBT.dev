<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, slide, fly } from 'svelte/transition';

	import { CURRICULUM } from '$lib/constants/curriculum';

	let level = $state<'JSS' | 'SSS'>('SSS');
	let subject = $state<string>('Mathematics');
	let topic = $state<string>('All Topics');
	let exam = $state('JAMB');
	let difficulty = $state('Mixed');
	let isGenerating = $state(false);
	let currentStep = $state('setup'); // 'setup', 'exam', 'result'
	let currentQuestionIndex = $state(0);
	let score = $state(0);
	let answers = $state<Record<number, string>>({});
	let timeLeft = $state(50);
	let timerInterval: any;

	const subjects = $derived(Object.keys(CURRICULUM[level]));
	const topics = $derived([
		'All Topics',
		...(CURRICULUM[level][subject as keyof (typeof CURRICULUM)[typeof level]] || [])
	]);

	const sampleQuestions = [
		{
			id: 1,
			bloom: 'Knowledge',
			text: "If <strong class='text-gold'>P = {x : 2 ≤ x ≤ 8}</strong> and <strong class='text-gold'>Q = {x : 4 ≤ x ≤ 12}</strong> are subsets of <strong class='text-gold'>U = {x : 1 ≤ x ≤ 15}</strong>, find <strong class='text-gold'>P ∩ Q'</strong>.",
			options: [
				{ letter: 'A', text: '{2, 3}' },
				{ letter: 'B', text: '{2, 3, 4}' },
				{ letter: 'C', text: '{5, 6, 7, 8}' },
				{ letter: 'D', text: '{1, 2, 3}' }
			],
			correct: 'B',
			explanation:
				"P = {2, 3, 4, 5, 6, 7, 8}. Q = {4, 5, 6, 7, 8, 9, 10, 11, 12}. Q' (not in Q) = {1, 2, 3, 13, 14, 15}. Intersection (common to P and Q') = {2, 3}."
		},
		{
			id: 2,
			bloom: 'Application',
			text: 'A body of mass 5 kg is moving with a velocity of 4 m/s. A force is applied to it for 3 seconds, after which the velocity becomes 10 m/s. What is the magnitude of the applied force?',
			options: [
				{ letter: 'A', text: '5 N' },
				{ letter: 'B', text: '10 N' },
				{ letter: 'C', text: '15 N' },
				{ letter: 'D', text: '20 N' }
			],
			correct: 'B',
			explanation:
				'Force = mass * acceleration. Acceleration = (v - u) / t = (10 - 4) / 3 = 2 m/s². Force = 5 kg * 2 m/s² = 10 N.'
		}
	];

	function startExam() {
		isGenerating = true;
		setTimeout(() => {
			isGenerating = false;
			currentStep = 'exam';
			startTimer();
		}, 1500);
	}

	function startTimer() {
		clearInterval(timerInterval);
		timeLeft = 50;
		timerInterval = setInterval(() => {
			if (timeLeft > 0) {
				timeLeft--;
			} else {
				nextQuestion();
			}
		}, 1000);
	}

	function selectOption(letter: string) {
		if (answers[currentQuestionIndex]) return;
		answers[currentQuestionIndex] = letter;
		if (letter === sampleQuestions[currentQuestionIndex].correct) {
			score += 2;
		}
	}

	function nextQuestion() {
		if (currentQuestionIndex < sampleQuestions.length - 1) {
			currentQuestionIndex++;
			startTimer();
		} else {
			finishExam();
		}
	}

	function finishExam() {
		clearInterval(timerInterval);
		currentStep = 'result';
	}

	function getGrade(pct: number) {
		if (pct >= 75)
			return {
				grade: 'A1',
				label: 'Distinction',
				color: 'text-jade',
				msg: 'Excellent performance! You are 100% ready for the real exam.'
			};
		if (pct >= 65)
			return {
				grade: 'B2',
				label: 'Very Good',
				color: 'text-jade',
				msg: 'Upper Credit — Very good work! Just a few more batches to perfection.'
			};
		if (pct >= 60)
			return {
				grade: 'B3',
				label: 'Good',
				color: 'text-jade',
				msg: 'Credit — Good performance! Focus on the topics you missed.'
			};
		if (pct >= 50)
			return {
				grade: 'C4',
				label: 'Credit',
				color: 'text-gold',
				msg: 'Credit — Satisfactory, but there is room for improvement.'
			};
		if (pct >= 45)
			return {
				grade: 'C5',
				label: 'Credit',
				color: 'text-gold',
				msg: 'Credit — You need to review the curriculum more closely.'
			};
		if (pct >= 40)
			return {
				grade: 'C6',
				label: 'Credit',
				color: 'text-gold',
				msg: 'Credit — Borderline. Intensive practice is recommended.'
			};
		if (pct >= 30)
			return {
				grade: 'D7',
				label: 'Pass',
				color: 'text-scarlet',
				msg: 'Pass — You must study more to guarantee success.'
			};
		return {
			grade: 'F9',
			label: 'Fail',
			color: 'text-scarlet',
			msg: 'Fail — Intensive revision needed. Try a foundational level batch.'
		};
	}

	const result = $derived(getGrade(score));
</script>

<section id="cbt-demo" class="bg-mesh relative overflow-hidden py-24 sm:py-32">
	<!-- Decorative background -->
	<div class="pointer-events-none absolute inset-0 opacity-20">
		<div class="orb orb-blue top-[10%] left-[-10%] h-96 w-96"></div>
		<div class="orb orb-green right-[-10%] bottom-[10%] h-80 w-80"></div>
	</div>

	<div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<div
				class="bg-gold/10 border-gold/20 text-gold mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold tracking-widest uppercase"
			>
				<span>📝</span> Interactive CBT Demo
			</div>
			<h2
				class="font-sora font-900 mt-3 mb-6 text-4xl tracking-tight text-white sm:text-5xl lg:text-6xl"
			>
				Experience the <span class="text-gold">RaaS</span> Engine ⚡
			</h2>
			<p class="mx-auto max-w-2xl text-lg leading-relaxed text-white/50 sm:text-xl">
				Try a live demo of our AI-orchestrated exam interface. Realistic timers, curriculum-grounded
				questions, and instant feedback. 🚀
			</p>
		</div>

		<div class="mx-auto max-w-4xl">
			{#if currentStep === 'setup'}
				<div in:fade class="glass-card group relative overflow-hidden p-6 sm:p-10 lg:p-12">
					<div
						class="absolute top-0 right-0 p-10 text-9xl opacity-[0.03] transition-transform group-hover:scale-110"
					>
						⚙️
					</div>
					<div class="relative z-10">
						<h3
							class="font-sora font-800 mb-8 flex items-center gap-3 text-2xl text-white sm:text-3xl"
						>
							<span class="text-3xl">🛠️</span> Configure Your Batch
						</h3>

						<div class="mb-10 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:gap-8">
							<div class="space-y-2">
								<label
									class="ml-1 text-[10px] font-bold tracking-widest text-white/40 uppercase"
									for="level">Educational Level</label
								>
								<select
									id="level"
									bind:value={level}
									class="bg-white/05 focus:border-gold/50 w-full cursor-pointer appearance-none rounded-2xl border border-white/10 p-4 font-bold text-white transition-all outline-none"
								>
									<option value="JSS">👶 Junior Secondary (JSS)</option>
									<option value="SSS">🎓 Senior Secondary (SSS)</option>
								</select>
							</div>
							<div class="space-y-2">
								<label
									class="ml-1 text-[10px] font-bold tracking-widest text-white/40 uppercase"
									for="subject">Subject Area</label
								>
								<select
									id="subject"
									bind:value={subject}
									class="bg-white/05 focus:border-gold/50 w-full cursor-pointer appearance-none rounded-2xl border border-white/10 p-4 font-bold text-white transition-all outline-none"
								>
									{#each subjects as s}
										<option value={s}>{s}</option>
									{/each}
								</select>
							</div>
							<div class="space-y-2">
								<label
									class="ml-1 text-[10px] font-bold tracking-widest text-white/40 uppercase"
									for="topic">Curriculum Topic</label
								>
								<select
									id="topic"
									bind:value={topic}
									class="bg-white/05 focus:border-gold/50 w-full cursor-pointer appearance-none rounded-2xl border border-white/10 p-4 font-bold text-white transition-all outline-none"
								>
									{#each topics as t}
										<option value={t}>{t}</option>
									{/each}
								</select>
							</div>
							<div class="space-y-2">
								<label
									class="ml-1 text-[10px] font-bold tracking-widest text-white/40 uppercase"
									for="exam">Target Examination</label
								>
								<select
									id="exam"
									bind:value={exam}
									class="bg-white/05 focus:border-gold/50 w-full cursor-pointer appearance-none rounded-2xl border border-white/10 p-4 font-bold text-white transition-all outline-none"
								>
									<option value="JAMB">🏛️ JAMB (UTME)</option>
									<option value="WAEC">📜 WAEC (WASSCE)</option>
									<option value="NECO">📜 NECO (SSCE)</option>
								</select>
							</div>
							<div class="space-y-2">
								<label
									class="ml-1 text-[10px] font-bold tracking-widest text-white/40 uppercase"
									for="diff">AI Difficulty Mode</label
								>
								<select
									id="diff"
									bind:value={difficulty}
									class="bg-white/05 focus:border-gold/50 w-full cursor-pointer appearance-none rounded-2xl border border-white/10 p-4 font-bold text-white transition-all outline-none"
								>
									<option value="Easy">🌱 Foundational (Easy)</option>
									<option value="Mixed">⚖️ Balanced (Mixed)</option>
									<option value="Hard">🔥 Rigorous (Hard)</option>
								</select>
							</div>
						</div>

						<button
							onclick={startExam}
							disabled={isGenerating}
							class="btn-gold shadow-gold/20 flex w-full items-center justify-center gap-3 rounded-2xl py-5 text-lg font-black tracking-widest uppercase shadow-2xl transition-all active:scale-[0.98] disabled:opacity-50"
						>
							{#if isGenerating}
								<span
									class="border-cobalt/30 border-t-cobalt h-6 w-6 animate-spin rounded-full border-4"
								></span>
								AI Orchestrating...
							{:else}
								🚀 Launch CBT Batch
							{/if}
						</button>
					</div>
				</div>
			{:else if currentStep === 'exam'}
				<div in:fly={{ y: 20 }} class="glass-card relative overflow-hidden p-6 sm:p-10">
					<!-- Timer Header -->
					<div class="border-white/05 mb-10 flex items-center justify-between border-b pb-6">
						<div class="flex items-center gap-4">
							<div
								class="bg-cobalt-light/20 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 text-2xl"
							>
								⌛
							</div>
							<div>
								<div class="text-[10px] font-black tracking-[0.2em] text-white/40 uppercase">
									Time Remaining
								</div>
								<div
									class="font-sora font-900 text-2xl {timeLeft < 10
										? 'text-scarlet animate-pulse'
										: 'text-white'}"
								>
									00:{timeLeft < 10 ? '0' + timeLeft : timeLeft}
								</div>
							</div>
						</div>
						<div class="text-right">
							<div class="text-[10px] font-black tracking-[0.2em] text-white/40 uppercase">
								Question {currentQuestionIndex + 1} of {sampleQuestions.length}
							</div>
							<div class="mt-2 flex justify-end gap-1.5">
								{#each sampleQuestions as _, i}
									<div
										class="h-1.5 w-8 rounded-full {i <= currentQuestionIndex
											? 'bg-gold'
											: 'bg-white/10'} transition-all"
									></div>
								{/each}
							</div>
						</div>
					</div>

					<!-- Question Area -->
					<div class="mb-10 min-h-[120px]">
						<div
							class="bg-jade/10 border-jade/20 text-jade mb-4 inline-block rounded-lg border px-3 py-1 text-[10px] font-black tracking-widest uppercase"
						>
							🧠 Bloom: {sampleQuestions[currentQuestionIndex].bloom}
						</div>
						<h4 class="font-sora text-xl leading-relaxed font-medium text-white sm:text-2xl">
							{@html sampleQuestions[currentQuestionIndex].text}
						</h4>
					</div>

					<!-- Options Grid -->
					<div class="mb-10 grid gap-4 sm:grid-cols-2">
						{#each sampleQuestions[currentQuestionIndex].options as option}
							<button
								onclick={() => selectOption(option.letter)}
								disabled={!!answers[currentQuestionIndex]}
								class="group relative overflow-hidden rounded-2xl border-2 p-5 text-left transition-all
									{answers[currentQuestionIndex] === option.letter
									? option.letter === sampleQuestions[currentQuestionIndex].correct
										? 'bg-jade/10 border-jade shadow-[0_0_20px_rgba(80,200,120,0.2)]'
										: 'bg-scarlet/10 border-scarlet shadow-[0_0_20px_rgba(220,53,69,0.2)]'
									: answers[currentQuestionIndex] &&
										  option.letter === sampleQuestions[currentQuestionIndex].correct
										? 'bg-jade/10 border-jade/50'
										: 'bg-white/03 border-white/05 hover:bg-white/07 hover:border-white/20'}
								"
							>
								<div class="relative z-10 flex items-center gap-4">
									<div
										class="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-black transition-colors
										{answers[currentQuestionIndex] === option.letter
											? 'text-cobalt bg-white'
											: 'bg-white/10 text-white/50 group-hover:bg-white/20 group-hover:text-white'}
									"
									>
										{option.letter}
									</div>
									<span class="text-lg font-bold text-white">{option.text}</span>
								</div>
								{#if answers[currentQuestionIndex] === option.letter}
									<div class="absolute top-1/2 right-4 -translate-y-1/2 text-2xl">
										{option.letter === sampleQuestions[currentQuestionIndex].correct ? '✅' : '❌'}
									</div>
								{/if}
							</button>
						{/each}
					</div>

					{#if answers[currentQuestionIndex]}
						<div in:slide class="bg-white/03 border-white/05 mb-8 rounded-2xl border p-6">
							<div
								class="text-gold mb-2 flex items-center gap-2 text-[10px] font-black tracking-widest uppercase"
							>
								<span>📖</span> Explanation
							</div>
							<p class="text-sm leading-relaxed text-white/60">
								{sampleQuestions[currentQuestionIndex].explanation}
							</p>
						</div>
						<button
							onclick={nextQuestion}
							class="btn-gold flex w-full items-center justify-center gap-3 rounded-2xl py-4 font-black tracking-[0.2em] uppercase shadow-xl transition-all active:scale-[0.98]"
						>
							{currentQuestionIndex === sampleQuestions.length - 1
								? '🏁 Finish Exam'
								: 'Next Question ➡️'}
						</button>
					{/if}
				</div>
			{:else}
				<div
					in:fly={{ y: 20 }}
					class="glass-card relative overflow-hidden p-6 text-center sm:p-10 lg:p-16"
				>
					<div
						class="from-gold via-jade to-gold absolute top-0 left-0 h-2 w-full bg-gradient-to-r"
					></div>
					<div class="mb-8 text-7xl">🏆</div>
					<h3 class="font-sora font-900 mb-2 text-3xl text-white sm:text-4xl">Batch Completed!</h3>
					<div class="text-lg font-bold {result.color} mb-6 tracking-widest uppercase">
						{result.label} — {result.grade}
					</div>
					<p class="mx-auto mb-12 max-w-md text-lg text-white/50">{result.msg}</p>

					<div class="mb-12 grid grid-cols-2 gap-4 sm:gap-8">
						<div class="glass-card border-jade/30 p-6">
							<div class="mb-2 text-[10px] font-black tracking-widest text-white/40 uppercase">
								Your Score
							</div>
							<div class="font-sora font-900 text-jade text-4xl sm:text-5xl">{score}%</div>
						</div>
						<div class="glass-card border-gold/30 p-6">
							<div class="mb-2 text-[10px] font-black tracking-widest text-white/40 uppercase">
								Questions Passed
							</div>
							<div class="font-sora font-900 text-gold text-4xl sm:text-5xl">{score / 50} / 2</div>
						</div>
					</div>

					<div class="flex flex-col gap-4 sm:flex-row">
						<button
							onclick={() => {
								currentStep = 'setup';
								score = 0;
								answers = {};
								currentQuestionIndex = 0;
							}}
							class="btn-outline hover:bg-white/05 flex-1 rounded-2xl py-5 font-black tracking-widest uppercase transition-all"
						>
							🔄 Try Another Batch
						</button>
						<a
							href="/auth/signup"
							class="btn-gold shadow-gold/20 flex flex-1 items-center justify-center rounded-2xl py-5 font-black tracking-widest uppercase shadow-xl transition-all hover:scale-[1.02] active:scale-95"
						>
							🔥 Create Real Account
						</a>
					</div>
				</div>
			{/if}
		</div>
	</div>
</section>
