<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Features from '$lib/components/Features.svelte';
	import Curriculum from '$lib/components/Curriculum.svelte';
	import CBTDemo from '$lib/components/CBTDemo.svelte';
	import DashboardPreview from '$lib/components/DashboardPreview.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import SEO from '$lib/components/SEO.svelte';
</script>

<SEO 
	title="SchoolCBT - Free JSS & SSS Exam Practice Web App | Results as a Service"
	description="Try this free CBT practice app to ace your JAMB, WAEC & NECO exams instantly—no signup needed for demo. 1.2M+ curriculum-grounded questions."
/>

<Header />

<main class="flex-grow">
	<Hero />
	<Features />
	<Curriculum />

	<!-- How It Works Section (Simplified for main page) -->
	<section id="how-it-works" class="py-24 bg-mesh relative overflow-hidden">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-16">
				<div class="sec-badge">⚙️ Process</div>
				<h2 class="font-sora text-4xl font-bold text-white mt-3 mb-4">
					How <span class="text-gold">SchoolCBT</span> Delivers Results
				</h2>
				<p class="text-white/50 max-w-xl mx-auto">
					From sign-up to exam readiness in four intelligent steps, powered by multi-agent AI
					orchestration.
				</p>
			</div>

			<!-- Steps -->
			<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative mb-16">
				<div
					class="hidden lg:block absolute top-11 left-[13%] right-[13%] h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent z-0 pointer-events-none"
				></div>

				{#each [{ num: '1', emoji: '📝', title: 'Sign Up & Profile', desc: 'Create account, submit details, school info, and upload academic reports for AI personalisation.' }, { num: '2', emoji: '🤖', title: 'AI Orchestration', desc: '5 specialized agents analyze your profile and ground questions against Nigerian curricula and exam goals.' }, { num: '3', emoji: '✏️', title: 'Take CBT Exams', desc: '50-question batches, 50s timer per question, instant feedback. Earn awards for 75%+ scores.' }, { num: '4', emoji: '📈', title: 'Track & Improve', desc: 'Review AI report cards, follow study plans, request tutor support, and watch pass probability grow.' }] as step}
					<div class="glass-card p-8 text-center relative z-10 hover:border-gold/30 transition-all">
						<div
							class="w-14 h-14 rounded-full bg-gradient-to-br from-cobalt-light to-cobalt border-2 border-gold/40 flex items-center justify-center mx-auto mb-6 font-sora font-bold text-gold text-xl glow-gold"
						>
							{step.num}
						</div>
						<div class="text-3xl mb-4">{step.emoji}</div>
						<h3 class="text-white font-bold text-lg mb-3">{step.title}</h3>
						<p class="text-white/45 text-sm leading-relaxed">{step.desc}</p>
					</div>
				{/each}
			</div>

			<!-- AI Engine Deep Dive -->
			<div class="glass-card p-8 sm:p-12 relative overflow-hidden group">
				<div class="absolute top-0 right-0 p-10 text-8xl opacity-05 group-hover:scale-110 transition-transform">🤖</div>
				<div class="grid lg:grid-cols-2 gap-12 items-center relative z-10">
					<div>
						<div class="sec-badge">🧠 Multi-Agent RaaS Engine</div>
						<h3 class="font-sora text-3xl font-bold text-white mt-3 mb-6">
							Powered by 5 Specialized AI Agents
						</h3>
						<p class="text-white/50 text-base leading-relaxed mb-8">
							Our proprietary engine orchestrates intelligent agents that work in concert to
							generate, validate, and deliver curriculum-accurate examination content with 90%+
							grounding accuracy.
						</p>
						<div class="space-y-4">
							{#each [{ emoji: '🎯', name: 'Coordinator Agent', desc: 'Central intake — decomposes student profile into specialized tasks' }, { emoji: '📥', name: 'Intake Agent', desc: 'Extracts level, subjects, exam goals from uploaded academic reports' }, { emoji: '🔬', name: 'Researcher Agent', desc: 'Pulls from Nigerian curricula RAG with verified West African content' }, { emoji: '✍️', name: 'Question Composer', desc: 'Generates randomised 50-question batches using COSTAR method + Bloom\'s Taxonomy' }, { emoji: '✅', name: 'Quality Evaluator', desc: 'Ensures 90%+ grounding accuracy. Catch errors before delivery.' }] as agent}
								<div
									class="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/03 transition-all border border-transparent hover:border-white/05"
								>
									<span
										class="w-10 h-10 rounded-xl bg-cobalt/60 border border-cobalt-light/40 flex items-center justify-center text-lg shrink-0"
										>{agent.emoji}</span
									>
									<div>
										<div class="text-white font-bold text-sm">{agent.name}</div>
										<div class="text-white/40 text-xs mt-1 leading-relaxed">{agent.desc}</div>
									</div>
								</div>
							{/each}
						</div>
					</div>
					<div class="space-y-4">
						{#each [{ emoji: '🧠', name: 'Anthropic Claude', meta: 'Powering question generation & analysis' }, { emoji: '☁️', name: 'Google Vertex AI', meta: 'Gemini 1.5 Pro multimodal report analysis' }, { emoji: '🗄️', name: 'Vector RAG Database', meta: 'Multi-tenant knowledge base with curriculum metadata' }, { emoji: '💳', name: 'Flutterwave Payments', meta: 'Secure Naira payments and tutor payouts' }, { emoji: '🛡️', name: 'Model Armor', meta: 'Input/output sanitization against prompt injection' }] as tech}
							<div class="stat-card p-5 flex items-center gap-5 hover:border-jade/30 transition-all">
								<div
									class="w-12 h-12 rounded-xl bg-cobalt/60 flex items-center justify-center text-2xl shrink-0"
								>
									{tech.emoji}
								</div>
								<div class="flex-grow">
									<div class="text-white font-bold text-sm sm:text-base">{tech.name}</div>
									<div class="text-white/40 text-xs mt-1">{tech.meta}</div>
								</div>
								<span class="badge badge-jade ml-auto shrink-0 font-bold">ACTIVE</span>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>

	<CBTDemo />
	<DashboardPreview />
</main>

<Footer />
