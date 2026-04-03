<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import CBTDemo from '$lib/components/CBTDemo.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { fade, fly } from 'svelte/transition';

	const features = [
		{ emoji: '⚡', title: '50s Timer', desc: 'Mimic real JAMB/WAEC exam conditions with high-pressure timing.' },
		{ emoji: '✅', title: 'Instant Review', desc: 'Get immediate feedback with AI-powered step-by-step explanations.' },
		{ emoji: '🏆', title: 'Points & Rewards', desc: 'Earn achievement badges and rank up with every successful batch.' },
		{ emoji: '🤖', title: 'AI Grounding', desc: 'Questions are 100% grounded in the official Nigerian curriculum.' }
	];
</script>

<SEO 
	title="CBT Practice Batch | Launch Your Exam Training"
	description="Launch a curriculum-accurate exam practice batch. 50 questions, 50s timer, instant feedback and AI explanations."
/>

<Header />

<main class="pt-24 min-h-screen bg-hero pb-20">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
		<div class="grid lg:grid-cols-4 gap-8 mb-16 items-start">
			<!-- Exam Rules/Features Sidebar -->
			<div class="lg:col-span-1 space-y-4">
				<div in:fade class="glass-card p-6 border-gold/30 glow-gold relative overflow-hidden group">
					<div class="absolute top-0 right-0 p-3 text-5xl opacity-10 group-hover:scale-110 transition-transform">🎓</div>
					<h3 class="text-gold font-black text-[10px] uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
						<span>⚡</span> Exam Protocol
					</h3>
					<div class="space-y-6">
						{#each features as f}
							<div class="flex gap-4 group/item">
								<span class="text-2xl shrink-0 group-hover/item:scale-125 transition-transform">{f.emoji}</span>
								<div>
									<div class="text-white font-bold text-sm mb-1">{f.title}</div>
									<div class="text-white/40 text-[10px] leading-relaxed uppercase tracking-widest">{f.desc}</div>
								</div>
							</div>
						{/each}
					</div>
				</div>

				<div in:fade={{ delay: 200 }} class="glass-card p-6 text-center">
					<div class="text-[10px] text-white/40 font-black uppercase tracking-widest mb-4">Current Session</div>
					<div class="text-3xl font-sora font-900 text-white mb-2 tracking-tight">Practice Batch</div>
					<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-jade/10 border border-jade/20 text-jade text-[10px] font-black uppercase tracking-widest">
						<span class="w-1.5 h-1.5 rounded-full bg-jade animate-pulse"></span>
						AI Active
					</div>
				</div>
			</div>

			<!-- Main Exam Component -->
			<div class="lg:col-span-3">
				<CBTDemo />
			</div>
		</div>
	</div>
</main>

<Footer />
