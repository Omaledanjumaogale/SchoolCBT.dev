<script lang="ts">
	import { Heart, Globe2, ShieldCheck, Zap, Brain, Users, ArrowRight } from 'lucide-svelte';

	const values = [
		{
			icon: Brain,
			title: 'AI-First Education',
			desc: 'Multi-agent orchestration ensures every student gets personalized, curriculum-accurate practice — never generic content.',
			color: 'hsl(145,100%,39%)'
		},
		{
			icon: ShieldCheck,
			title: 'Accuracy Guaranteed',
			desc: '99.1% curriculum-grounding rate validated by a dedicated Quality Evaluator agent against NERDC, WAEC, and JAMB syllabuses.',
			color: 'hsl(174,60%,28%)'
		},
		{
			icon: Heart,
			title: 'Nigerian Students First',
			desc: 'Built specifically for JSS and SSS students navigating the Nigerian examination system — not adapted from foreign platforms.',
			color: 'hsl(0,70%,55%)'
		},
		{
			icon: Users,
			title: 'Community of Success',
			desc: "Students, tutors, and parents in one platform. Every stakeholder has a role in the student's journey to exam success.",
			color: 'hsl(262,80%,60%)'
		},
		{
			icon: Zap,
			title: 'Results as a Service',
			desc: "We don't just give you practice tests — we orchestrate your entire path to exam readiness through AI intelligence.",
			color: 'hsl(var(--accent))'
		},
		{
			icon: Globe2,
			title: 'Global Infrastructure',
			desc: 'Powered by an enterprise-grade elastic engine delivering fast, reliable access across Nigeria and beyond.',
			color: 'hsl(210,80%,55%)'
		}
	];

	const team = [
		{ name: 'EwinProject Team', role: 'Product & Engineering', avatar: 'EP' },
		{ name: 'AI Research', role: 'Curriculum & Accuracy', avatar: 'AI' },
		{ name: 'Education Board', role: 'NERDC Advisors', avatar: 'EB' }
	];
</script>

<svelte:head>
	<title>About SchoolCBT – Our Mission & Story</title>
	<meta
		name="description"
		content="SchoolCBT is Nigeria's premier AI-powered Results-as-a-Service CBT platform. Learn about our mission and AI architecture."
	/>
</svelte:head>

<div class="bg-background min-h-[calc(100vh-64px)] py-16">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- Hero -->
		<div class="mx-auto mb-20 max-w-4xl text-center">
			<div class="section-badge mb-5">Our Story</div>
			<h1
				class="text-foreground mb-6 text-4xl leading-[1.15] font-black tracking-tight md:text-5xl"
			>
				Built to <span class="gradient-text-primary">Guarantee</span> Exam Success<br />for Every
				Nigerian Student
			</h1>
			<p class="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed">
				SchoolCBT was born from a simple observation: Nigerian students have access to thousands of
				practice questions, but very few get the intelligent, personalized feedback needed to
				actually improve. We built the missing layer — an AI engine that doesn't just test, it
				teaches.
			</p>
		</div>

		<!-- Mission stat strip -->
		<div class="mb-20 grid grid-cols-2 gap-5 md:grid-cols-4">
			{#each [{ label: 'Students Enrolled', value: '18,000+', color: 'hsl(145,100%,39%)' }, { label: 'Questions in Database', value: '1.2M+', color: 'hsl(var(--accent))' }, { label: 'Curriculum Accuracy', value: '99.1%', color: 'hsl(174,60%,28%)' }, { label: 'Exams Covered', value: '5+', color: 'hsl(262,80%,60%)' }] as s}
				<div class="glass-panel card-hover p-6 text-center">
					<div class="mb-1 text-3xl font-black" style="color:{s.color}">{s.value}</div>
					<div class="text-muted-foreground text-sm font-medium">{s.label}</div>
				</div>
			{/each}
		</div>

		<!-- Values -->
		<div class="mb-20">
			<div class="mb-12 text-center">
				<div class="section-badge mb-4">Our Values</div>
				<h2 class="text-foreground text-3xl font-black">What We Stand For</h2>
			</div>
			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each values as v}
					<div class="glass-panel card-hover flex flex-col gap-4 p-6">
						<div
							class="flex h-12 w-12 items-center justify-center rounded-xl"
							style="background:{v.color}12; border:1px solid {v.color}33"
						>
							<v.icon class="h-6 w-6" style="color:{v.color}" />
						</div>
						<div>
							<h3 class="text-foreground mb-2 font-bold">{v.title}</h3>
							<p class="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Architecture note -->
		<div
			class="glass-panel to-card mb-20 border-[hsl(var(--primary)/0.2)] bg-gradient-to-br from-[hsl(var(--primary)/0.04)] p-8 md:p-12"
		>
			<div class="mx-auto max-w-3xl text-center">
				<div class="section-badge mb-5">AI Architecture</div>
				<h2 class="text-foreground mb-5 text-2xl font-black">
					Powered by Multi-Agent Intelligence
				</h2>
				<p class="text-muted-foreground mb-6 leading-relaxed">
					SchoolCBT's engine uses 5 specialized agents — a Coordinator, Intake Agent, Researcher,
					Question Composer, and Quality Evaluator — working together on a high-availability infrastructure to produce
					curriculum-verified CBT content at scale. Every question batch is generated fresh,
					grounded in official Nigerian exam syllabuses, and validated for accuracy before delivery.
				</p>

			</div>
		</div>

		<!-- CTA -->
		<div class="text-center">
			<h2 class="text-foreground mb-4 text-2xl font-black">
				Join 18,000+ students preparing smarter
			</h2>
			<p class="text-muted-foreground mb-8">
				Start free. No credit card required. Get your first AI-curated batch today.
			</p>
			<div class="flex flex-col justify-center gap-4 sm:flex-row">
				<a href="/auth/signup" class="btn-primary rounded-2xl px-8 py-4 text-base"
					>Create Free Account <ArrowRight class="ml-1 h-5 w-5" /></a
				>
				<a href="/exam" class="btn-outline rounded-2xl px-8 py-4 text-base">Try CBT Demo</a>
			</div>
		</div>
	</div>
</div>
