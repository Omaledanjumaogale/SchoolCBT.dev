<script lang="ts">
	import { fade, slide } from 'svelte/transition';

	let activeTab = $state('overview');

	const stats = [
		{ label: 'TIME SPENT', val: '42h 18m', badge: '↑ 6h this week', color: 'blue' },
		{ label: 'QUESTIONS', val: '1,850', badge: '73% correct', color: 'gold' },
		{ label: 'BATCHES', val: '37', badge: '12 with ≥75%', color: 'blue' },
		{ label: 'PASS PROB.', val: '87%', badge: '↑ 4% this month', color: 'jade' }
	];

	const predictive = [
		{ name: 'Mathematics', prob: 91, color: 'jade' },
		{ name: 'English Language', prob: 88, color: 'jade' },
		{ name: 'Physics', prob: 74, color: 'gold' },
		{ name: 'Chemistry', prob: 61, color: 'scarlet' },
		{ name: 'Biology', prob: 82, color: 'jade' }
	];

	const awards = [
		{ emoji: '🏆', title: 'Top Performer', meta: 'Maths Batch #12', val: '100%' },
		{ emoji: '⭐', title: '5-Star Batch', meta: 'English Batch #8', val: '92%' },
		{ emoji: '🎯', title: 'Streak Master', meta: '7-day streak', val: 'Active' }
	];
</script>

<section id="student-dashboard" class="bg-mesh relative overflow-hidden py-24 sm:py-32">
	<!-- Decorative background -->
	<div class="pointer-events-none absolute inset-0 opacity-20">
		<div class="orb orb-blue top-[20%] right-[-10%] h-96 w-96"></div>
		<div class="orb orb-green bottom-[20%] left-[-10%] h-80 w-80"></div>
	</div>

	<div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center sm:mb-24">
			<div
				class="bg-jade/10 border-jade/20 text-jade mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold tracking-widest uppercase"
			>
				<span>📊</span> Student Dashboard
			</div>
			<h2
				class="font-sora font-900 mt-3 mb-6 text-4xl tracking-tight text-white sm:text-5xl lg:text-6xl"
			>
				Your Personalized <span class="text-gold">Results Hub</span> 🎯
			</h2>
			<p class="mx-auto max-w-2xl text-lg leading-relaxed text-white/50 sm:text-xl">
				A complete performance ecosystem showing your exam readiness, study progress, and AI-powered
				insights in real time. 🚀
			</p>
		</div>

		<!-- Dashboard Interface -->
		<div class="glass-card group relative overflow-hidden p-4 sm:p-8 lg:p-12">
			<div
				class="from-gold via-jade to-gold absolute top-0 left-0 h-1 w-full bg-gradient-to-r"
			></div>

			<!-- Dashboard Tabs -->
			<div
				class="border-white/05 no-scrollbar mb-8 flex flex-wrap gap-2 overflow-x-auto border-b pb-6 sm:mb-12 sm:gap-4 sm:pb-8"
			>
				{#each ['overview', 'analytics', 'study', 'reports', 'tutors'] as tab}
					<button
						class="flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold whitespace-nowrap transition-all duration-300
							{activeTab === tab
							? 'bg-gold/10 text-gold border-gold/30 shadow-gold/10 border shadow-lg'
							: 'hover:bg-white/05 text-white/40 hover:text-white'}"
						onclick={() => (activeTab = tab)}
					>
						<span>
							{tab === 'overview'
								? '📊'
								: tab === 'analytics'
									? '📈'
									: tab === 'study'
										? '📖'
										: tab === 'reports'
											? '📋'
											: '👨‍🏫'}
						</span>
						<span class="capitalize">{tab}</span>
					</button>
				{/each}
			</div>

			{#if activeTab === 'overview'}
				<div in:fade={{ duration: 400 }}>
					<!-- Quick Stats Grid -->
					<div class="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
						{#each stats as stat}
							<div
								class="glass-card group/stat p-6 text-center transition-all hover:-translate-y-1 hover:border-white/20 sm:p-8"
							>
								<div class="mb-3 text-[10px] font-black tracking-[0.2em] text-white/40 uppercase">
									{stat.label}
								</div>
								<div
									class="font-sora font-900 group-hover/stat:text-gold mb-4 text-3xl text-white transition-colors sm:text-4xl"
								>
									{stat.val}
								</div>
								<div
									class="inline-flex rounded-lg px-3 py-1 {stat.color === 'blue'
										? 'bg-cobalt-light/10 text-cobalt-light border-cobalt-light/20'
										: stat.color === 'gold'
											? 'bg-gold/10 text-gold border-gold/20'
											: 'bg-jade/10 text-jade border-jade/20'} border text-[10px] font-black tracking-wider uppercase"
								>
									{stat.badge}
								</div>
							</div>
						{/each}
					</div>

					<div class="grid gap-6 sm:gap-8 lg:grid-cols-3">
						<!-- Predictive Analysis Card -->
						<div class="glass-card relative overflow-hidden p-6 sm:p-8 lg:col-span-2 lg:p-10">
							<div
								class="mb-10 flex flex-col justify-between gap-4 sm:mb-12 sm:flex-row sm:items-center"
							>
								<h3
									class="font-sora font-800 flex items-center gap-3 text-xl text-white sm:text-2xl"
								>
									<span class="text-2xl">📈</span> Predictive Pass Analysis
								</h3>
								<div
									class="bg-gold/10 border-gold/20 text-gold inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-black tracking-widest uppercase"
								>
									<span class="bg-gold h-1.5 w-1.5 animate-pulse rounded-full"></span>
									AI Powered
								</div>
							</div>
							<div class="space-y-6 sm:space-y-8">
								{#each predictive as item}
									<div class="group/bar">
										<div class="mb-3 flex justify-between text-sm font-bold">
											<span class="text-white/60 transition-colors group-hover/bar:text-white"
												>{item.name}</span
											>
											<span class="text-{item.color} font-bold">{item.prob}%</span>
										</div>
										<div
											class="bg-white/05 border-white/05 h-2.5 w-full overflow-hidden rounded-full border"
										>
											<div
												class="h-full bg-{item.color} rounded-full transition-all duration-1000 ease-out"
												style="width:{item.prob}%"
											></div>
										</div>
									</div>
								{/each}
							</div>
						</div>

						<!-- Recent Awards Card -->
						<div class="glass-card p-6 sm:p-8 lg:p-10">
							<h3
								class="font-sora font-800 mb-8 flex items-center gap-3 text-xl text-white sm:mb-10 sm:text-2xl"
							>
								<span class="text-2xl">🏆</span> Recent Awards
							</h3>
							<div class="space-y-4">
								{#each awards as award}
									<div
										class="bg-white/03 border-white/05 hover:bg-white/05 group/award flex items-center gap-5 rounded-2xl border p-4 transition-all sm:p-5"
									>
										<div
											class="bg-cobalt/40 flex h-12 w-12 items-center justify-center rounded-2xl text-2xl transition-transform group-hover/award:scale-110 group-hover/award:rotate-3 sm:h-14 sm:w-14 sm:text-3xl"
										>
											{award.emoji}
										</div>
										<div class="flex-grow">
											<div class="mb-1 text-sm font-bold text-white">{award.title}</div>
											<div class="text-[10px] font-medium tracking-wider text-white/40 uppercase">
												{award.meta}
											</div>
										</div>
										<div class="text-gold text-sm font-black">{award.val}</div>
									</div>
								{/each}
							</div>
							<button
								class="bg-white/05 mt-8 w-full rounded-xl border border-white/10 py-4 text-xs font-black tracking-widest text-white/60 uppercase transition-all hover:bg-white/10 hover:text-white"
							>
								View Trophy Room ➡️
							</button>
						</div>
					</div>
				</div>
			{:else}
				<div
					in:fade
					class="flex min-h-[400px] flex-col items-center justify-center p-12 text-center"
				>
					<div class="mb-8 animate-bounce text-7xl">🚧</div>
					<h3 class="font-sora font-900 mb-4 text-3xl text-white">Module Under Construction</h3>
					<p class="max-w-md text-lg text-white/40">
						The full <span class="text-gold capitalize">{activeTab}</span> interface is being integrated
						with real-time Convex data. 🤖⚡
					</p>
					<button
						onclick={() => (activeTab = 'overview')}
						class="btn-gold mt-10 px-10 py-4 font-black tracking-widest uppercase"
					>
						🔙 Back to Overview
					</button>
				</div>
			{/if}
		</div>
	</div>
</section>

<style>
	/* Force dynamic colors to work with Tailwind */
	.text-jade {
		color: #50c878;
	}
	.text-gold {
		color: #ffd700;
	}
	.text-scarlet {
		color: #dc3545;
	}
	.bg-jade {
		background-color: #50c878;
	}
	.bg-gold {
		background-color: #ffd700;
	}
	.bg-scarlet {
		background-color: #dc3545;
	}
	.from-jade {
		--tw-gradient-from: #50c878;
		--tw-gradient-to: rgb(80 200 120 / 0);
		--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
	}
	.from-gold {
		--tw-gradient-from: #ffd700;
		--tw-gradient-to: rgb(255 215 0 / 0);
		--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
	}
	.from-scarlet {
		--tw-gradient-from: #dc3545;
		--tw-gradient-to: rgb(220 53 69 / 0);
		--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
	}
</style>
