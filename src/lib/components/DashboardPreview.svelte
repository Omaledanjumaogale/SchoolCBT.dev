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

<section id="student-dashboard" class="py-24 sm:py-32 bg-mesh relative overflow-hidden">
	<!-- Decorative background -->
	<div class="absolute inset-0 pointer-events-none opacity-20">
		<div class="orb orb-blue top-[20%] right-[-10%] w-96 h-96"></div>
		<div class="orb orb-green bottom-[20%] left-[-10%] w-80 h-80"></div>
	</div>

	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
		<div class="text-center mb-16 sm:mb-24">
			<div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-jade/10 border border-jade/20 text-jade text-xs font-bold uppercase tracking-widest mb-6">
				<span>📊</span> Student Dashboard
			</div>
			<h2 class="font-sora text-4xl sm:text-5xl lg:text-6xl font-900 text-white mt-3 mb-6 tracking-tight">
				Your Personalized <span class="text-gold">Results Hub</span> 🎯
			</h2>
			<p class="text-white/50 max-w-2xl mx-auto text-lg sm:text-xl leading-relaxed">
				A complete performance ecosystem showing your exam readiness, study progress, and AI-powered
				insights in real time. 🚀
			</p>
		</div>

		<!-- Dashboard Interface -->
		<div class="glass-card p-4 sm:p-8 lg:p-12 relative overflow-hidden group">
			<div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold via-jade to-gold"></div>
			
			<!-- Dashboard Tabs -->
			<div class="flex flex-wrap gap-2 sm:gap-4 mb-12 border-b border-white/05 pb-8 overflow-x-auto no-scrollbar">
				{#each ['overview', 'analytics', 'study', 'reports', 'tutors'] as tab}
					<button
						class="px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center gap-2 whitespace-nowrap
							{activeTab === tab 
								? 'bg-gold/10 text-gold border border-gold/30 shadow-lg shadow-gold/10' 
								: 'text-white/40 hover:text-white hover:bg-white/05'}"
						onclick={() => (activeTab = tab)}
					>
						<span>
							{tab === 'overview' ? '📊' : tab === 'analytics' ? '📈' : tab === 'study' ? '📖' : tab === 'reports' ? '📋' : '👨‍🏫'}
						</span>
						<span class="capitalize">{tab}</span>
					</button>
				{/each}
			</div>

			{#if activeTab === 'overview'}
				<div in:fade={{ duration: 400 }}>
					<!-- Quick Stats Grid -->
					<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
						{#each stats as stat}
							<div class="glass-card p-6 sm:p-8 text-center transition-all hover:border-white/20 hover:-translate-y-1 group/stat">
								<div class="text-[10px] text-white/40 mb-3 font-black uppercase tracking-[0.2em]">
									{stat.label}
								</div>
								<div class="text-3xl sm:text-4xl font-sora font-900 text-white mb-4 group-hover/stat:text-gold transition-colors">{stat.val}</div>
								<div class="inline-flex px-3 py-1 rounded-lg {stat.color === 'blue' ? 'bg-cobalt-light/10 text-cobalt-light border-cobalt-light/20' : stat.color === 'gold' ? 'bg-gold/10 text-gold border-gold/20' : 'bg-jade/10 text-jade border-jade/20'} border text-[10px] font-black uppercase tracking-wider">
									{stat.badge}
								</div>
							</div>
						{/each}
					</div>

					<div class="grid lg:grid-cols-3 gap-6 sm:gap-8">
						<!-- Predictive Analysis Card -->
						<div class="lg:col-span-2 glass-card p-8 sm:p-10 relative overflow-hidden">
							<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
								<h3 class="text-white font-sora font-800 text-xl sm:text-2xl flex items-center gap-3">
									<span class="text-2xl">📈</span> Predictive Pass Analysis
								</h3>
								<div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] font-black uppercase tracking-widest">
									<span class="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></span>
									AI Powered
								</div>
							</div>
							<div class="space-y-8">
								{#each predictive as item}
									<div class="group/bar">
										<div class="flex justify-between text-sm font-bold mb-3">
											<span class="text-white/60 group-hover/bar:text-white transition-colors">{item.name}</span>
											<span class="text-{item.color} font-bold">{item.prob}%</span>
										</div>
										<div class="h-2.5 w-full bg-white/05 rounded-full overflow-hidden border border-white/05">
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
						<div class="glass-card p-8 sm:p-10">
							<h3 class="text-white font-sora font-800 text-xl sm:text-2xl mb-10 flex items-center gap-3">
								<span class="text-2xl">🏆</span> Recent Awards
							</h3>
							<div class="space-y-4">
								{#each awards as award}
									<div class="flex items-center gap-5 p-5 rounded-2xl bg-white/03 border border-white/05 hover:bg-white/05 transition-all group/award">
										<div class="w-14 h-14 rounded-2xl bg-cobalt/40 flex items-center justify-center text-3xl group-hover/award:scale-110 group-hover/award:rotate-3 transition-transform">
											{award.emoji}
										</div>
										<div class="flex-grow">
											<div class="text-white font-bold text-sm mb-1">{award.title}</div>
											<div class="text-white/40 text-[10px] font-medium uppercase tracking-wider">{award.meta}</div>
										</div>
										<div class="text-gold font-black text-sm">{award.val}</div>
									</div>
								{/each}
							</div>
							<button class="w-full mt-8 py-4 rounded-xl bg-white/05 border border-white/10 text-white/60 text-xs font-black uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all">
								View Trophy Room ➡️
							</button>
						</div>
					</div>
				</div>
			{:else}
				<div in:fade class="min-h-[400px] flex flex-col items-center justify-center text-center p-12">
					<div class="text-7xl mb-8 animate-bounce">🚧</div>
					<h3 class="text-white font-sora font-900 text-3xl mb-4">Module Under Construction</h3>
					<p class="text-white/40 text-lg max-w-md">
						The full <span class="text-gold capitalize">{activeTab}</span> interface is being integrated with real-time Convex data. 🤖⚡
					</p>
					<button 
						onclick={() => activeTab = 'overview'}
						class="mt-10 btn-gold px-10 py-4 font-black uppercase tracking-widest"
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
	.text-jade { color: #50c878; }
	.text-gold { color: #ffd700; }
	.text-scarlet { color: #dc3545; }
	.bg-jade { background-color: #50c878; }
	.bg-gold { background-color: #ffd700; }
	.bg-scarlet { background-color: #dc3545; }
	.from-jade { --tw-gradient-from: #50c878; --tw-gradient-to: rgb(80 200 120 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
	.from-gold { --tw-gradient-from: #ffd700; --tw-gradient-to: rgb(255 215 0 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
	.from-scarlet { --tw-gradient-from: #dc3545; --tw-gradient-to: rgb(220 53 69 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
</style>
