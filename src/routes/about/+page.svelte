<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { fade, fly } from 'svelte/transition';

	const mission = [
		{ emoji: '🇳🇬', title: 'Nigerian Focus', desc: 'Exclusively built for the Nigerian secondary school curriculum.' },
		{ emoji: '🤖', title: 'AI-First', desc: 'Powered by 5 specialized agents for grounding and precision.' },
		{ emoji: '⚡', title: 'RaaS Model', desc: 'Results as a Service — guaranteed exam readiness for every student.' },
		{ emoji: '🎓', title: 'Scholar Empowerment', desc: 'Democratizing access to high-quality exam preparation.' }
	];

	const team = [
		{ name: 'Danjuma Ogale', role: 'Founder & Architect', icon: '👤' },
		{ name: 'Elite Dev Team', role: 'Full-Stack Engineering', icon: '💻' },
		{ name: 'Curriculum Experts', role: 'Grounding & Accuracy', icon: '📚' }
	];
</script>

<SEO 
	title="About Our Mission | SchoolCBT Enterprise"
	description="Learn about SchoolCBT's mission to revolutionize exam preparation in Nigeria through AI-orchestrated Results as a Service (RaaS)."
/>

<Header />

<main class="pt-24 min-h-screen bg-hero pb-20">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
		<div in:fade class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-jade/10 border border-jade/20 text-jade text-xs font-bold uppercase tracking-widest mb-8">
			<span>ℹ️</span> About SchoolCBT
		</div>
		<h1 in:fly={{ y: 20, duration: 600 }} class="text-4xl sm:text-6xl font-sora font-900 text-white mb-6 tracking-tight leading-[1.1]">
			The Future of <span class="text-gold">Exam Readiness</span> 🚀
		</h1>
		<p in:fly={{ y: 20, duration: 600, delay: 200 }} class="text-white/40 max-w-2xl mx-auto text-lg sm:text-xl leading-relaxed mb-24">
			SchoolCBT is not just a question bank. We are a Results as a Service (RaaS) platform 
			dedicated to ensuring every Nigerian student is 100% ready for their JAMB, WAEC, and NECO exams.
		</p>

		<div class="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center text-left mb-24">
			<div class="space-y-8">
				<h2 class="font-sora text-3xl sm:text-4xl font-900 text-white">Our Core <span class="text-gold">Values</span> 🏛️</h2>
				<div class="grid sm:grid-cols-2 gap-6">
					{#each mission as m}
						<div class="glass-card p-6 border-white/05 hover:border-gold/30 transition-all group">
							<div class="text-3xl mb-4 group-hover:scale-110 transition-transform">{m.emoji}</div>
							<div class="text-white font-bold mb-2">{m.title}</div>
							<div class="text-white/40 text-xs leading-relaxed uppercase tracking-widest">{m.desc}</div>
						</div>
					{/each}
				</div>
			</div>

			<div class="glass-card p-10 sm:p-16 relative overflow-hidden group">
				<div class="absolute inset-0 bg-gradient-to-br from-jade/05 to-transparent pointer-events-none"></div>
				<h3 class="font-sora text-2xl font-800 text-white mb-6">Our <span class="text-jade">Vision</span> 🌟</h3>
				<p class="text-white/60 text-lg leading-relaxed mb-8">
					"To be the digital backbone of Nigerian secondary education, where every student's academic potential is unlocked through intelligent, personalized, and curriculum-grounded technology."
				</p>
				<div class="flex items-center gap-4 border-t border-white/05 pt-8">
					<div class="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center text-xl shadow-lg">🇳🇬</div>
					<div>
						<div class="text-white font-black text-sm uppercase tracking-widest">Built for Nigeria</div>
						<div class="text-white/30 text-[10px] font-bold uppercase tracking-[0.2em]">100% Curriculum Alignment</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Team Section -->
		<div in:fade={{ delay: 400 }} class="mt-24">
			<h2 class="font-sora text-3xl sm:text-4xl font-900 text-white mb-12">Meet the <span class="text-gold">Team</span> 👨‍💻</h2>
			<div class="grid sm:grid-cols-3 gap-6 sm:gap-8">
				{#each team as member}
					<div class="glass-card p-8 border-white/05 hover:border-jade/30 transition-all group hover:-translate-y-1">
						<div class="w-16 h-16 rounded-2xl bg-cobalt-light/10 flex items-center justify-center text-3xl mb-6 shadow-xl group-hover:scale-110 transition-transform">{member.icon}</div>
						<div class="text-white font-bold text-lg mb-1">{member.name}</div>
						<div class="text-jade text-[10px] font-black uppercase tracking-widest">{member.role}</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</main>

<Footer />
