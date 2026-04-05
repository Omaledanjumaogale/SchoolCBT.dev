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
	<section class="bg-hero relative overflow-hidden py-24">
		<div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="grid items-center gap-16 lg:grid-cols-2">
				<div class="text-left">
					<div
						in:fade
						class="bg-gold/10 border-gold/20 text-gold mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold tracking-widest uppercase"
					>
						<span>⚡</span> Elite Question Bank
					</div>
					<h1
						in:fly={{ y: 20, duration: 600 }}
						class="font-sora font-900 mb-6 text-4xl leading-[1.1] tracking-tight text-white sm:text-6xl"
					>
						The <span class="text-gold">Ultimate Vault</span> of Knowledge 🏛️
					</h1>
					<p
						in:fly={{ y: 20, duration: 600, delay: 200 }}
						class="mb-12 max-w-xl text-lg leading-relaxed text-white/50 sm:text-xl"
					>
						Access over 1.2 million verified, curriculum-grounded questions across all secondary
						school subjects. Our AI agents ensure precision and relevance for WAEC, NECO, and JAMB
						success.
					</p>

					<div
						in:fly={{ y: 20, duration: 600, delay: 400 }}
						class="flex flex-col gap-4 sm:flex-row"
					>
						<button
							class="btn-gold shadow-gold/20 rounded-2xl px-10 py-5 font-black tracking-widest uppercase shadow-xl transition-all hover:scale-[1.05] active:scale-95"
						>
							🚀 Start Exploring
						</button>
						<button
							class="btn-outline hover:bg-white/05 rounded-2xl px-10 py-5 font-black tracking-widest uppercase backdrop-blur-sm transition-all"
						>
							📄 Download PDFs
						</button>
					</div>
				</div>

				<!-- Stats Grid -->
				<div in:fade={{ delay: 600 }} class="grid grid-cols-2 gap-4 sm:gap-6">
					{#each stats as stat}
						<div
							class="glass-card border-white/05 hover:border-gold/30 group p-5 text-center transition-all hover:-translate-y-2 sm:p-8 lg:p-10"
						>
							<div class="mb-4 text-4xl transition-transform group-hover:scale-125">
								{stat.icon}
							</div>
							<div class="font-sora font-900 mb-2 text-3xl text-white sm:text-4xl">{stat.val}</div>
							<div class="text-[10px] font-black tracking-[0.2em] text-white/40 uppercase">
								{stat.label}
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- Subjects Explorer -->
	<section class="bg-cobalt-xdark/30 relative py-24">
		<div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
				<div class="text-left">
					<div
						class="bg-jade/10 border-jade/20 text-jade mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold tracking-widest uppercase"
					>
						<span>📂</span> Subject Explorer
					</div>
					<h2 class="font-sora font-900 text-3xl tracking-tight text-white sm:text-4xl">
						Browse by <span class="text-gold">Subject Area</span> 🔍
					</h2>
				</div>
				<div class="flex items-center gap-4">
					<input
						type="text"
						placeholder="Search subjects..."
						class="bg-white/05 focus:border-gold/50 w-full rounded-2xl border border-white/10 px-6 py-4 text-white transition-all outline-none md:w-80"
					/>
				</div>
			</div>

			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{#each subjects as subject}
					<div
						class="glass-card hover:border-gold/40 hover:bg-white/07 group cursor-pointer p-8 transition-all hover:-translate-y-2"
					>
						<div
							class="bg-cobalt/40 mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 text-4xl shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3"
						>
							{subject.icon}
						</div>
						<h3
							class="font-sora font-800 group-hover:text-gold mb-2 text-xl text-white transition-colors"
						>
							{subject.name}
						</h3>
						<p class="mb-6 text-sm font-bold tracking-widest text-white/40 uppercase">
							{subject.qCount} questions
						</p>
						<button
							class="bg-white/05 w-full rounded-xl border border-white/10 py-3 text-[10px] font-black tracking-widest text-white/60 uppercase transition-all hover:bg-white/10 hover:text-white"
						>
							Enter Vault ➡️
						</button>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Live Activity & AI Insights -->
	<section class="relative overflow-hidden py-24">
		<div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="grid items-start gap-12 lg:grid-cols-3">
				<!-- Live Activity Feed -->
				<div class="glass-card p-8 sm:p-12 lg:col-span-2">
					<div class="border-white/05 mb-10 flex items-center justify-between border-b pb-8">
						<h3 class="font-sora font-900 flex items-center gap-3 text-2xl text-white">
							<span class="text-2xl">📡</span> Live Activity Vault
						</h3>
						<div class="flex items-center gap-2">
							<span class="bg-jade h-2 w-2 animate-pulse rounded-full"></span>
							<span class="text-jade text-[10px] font-black tracking-widest uppercase"
								>Real-time Stream</span
							>
						</div>
					</div>
					<div class="space-y-6">
						{#each recentActivity as item}
							<div
								class="bg-white/03 border-white/05 hover:bg-white/05 group flex items-center justify-between rounded-3xl border p-6 transition-all"
							>
								<div class="flex items-center gap-6">
									<div
										class="bg-cobalt-light/20 flex h-12 w-12 items-center justify-center rounded-full text-xs font-black text-white/50"
									>
										{item.user.split('#')[1]}
									</div>
									<div>
										<div class="group-hover:text-gold font-bold text-white transition-colors">
											{item.action}
										</div>
										<div class="mt-1 text-xs text-white/30">{item.user} • {item.time}</div>
									</div>
								</div>
								<div
									class="bg-jade/10 border-jade/20 text-jade rounded-lg border px-4 py-1.5 text-[10px] font-black tracking-widest uppercase"
								>
									{item.score}
								</div>
							</div>
						{/each}
					</div>
				</div>

				<!-- AI Insight Sidebar -->
				<div class="space-y-6">
					<div
						class="glass-card border-gold/30 glow-gold group relative overflow-hidden p-8 sm:p-10"
					>
						<div
							class="absolute top-0 right-0 p-4 text-5xl opacity-10 transition-transform group-hover:scale-125"
						>
							🤖
						</div>
						<h4 class="text-gold mb-4 text-[10px] font-black tracking-[0.2em] uppercase">
							AI Grounding Protocol
						</h4>
						<p class="mb-8 text-sm leading-relaxed text-white/60">
							Every question in our vault undergoes a rigorous multi-agent verification process.
							99.8% grounding accuracy against Nigerian National Curriculum standards.
						</p>
						<ul class="mb-8 space-y-3">
							{#each ['NERDC Alignment Check', 'JAMB Pattern Analysis', 'Bloom Taxonomy Tagging', 'Multimodal Verification'] as check}
								<li class="flex items-center gap-3 text-xs font-bold text-white/80">
									<span class="text-jade text-lg">✅</span>
									{check}
								</li>
							{/each}
						</ul>
						<button
							class="bg-gold text-cobalt shadow-gold/20 w-full rounded-2xl py-4 text-xs font-black tracking-widest uppercase shadow-xl transition-all hover:scale-[1.02] active:scale-95"
						>
							Learn About Our AI 🧪
						</button>
					</div>

					<div class="glass-card p-8 sm:p-10">
						<h4 class="mb-6 text-[10px] font-black tracking-[0.2em] text-white/40 uppercase">
							Vault Summary
						</h4>
						<div class="space-y-6">
							<div class="border-white/05 flex items-end justify-between border-b pb-4">
								<span class="text-xs font-bold text-white/60">WAEC/NECO (SSCE)</span>
								<span class="font-black text-white">450K+</span>
							</div>
							<div class="border-white/05 flex items-end justify-between border-b pb-4">
								<span class="text-xs font-bold text-white/60">JAMB (UTME)</span>
								<span class="font-black text-white">380K+</span>
							</div>
							<div class="border-white/05 flex items-end justify-between border-b pb-4">
								<span class="text-xs font-bold text-white/60">JSS (JSCE/BECE)</span>
								<span class="font-black text-white">280K+</span>
							</div>
							<div class="flex items-end justify-between">
								<span class="text-xs font-bold text-white/60">Technical/Others</span>
								<span class="font-black text-white">120K+</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</main>

<Footer />
