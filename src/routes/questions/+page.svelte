<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { fade, fly, slide } from 'svelte/transition';

	const stats = [
		{ label: 'Total Questions', val: '1.2M+', icon: '📚', color: 'gold' },
		{ label: 'Subject Areas', val: '24+', icon: '🧬', color: 'jade' },
		{ label: 'Daily Practice', val: '150K+', icon: '⚡', color: 'blue' },
		{ label: 'AI Accuracy', val: '99.8%', icon: '🤖', color: 'jade' }
	];

	const subjects = [
		{ name: 'Mathematics', icon: '🔢', qCount: '150,000+' },
		{ name: 'English Language', icon: '📖', qCount: '120,000+' },
		{ name: 'Physics', icon: '⚛️', qCount: '80,000+' },
		{ name: 'Chemistry', icon: '🧪', qCount: '85,000+' },
		{ name: 'Biology', icon: '🧬', qCount: '90,000+' },
		{ name: 'Economics', icon: '📊', qCount: '65,000+' },
		{ name: 'Government', icon: '🏛️', qCount: '70,000+' },
		{ name: 'Literature', icon: '✍️', qCount: '55,000+' }
	];

	const recentActivity = [
		{ user: 'Student #412', action: 'Completed Physics Batch', score: '92%', time: '2m ago' },
		{ user: 'Tutor #12', action: 'Verified 50 Math Questions', score: 'Verified', time: '15m ago' },
		{ user: 'AI Agent', action: 'Generated JAMB English Set', score: 'Generated', time: '30m ago' }
	];
</script>

<SEO 
	title="SchoolCBT - Nigeria Elite Question Bank | 1.2M+ Practice Questions"
	description="Access over 1.2 million curriculum-grounded questions for WAEC, NECO, JAMB, and NABTEB. Nigeria's premier elite question bank."
/>

<Header />

<main class="pt-20">
	<!-- Hero Section -->
	<section class="relative py-24 bg-hero overflow-hidden">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
			<div class="grid lg:grid-cols-2 gap-16 items-center">
				<div class="text-left">
					<div in:fade class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-bold uppercase tracking-widest mb-8">
						<span>⚡</span> Elite Question Bank
					</div>
					<h1 in:fly={{ y: 20, duration: 600 }} class="text-4xl sm:text-6xl font-sora font-900 text-white mb-6 tracking-tight leading-[1.1]">
						The <span class="text-gold">Ultimate Vault</span> of Knowledge 🏛️
					</h1>
					<p in:fly={{ y: 20, duration: 600, delay: 200 }} class="text-white/50 text-lg sm:text-xl leading-relaxed mb-12 max-w-xl">
						Access over 1.2 million verified, curriculum-grounded questions across all secondary school subjects. 
						Our AI agents ensure precision and relevance for WAEC, NECO, and JAMB success.
					</p>
					
					<div in:fly={{ y: 20, duration: 600, delay: 400 }} class="flex flex-col sm:flex-row gap-4">
						<button class="btn-gold px-10 py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-gold/20 hover:scale-[1.05] active:scale-95 transition-all">
							🚀 Start Exploring
						</button>
						<button class="btn-outline px-10 py-5 rounded-2xl font-black uppercase tracking-widest backdrop-blur-sm hover:bg-white/05 transition-all">
							📄 Download PDFs
						</button>
					</div>
				</div>

				<!-- Stats Grid -->
				<div in:fade={{ delay: 600 }} class="grid grid-cols-2 gap-4 sm:gap-6">
					{#each stats as stat}
						<div class="glass-card p-5 sm:p-8 lg:p-10 text-center border-white/05 hover:border-gold/30 hover:-translate-y-2 transition-all group">
							<div class="text-4xl mb-4 group-hover:scale-125 transition-transform">{stat.icon}</div>
							<div class="text-3xl sm:text-4xl font-sora font-900 text-white mb-2">{stat.val}</div>
							<div class="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- Subjects Explorer -->
	<section class="py-24 bg-cobalt-xdark/30 relative">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
			<div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
				<div class="text-left">
					<div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-jade/10 border border-jade/20 text-jade text-xs font-bold uppercase tracking-widest mb-6">
						<span>📂</span> Subject Explorer
					</div>
					<h2 class="font-sora text-3xl sm:text-4xl font-900 text-white tracking-tight">
						Browse by <span class="text-gold">Subject Area</span> 🔍
					</h2>
				</div>
				<div class="flex items-center gap-4">
					<input 
						type="text" 
						placeholder="Search subjects..." 
						class="bg-white/05 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-gold/50 transition-all w-full md:w-80"
					/>
				</div>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				{#each subjects as subject}
					<div class="glass-card p-8 hover:border-gold/40 hover:bg-white/07 transition-all group cursor-pointer hover:-translate-y-2">
						<div class="w-16 h-16 rounded-2xl bg-cobalt/40 border border-white/10 flex items-center justify-center text-4xl group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-lg mb-8">
							{subject.icon}
						</div>
						<h3 class="text-white font-sora font-800 text-xl group-hover:text-gold transition-colors mb-2">{subject.name}</h3>
						<p class="text-white/40 text-sm font-bold uppercase tracking-widest mb-6">{subject.qCount} questions</p>
						<button class="w-full py-3 rounded-xl bg-white/05 border border-white/10 text-white/60 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all">
							Enter Vault ➡️
						</button>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Live Activity & AI Insights -->
	<section class="py-24 relative overflow-hidden">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
			<div class="grid lg:grid-cols-3 gap-12 items-start">
				<!-- Live Activity Feed -->
				<div class="lg:col-span-2 glass-card p-8 sm:p-12">
					<div class="flex items-center justify-between mb-10 border-b border-white/05 pb-8">
						<h3 class="text-white font-sora font-900 text-2xl flex items-center gap-3">
							<span class="text-2xl">📡</span> Live Activity Vault
						</h3>
						<div class="flex items-center gap-2">
							<span class="w-2 h-2 rounded-full bg-jade animate-pulse"></span>
							<span class="text-jade text-[10px] font-black uppercase tracking-widest">Real-time Stream</span>
						</div>
					</div>
					<div class="space-y-6">
						{#each recentActivity as item}
							<div class="flex items-center justify-between p-6 rounded-3xl bg-white/03 border border-white/05 hover:bg-white/05 transition-all group">
								<div class="flex items-center gap-6">
									<div class="w-12 h-12 rounded-full bg-cobalt-light/20 flex items-center justify-center text-white/50 font-black text-xs">
										{item.user.split('#')[1]}
									</div>
									<div>
										<div class="text-white font-bold group-hover:text-gold transition-colors">{item.action}</div>
										<div class="text-white/30 text-xs mt-1">{item.user} • {item.time}</div>
									</div>
								</div>
								<div class="px-4 py-1.5 rounded-lg bg-jade/10 border border-jade/20 text-jade text-[10px] font-black uppercase tracking-widest">
									{item.score}
								</div>
							</div>
						{/each}
					</div>
				</div>

				<!-- AI Insight Sidebar -->
				<div class="space-y-6">
					<div class="glass-card p-8 sm:p-10 border-gold/30 glow-gold relative overflow-hidden group">
						<div class="absolute top-0 right-0 p-4 text-5xl opacity-10 group-hover:scale-125 transition-transform">🤖</div>
						<h4 class="text-gold font-black text-[10px] uppercase tracking-[0.2em] mb-4">AI Grounding Protocol</h4>
						<p class="text-white/60 text-sm leading-relaxed mb-8">
							Every question in our vault undergoes a rigorous multi-agent verification process. 
							99.8% grounding accuracy against Nigerian National Curriculum standards.
						</p>
						<ul class="space-y-3 mb-8">
							{#each ['NERDC Alignment Check', 'JAMB Pattern Analysis', 'Bloom Taxonomy Tagging', 'Multimodal Verification'] as check}
								<li class="flex items-center gap-3 text-white/80 text-xs font-bold">
									<span class="text-jade text-lg">✅</span> {check}
								</li>
							{/each}
						</ul>
						<button class="w-full py-4 rounded-2xl bg-gold text-cobalt font-black text-xs uppercase tracking-widest shadow-xl shadow-gold/20 hover:scale-[1.02] active:scale-95 transition-all">
							Learn About Our AI 🧪
						</button>
					</div>

					<div class="glass-card p-8 sm:p-10">
						<h4 class="text-white/40 font-black text-[10px] uppercase tracking-[0.2em] mb-6">Vault Summary</h4>
						<div class="space-y-6">
							<div class="flex justify-between items-end border-b border-white/05 pb-4">
								<span class="text-white/60 text-xs font-bold">WAEC/NECO (SSCE)</span>
								<span class="text-white font-black">450K+</span>
							</div>
							<div class="flex justify-between items-end border-b border-white/05 pb-4">
								<span class="text-white/60 text-xs font-bold">JAMB (UTME)</span>
								<span class="text-white font-black">380K+</span>
							</div>
							<div class="flex justify-between items-end border-b border-white/05 pb-4">
								<span class="text-white/60 text-xs font-bold">JSS (JSCE/BECE)</span>
								<span class="text-white font-black">280K+</span>
							</div>
							<div class="flex justify-between items-end">
								<span class="text-white/60 text-xs font-bold">Technical/Others</span>
								<span class="text-white font-black">120K+</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</main>

<Footer />
