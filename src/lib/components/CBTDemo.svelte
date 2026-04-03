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
	const topics = $derived(['All Topics', ...(CURRICULUM[level][subject as keyof (typeof CURRICULUM)[typeof level]] || [])]);

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
			text: "A body of mass 5 kg is moving with a velocity of 4 m/s. A force is applied to it for 3 seconds, after which the velocity becomes 10 m/s. What is the magnitude of the applied force?",
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
		if (pct >= 75) return { grade: 'A1', label: 'Distinction', color: 'text-jade', msg: 'Excellent performance! You are 100% ready for the real exam.' };
		if (pct >= 65) return { grade: 'B2', label: 'Very Good', color: 'text-jade', msg: 'Upper Credit — Very good work! Just a few more batches to perfection.' };
		if (pct >= 60) return { grade: 'B3', label: 'Good', color: 'text-jade', msg: 'Credit — Good performance! Focus on the topics you missed.' };
		if (pct >= 50) return { grade: 'C4', label: 'Credit', color: 'text-gold', msg: 'Credit — Satisfactory, but there is room for improvement.' };
		if (pct >= 45) return { grade: 'C5', label: 'Credit', color: 'text-gold', msg: 'Credit — You need to review the curriculum more closely.' };
		if (pct >= 40) return { grade: 'C6', label: 'Credit', color: 'text-gold', msg: 'Credit — Borderline. Intensive practice is recommended.' };
		if (pct >= 30) return { grade: 'D7', label: 'Pass', color: 'text-scarlet', msg: 'Pass — You must study more to guarantee success.' };
		return { grade: 'F9', label: 'Fail', color: 'text-scarlet', msg: 'Fail — Intensive revision needed. Try a foundational level batch.' };
	}

	const result = $derived(getGrade(score));
</script>

<section id="cbt-demo" class="py-24 sm:py-32 relative bg-mesh overflow-hidden">
	<!-- Decorative background -->
	<div class="absolute inset-0 pointer-events-none opacity-20">
		<div class="orb orb-blue top-[10%] left-[-10%] w-96 h-96"></div>
		<div class="orb orb-green bottom-[10%] right-[-10%] w-80 h-80"></div>
	</div>

	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
		<div class="text-center mb-16">
			<div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-bold uppercase tracking-widest mb-6">
				<span>📝</span> Interactive CBT Demo
			</div>
			<h2 class="font-sora text-4xl sm:text-5xl lg:text-6xl font-900 text-white mt-3 mb-6 tracking-tight">
				Experience the <span class="text-gold">RaaS</span> Engine ⚡
			</h2>
			<p class="text-white/50 max-w-2xl mx-auto text-lg sm:text-xl leading-relaxed">
				Try a live demo of our AI-orchestrated exam interface. Realistic timers, 
				curriculum-grounded questions, and instant feedback. 🚀
			</p>
		</div>

		<div class="max-w-4xl mx-auto">
			{#if currentStep === 'setup'}
				<div in:fade class="glass-card p-8 sm:p-12 relative overflow-hidden group">
					<div class="absolute top-0 right-0 p-10 text-9xl opacity-[0.03] group-hover:scale-110 transition-transform">⚙️</div>
					<div class="relative z-10">
						<h3 class="font-sora text-2xl sm:text-3xl font-800 text-white mb-8 flex items-center gap-3">
							<span class="text-3xl">🛠️</span> Configure Your Batch
						</h3>

						<div class="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-10">
							<div class="space-y-2">
								<label class="text-white/40 text-[10px] font-bold uppercase tracking-widest ml-1" for="level">Educational Level</label>
								<select id="level" bind:value={level} class="w-full bg-white/05 border border-white/10 rounded-2xl p-4 text-white font-bold focus:border-gold/50 outline-none transition-all appearance-none cursor-pointer">
									<option value="JSS">👶 Junior Secondary (JSS)</option>
									<option value="SSS">🎓 Senior Secondary (SSS)</option>
								</select>
							</div>
							<div class="space-y-2">
								<label class="text-white/40 text-[10px] font-bold uppercase tracking-widest ml-1" for="subject">Subject Area</label>
								<select id="subject" bind:value={subject} class="w-full bg-white/05 border border-white/10 rounded-2xl p-4 text-white font-bold focus:border-gold/50 outline-none transition-all appearance-none cursor-pointer">
									{#each subjects as s}
										<option value={s}>{s}</option>
									{/each}
								</select>
							</div>
							<div class="space-y-2">
								<label class="text-white/40 text-[10px] font-bold uppercase tracking-widest ml-1" for="topic">Curriculum Topic</label>
								<select id="topic" bind:value={topic} class="w-full bg-white/05 border border-white/10 rounded-2xl p-4 text-white font-bold focus:border-gold/50 outline-none transition-all appearance-none cursor-pointer">
									{#each topics as t}
										<option value={t}>{t}</option>
									{/each}
								</select>
							</div>
							<div class="space-y-2">
								<label class="text-white/40 text-[10px] font-bold uppercase tracking-widest ml-1" for="exam">Target Examination</label>
								<select id="exam" bind:value={exam} class="w-full bg-white/05 border border-white/10 rounded-2xl p-4 text-white font-bold focus:border-gold/50 outline-none transition-all appearance-none cursor-pointer">
									<option value="JAMB">🏛️ JAMB (UTME)</option>
									<option value="WAEC">📜 WAEC (WASSCE)</option>
									<option value="NECO">📜 NECO (SSCE)</option>
								</select>
							</div>
							<div class="space-y-2">
								<label class="text-white/40 text-[10px] font-bold uppercase tracking-widest ml-1" for="diff">AI Difficulty Mode</label>
								<select id="diff" bind:value={difficulty} class="w-full bg-white/05 border border-white/10 rounded-2xl p-4 text-white font-bold focus:border-gold/50 outline-none transition-all appearance-none cursor-pointer">
									<option value="Easy">🌱 Foundational (Easy)</option>
									<option value="Mixed">⚖️ Balanced (Mixed)</option>
									<option value="Hard">🔥 Rigorous (Hard)</option>
								</select>
							</div>
						</div>

						<button 
							onclick={startExam}
							disabled={isGenerating}
							class="w-full btn-gold py-5 rounded-2xl text-lg font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl shadow-gold/20 active:scale-[0.98] transition-all disabled:opacity-50"
						>
							{#if isGenerating}
								<span class="w-6 h-6 border-4 border-cobalt/30 border-t-cobalt rounded-full animate-spin"></span>
								AI Orchestrating...
							{:else}
								🚀 Launch CBT Batch
							{/if}
						</button>
					</div>
				</div>
			{:else if currentStep === 'exam'}
				<div in:fly={{ y: 20 }} class="glass-card p-6 sm:p-10 relative overflow-hidden">
					<!-- Timer Header -->
					<div class="flex items-center justify-between mb-10 border-b border-white/05 pb-6">
						<div class="flex items-center gap-4">
							<div class="w-12 h-12 rounded-2xl bg-cobalt-light/20 flex items-center justify-center text-2xl border border-white/10">
								⌛
							</div>
							<div>
								<div class="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">Time Remaining</div>
								<div class="text-2xl font-sora font-900 {timeLeft < 10 ? 'text-scarlet animate-pulse' : 'text-white'}">
									00:{timeLeft < 10 ? '0' + timeLeft : timeLeft}
								</div>
							</div>
						</div>
						<div class="text-right">
							<div class="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">Question {currentQuestionIndex + 1} of {sampleQuestions.length}</div>
							<div class="flex gap-1.5 mt-2 justify-end">
								{#each sampleQuestions as _, i}
									<div class="w-8 h-1.5 rounded-full {i <= currentQuestionIndex ? 'bg-gold' : 'bg-white/10'} transition-all"></div>
								{/each}
							</div>
						</div>
					</div>

					<!-- Question Area -->
					<div class="mb-10 min-h-[120px]">
						<div class="inline-block px-3 py-1 rounded-lg bg-jade/10 border border-jade/20 text-jade text-[10px] font-black uppercase tracking-widest mb-4">
							🧠 Bloom: {sampleQuestions[currentQuestionIndex].bloom}
						</div>
						<h4 class="text-white font-sora text-xl sm:text-2xl font-medium leading-relaxed">
							{@html sampleQuestions[currentQuestionIndex].text}
						</h4>
					</div>

					<!-- Options Grid -->
					<div class="grid sm:grid-cols-2 gap-4 mb-10">
						{#each sampleQuestions[currentQuestionIndex].options as option}
							<button 
								onclick={() => selectOption(option.letter)}
								disabled={!!answers[currentQuestionIndex]}
								class="group p-5 rounded-2xl border-2 text-left transition-all relative overflow-hidden
									{answers[currentQuestionIndex] === option.letter 
										? (option.letter === sampleQuestions[currentQuestionIndex].correct ? 'bg-jade/10 border-jade shadow-[0_0_20px_rgba(80,200,120,0.2)]' : 'bg-scarlet/10 border-scarlet shadow-[0_0_20px_rgba(220,53,69,0.2)]') 
										: (answers[currentQuestionIndex] && option.letter === sampleQuestions[currentQuestionIndex].correct ? 'bg-jade/10 border-jade/50' : 'bg-white/03 border-white/05 hover:bg-white/07 hover:border-white/20')}
								"
							>
								<div class="flex items-center gap-4 relative z-10">
									<div class="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm transition-colors
										{answers[currentQuestionIndex] === option.letter 
											? 'bg-white text-cobalt' 
											: 'bg-white/10 text-white/50 group-hover:bg-white/20 group-hover:text-white'}
									">
										{option.letter}
									</div>
									<span class="text-white font-bold text-lg">{option.text}</span>
								</div>
								{#if answers[currentQuestionIndex] === option.letter}
									<div class="absolute right-4 top-1/2 -translate-y-1/2 text-2xl">
										{option.letter === sampleQuestions[currentQuestionIndex].correct ? '✅' : '❌'}
									</div>
								{/if}
							</button>
						{/each}
					</div>

					{#if answers[currentQuestionIndex]}
						<div in:slide class="bg-white/03 border border-white/05 rounded-2xl p-6 mb-8">
							<div class="flex items-center gap-2 text-gold font-black text-[10px] uppercase tracking-widest mb-2">
								<span>📖</span> Explanation
							</div>
							<p class="text-white/60 text-sm leading-relaxed">
								{sampleQuestions[currentQuestionIndex].explanation}
							</p>
						</div>
						<button 
							onclick={nextQuestion}
							class="w-full btn-gold py-4 rounded-2xl font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-xl active:scale-[0.98] transition-all"
						>
							{currentQuestionIndex === sampleQuestions.length - 1 ? '🏁 Finish Exam' : 'Next Question ➡️'}
						</button>
					{/if}
				</div>
			{:else}
				<div in:fly={{ y: 20 }} class="glass-card p-10 sm:p-16 text-center relative overflow-hidden">
					<div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gold via-jade to-gold"></div>
					<div class="text-7xl mb-8">🏆</div>
					<h3 class="font-sora text-3xl sm:text-4xl font-900 text-white mb-2">Batch Completed!</h3>
					<div class="text-lg font-bold {result.color} mb-6 uppercase tracking-widest">{result.label} — {result.grade}</div>
					<p class="text-white/50 text-lg mb-12 max-w-md mx-auto">{result.msg}</p>

					<div class="grid grid-cols-2 gap-4 sm:gap-8 mb-12">
						<div class="glass-card p-6 border-jade/30">
							<div class="text-white/40 text-[10px] font-black uppercase tracking-widest mb-2">Your Score</div>
							<div class="text-4xl sm:text-5xl font-sora font-900 text-jade">{score}%</div>
						</div>
						<div class="glass-card p-6 border-gold/30">
							<div class="text-white/40 text-[10px] font-black uppercase tracking-widest mb-2">Questions Passed</div>
							<div class="text-4xl sm:text-5xl font-sora font-900 text-gold">{score / 50} / 2</div>
						</div>
					</div>

					<div class="flex flex-col sm:flex-row gap-4">
						<button 
							onclick={() => { currentStep = 'setup'; score = 0; answers = {}; currentQuestionIndex = 0; }}
							class="flex-1 btn-outline py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white/05 transition-all"
						>
							🔄 Try Another Batch
						</button>
						<a 
							href="/auth/signup"
							class="flex-1 btn-gold py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-gold/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center"
						>
							🔥 Create Real Account
						</a>
					</div>
				</div>
			{/if}
		</div>
	</div>
</section>
