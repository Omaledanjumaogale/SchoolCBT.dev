<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import {
		ArrowLeft,
		ArrowRight,
		Clock,
		CheckCircle2,
		XCircle,
		Brain,
		RotateCcw,
		Trophy,
		Settings2,
		BookOpen,
		AlertCircle,
		ChevronDown,
		Play,
		Lightbulb,
		Target
	} from 'lucide-svelte';
	import { CURRICULUM, EXAMINATIONS } from '$lib/constants/curriculum';
	import { authStore } from '$lib/stores/auth';
	import { goto } from '$app/navigation';

	// ── Setup state ─────────────────────────────────────────────
	let step = $state<'setup' | 'exam' | 'result'>('setup');
	let selectedLevel = $state<'JSS' | 'SSS'>('SSS');
	let selectedSubject = $state('Mathematics');
	let selectedTopic = $state('All Topics');
	let selectedExam = $state('JAMB');
	let selectedDifficulty = $state('Mixed');
	let questionCount = $state(10);
	let isGenerating = $state(false);

	// ── Exam state ──────────────────────────────────────────────
	interface Question {
		id: number;
		subject: string;
		topic: string;
		q: string;
		options: string[];
		correct: number;
		explanation: string;
		wrongExplanations: string[];
		bloom: string;
	}

	let questions = $state<Question[]>([]);
	let current = $state(0);
	let answered = $state<Record<number, number>>({});
	let revealed = $state(false);
	let timeLeft = $state(60);
	let score = $state(0);
	let finished = $state(false);
	let timerInterval: ReturnType<typeof setInterval>;
	let startTime = $state(0);
	let totalTime = $state(0);

	// ── Derived values ──────────────────────────────────────────
	const subjects = $derived(Object.keys(CURRICULUM[selectedLevel]));
	const topics = $derived([
		'All Topics',
		...((CURRICULUM[selectedLevel] as any)[selectedSubject] || [])
	]);

	$effect(() => {
		if (!subjects.includes(selectedSubject)) {
			selectedSubject = subjects[0];
		}
	});

	$effect(() => {
		if (!topics.includes(selectedTopic)) {
			selectedTopic = 'All Topics';
		}
	});

	const q = $derived(questions[current]);
	const totalAnswered = $derived(Object.keys(answered).length);
	const progress = $derived(questions.length > 0 ? Math.round((totalAnswered / questions.length) * 100) : 0);
	const timerPercent = $derived(Math.round((timeLeft / 60) * 151));
	const timerColor = $derived(
		timeLeft > 20 ? 'hsl(145,100%,39%)' : timeLeft > 10 ? 'hsl(38,100%,50%)' : 'hsl(0,84%,55%)'
	);

	// ── Sample questions bank (AI-pattern questions) ────────────
	const questionBanks: Record<string, Question[]> = {
		Mathematics: [
			{
				id: 1, subject: 'Mathematics', topic: 'Algebra', bloom: 'Application',
				q: "Solve for x: 3x + 7 = 2x - 5",
				options: ['x = -12', 'x = 12', 'x = 2', 'x = -2'],
				correct: 0,
				explanation: "Moving terms: 3x - 2x = -5 - 7 → x = -12. The correct answer is A.",
				wrongExplanations: ["B: x=12 ignores the sign change when crossing the equals sign.", "C: x=2 is incorrect algebra.", "D: x=-2 would give 3(-2)+7=1 ≠ 2(-2)-5=-9."]
			},
			{
				id: 2, subject: 'Mathematics', topic: 'Sets', bloom: 'Analysis',
				q: "If P = {x: 2 ≤ x ≤ 8} and Q = {x: 4 ≤ x ≤ 12} where U = {x: 1 ≤ x ≤ 15}, find P ∩ Q'.",
				options: ['{2, 3}', '{4, 5, 6, 7, 8}', '{9, 10, 11, 12}', '{1, 2, 3}'],
				correct: 0,
				explanation: "P={2,3,4,5,6,7,8}. Q={4…12}. Q'={1,2,3,13,14,15}. P∩Q' = {2,3}. Answer A.",
				wrongExplanations: ["B: This is P∩Q, not P∩Q'.", "C: This is Q∩P' — outside P.", "D: Includes 1 which is not in P."]
			},
			{
				id: 3, subject: 'Mathematics', topic: 'Statistics', bloom: 'Knowledge',
				q: "The mean of 5 numbers is 9. If four of the numbers are 6, 7, 11, and 13, find the fifth.",
				options: ['8', '9', '10', '7'],
				correct: 0,
				explanation: "Sum = 5×9 = 45. Known sum = 6+7+11+13 = 37. Fifth = 45−37 = 8. Answer A.",
				wrongExplanations: ["B: Sum would be 46, not 45.", "C: Sum would be 47.", "D: Sum would be 44."]
			},
			{
				id: 4, subject: 'Mathematics', topic: 'Geometry', bloom: 'Application',
				q: "A triangle has angles in ratio 2:3:5. What is the size of the largest angle?",
				options: ['90°', '60°', '120°', '36°'],
				correct: 0,
				explanation: "Total ratio = 10 parts = 180°. Each part = 18°. Largest = 5×18° = 90°. Answer A.",
				wrongExplanations: ["B: That's the middle angle (3×18=54°).", "C: 120° would exceed the total.", "D: 36° is the smallest (2×18°)."]
			},
			{
				id: 5, subject: 'Mathematics', topic: 'Commercial Arithmetic', bloom: 'Application',
				q: "A merchant buys goods for ₦24,000 and sells for ₦30,000. What is the profit percentage?",
				options: ['25%', '20%', '30%', '6%'],
				correct: 0,
				explanation: "Profit = 30000−24000 = 6000. % = (6000/24000)×100 = 25%. Answer A.",
				wrongExplanations: ["B: 20% would be percentage on selling price.", "C: 30% is too high.", "D: 6% only works if the base is 100,000."]
			}
		],
		Physics: [
			{
				id: 1, subject: 'Physics', topic: 'Mechanics', bloom: 'Application',
				q: "A body of mass 5 kg moving at 4 m/s has a force applied for 3 s, reaching 10 m/s. Find the force.",
				options: ['10 N', '8 N', '6 N', '15 N'],
				correct: 0,
				explanation: "F = m(v−u)/t = 5×(10−4)/3 = 5×6/3 = 10 N. Answer A.",
				wrongExplanations: ["B: 8N would give final velocity ≈ 8.8 m/s.", "C: 6N gives acceleration of 1.2 m/s², final v=7.6 m/s.", "D: 15N gives v=13 m/s, not 10."]
			},
			{
				id: 2, subject: 'Physics', topic: 'Electricity', bloom: 'Knowledge',
				q: "Which instrument is used to measure electrical resistance?",
				options: ['Ohmmeter', 'Voltmeter', 'Ammeter', 'Galvanometer'],
				correct: 0,
				explanation: "An ohmmeter directly measures resistance in ohms. Answer A.",
				wrongExplanations: ["B: Voltmeter measures voltage/potential difference.", "C: Ammeter measures current.", "D: Galvanometer detects small currents, not resistance."]
			},
			{
				id: 3, subject: 'Physics', topic: 'Waves', bloom: 'Knowledge',
				q: "Light travels from glass to air. If the angle of incidence exceeds the critical angle, what occurs?",
				options: ['Total internal reflection', 'Refraction', 'Diffraction', 'Dispersion'],
				correct: 0,
				explanation: "When angle of incidence > critical angle in a denser medium, total internal reflection occurs. Answer A.",
				wrongExplanations: ["B: Refraction happens below the critical angle.", "C: Diffraction is bending around obstacles.", "D: Dispersion is separation of colours in a prism."]
			}
		],
		Chemistry: [
			{
				id: 1, subject: 'Chemistry', topic: 'Physical Change', bloom: 'Understanding',
				q: "Which of the following is an example of a physical change?",
				options: ['Dissolving sugar in water', 'Burning wood', 'Rusting of iron', 'Cooking an egg'],
				correct: 0,
				explanation: "Dissolving sugar is physical — no new substance forms and it's reversible by evaporation. Answer A.",
				wrongExplanations: ["B: Burning is combustion — a chemical change.", "C: Rusting is oxidation — chemical change.", "D: Cooking involves protein denaturation — chemical change."]
			},
			{
				id: 2, subject: 'Chemistry', topic: 'Atomic Structure', bloom: 'Knowledge',
				q: "The atomic number of an element is defined as the number of:",
				options: ['Protons in the nucleus', 'Neutrons in the nucleus', 'Electrons in an orbit', 'Nucleons'],
				correct: 0,
				explanation: "Atomic number = number of protons. It uniquely identifies an element. Answer A.",
				wrongExplanations: ["B: Neutron number gives the isotope, not atomic number.", "C: Electrons equal protons only in neutral atoms.", "D: Nucleons = protons+neutrons = mass number, not atomic number."]
			}
		],
		Biology: [
			{
				id: 1, subject: 'Biology', topic: 'Photosynthesis', bloom: 'Knowledge',
				q: "The process by which plants manufacture food using sunlight is called:",
				options: ['Photosynthesis', 'Respiration', 'Transpiration', 'Digestion'],
				correct: 0,
				explanation: "Photosynthesis: CO₂ + H₂O + sunlight → glucose + O₂. It occurs in chloroplasts. Answer A.",
				wrongExplanations: ["B: Respiration breaks down glucose for energy.", "C: Transpiration is water loss through leaves.", "D: Digestion is breakdown of food in animals."]
			},
			{
				id: 2, subject: 'Biology', topic: 'Cell Biology', bloom: 'Knowledge',
				q: "Which organelle is known as the 'powerhouse of the cell'?",
				options: ['Mitochondria', 'Nucleus', 'Ribosome', 'Golgi apparatus'],
				correct: 0,
				explanation: "Mitochondria produce ATP (energy) through cellular respiration. Answer A.",
				wrongExplanations: ["B: Nucleus controls cell activities and contains DNA.", "C: Ribosomes are sites of protein synthesis.", "D: Golgi apparatus processes and packages proteins."]
			}
		],
		'English Language': [
			{
				id: 1, subject: 'English Language', topic: 'Grammar', bloom: 'Application',
				q: "Choose the correct option: The committee ___ unable to reach a decision.",
				options: ['was', 'were', 'are', 'have been'],
				correct: 0,
				explanation: "'Committee' is a collective noun treated as singular, so 'was' is correct. Answer A.",
				wrongExplanations: ["B: 'Were' is used if members act individually.", "C: 'Are' is present tense but grammatically incorrect here.", "D: 'Have been' mismatches the subject in this context."]
			},
			{
				id: 2, subject: 'English Language', topic: 'Comprehension', bloom: 'Analysis',
				q: "What does the word 'ephemeral' mean?",
				options: ['Short-lived', 'Eternal', 'Magnificent', 'Periodic'],
				correct: 0,
				explanation: "'Ephemeral' means lasting for a very short time, from Greek 'ephemeros' (daily). Answer A.",
				wrongExplanations: ["B: 'Eternal' means everlasting — the opposite.", "C: 'Magnificent' means impressive.", "D: 'Periodic' means recurring at intervals."]
			}
		],
		Economics: [
			{
				id: 1, subject: 'Economics', topic: 'Demand & Supply', bloom: 'Knowledge',
				q: "When price rises and quantity demanded falls, this illustrates the law of:",
				options: ['Demand', 'Supply', 'Diminishing returns', 'Variable proportions'],
				correct: 0,
				explanation: "Law of Demand: as price increases, quantity demanded decreases, ceteris paribus. Answer A.",
				wrongExplanations: ["B: Law of Supply says higher price → higher quantity supplied.", "C: Diminishing returns relates to production factors.", "D: Variable proportions is a production concept."]
			}
		],
		Government: [
			{
				id: 1, subject: 'Government', topic: 'Political Institutions', bloom: 'Knowledge',
				q: "The principle of separation of powers was propounded by:",
				options: ['Baron de Montesquieu', 'John Locke', 'Jean-Jacques Rousseau', 'Thomas Hobbes'],
				correct: 0,
				explanation: "Montesquieu documented separation of powers into executive, legislative, and judiciary in 'The Spirit of the Laws' (1748). Answer A.",
				wrongExplanations: ["B: John Locke promoted social contract and natural rights.", "C: Rousseau proposed general will and popular sovereignty.", "D: Hobbes proposed absolute monarchy in Leviathan."]
			}
		]
	};

	function getQuestionsForSubject(): Question[] {
		const bank = questionBanks[selectedSubject] || questionBanks['Mathematics'];
		const filtered = selectedTopic === 'All Topics'
			? bank
			: bank.filter(q => q.topic === selectedTopic);
		const pool = filtered.length > 0 ? filtered : bank;
		// Randomize
		const shuffled = [...pool].sort(() => Math.random() - 0.5);
		return shuffled.slice(0, Math.min(questionCount, shuffled.length));
	}

	// ── Timer ────────────────────────────────────────────────────
	function startTimer() {
		clearInterval(timerInterval);
		timeLeft = 60;
		timerInterval = setInterval(() => {
			timeLeft--;
			if (timeLeft <= 0) {
				clearInterval(timerInterval);
				// Auto-skip unanswered question
				if (answered[current] === undefined) {
					answered[current] = -1; // -1 = timed out
					revealed = true;
				}
			}
		}, 1000);
	}

	// ── Interaction ──────────────────────────────────────────────
	function startExam() {
		isGenerating = true;
		setTimeout(() => {
			questions = getQuestionsForSubject();
			current = 0;
			answered = {};
			revealed = false;
			score = 0;
			finished = false;
			startTime = Date.now();
			isGenerating = false;
			step = 'exam';
			startTimer();
		}, 1200);
	}

	function selectOption(i: number) {
		if (revealed || answered[current] !== undefined) return;
		answered[current] = i;
		revealed = true;
		clearInterval(timerInterval);
		if (i === q.correct) score++;
	}

	function next() {
		if (current < questions.length - 1) {
			current++;
			revealed = answered[current] !== undefined;
			if (!revealed) startTimer();
		} else {
			totalTime = Math.round((Date.now() - startTime) / 1000);
			finished = true;
			step = 'result';
			clearInterval(timerInterval);
		}
	}

	function prev() {
		if (current > 0) {
			current--;
			revealed = answered[current] !== undefined;
			clearInterval(timerInterval);
		}
	}

	function restart() {
		step = 'setup';
		questions = [];
		current = 0;
		answered = {};
		revealed = false;
		score = 0;
		finished = false;
		clearInterval(timerInterval);
	}

	function skipQuestion() {
		if (answered[current] === undefined) {
			answered[current] = -1;
			revealed = true;
			clearInterval(timerInterval);
		}
	}

	// ── Grade calculation ────────────────────────────────────────
	function getGrade(pct: number) {
		if (pct >= 75) return { grade: 'A1', label: 'Excellent', color: 'hsl(145,100%,39%)', msg: "Outstanding! You're fully ready for the real exam. Keep this up!" };
		if (pct >= 65) return { grade: 'B2', label: 'Very Good', color: 'hsl(145,80%,35%)', msg: "Very strong performance! A little more practice and you're set." };
		if (pct >= 60) return { grade: 'B3', label: 'Good', color: 'hsl(145,60%,35%)', msg: "Good work! Focus on the topics where you made mistakes." };
		if (pct >= 50) return { grade: 'C4', label: 'Credit', color: 'hsl(38,100%,50%)', msg: "Satisfactory. Review the explanations for questions you got wrong." };
		if (pct >= 45) return { grade: 'C5', label: 'Credit', color: 'hsl(38,90%,45%)', msg: "Close to credit. Intensive study of weak topics is needed." };
		if (pct >= 40) return { grade: 'C6', label: 'Credit', color: 'hsl(38,80%,42%)', msg: "Borderline credit. Consistent daily practice will improve your score." };
		if (pct >= 30) return { grade: 'D7', label: 'Pass', color: 'hsl(0,70%,55%)', msg: "You passed, but need significant improvement. Practice every day." };
		return { grade: 'F9', label: 'Fail', color: 'hsl(0,84%,55%)', msg: "Don't give up! Review your notes and try again. Consistency is key." };
	}

	const pct = $derived(questions.length > 0 ? Math.round((score / questions.length) * 100) : 0);
	const grade = $derived(getGrade(pct));

	// ── Cleanup ──────────────────────────────────────────────────
	onDestroy(() => clearInterval(timerInterval));
</script>

<svelte:head>
	<title>CBT Center – SchoolCBT | Practice JAMB, WAEC & NECO</title>
	<meta
		name="description"
		content="SchoolCBT CBT Center: AI-powered practice for JAMB, WAEC and NECO with instant explanations when you get a question right or wrong."
	/>
</svelte:head>

<div class="bg-background min-h-[calc(100vh-64px)] px-4 py-8">
	<div class="mx-auto max-w-3xl">

		{#if step === 'setup'}
			<!-- ── SETUP SCREEN ────────────────────────────────────── -->
			<div class="mb-8 text-center">
				<div class="section-badge mb-3">🎯 CBT Center</div>
				<h1 class="text-foreground mb-2 text-3xl font-black">Start a Practice Session</h1>
				<p class="text-muted-foreground text-sm">
					Choose your level, subject and exam type, then launch your CBT session.
				</p>
			</div>

			<div class="glass-panel p-6 shadow-xl md:p-8">
				<h2 class="text-foreground mb-6 flex items-center gap-2 text-lg font-bold">
					<Settings2 class="h-5 w-5 text-[hsl(var(--primary))]" /> Configure Your Session
				</h2>

				<div class="mb-8 grid gap-4 sm:grid-cols-2">
					<!-- Level -->
					<div class="space-y-1.5">
						<label class="text-foreground text-xs font-bold uppercase tracking-wider" for="cbt-level">
							School Level
						</label>
						<select
							id="cbt-level"
							bind:value={selectedLevel}
							class="input-field cursor-pointer"
						>
							<option value="JSS">Junior Secondary (JSS1–JSS3)</option>
							<option value="SSS">Senior Secondary (SSS1–SSS3)</option>
						</select>
					</div>

					<!-- Subject -->
					<div class="space-y-1.5">
						<label class="text-foreground text-xs font-bold uppercase tracking-wider" for="cbt-subject">
							Subject
						</label>
						<select id="cbt-subject" bind:value={selectedSubject} class="input-field cursor-pointer">
							{#each subjects as s}
								<option value={s}>{s}</option>
							{/each}
						</select>
					</div>

					<!-- Topic -->
					<div class="space-y-1.5">
						<label class="text-foreground text-xs font-bold uppercase tracking-wider" for="cbt-topic">
							Topic
						</label>
						<select id="cbt-topic" bind:value={selectedTopic} class="input-field cursor-pointer">
							{#each topics as t}
								<option value={t}>{t}</option>
							{/each}
						</select>
					</div>

					<!-- Exam -->
					<div class="space-y-1.5">
						<label class="text-foreground text-xs font-bold uppercase tracking-wider" for="cbt-exam">
							Target Examination
						</label>
						<select id="cbt-exam" bind:value={selectedExam} class="input-field cursor-pointer">
							{#each Object.keys(EXAMINATIONS) as e}
								<option value={e}>{e}</option>
							{/each}
						</select>
					</div>

					<!-- Difficulty -->
					<div class="space-y-1.5">
						<label class="text-foreground text-xs font-bold uppercase tracking-wider" for="cbt-diff">
							Difficulty
						</label>
						<select id="cbt-diff" bind:value={selectedDifficulty} class="input-field cursor-pointer">
							<option value="Easy">Foundational (Easy)</option>
							<option value="Mixed">Balanced (Mixed)</option>
							<option value="Hard">Rigorous (Hard)</option>
						</select>
					</div>

					<!-- Question Count -->
					<div class="space-y-1.5">
						<label class="text-foreground text-xs font-bold uppercase tracking-wider" for="cbt-count">
							Number of Questions
						</label>
						<select id="cbt-count" bind:value={questionCount} class="input-field cursor-pointer">
							<option value={5}>5 Questions (Quick)</option>
							<option value={10}>10 Questions</option>
							<option value={20}>20 Questions</option>
							<option value={50}>50 Questions (Full Batch)</option>
						</select>
					</div>
				</div>

				<button
					onclick={startExam}
					disabled={isGenerating}
					class="btn-primary w-full py-4 text-base font-black uppercase tracking-wide disabled:opacity-60"
					id="launch-cbt-btn"
				>
					{#if isGenerating}
						<span class="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
						Generating Questions...
					{:else}
						<Play class="h-5 w-5" /> Launch CBT Session
					{/if}
				</button>
			</div>

			<!-- Info -->
			<div class="mt-6 grid gap-4 sm:grid-cols-3">
				{#each [
					{ icon: '⏱️', label: '60s per question', desc: 'Timer resets on each question' },
					{ icon: '📖', label: 'Instant AI feedback', desc: 'Know why each answer is right or wrong' },
					{ icon: '📊', label: 'Score report', desc: 'Full breakdown after session ends' }
				] as info}
					<div class="glass-panel p-4 text-center">
						<div class="mb-1 text-2xl">{info.icon}</div>
						<p class="text-foreground text-xs font-bold">{info.label}</p>
						<p class="text-muted-foreground text-xs">{info.desc}</p>
					</div>
				{/each}
			</div>

		{:else if step === 'exam' && q}
			<!-- ── EXAM INTERFACE ───────────────────────────────────── -->

			<!-- Progress bar -->
			<div class="mb-5">
				<div class="mb-2 flex items-center justify-between text-sm font-semibold">
					<span class="text-muted-foreground">
						Question <span class="text-foreground font-black">{current + 1}</span> of {questions.length}
					</span>
					<span class="text-muted-foreground">
						Score: <span class="font-black text-[hsl(var(--primary))]">{score}</span>/{questions.length}
					</span>
				</div>
				<div class="progress-bar">
					<div class="progress-bar-fill transition-all duration-500" style="width:{progress}%"></div>
				</div>
				<!-- Question dots -->
				<div class="mt-2 flex gap-1">
					{#each questions as _, i}
						<button
							class="h-2 flex-1 rounded-full transition-all {
								i === current ? 'scale-y-150 bg-[hsl(var(--primary)/0.6)]' :
								answered[i] !== undefined
									? answered[i] === questions[i].correct
										? 'bg-[hsl(145,100%,39%)]'
										: answered[i] === -1
											? 'bg-[hsl(38,100%,50%)]'
											: 'bg-[hsl(0,84%,55%)]'
									: 'bg-muted'
							}"
							onclick={() => {
								if (answered[i] !== undefined) {
									current = i;
									revealed = true;
									clearInterval(timerInterval);
								}
							}}
							aria-label="Go to question {i + 1}"
						></button>
					{/each}
				</div>
			</div>

			<!-- Question card -->
			<div class="glass-panel p-6 shadow-xl md:p-8">
				<!-- Subject + timer row -->
				<div class="mb-5 flex items-center justify-between">
					<div class="flex flex-col gap-1">
						<span class="rounded-lg bg-[hsl(var(--primary)/0.1)] px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-[hsl(var(--primary))]">
							{q.subject}
						</span>
						<span class="text-muted-foreground text-xs">{selectedExam} · {q.bloom}</span>
					</div>

					<!-- Circular countdown timer -->
					<div
						class="relative flex h-16 w-16 items-center justify-center"
						aria-label="Time remaining: {timeLeft} seconds"
					>
						<svg class="h-full w-full -rotate-90" viewBox="0 0 56 56">
							<circle cx="28" cy="28" r="24" fill="none" stroke="hsl(var(--muted))" stroke-width="4" />
							<circle
								cx="28" cy="28" r="24" fill="none"
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
				<div class="mb-5 space-y-3" id="options-container">
					{#each q.options as opt, i}
						<button
							id="option-{i}"
							class="option-btn {
								answered[current] !== undefined
									? i === q.correct
										? 'correct'
										: answered[current] === i && i !== q.correct
											? 'wrong'
											: ''
									: ''
							}"
							onclick={() => selectOption(i)}
							disabled={answered[current] !== undefined}
							aria-label="Option {['A','B','C','D'][i]}: {opt}"
						>
							<span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-black
								{answered[current] !== undefined
									? i === q.correct
										? 'bg-[hsl(145,100%,39%)] text-white'
										: answered[current] === i
											? 'bg-[hsl(0,84%,55%)] text-white'
											: 'bg-muted text-foreground'
									: 'bg-muted text-foreground'}">
								{['A','B','C','D'][i]}
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

				<!-- AI Explanation panel (shown after answering) -->
				{#if revealed}
					<div class="mb-5 rounded-xl border border-[hsl(var(--primary)/0.2)] bg-[hsl(var(--primary)/0.04)] p-5">
						<div class="mb-3 flex items-center gap-2">
							<Brain class="h-4 w-4 text-[hsl(var(--primary))]" />
							<span class="text-sm font-bold text-[hsl(var(--primary))]">AI Learning Feedback</span>
						</div>

						{#if answered[current] === q.correct}
							<!-- Correct answer feedback -->
							<div class="mb-2 flex items-center gap-2 rounded-lg bg-[hsl(145,100%,39%,0.1)] px-3 py-2">
								<CheckCircle2 class="h-4 w-4 text-[hsl(145,100%,39%)]" />
								<span class="text-sm font-bold text-[hsl(145,60%,30%)]">Correct! Well done.</span>
							</div>
							<p class="text-foreground text-sm leading-relaxed">{q.explanation}</p>
						{:else if answered[current] === -1}
							<!-- Timed out -->
							<div class="mb-2 flex items-center gap-2 rounded-lg bg-[hsl(38,100%,50%,0.1)] px-3 py-2">
								<AlertCircle class="h-4 w-4 text-[hsl(38,100%,50%)]" />
								<span class="text-sm font-bold text-[hsl(38,60%,30%)]">Time's up! The correct answer was {['A','B','C','D'][q.correct]}.</span>
							</div>
							<p class="text-foreground text-sm leading-relaxed">{q.explanation}</p>
						{:else}
							<!-- Wrong answer feedback -->
							<div class="mb-2 flex items-center gap-2 rounded-lg bg-[hsl(0,84%,55%,0.1)] px-3 py-2">
								<XCircle class="h-4 w-4 text-[hsl(0,84%,55%)]" />
								<span class="text-sm font-bold text-[hsl(0,70%,35%)]">
									Your pick ({['A','B','C','D'][answered[current]]}) was wrong. Correct answer: {['A','B','C','D'][q.correct]}.
								</span>
							</div>

							<!-- Why the wrong answer is wrong -->
							{#if q.wrongExplanations && answered[current] >= 0 && answered[current] < q.wrongExplanations.length}
								<div class="mb-3 rounded-lg border border-[hsl(0,84%,55%,0.2)] bg-[hsl(0,84%,55%,0.05)] p-3">
									<p class="text-foreground mb-1 text-xs font-bold uppercase tracking-wider text-[hsl(0,70%,45%)]">
										❌ Why Option {['A','B','C','D'][answered[current]]} is Wrong:
									</p>
									<p class="text-foreground text-sm leading-relaxed">{q.wrongExplanations[answered[current]]}</p>
								</div>
							{/if}

							<!-- Why the correct answer is right -->
							<div class="rounded-lg border border-[hsl(145,100%,39%,0.2)] bg-[hsl(145,100%,39%,0.05)] p-3">
								<p class="mb-1 text-xs font-bold uppercase tracking-wider text-[hsl(145,60%,30%)]">
									✅ Why Option {['A','B','C','D'][q.correct]} is Correct:
								</p>
								<p class="text-foreground text-sm leading-relaxed">{q.explanation}</p>
							</div>
						{/if}

						<!-- Quick study tip -->
						<div class="mt-3 flex items-start gap-2 rounded-lg bg-[hsl(var(--accent)/0.08)] px-3 py-2">
							<Lightbulb class="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--accent))]" />
							<p class="text-foreground text-xs font-medium">
								<strong class="text-[hsl(var(--accent))]">Study Tip:</strong>
								{q.topic} is a common JAMB/WAEC topic. Practice more questions in this area to build confidence.
							</p>
						</div>
					</div>
				{/if}

				<!-- Navigation -->
				<div class="flex items-center justify-between gap-3">
					<button
						onclick={prev}
						disabled={current === 0}
						class="btn-ghost rounded-xl px-4 py-2.5 text-sm disabled:opacity-40"
					>
						<ArrowLeft class="h-4 w-4" /> Previous
					</button>

					{#if answered[current] === undefined}
						<button
							onclick={skipQuestion}
							class="btn-outline rounded-xl border-[hsl(var(--accent)/0.4)] px-4 py-2.5 text-sm text-[hsl(var(--accent))]"
						>
							Skip
						</button>
					{/if}

					<button
						onclick={next}
						class="btn-primary rounded-xl px-6 py-2.5 text-sm"
						disabled={!revealed && answered[current] === undefined}
					>
						{current === questions.length - 1 ? 'Finish' : 'Next'}
						<ArrowRight class="h-4 w-4" />
					</button>
				</div>
			</div>

		{:else if step === 'result'}
			<!-- ── RESULTS SCREEN ───────────────────────────────────── -->
			<div class="glass-panel animate-scale-in p-8 text-center shadow-2xl">
				<!-- Grade ring -->
				<div
					class="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full shadow-lg"
					style="background:{grade.color}15; border:4px solid {grade.color}"
				>
					<span class="text-3xl font-black" style="color:{grade.color}">{grade.grade}</span>
				</div>

				<h2 class="text-foreground mb-1 text-2xl font-black">Session Complete!</h2>
				<p class="text-muted-foreground mb-2 text-sm">{selectedSubject} · {selectedExam} · {questions.length} questions</p>
				<p class="mb-6 text-lg font-bold" style="color:{grade.color}">{grade.label}</p>

				<!-- Score -->
				<div class="mb-4 text-5xl font-black" style="color:{grade.color}">
					{score}/{questions.length}
				</div>
				<p class="text-foreground mb-2 text-base font-semibold">{pct}% — {grade.msg}</p>
				<p class="text-muted-foreground mb-8 text-xs">Total time: {Math.floor(totalTime / 60)}m {totalTime % 60}s</p>

				<!-- Stats grid -->
				<div class="mb-8 grid grid-cols-3 gap-4">
					{#each [
						{ label: 'Correct', value: score, color: 'hsl(145,100%,39%)' },
						{ label: 'Wrong', value: questions.filter((_, i) => answered[i] !== undefined && answered[i] !== -1 && answered[i] !== questions[i].correct).length, color: 'hsl(0,84%,55%)' },
						{ label: 'Skipped', value: questions.filter((_, i) => answered[i] === -1).length, color: 'hsl(38,100%,50%)' }
					] as stat}
						<div class="border-border bg-card rounded-xl border px-3 py-4">
							<div class="mb-1 text-2xl font-black" style="color:{stat.color}">{stat.value}</div>
							<div class="text-muted-foreground text-xs font-semibold">{stat.label}</div>
						</div>
					{/each}
				</div>

				<!-- Question-by-question review -->
				<div class="mb-8 text-left">
					<h3 class="text-foreground mb-4 text-base font-bold">Question Review</h3>
					<div class="space-y-3">
						{#each questions as question, i}
							<div class="border-border rounded-xl border p-4 {
								answered[i] === question.correct ? 'border-[hsl(145,100%,39%,0.3)] bg-[hsl(145,100%,39%,0.04)]' :
								answered[i] === -1 ? 'border-[hsl(38,100%,50%,0.3)] bg-[hsl(38,100%,50%,0.04)]' :
								'border-[hsl(0,84%,55%,0.3)] bg-[hsl(0,84%,55%,0.04)]'
							}">
								<div class="mb-2 flex items-start justify-between gap-2">
									<p class="text-foreground text-sm font-semibold leading-snug">Q{i+1}. {question.q}</p>
									<span class="shrink-0 text-lg">
										{answered[i] === question.correct ? '✅' : answered[i] === -1 ? '⏰' : '❌'}
									</span>
								</div>
								<p class="text-muted-foreground text-xs">
									<strong>Correct:</strong> {['A','B','C','D'][question.correct]}. {question.options[question.correct]}
								</p>
								{#if answered[i] !== question.correct}
									<p class="mt-1 text-xs text-[hsl(var(--primary))]">{question.explanation}</p>
								{/if}
							</div>
						{/each}
					</div>
				</div>

				<!-- Action buttons -->
				<div class="flex flex-col gap-3 sm:flex-row">
					<button onclick={restart} class="btn-outline flex-1 gap-2 rounded-xl py-3.5 text-sm">
						<RotateCcw class="h-4 w-4" /> Try Again
					</button>
					{#if $authStore.user}
						<a href="/dashboard" class="btn-primary flex-1 rounded-xl py-3.5 text-sm">
							<Target class="h-4 w-4" /> View Dashboard
						</a>
					{:else}
						<a href="/auth/signup" class="btn-primary flex-1 rounded-xl py-3.5 text-sm">
							Get Full Access — Free
						</a>
					{/if}
				</div>
			</div>
		{/if}
	</div>
</div>
