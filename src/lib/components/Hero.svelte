<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});
</script>

<section
	id="home"
	class="bg-hero min-h-screen flex items-center relative overflow-hidden pt-16 sm:pt-20 lg:pt-24"
>
	<!-- Orbs -->
	<div class="orb orb-b w-64 h-64 sm:w-96 sm:h-96" style="top:-8%;left:-8%;"></div>
	<div
		class="orb orb-g w-48 h-48 sm:w-72 sm:h-72"
		style="bottom:12%;right:3%;animation-delay:4s;"
	></div>
	<div
		class="orb orb-gold w-32 h-32 sm:w-48 sm:h-48"
		style="top:45%;left:58%;animation-delay:8s;opacity:0.1;"
	></div>

	<!-- Grid -->
	<div
		class="absolute inset-0 pointer-events-none opacity-20"
		style="background-image:linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px);background-size:52px 52px;"
	></div>

	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative z-10 w-full">
		<div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
			<!-- Left Copy -->
			<div>
				{#if mounted}
					<div in:fly={{ y: 20, duration: 600 }} class="flex items-center gap-3 mb-6">
						<div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass border border-jade/25">
							<span class="w-1.5 h-1.5 rounded-full bg-jade animate-pulse"></span>
							<span class="text-jade text-[10px] sm:text-xs font-semibold font-mono uppercase tracking-wider"
								>🚀 LIVE · AI-Powered CBT Platform</span
							>
						</div>
					</div>

					<h1
						in:fly={{ y: 20, duration: 600, delay: 150 }}
						class="text-4xl sm:text-5xl lg:text-7xl font-sora font-900 leading-[1.1] mb-6 text-white tracking-tight"
					>
						Nigeria's Premier<br />
						<span class="text-gold">Results as a</span><br />
						<span class="text-white">Service Platform</span>
					</h1>

					<p
						in:fly={{ y: 20, duration: 600, delay: 300 }}
						class="text-white/60 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl"
					>
						We don't just give you access to questions — we deliver <strong class="text-white"
							>guaranteed exam readiness</strong
						> for JAMB, WAEC & NECO through AI-orchestrated question batches, predictive analytics, and 24/7
						tutor support. 🤖✨
					</p>

					<div in:fly={{ y: 20, duration: 600, delay: 450 }} class="flex flex-col sm:flex-row gap-4 mb-12">
						<a href="/auth/signup" class="btn-gold px-10 py-5 text-lg font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-gold/20 text-center">
							🔥 Start Preparing Free →
						</a>
						<a
							href="/exam"
							class="btn-outline px-8 py-5 text-lg flex items-center justify-center gap-3 transition-all hover:bg-gold/10 backdrop-blur-sm"
						>
							<span class="text-2xl">📝</span>
							Try CBT Demo
						</a>
					</div>

					<!-- Stats row -->
					<div in:fly={{ y: 20, duration: 600, delay: 600 }} class="grid grid-cols-3 gap-3 sm:gap-6">
						<div class="glass-card p-4 sm:p-6 text-center transition-all hover:border-gold/30 hover:-translate-y-1">
							<div class="text-2xl sm:text-3xl font-sora font-900 text-gold mb-1">50K+</div>
							<div class="text-white/45 text-[10px] sm:text-xs font-bold uppercase tracking-widest">👨‍🎓 Students</div>
						</div>
						<div class="glass-card p-4 sm:p-6 text-center transition-all hover:border-jade/30 hover:-translate-y-1">
							<div class="text-2xl sm:text-3xl font-sora font-900 text-jade mb-1">94%</div>
							<div class="text-white/45 text-[10px] sm:text-xs font-bold uppercase tracking-widest">📈 Pass Rate</div>
						</div>
						<div class="glass-card p-4 sm:p-6 text-center transition-all hover:border-white/30 hover:-translate-y-1">
							<div class="text-2xl sm:text-3xl font-sora font-900 text-white mb-1">1M+</div>
							<div class="text-white/45 text-[10px] sm:text-xs font-bold uppercase tracking-widest">📚 Questions</div>
						</div>
					</div>
				{/if}
			</div>

			<!-- Right: CBT Preview Card -->
			<div class="relative w-full max-w-md mx-auto">
				{#if mounted}
					<div in:fade={{ duration: 1000, delay: 300 }} class="glass-card p-5 sm:p-6 glow-blue relative z-10">
						<!-- Card Header -->
						<div class="flex items-center justify-between mb-5">
							<div>
								<div class="flex flex-wrap gap-1.5 mb-1.5">
									<span class="badge badge-gold text-[10px] sm:text-xs">🏆 JAMB 2025</span>
									<span class="badge badge-blue text-[10px] sm:text-xs">🔢 Mathematics</span>
								</div>
								<div class="text-white font-semibold text-sm sm:text-base">Question 12 of 50</div>
							</div>
							<!-- Timer Ring -->
							<div class="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
								<svg class="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 80 80">
									<circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="6"/>
									<circle cx="40" cy="40" r="34" fill="none" stroke="#FFD700" stroke-width="6" stroke-dasharray="214" stroke-dashoffset="60" stroke-linecap="round"/>
								</svg>
								<div class="text-center">
									<div class="text-gold font-bold text-sm sm:text-base font-sora">34s</div>
								</div>
							</div>
						</div>

						<!-- Progress -->
						<div class="pbar mb-5">
							<div class="pfill bg-gradient-to-r from-cobalt-light to-jade" style="width:24%"></div>
						</div>

						<!-- Question -->
						<div class="bg-white/04 rounded-xl p-4 sm:p-5 mb-5 border border-white/06">
							<p class="text-white/90 text-sm sm:text-base leading-relaxed">If <strong class="text-gold">P = &#123;x : 2 ≤ x ≤ 8&#125;</strong> and <strong class="text-gold">Q = &#123;x : 4 ≤ x ≤ 12&#125;</strong> are subsets of <strong class="text-gold">U = &#123;x : 1 ≤ x ≤ 15&#125;</strong>, find <strong class="text-gold">P ∩ Q'</strong>.</p>
						</div>

						<!-- Options -->
						<div class="space-y-2.5">
							<div class="opt-btn flex items-center gap-3 p-3 sm:p-4 transition-all">
								<span class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-cobalt/70 flex items-center justify-center text-xs sm:text-sm font-bold text-gold shrink-0">A</span>
								<span class="text-sm sm:text-base text-white/75">&#123;2, 3&#125;</span>
							</div>
							<div class="opt-btn correct flex items-center gap-3 p-3 sm:p-4 transition-all">
								<span class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-jade/20 flex items-center justify-center text-xs sm:text-sm font-bold text-jade shrink-0">B</span>
								<span class="text-sm sm:text-base text-white/75">&#123;2, 3, 4&#125;</span>
								<span class="ml-auto text-jade">✅</span>
							</div>
							<div class="opt-btn flex items-center gap-3 p-3 sm:p-4 transition-all">
								<span class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-cobalt/70 flex items-center justify-center text-xs sm:text-sm font-bold text-gold shrink-0">C</span>
								<span class="text-sm sm:text-base text-white/75">&#123;5, 6, 7, 8&#125;</span>
							</div>
							<div class="opt-btn flex items-center gap-3 p-3 sm:p-4 transition-all">
								<span class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-cobalt/70 flex items-center justify-center text-xs sm:text-sm font-bold text-gold shrink-0">D</span>
								<span class="text-sm sm:text-base text-white/75">&#123;1, 2, 3&#125;</span>
							</div>
						</div>

						<div class="flex items-center justify-between mt-6 pt-4 border-t border-white/06">
							<div class="flex items-center gap-2">
								<span class="badge badge-jade px-2 py-1 text-[10px] sm:text-xs">+2 pts ✅</span>
								<span class="text-white/40 text-[10px] sm:text-xs">Score: 22/24</span>
							</div>
							<button class="btn-primary px-5 py-2 text-xs sm:text-sm">Next →</button>
						</div>
					</div>

					<!-- Floating badges -->
					<div in:fly={{ x: 20, duration: 600, delay: 800 }} class="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 glass-card px-3 py-2 border border-jade/25 glow-jade z-20">
						<span class="text-jade text-[10px] sm:text-xs font-semibold">🧠 AI-Generated</span>
					</div>
					<div in:fly={{ x: -20, duration: 600, delay: 900 }} class="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 glass-card px-3 py-2 border border-gold/25 glow-gold z-20">
						<span class="text-gold text-[10px] sm:text-xs font-semibold">⭐ 87% Pass Probability</span>
					</div>
				{/if}
			</div>
		</div>

		<!-- Exam Badges -->
		<div class="mt-16 sm:mt-20 flex flex-wrap items-center gap-3 sm:gap-4 justify-center">
			<span class="text-white/35 text-xs sm:text-sm font-mono uppercase tracking-widest">📚 Covering:</span>
			{#each ['JAMB UTME', 'WAEC SSCE', 'NECO', 'NABTEB', 'POST-UTME', 'TRCN'] as exam}
				<span class="glass-card px-4 py-2 text-xs sm:text-sm font-semibold text-white/70 border border-white/06 hover:border-gold/30 hover:text-gold transition-all cursor-default">
					{exam}
				</span>
			{/each}
		</div>
	</div>
</section>
