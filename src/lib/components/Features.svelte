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

<section id="features" class="bg-mesh relative overflow-hidden py-24 sm:py-32">
	<!-- Decorative background elements -->
	<div
		class="bg-gold/05 absolute top-0 right-0 h-[500px] w-[500px] translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
	></div>
	<div
		class="bg-jade/05 absolute bottom-0 left-0 h-[400px] w-[400px] -translate-x-1/2 translate-y-1/2 rounded-full blur-[100px]"
	></div>

	<div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center sm:mb-24">
			<div
				class="bg-gold/10 border-gold/20 text-gold mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold tracking-widest uppercase"
			>
				<span>✨</span> Platform Features
			</div>
			<h2
				class="font-sora font-900 mt-3 mb-6 text-4xl tracking-tight text-white sm:text-5xl lg:text-6xl"
			>
				Everything You Need to <span class="text-gold">Pass</span> 🚀
			</h2>
			<p class="mx-auto max-w-2xl text-lg leading-relaxed text-white/50 sm:text-xl">
				A complete RaaS ecosystem combining multi-agent AI intelligence with exam-focused tools
				designed specifically for Nigerian secondary school and college students. 🇳🇬
			</p>
		</div>

		<div class="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-10">
			{#each features as feature}
				<div
					class="glass-card hover:border-gold/30 group flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-2 sm:p-10 lg:p-12"
				>
					<div
						class="from-cobalt to-cobalt-dark mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br text-4xl shadow-2xl transition-transform group-hover:scale-110 group-hover:rotate-3"
					>
						{feature.emoji}
					</div>
					<h3
						class="font-sora font-800 group-hover:text-gold mb-4 text-xl text-white transition-colors sm:text-2xl"
					>
						{feature.title}
					</h3>
					<p
						class="mb-8 flex-grow overflow-hidden text-base leading-relaxed text-wrap text-white/50 sm:text-lg"
					>
						{feature.desc}
					</p>

					<div class="border-white/05 mt-auto flex flex-wrap items-center gap-3 border-t pt-6">
						{#if feature.badges}
							{#each feature.badges as badge}
								<span
									class="bg-white/05 rounded-lg border border-white/10 px-3 py-1 text-[10px] font-bold tracking-wider text-white/60 uppercase sm:text-xs"
									>{badge}</span
								>
							{/each}
						{:else if feature.stats}
							<div class="w-full">
								<div class="mb-2 flex justify-between text-xs font-bold">
									<span class="tracking-widest text-white/40 uppercase">{feature.stats.label}</span>
									<span class="text-jade">{feature.stats.val}</span>
								</div>
								<div class="bg-white/05 h-1.5 w-full overflow-hidden rounded-full">
									<div
										class="bg-jade h-full rounded-full shadow-[0_0_10px_rgba(80,200,120,0.5)]"
										style="width:{feature.stats.val}"
									></div>
								</div>
							</div>
						{:else if feature.rating}
							<div class="flex items-center gap-2">
								<span class="text-gold">⭐⭐⭐⭐⭐</span>
								<span class="text-xs font-bold text-white/40">{feature.rating}</span>
							</div>
						{:else if feature.meta}
							<div class="flex items-center gap-2">
								<span class="bg-jade h-2 w-2 animate-pulse rounded-full"></span>
								<span class="text-xs font-bold tracking-widest text-white/40 uppercase"
									>{feature.meta}</span
								>
							</div>
						{:else if feature.plan}
							<div class="flex w-full flex-col gap-1.5">
								{#each feature.plan as item}
									<div
										class="flex items-center gap-2 text-[10px] font-medium text-white/50 sm:text-xs"
									>
										<span class="text-gold">✔</span>
										{item}
									</div>
								{/each}
							</div>
						{:else if feature.tags}
							{#each feature.tags as tag}
								<span
									class="bg-jade/10 border-jade/20 text-jade rounded-lg border px-3 py-1 text-[10px] font-bold tracking-wider uppercase"
									>{tag}</span
								>
							{/each}
						{:else if feature.badge}
							<span
								class="bg-gold/10 border-gold/20 text-gold rounded-full border px-4 py-1.5 text-[10px] font-black tracking-[0.15em] uppercase"
								>{feature.badge}</span
							>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
