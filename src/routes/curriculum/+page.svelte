<script lang="ts">
	import { BookOpen, GraduationCap, ArrowRight, ChevronDown } from 'lucide-svelte';

	let openSection = $state<string | null>(null);

	function toggle(id: string) {
		openSection = openSection === id ? null : id;
	}

	const jss = [
		{
			subject: 'Mathematics',
			topics: [
				'Number & Numeration',
				'Basic Algebra',
				'Geometry & Shapes',
				'Statistics',
				'Commercial Arithmetic'
			]
		},
		{
			subject: 'English Language',
			topics: ['Grammar & Comprehension', 'Vocabulary', 'Letter Writing', 'Essay Composition']
		},
		{
			subject: 'Basic Science',
			topics: ['Living & Non-living Things', 'Photosynthesis', 'Reproduction', 'Simple Machines']
		},
		{
			subject: 'Social Studies',
			topics: ['Citizenship', 'Government', 'Culture & Society', 'Economic Activities']
		}
	];

	const sss = [
		{
			subject: 'Mathematics',
			topics: [
				'Algebra',
				'Trigonometry',
				'Statistics & Probability',
				'Calculus (WAEC)',
				'Coordinate Geometry'
			]
		},
		{
			subject: 'Physics',
			topics: ['Mechanics', 'Waves & Sound', 'Electricity', 'Electromagnetism', 'Modern Physics']
		},
		{
			subject: 'Chemistry',
			topics: [
				'Atomic Structure',
				'Bonding',
				'Organic Chemistry',
				'Electrochemistry',
				'Equilibrium'
			]
		},
		{
			subject: 'Biology',
			topics: [
				'Cell Biology',
				'Genetics & Evolution',
				'Ecology',
				'Nutrition',
				'Reproduction in Plants & Animals'
			]
		},
		{
			subject: 'English Language',
			topics: ['Comprehension', 'Summary & Lexis', 'Oral English', 'Essay & Letter Writing']
		},
		{
			subject: 'Economics',
			topics: ['Demand & Supply', 'Market Structures', 'National Income', 'International Trade']
		},
		{
			subject: 'Government',
			topics: [
				'Constitution',
				'Legislature & Executive',
				'Federalism',
				'International Organizations'
			]
		},
		{
			subject: 'Literature-in-English',
			topics: ['Poetry', 'Drama', 'Prose', 'African & World Literature']
		}
	];

	const exams = [
		{
			name: 'JAMB (UTME)',
			desc: 'Joint Admissions & Matriculation Board — University entry examination',
			subjects: 4,
			color: 'hsl(145,100%,39%)'
		},
		{
			name: 'WAEC',
			desc: 'West African Examinations Council — O-Level certification',
			subjects: 9,
			color: 'hsl(var(--accent))'
		},
		{
			name: 'NECO',
			desc: 'National Examinations Council — SSS3 certificate examination',
			subjects: 9,
			color: 'hsl(174,60%,28%)'
		},
		{
			name: 'NABTEB',
			desc: 'National Business & Technical Examinations Board',
			subjects: 8,
			color: 'hsl(262,80%,60%)'
		},
		{
			name: 'Post-UTME',
			desc: 'University supplementary screening exams across Nigeria',
			subjects: 5,
			color: 'hsl(210,80%,55%)'
		}
	];
</script>

<svelte:head>
	<title>Curriculum Coverage – SchoolCBT | JAMB, WAEC, NECO, NABTEB</title>
	<meta
		name="description"
		content="SchoolCBT covers the full Nigerian NERDC curriculum for JSS and SSS — JAMB, WAEC, NECO, NABTEB and Post-UTME."
	/>
</svelte:head>

<div class="bg-background min-h-[calc(100vh-64px)] py-16">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- Header -->
		<div class="mx-auto mb-16 max-w-3xl text-center">
			<div class="section-badge mb-4">NERDC-Aligned Curriculum</div>
			<h1 class="text-foreground mb-4 text-4xl font-black tracking-tight">
				Full <span class="shimmer-text">JSS & SSS</span> Curriculum Coverage
			</h1>
			<p class="text-muted-foreground text-lg">
				Every question verified against official NERDC syllabuses. 99.1% curriculum-grounding
				accuracy across all supported exams.
			</p>
		</div>

		<!-- Exam Coverage -->
		<div class="mb-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
			{#each exams as exam}
				<div class="glass-panel card-hover p-6">
					<div class="mb-4 flex items-start gap-4">
						<div
							class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
							style="background:{exam.color}12; border:1px solid {exam.color}33"
						>
							<GraduationCap class="h-6 w-6" style="color:{exam.color}" />
						</div>
						<div>
							<h3 class="text-foreground text-base font-black">{exam.name}</h3>
							<p class="text-muted-foreground mt-0.5 text-xs leading-relaxed">{exam.desc}</p>
						</div>
					</div>
					<div class="flex items-center justify-between">
						<span
							class="rounded-lg px-2.5 py-1 text-xs font-bold"
							style="background:{exam.color}12; color:{exam.color}"
							>{exam.subjects} subjects covered</span
						>
						<a
							href="/auth/signup"
							class="text-xs font-bold hover:underline"
							style="color:{exam.color}">Practice now →</a
						>
					</div>
				</div>
			{/each}
		</div>

		<!-- Accordion: JSS -->
		<div class="mb-10">
			<div class="mb-6 flex items-center gap-3">
				<div class="section-badge">Junior Secondary (JSS)</div>
				<div class="bg-border h-px flex-1"></div>
			</div>
			<div class="space-y-3">
				{#each jss as item}
					<div class="glass-panel overflow-hidden">
						<button
							onclick={() => toggle(`jss-${item.subject}`)}
							class="hover:bg-muted/40 flex w-full items-center justify-between p-5 text-left transition-colors"
						>
							<div class="flex items-center gap-3">
								<BookOpen class="h-5 w-5 shrink-0 text-[hsl(var(--primary))]" />
								<span class="text-foreground font-bold">{item.subject}</span>
							</div>
							<ChevronDown
								class="text-muted-foreground h-5 w-5 transition-transform {openSection ===
								`jss-${item.subject}`
									? 'rotate-180'
									: ''}"
							/>
						</button>
						{#if openSection === `jss-${item.subject}`}
							<div class="border-border border-t px-5 pt-1 pb-5">
								<div class="mt-3 flex flex-wrap gap-2">
									{#each item.topics as topic}
										<span
											class="rounded-xl bg-[hsl(var(--primary)/0.08)] px-3 py-1.5 text-xs font-semibold text-[hsl(var(--primary))]"
											>{topic}</span
										>
									{/each}
								</div>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>

		<!-- Accordion: SSS -->
		<div class="mb-16">
			<div class="mb-6 flex items-center gap-3">
				<div class="section-badge">Senior Secondary (SSS)</div>
				<div class="bg-border h-px flex-1"></div>
			</div>
			<div class="space-y-3">
				{#each sss as item}
					<div class="glass-panel overflow-hidden">
						<button
							onclick={() => toggle(`sss-${item.subject}`)}
							class="hover:bg-muted/40 flex w-full items-center justify-between p-5 text-left transition-colors"
						>
							<div class="flex items-center gap-3">
								<BookOpen class="h-5 w-5 shrink-0 text-[hsl(var(--primary))]" />
								<span class="text-foreground font-bold">{item.subject}</span>
							</div>
							<ChevronDown
								class="text-muted-foreground h-5 w-5 transition-transform {openSection ===
								`sss-${item.subject}`
									? 'rotate-180'
									: ''}"
							/>
						</button>
						{#if openSection === `sss-${item.subject}`}
							<div class="border-border border-t px-5 pt-1 pb-5">
								<div class="mt-3 flex flex-wrap gap-2">
									{#each item.topics as topic}
										<span
											class="rounded-xl bg-[hsl(var(--primary)/0.08)] px-3 py-1.5 text-xs font-semibold text-[hsl(var(--primary))]"
											>{topic}</span
										>
									{/each}
								</div>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>

		<!-- CTA -->
		<div class="glass-panel border-t-2 border-t-[hsl(var(--primary)/0.3)] p-8 text-center">
			<h2 class="text-foreground mb-3 text-2xl font-black">Ready to practice?</h2>
			<p class="text-muted-foreground mb-6">
				Access 1.2M+ curriculum-verified questions across all subjects and exam types.
			</p>
			<a href="/auth/signup" class="btn-primary inline-flex rounded-2xl px-8 py-4 text-base">
				Start Free Today <ArrowRight class="ml-1 h-5 w-5" />
			</a>
		</div>
	</div>
</div>
