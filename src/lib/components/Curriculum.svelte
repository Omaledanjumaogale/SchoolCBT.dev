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

<section id="curriculum" class="py-24 sm:py-32 relative bg-cobalt-xdark/30 overflow-hidden">
	<!-- Background Effects -->
	<div class="absolute top-0 right-0 w-[600px] h-[600px] bg-cobalt-light/05 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
	<div class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-jade/05 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
		<div class="text-center mb-16 sm:mb-20">
			<div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-jade/10 border border-jade/20 text-jade text-xs font-bold uppercase tracking-widest mb-6">
				<span>📚</span> Nigerian Curriculum
			</div>
			<h2 class="font-sora text-4xl sm:text-5xl lg:text-6xl font-900 text-white mt-3 mb-6 tracking-tight">
				Full <span class="text-gold">JSS & SSS</span> Coverage 🇳🇬
			</h2>
			<p class="text-white/50 max-w-2xl mx-auto text-lg sm:text-xl leading-relaxed">
				Questions grounded in the official Nigerian secondary school curriculum across all subjects,
				levels, and exam bodies (WAEC, NECO, JAMB).
			</p>
		</div>

		<!-- Level Selection Tabs -->
		<div class="flex flex-wrap justify-center gap-3 sm:gap-4 mb-16">
			{#each [{id: 'all', label: '🌟 All Levels'}, {id: 'jss', label: '👶 JSS (JS1–JS3)'}, {id: 'sss', label: '🎓 SSS (SS1–SS3)'}] as tab}
				<button
					class="px-6 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 border {activeLevel === tab.id 
						? 'bg-gold/10 border-gold/40 text-gold shadow-lg shadow-gold/10 scale-105' 
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
					<div class="flex items-center gap-4 mb-8">
						<div class="h-px flex-grow bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
						<span class="px-5 py-2 rounded-full bg-cobalt-light/20 border border-white/10 text-white/80 text-sm font-black uppercase tracking-[0.2em] shadow-xl">
							👶 Junior Secondary (JS1–JS3)
						</span>
						<div class="h-px flex-grow bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
					</div>
					<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
						{#each curriculum.jss.subjects as subject}
							<div class="glass-card p-6 flex items-center gap-5 hover:border-jade/40 hover:bg-white/07 transition-all group cursor-pointer hover:-translate-y-1">
								<div class="w-14 h-14 rounded-2xl bg-cobalt/40 border border-white/10 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-lg">
									{subject.icon}
								</div>
								<div class="flex flex-col">
									<div class="text-white font-sora font-800 text-base group-hover:text-gold transition-colors leading-tight mb-1">{subject.name}</div>
									<div class="text-white/40 text-[10px] font-bold uppercase tracking-widest">{subject.topics} topics covered</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}

			{#if activeLevel === 'all' || activeLevel === 'sss'}
				<div transition:slide={{ duration: 500 }}>
					<div class="flex items-center gap-4 mb-8">
						<div class="h-px flex-grow bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
						<span class="px-5 py-2 rounded-full bg-jade/20 border border-white/10 text-white/80 text-sm font-black uppercase tracking-[0.2em] shadow-xl">
							🎓 Senior Secondary (SS1–SS3)
						</span>
						<div class="h-px flex-grow bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
					</div>
					<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
						{#each curriculum.sss.subjects as subject}
							<div class="glass-card p-6 flex items-center gap-5 hover:border-gold/40 hover:bg-white/07 transition-all group cursor-pointer hover:-translate-y-1">
								<div class="w-14 h-14 rounded-2xl bg-cobalt/40 border border-white/10 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-lg">
									{subject.icon}
								</div>
								<div class="flex flex-col">
									<div class="text-white font-sora font-800 text-base group-hover:text-gold transition-colors leading-tight mb-1">{subject.name}</div>
									<div class="text-white/40 text-[10px] font-bold uppercase tracking-widest">{subject.topics} topics covered</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>
</section>
