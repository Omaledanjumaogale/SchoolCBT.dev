<script lang="ts">
	import { BookOpen, GraduationCap, ArrowRight, ChevronDown, Search, Brain, Target } from 'lucide-svelte';
	import { CURRICULUM, EXAMINATIONS } from '$lib/constants/curriculum';

	let openSection = $state<string | null>(null);
	let activeLevel = $state<'all' | 'JSS' | 'SSS'>('all');
	let searchQuery = $state('');

	function toggle(id: string) {
		openSection = openSection === id ? null : id;
	}

	// Flatten curriculum for search
	const jssSubjects = $derived(
		Object.entries(CURRICULUM.JSS).map(([name, topics]) => ({ name, topics }))
	);
	const sssSubjects = $derived(
		Object.entries(CURRICULUM.SSS).map(([name, topics]) => ({ name, topics }))
	);

	function filterSubjects(subjects: { name: string; topics: string[] }[]) {
		if (!searchQuery.trim()) return subjects;
		const q = searchQuery.toLowerCase();
		return subjects.filter(
			(s) =>
				s.name.toLowerCase().includes(q) ||
				s.topics.some((t) => t.toLowerCase().includes(q))
		);
	}

	const filteredJSS = $derived(filterSubjects(jssSubjects));
	const filteredSSS = $derived(filterSubjects(sssSubjects));

	const subjectIcon: Record<string, string> = {
		'English Language': '📖',
		'Mathematics': '🔢',
		'Physics': '⚛️',
		'Chemistry': '🧪',
		'Biology': '🧬',
		'Further Mathematics': '➕',
		'Geography': '🗺️',
		'Economics': '📊',
		'Financial Accounting': '💰',
		'Commerce': '🏪',
		'Government': '🏛️',
		'History': '📜',
		'Literature in English': '📚',
		'Christian Religious Studies': '✝️',
		'Islamic Religious Studies': '☪️',
		'Agricultural Science': '🌾',
		'Technical Drawing': '📐',
		'Computer Science': '💻',
		'Fine Arts': '🎨',
		'Music': '🎵',
		'French Language': '🇫🇷',
		'Home Economics': '🏠',
		'Basic Science & Technology': '🔬',
		'Social Studies': '🌍',
		'Civic Education': '🏛️',
		'Business Studies': '💼',
		'Computer Studies / ICT': '🖥️',
		'Cultural & Creative Arts': '🎭',
		'Physical & Health Education': '⚽',
		'Hausa Language': '🗣️',
		'Yoruba Language': '🗣️',
		'Igbo Language': '🗣️'
	};

	const totalJSSTopics = $derived(Object.values(CURRICULUM.JSS).reduce((a, t) => a + t.length, 0));
	const totalSSSTopics = $derived(Object.values(CURRICULUM.SSS).reduce((a, t) => a + t.length, 0));
	const totalSubjects = $derived(Object.keys(CURRICULUM.JSS).length + Object.keys(CURRICULUM.SSS).length);
</script>

<svelte:head>
	<title>Curriculum Coverage – SchoolCBT | All JAMB, WAEC, NECO Subjects</title>
	<meta
		name="description"
		content="SchoolCBT covers the full NERDC Nigeria curriculum for JSS1–JSS3 and SS1–SS3 — all subjects and topics for JAMB, WAEC, NECO, NABTEB and Post-UTME."
	/>
</svelte:head>

<div class="bg-background min-h-[calc(100vh-64px)]">
	<!-- ── HERO ──────────────────────────────────────────────────── -->
	<div class="border-border border-b bg-gradient-to-br from-[hsl(var(--primary)/0.04)] to-[hsl(174,60%,28%,0.03)] py-16 text-center">
		<div class="mx-auto max-w-3xl px-4">
			<div class="section-badge mb-4">📚 NERDC-Aligned Curriculum</div>
			<h1 class="text-foreground mb-4 text-4xl font-black tracking-tight md:text-5xl">
				Full <span class="shimmer-text">JSS & SSS</span> Curriculum
			</h1>
			<p class="text-muted-foreground mb-8 text-lg leading-relaxed">
				Every question is grounded in the official Nigerian secondary school curriculum. All {totalSubjects}+ subjects, {totalJSSTopics + totalSSSTopics}+ topics — JAMB, WAEC, NECO, NABTEB and Post-UTME.
			</p>

			<!-- Stats row -->
			<div class="mx-auto mb-8 grid max-w-lg grid-cols-3 gap-4">
				{#each [
					{ value: totalSubjects + '+', label: 'Subjects' },
					{ value: (totalJSSTopics + totalSSSTopics) + '+', label: 'Topics' },
					{ value: '6', label: 'Exam Types' }
				] as stat}
					<div class="glass-panel p-4">
						<div class="text-2xl font-black text-[hsl(var(--primary))]">{stat.value}</div>
						<div class="text-muted-foreground text-xs font-medium">{stat.label}</div>
					</div>
				{/each}
			</div>

			<!-- Search -->
			<div class="relative mx-auto max-w-md">
				<Search class="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
				<input
					bind:value={searchQuery}
					type="search"
					placeholder="Search subjects or topics..."
					class="input-field pl-11 pr-4"
					id="curriculum-search"
				/>
			</div>
		</div>
	</div>

	<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

		<!-- ── EXAM COVERAGE CARDS ─────────────────────────────────── -->
		<div class="mb-16">
			<h2 class="text-foreground mb-6 text-xl font-black">Supported Examinations</h2>
			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each Object.entries(EXAMINATIONS) as [examName, exam]}
					<div class="glass-panel card-hover p-5">
						<div class="mb-3 flex items-start gap-4">
							<div
								class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
								style="background:{exam.color}14; border:1px solid {exam.color}30"
							>
								<GraduationCap class="h-6 w-6" style="color:{exam.color}" />
							</div>
							<div class="min-w-0">
								<h3 class="text-foreground mb-0.5 text-sm font-black">{examName}</h3>
								<p class="text-muted-foreground text-xs leading-relaxed">{exam.shortDesc}</p>
							</div>
						</div>
						<div class="flex flex-wrap items-center gap-2 text-xs">
							<span class="rounded-lg px-2.5 py-1 font-bold" style="background:{exam.color}12; color:{exam.color}">
								{exam.subjects} subjects
							</span>
							<span class="text-muted-foreground">{exam.format}</span>
							<span class="text-muted-foreground">·</span>
							<a
								href="/exam"
								class="font-bold text-[hsl(var(--primary))] hover:underline"
							>Practice now →</a>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- ── LEVEL FILTER TABS ──────────────────────────────────── -->
		<div class="mb-8 flex flex-wrap gap-2">
			{#each [
				{ id: 'all', label: '🌟 All Levels' },
				{ id: 'JSS', label: '👶 Junior Secondary (JSS1–JSS3)' },
				{ id: 'SSS', label: '🎓 Senior Secondary (SS1–SS3)' }
			] as tab}
				<button
					onclick={() => { activeLevel = tab.id as any; }}
					class="rounded-xl border px-5 py-2.5 text-sm font-bold transition-all {
						activeLevel === tab.id
							? 'border-[hsl(var(--primary)/0.4)] bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))]'
							: 'border-border text-muted-foreground hover:border-[hsl(var(--primary)/0.3)] hover:text-foreground'
					}"
				>
					{tab.label}
				</button>
			{/each}
		</div>

		{#if searchQuery && filteredJSS.length === 0 && filteredSSS.length === 0}
			<div class="glass-panel p-12 text-center">
				<Search class="mx-auto mb-3 h-10 w-10 text-[hsl(var(--muted-foreground))]" />
				<p class="text-foreground font-bold">No results for "{searchQuery}"</p>
				<p class="text-muted-foreground text-sm">Try a different subject or topic name.</p>
			</div>
		{/if}

		<!-- ── JSS CURRICULUM ─────────────────────────────────────── -->
		{#if (activeLevel === 'all' || activeLevel === 'JSS') && (filteredJSS.length > 0 || !searchQuery)}
			<div class="mb-12">
				<div class="mb-6 flex items-center gap-3">
					<div class="section-badge">👶 Junior Secondary School (JSS1–JSS3)</div>
					<div class="bg-border h-px flex-1"></div>
					<span class="text-muted-foreground text-xs font-medium">{Object.keys(CURRICULUM.JSS).length} subjects · {totalJSSTopics} topics</span>
				</div>

				<div class="space-y-2">
					{#each filteredJSS as item}
						<div class="glass-panel overflow-hidden">
							<button
								onclick={() => toggle(`jss-${item.name}`)}
								class="hover:bg-muted/40 flex w-full items-center justify-between p-5 text-left transition-colors"
								id="jss-{item.name.replace(/\s+/g,'-').toLowerCase()}"
								aria-expanded={openSection === `jss-${item.name}`}
							>
								<div class="flex items-center gap-3">
									<span class="text-xl">{subjectIcon[item.name] ?? '📌'}</span>
									<div>
										<span class="text-foreground font-bold">{item.name}</span>
										<span class="text-muted-foreground ml-2 text-xs">
											{item.topics.length} topics
										</span>
									</div>
								</div>
								<ChevronDown
									class="text-muted-foreground h-5 w-5 transition-transform {openSection === `jss-${item.name}` ? 'rotate-180' : ''}"
								/>
							</button>
							{#if openSection === `jss-${item.name}`}
								<div class="border-border border-t px-5 pb-5 pt-3">
									<div class="flex flex-wrap gap-2">
										{#each item.topics as topic}
											<span
												class="rounded-xl bg-[hsl(var(--primary)/0.08)] px-3 py-1.5 text-xs font-semibold text-[hsl(var(--primary))]
												{searchQuery && topic.toLowerCase().includes(searchQuery.toLowerCase()) ? 'ring-2 ring-[hsl(var(--primary)/0.4)]' : ''}"
											>
												{topic}
											</span>
										{/each}
									</div>
									<a
										href="/exam"
										class="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[hsl(var(--primary))] hover:underline"
									>
										<Brain class="h-3.5 w-3.5" /> Practice {item.name} questions →
									</a>
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		{/if}

		<!-- ── SSS CURRICULUM ─────────────────────────────────────── -->
		{#if (activeLevel === 'all' || activeLevel === 'SSS') && (filteredSSS.length > 0 || !searchQuery)}
			<div class="mb-16">
				<div class="mb-6 flex items-center gap-3">
					<div class="section-badge">🎓 Senior Secondary School (SS1–SS3)</div>
					<div class="bg-border h-px flex-1"></div>
					<span class="text-muted-foreground text-xs font-medium">{Object.keys(CURRICULUM.SSS).length} subjects · {totalSSSTopics} topics</span>
				</div>

				<div class="space-y-2">
					{#each filteredSSS as item}
						<div class="glass-panel overflow-hidden">
							<button
								onclick={() => toggle(`sss-${item.name}`)}
								class="hover:bg-muted/40 flex w-full items-center justify-between p-5 text-left transition-colors"
								id="sss-{item.name.replace(/\s+/g,'-').toLowerCase()}"
								aria-expanded={openSection === `sss-${item.name}`}
							>
								<div class="flex items-center gap-3">
									<span class="text-xl">{subjectIcon[item.name] ?? '📌'}</span>
									<div>
										<span class="text-foreground font-bold">{item.name}</span>
										<span class="text-muted-foreground ml-2 text-xs">
											{item.topics.length} topics
										</span>
									</div>
								</div>
								<ChevronDown
									class="text-muted-foreground h-5 w-5 transition-transform {openSection === `sss-${item.name}` ? 'rotate-180' : ''}"
								/>
							</button>
							{#if openSection === `sss-${item.name}`}
								<div class="border-border border-t px-5 pb-5 pt-3">
									<div class="flex flex-wrap gap-2">
										{#each item.topics as topic}
											<span
												class="rounded-xl bg-[hsl(var(--accent)/0.08)] px-3 py-1.5 text-xs font-semibold text-[hsl(var(--accent)/0.8)]
												{searchQuery && topic.toLowerCase().includes(searchQuery.toLowerCase()) ? 'ring-2 ring-[hsl(var(--accent)/0.5)]' : ''}"
											>
												{topic}
											</span>
										{/each}
									</div>
									<a
										href="/exam"
										class="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[hsl(var(--primary))] hover:underline"
									>
										<Brain class="h-3.5 w-3.5" /> Practice {item.name} questions →
									</a>
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		{/if}

		<!-- ── CTA ──────────────────────────────────────────────────── -->
		<div class="glass-panel border-t-2 border-t-[hsl(var(--primary)/0.3)] p-8 text-center">
			<Target class="mx-auto mb-4 h-10 w-10 text-[hsl(var(--primary))]" />
			<h2 class="text-foreground mb-3 text-2xl font-black">Ready to Practice?</h2>
			<p class="text-muted-foreground mx-auto mb-6 max-w-md">
				Access curriculum-verified questions across all subjects and exam types. AI-powered explanations for every question.
			</p>
			<div class="flex flex-col items-center justify-center gap-3 sm:flex-row">
				<a href="/exam" class="btn-primary rounded-2xl px-8 py-4 text-base">
					Start CBT Session <ArrowRight class="ml-1 h-5 w-5" />
				</a>
				<a href="/pricing" class="btn-outline rounded-2xl px-8 py-4 text-base">
					View Pricing Plans
				</a>
			</div>
		</div>
	</div>
</div>
