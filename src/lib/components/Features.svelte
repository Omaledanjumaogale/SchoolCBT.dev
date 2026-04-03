<script lang="ts">
	const features = [
		{
			emoji: '🎯',
			title: 'Intelligent CBT Engine',
			desc: '50-question batches dynamically generated per subject, exam type, and topic. 50-second countdown per question with instant ✅/❌ visual feedback.',
			badges: ['JAMB', 'WAEC', 'NECO', 'NABTEB']
		},
		{
			emoji: '📊',
			title: 'AI Performance Analytics',
			desc: "Predictive pass probability cards, topic-level performance breakdown, Bloom's Taxonomy tagging, and hour-tracking to measure study time investment.",
			stats: { label: 'Pass Probability', val: '87%', color: 'jade' }
		},
		{
			emoji: '🏆',
			title: 'Awards & Star Ratings',
			desc: 'Earn achievement badges and star ratings for batches with 75%+ scores. Trophy system and streak awards motivate consistent daily preparation.',
			rating: '4.2 avg rating'
		},
		{
			emoji: '👨‍🏫',
			title: 'AI Tutor Matching',
			desc: 'Automated AI-powered tutor assignment based on performance gaps. Tutors earn per subject, hour, and student count via integrated earnings wallet.',
			meta: '240+ approved tutors'
		},
		{
			emoji: '📖',
			title: 'AI Study Plans',
			desc: 'Personalised study timelines generated from uploaded academic reports. Topic learning modules, academic searches, and Kickstart Learning from dashboard.',
			plan: ['Week 1–2: Number Theory', 'Week 3–4: Algebra & Sets']
		},
		{
			emoji: '📋',
			title: 'Automated Report Cards',
			desc: "Comprehensive auto-generated reports after every batch with WAEC-style grading (A1–F9), Bloom's Taxonomy level tagging, and full answer explanations.",
			tags: ['Score: 88/100', 'Improve: Geometry']
		},
		{
			emoji: '🤖',
			title: '5 Specialized AI Agents',
			desc: 'Coordinator, Intake, Researcher, Question Composer, and Quality Evaluator agents orchestrate your unique exam preparation with 90%+ curriculum grounding accuracy.',
			badge: 'Multi-Agent RaaS Engine'
		},
		{
			emoji: '📱',
			title: '100% Mobile First',
			desc: 'Full CBT interface optimised for smartphones, tablets, laptops, and desktops. Practice on any device, any time, even during commutes or at school.',
			badge: 'All Devices Supported'
		},
		{
			emoji: '🔐',
			title: 'Secure & Verified',
			desc: "NIN verification for tutors, OTP authentication, admin approval workflow, and Model Armor input/output sanitization protect the platform's integrity.",
			badge: 'Enterprise Security'
		}
	];
</script>

<section id="features" class="py-24 sm:py-32 bg-mesh relative overflow-hidden">
	<!-- Decorative background elements -->
	<div class="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/05 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
	<div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-jade/05 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
		<div class="text-center mb-16 sm:mb-24">
			<div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-bold uppercase tracking-widest mb-6">
				<span>✨</span> Platform Features
			</div>
			<h2 class="font-sora text-4xl sm:text-5xl lg:text-6xl font-900 text-white mt-3 mb-6 tracking-tight">
				Everything You Need to <span class="text-gold">Pass</span> 🚀
			</h2>
			<p class="text-white/50 max-w-2xl mx-auto text-lg sm:text-xl leading-relaxed">
				A complete RaaS ecosystem combining multi-agent AI intelligence with exam-focused tools
				designed specifically for Nigerian secondary school and college students. 🇳🇬
			</p>
		</div>

		<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
			{#each features as feature}
				<div class="glass-card p-6 sm:p-10 lg:p-12 flex flex-col h-full transition-all duration-300 hover:border-gold/30 hover:-translate-y-2 group">
					<div
						class="w-16 h-16 rounded-2xl bg-gradient-to-br from-cobalt to-cobalt-dark border border-white/10 flex items-center justify-center mb-8 text-4xl shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform"
					>
						{feature.emoji}
					</div>
					<h3 class="text-white font-sora font-800 text-xl sm:text-2xl mb-4 group-hover:text-gold transition-colors">{feature.title}</h3>
					<p class="text-white/50 text-base sm:text-lg leading-relaxed mb-8 flex-grow text-wrap overflow-hidden">
						{feature.desc}
					</p>

					<div class="mt-auto pt-6 border-t border-white/05 flex flex-wrap items-center gap-3">
						{#if feature.badges}
							{#each feature.badges as badge}
								<span class="px-3 py-1 rounded-lg bg-white/05 border border-white/10 text-white/60 text-[10px] sm:text-xs font-bold uppercase tracking-wider">{badge}</span>
							{/each}
						{:else if feature.stats}
							<div class="w-full">
								<div class="flex justify-between text-xs font-bold mb-2">
									<span class="text-white/40 uppercase tracking-widest">{feature.stats.label}</span>
									<span class="text-jade">{feature.stats.val}</span>
								</div>
								<div class="h-1.5 w-full bg-white/05 rounded-full overflow-hidden">
									<div class="h-full bg-jade rounded-full shadow-[0_0_10px_rgba(80,200,120,0.5)]" style="width:{feature.stats.val}"></div>
								</div>
							</div>
						{:else if feature.rating}
							<div class="flex items-center gap-2">
								<span class="text-gold">⭐⭐⭐⭐⭐</span>
								<span class="text-white/40 text-xs font-bold">{feature.rating}</span>
							</div>
						{:else if feature.meta}
							<div class="flex items-center gap-2">
								<span class="w-2 h-2 rounded-full bg-jade animate-pulse"></span>
								<span class="text-white/40 text-xs font-bold uppercase tracking-widest">{feature.meta}</span>
							</div>
						{:else if feature.plan}
							<div class="flex flex-col gap-1.5 w-full">
								{#each feature.plan as item}
									<div class="flex items-center gap-2 text-[10px] sm:text-xs text-white/50 font-medium">
										<span class="text-gold">✔</span> {item}
									</div>
								{/each}
							</div>
						{:else if feature.tags}
							{#each feature.tags as tag}
								<span class="px-3 py-1 rounded-lg bg-jade/10 border border-jade/20 text-jade text-[10px] font-bold uppercase tracking-wider">{tag}</span>
							{/each}
						{:else if feature.badge}
							<span class="px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] font-black uppercase tracking-[0.15em]">{feature.badge}</span>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
