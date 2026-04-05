<script lang="ts">
	import { slide } from 'svelte/transition';

	const curriculum = {
		jss: {
			label: 'Junior Secondary School (JSS1 – JSS3)',
			pill: 'JSS',
			subjects: [
				{ name: 'English Language', icon: '📖', topics: 12 },
				{ name: 'Mathematics', icon: '🔢', topics: 15 },
				{ name: 'Basic Science', icon: '🔬', topics: 10 },
				{ name: 'Social Studies', icon: '🌍', topics: 8 },
				{ name: 'Civic Education', icon: '🏛️', topics: 6 },
				{ name: 'Yoruba Language', icon: '🗣️', topics: 5 },
				{ name: 'Hausa Language', icon: '🗣️', topics: 5 },
				{ name: 'Igbo Language', icon: '🗣️', topics: 5 }
			]
		},
		sss: {
			label: 'Senior Secondary School (SS1 – SS3)',
			pill: 'SSS',
			subjects: [
				{ name: 'English Language', icon: '📖', topics: 18 },
				{ name: 'Mathematics', icon: '🔢', topics: 22 },
				{ name: 'Physics', icon: '⚛️', topics: 14 },
				{ name: 'Chemistry', icon: '🧪', topics: 16 },
				{ name: 'Biology', icon: '🧬', topics: 15 },
				{ name: 'Economics', icon: '📊', topics: 12 },
				{ name: 'Government', icon: '🏛️', topics: 10 },
				{ name: 'Geography', icon: '🗺️', topics: 9 }
			]
		}
	};

	let activeLevel = $state('all');
</script>

<section id="curriculum" class="bg-cobalt-xdark/30 relative overflow-hidden py-24 sm:py-32">
	<!-- Background Effects -->
	<div
		class="bg-cobalt-light/05 absolute top-0 right-0 h-[600px] w-[600px] translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
	></div>
	<div
		class="bg-jade/05 absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/2 translate-y-1/2 rounded-full blur-[100px]"
	></div>

	<div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center sm:mb-20">
			<div
				class="bg-jade/10 border-jade/20 text-jade mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold tracking-widest uppercase"
			>
				<span>📚</span> Nigerian Curriculum
			</div>
			<h2
				class="font-sora font-900 mt-3 mb-6 text-4xl tracking-tight text-white sm:text-5xl lg:text-6xl"
			>
				Full <span class="text-gold">JSS & SSS</span> Coverage 🇳🇬
			</h2>
			<p class="mx-auto max-w-2xl text-lg leading-relaxed text-white/50 sm:text-xl">
				Questions grounded in the official Nigerian secondary school curriculum across all subjects,
				levels, and exam bodies (WAEC, NECO, JAMB).
			</p>
		</div>

		<!-- Level Selection Tabs -->
		<div class="mb-16 flex flex-wrap justify-center gap-3 sm:gap-4">
			{#each [{ id: 'all', label: '🌟 All Levels' }, { id: 'jss', label: '👶 JSS (JS1–JS3)' }, { id: 'sss', label: '🎓 SSS (SS1–SS3)' }] as tab}
				<button
					class="rounded-2xl border px-6 py-3.5 text-sm font-bold transition-all duration-300 {activeLevel ===
					tab.id
						? 'bg-gold/10 border-gold/40 text-gold shadow-gold/10 scale-105 shadow-lg'
						: 'bg-white/05 border-white/10 text-white/50 hover:bg-white/10 hover:text-white'}"
					onclick={() => (activeLevel = tab.id)}
				>
					{tab.label}
				</button>
			{/each}
		</div>

		<!-- Curriculum Content -->
		<div class="space-y-16 sm:space-y-24">
			{#if activeLevel === 'all' || activeLevel === 'jss'}
				<div transition:slide={{ duration: 500 }}>
					<div class="mb-8 flex items-center gap-4">
						<div
							class="h-px flex-grow bg-gradient-to-r from-transparent via-white/10 to-transparent"
						></div>
						<span
							class="bg-cobalt-light/20 rounded-full border border-white/10 px-5 py-2 text-sm font-black tracking-[0.2em] text-white/80 uppercase shadow-xl"
						>
							👶 Junior Secondary (JS1–JS3)
						</span>
						<div
							class="h-px flex-grow bg-gradient-to-r from-transparent via-white/10 to-transparent"
						></div>
					</div>
					<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
						{#each curriculum.jss.subjects as subject}
							<div
								class="glass-card hover:border-jade/40 hover:bg-white/07 group flex cursor-pointer items-center gap-4 p-4 transition-all hover:-translate-y-1 sm:gap-5 sm:p-6"
							>
								<div
									class="bg-cobalt/40 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 text-2xl shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3 sm:h-14 sm:w-14 sm:text-3xl"
								>
									{subject.icon}
								</div>
								<div class="flex min-w-0 flex-col">
									<div
										class="font-sora font-800 group-hover:text-gold mb-1 truncate text-sm leading-tight text-white transition-colors sm:text-base"
									>
										{subject.name}
									</div>
									<div
										class="text-[9px] font-bold tracking-widest text-white/40 uppercase sm:text-[10px]"
									>
										{subject.topics} topics covered
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}

			{#if activeLevel === 'all' || activeLevel === 'sss'}
				<div transition:slide={{ duration: 500 }}>
					<div class="mb-8 flex items-center gap-4">
						<div
							class="h-px flex-grow bg-gradient-to-r from-transparent via-white/10 to-transparent"
						></div>
						<span
							class="bg-jade/20 rounded-full border border-white/10 px-5 py-2 text-sm font-black tracking-[0.2em] text-white/80 uppercase shadow-xl"
						>
							🎓 Senior Secondary (SS1–SS3)
						</span>
						<div
							class="h-px flex-grow bg-gradient-to-r from-transparent via-white/10 to-transparent"
						></div>
					</div>
					<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
						{#each curriculum.sss.subjects as subject}
							<div
								class="glass-card hover:border-gold/40 hover:bg-white/07 group flex cursor-pointer items-center gap-4 p-4 transition-all hover:-translate-y-1 sm:gap-5 sm:p-6"
							>
								<div
									class="bg-cobalt/40 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 text-2xl shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3 sm:h-14 sm:w-14 sm:text-3xl"
								>
									{subject.icon}
								</div>
								<div class="flex min-w-0 flex-col">
									<div
										class="font-sora font-800 group-hover:text-gold mb-1 truncate text-sm leading-tight text-white transition-colors sm:text-base"
									>
										{subject.name}
									</div>
									<div
										class="text-[9px] font-bold tracking-widest text-white/40 uppercase sm:text-[10px]"
									>
										{subject.topics} topics covered
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>
</section>
