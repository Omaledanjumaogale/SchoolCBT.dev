<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Curriculum from '$lib/components/Curriculum.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { fade, fly } from 'svelte/transition';

	const examBodies = [
		{ name: 'WAEC', desc: 'West African Examinations Council', icon: '📜' },
		{ name: 'NECO', desc: 'National Examinations Council', icon: '📜' },
		{ name: 'JAMB', desc: 'Joint Admissions and Matriculation Board', icon: '🏛️' },
		{ name: 'NABTEB', desc: 'National Business and Technical Examinations Board', icon: '🛠️' }
	];
</script>

<SEO 
	title="SchoolCBT - Official Nigerian Secondary Curriculum Roadmap"
	description="Explore the full JSS and SSS curriculum for Nigerian schools. Grounded in WAEC, NECO, and JAMB standards for guaranteed exam success."
/>

<Header />

<main class="pt-20">
	<!-- Hero Section for Curriculum Page -->
	<section class="relative py-20 overflow-hidden bg-hero">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
			<div in:fade class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-bold uppercase tracking-widest mb-8">
				<span>📖</span> Official Curriculum Coverage
			</div>
			<h1 in:fly={{ y: 20, duration: 600 }} class="text-4xl sm:text-6xl font-sora font-900 text-white mb-6 tracking-tight">
				Your Roadmap to <span class="text-gold">Academic Excellence</span> 🇳🇬
			</h1>
			<p in:fly={{ y: 20, duration: 600, delay: 200 }} class="text-white/50 max-w-2xl mx-auto text-lg sm:text-xl leading-relaxed mb-12">
				We've mapped every question on SchoolCBT to the official Nigerian National Curriculum. 
				Whether you're in JSS1 or preparing for WASSCE, we've got you covered.
			</p>

			<!-- Exam Body Badges -->
			<div in:fade={{ delay: 400 }} class="flex flex-wrap justify-center gap-4 sm:gap-6">
				{#each examBodies as body}
					<div class="glass-card px-6 py-4 flex items-center gap-3 border-white/05 hover:border-gold/30 transition-all group">
						<span class="text-2xl group-hover:scale-110 transition-transform">{body.icon}</span>
						<div class="text-left">
							<div class="text-white font-black text-sm">{body.name}</div>
							<div class="text-[10px] text-white/40 font-bold uppercase tracking-wider">{body.desc}</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<Curriculum />

	<!-- Additional Information Section -->
	<section class="py-24 bg-cobalt-xdark/50 relative overflow-hidden">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
			<div class="grid lg:grid-cols-2 gap-16 items-center">
				<div class="space-y-8">
					<div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-jade/10 border border-jade/20 text-jade text-xs font-bold uppercase tracking-widest">
						<span>🛡️</span> Grounded Accuracy
					</div>
					<h2 class="font-sora text-3xl sm:text-4xl font-900 text-white leading-tight">
						Why Our Curriculum <span class="text-jade">Mapping</span> Matters 🔬
					</h2>
					<p class="text-white/50 text-lg leading-relaxed">
						Unlike random question banks, SchoolCBT uses AI Researcher Agents to ensure every 
						question is grounded in the current Nigerian curriculum. This means you study 
						exactly what will appear in your exams.
					</p>
					
					<div class="grid sm:grid-cols-2 gap-6">
						{#each [
							{ emoji: '✅', title: '99% Alignment', desc: 'Directly mapped to NERDC guidelines.' },
							{ emoji: '📅', title: 'Weekly Updates', desc: 'Content refreshed based on latest exam trends.' },
							{ emoji: '🎓', title: 'Expert Verified', desc: 'Reviewed by top Nigerian educators.' },
							{ emoji: '🤖', title: 'AI Grounding', desc: 'Zero hallucination in technical subjects.' }
						] as feature}
							<div class="flex gap-4">
								<span class="text-2xl shrink-0">{feature.emoji}</span>
								<div>
									<div class="text-white font-bold mb-1">{feature.title}</div>
									<div class="text-white/40 text-xs">{feature.desc}</div>
								</div>
							</div>
						{/each}
					</div>
				</div>

				<div class="glass-card p-8 sm:p-12 relative group">
					<div class="absolute inset-0 bg-gradient-to-br from-gold/05 to-transparent pointer-events-none"></div>
					<div class="relative z-10">
						<div class="text-4xl mb-6">🚀</div>
						<h3 class="font-sora text-2xl font-800 text-white mb-4">Start Your Journey Today</h3>
						<p class="text-white/50 mb-8 leading-relaxed">
							Don't leave your results to chance. Join thousands of students using 
							SchoolCBT to master their curriculum and ace their exams.
						</p>
						<button class="w-full btn-gold py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-gold/20 hover:scale-[1.02] active:scale-95 transition-all">
							Get Started for Free →
						</button>
						<p class="mt-4 text-center text-[10px] text-white/20 font-bold uppercase tracking-widest">
							No credit card required • Instant Access
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</main>

<Footer />
