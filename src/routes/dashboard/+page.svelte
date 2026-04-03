<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import DashboardPreview from '$lib/components/DashboardPreview.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { fade, fly } from 'svelte/transition';

	// Mock student data for preview
	const student = {
		name: 'Danjuma Ogale',
		school: 'Federal Government College, Lagos',
		level: 'SSS 3',
		subjects: ['Mathematics', 'Physics', 'Chemistry', 'English Language', 'Biology'],
		streak: 7
	};
</script>

<SEO 
	title="Student Dashboard | SchoolCBT Enterprise"
	description="Track your exam readiness, study progress, and AI-powered performance insights on Nigeria's premier CBT platform."
/>

<Header />

<main class="pt-24 min-h-screen bg-hero pb-20">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
		<!-- Welcome Banner -->
		<div in:fade class="glass-card p-8 sm:p-12 mb-12 relative overflow-hidden group">
			<div class="absolute top-0 right-0 p-10 text-9xl opacity-[0.03] group-hover:scale-110 transition-transform">🎓</div>
			<div class="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
				<div>
					<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] font-black uppercase tracking-widest mb-4">
						<span>⚡</span> Welcome Back, Scholar
					</div>
					<h1 class="text-3xl sm:text-5xl font-sora font-900 text-white mb-4 tracking-tight">
						Hello, <span class="text-gold">{student.name}</span> 👋
					</h1>
					<p class="text-white/40 text-lg font-medium max-w-xl">
						You're currently on a <span class="text-jade font-bold">{student.streak}-day streak</span>. 
						Keep it up to unlock the "Elite Scholar" badge! 🏆
					</p>
				</div>
				<div class="flex flex-wrap gap-4">
					<button class="btn-gold px-8 py-4 font-black uppercase tracking-widest shadow-xl shadow-gold/20 hover:scale-[1.05] active:scale-95 transition-all">
						🔥 Start Practice Batch
					</button>
					<button class="btn-outline px-8 py-4 font-black uppercase tracking-widest hover:bg-white/05 transition-all">
						📖 View Study Plan
					</button>
				</div>
			</div>
		</div>

		<DashboardPreview />
	</div>
</main>

<Footer />
