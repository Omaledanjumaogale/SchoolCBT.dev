<script lang="ts">
	import { onMount } from 'svelte';
	import {
		LayoutDashboard,
		BookOpen,
		LineChart,
		FileText,
		Users,
		Settings,
		Bell,
		TrendingUp,
		Award,
		Target,
		Clock,
		ChevronRight,
		Play,
		Download
	} from 'lucide-svelte';
	import { authStore } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
	import Tooltip from '$lib/components/Tooltip.svelte';

	let activeTab = $state('overview');

	onMount(() => {
		// Redirect if not authenticated (non-blocking, allows demo view)
	});

	const tabs = [
		{ id: 'overview', label: 'Overview', icon: LayoutDashboard },
		{ id: 'analytics', label: 'Analytics', icon: LineChart },
		{ id: 'study', label: 'Study', icon: BookOpen },
		{ id: 'reports', label: 'Reports', icon: FileText },
		{ id: 'tutors', label: 'Tutors', icon: Users }
	];

	const stats = [
		{
			label: 'Batches Completed',
			value: '24',
			change: '+3 this week',
			icon: BookOpen,
			color: 'hsl(145,100%,39%)'
		},
		{
			label: 'Average Score',
			value: '78%',
			change: '+4% improvement',
			icon: TrendingUp,
			color: 'hsl(var(--accent))'
		},
		{
			label: 'Pass Probability',
			value: '87%',
			change: 'JAMB 2025',
			icon: Target,
			color: 'hsl(174,60%,28%)'
		},
		{
			label: 'Study Streak',
			value: '12 days',
			change: 'Keep it up! 🔥',
			icon: Award,
			color: 'hsl(262,80%,60%)'
		}
	];

	const subjects = [
		{ name: 'Mathematics', score: 82, batches: 8, trend: 'up', color: 'hsl(145,100%,39%)' },
		{ name: 'Physics', score: 74, batches: 6, trend: 'up', color: 'hsl(174,60%,28%)' },
		{ name: 'Chemistry', score: 69, batches: 5, trend: 'down', color: 'hsl(var(--accent))' },
		{ name: 'English', score: 91, batches: 5, trend: 'up', color: 'hsl(210,80%,55%)' }
	];

	const recentBatches = [
		{
			subject: 'Mathematics',
			topic: 'Algebra & Sets',
			score: 44,
			total: 50,
			date: 'Today',
			time: '14:22'
		},
		{
			subject: 'Physics',
			topic: 'Motion & Forces',
			score: 38,
			total: 50,
			date: 'Yesterday',
			time: '10:05'
		},
		{
			subject: 'Chemistry',
			topic: 'Organic Compounds',
			score: 32,
			total: 50,
			date: '2 days ago',
			time: '16:40'
		}
	];

	const awards = [
		{ title: 'Math Star', desc: '90%+ in any Math batch', earned: true, icon: '⭐' },
		{ title: 'Streak Master', desc: '10-day study streak', earned: true, icon: '🔥' },
		{ title: 'Perfect Score', desc: '50/50 in any batch', earned: false, icon: '🏆' },
		{ title: 'Speed Demon', desc: 'Avg under 20s/question', earned: false, icon: '⚡' }
	];

	const weeklyData = [65, 72, 68, 80, 78, 85, 87];
	const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	const maxVal = Math.max(...weeklyData);

	const displayName = $derived(
		$authStore.user?.displayName ?? $authStore.user?.email?.split('@')[0] ?? 'Student'
	);
</script>

<svelte:head>
	<title>Dashboard – SchoolCBT</title>
	<meta
		name="description"
		content="Your SchoolCBT student dashboard — track progress, analytics, and study plans."
	/>
</svelte:head>

<div class="bg-background min-h-[calc(100vh-64px)]">
	<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
		<!-- Header -->
		<div class="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
			<div>
				<h1 class="text-foreground text-2xl font-black">Welcome back, {displayName} 👋</h1>
				<p class="text-muted-foreground mt-1 text-sm">
					JAMB 2025 · Physics, Mathematics, Chemistry, English
				</p>
			</div>
			<div class="flex gap-3">
				<button class="btn-ghost relative rounded-xl px-3 py-2.5">
					<Bell class="h-5 w-5" />
					<span
						class="border-card absolute top-1.5 right-1.5 h-2 w-2 rounded-full border-2 bg-red-500"
					></span>
				</button>
				<a href="/exam" class="btn-primary rounded-xl px-5 py-2.5 text-sm">
					<Play class="h-4 w-4" /> Start CBT Batch
				</a>
			</div>
		</div>

		<!-- Pass Probability Banner -->
		<div
			class="mb-8 rounded-2xl border border-[hsl(var(--primary)/0.25)] bg-gradient-to-br from-[hsl(var(--primary)/0.06)] to-[hsl(174,60%,28%,0.04)] p-6"
		>
			<div class="flex flex-col gap-6 md:flex-row md:items-center">
				<div class="flex-grow">
					<div class="mb-2 flex items-center gap-2">
						<Target class="h-5 w-5 text-[hsl(var(--primary))]" />
						<span class="text-sm font-bold tracking-wider text-[hsl(var(--primary))] uppercase"
							>Predictive Pass Analysis</span
						>
						<Tooltip text="Our AI analyzes your performance vector trends across CBT batches to calculate real-world probability scoring." />
					</div>
					<h3 class="text-foreground mb-1 text-xl font-black">87% chance of passing JAMB 2025</h3>
					<p class="text-muted-foreground text-sm">
						Improve Chemistry by 12 points to reach 95% probability. Focus on Organic Compounds this
						week.
					</p>
				</div>
				<div class="flex shrink-0 items-center gap-6">
					<div class="text-center">
						<div class="text-4xl font-black text-[hsl(var(--primary))]">87%</div>
						<div class="text-muted-foreground mt-1 text-xs font-semibold">Pass Probability</div>
					</div>
					<div
						class="progress-bar hidden w-32 origin-center rotate-[-90deg] sm:block"
						style="height:8px"
					>
						<div class="progress-bar-fill" style="width:87%"></div>
					</div>
				</div>
			</div>
		</div>

		<!-- Stats grid -->
		<div class="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
			{#each stats as stat}
				<div class="glass-panel card-hover p-5">
					<div class="mb-3 flex items-start justify-between">
						<div
							class="flex h-10 w-10 items-center justify-center rounded-xl"
							style="background:{stat.color}15"
						>
							<stat.icon class="h-5 w-5" style="color:{stat.color}" />
						</div>
					</div>
					<div class="text-foreground mb-0.5 text-2xl font-black">{stat.value}</div>
					<div class="text-muted-foreground text-xs font-medium flex items-center">
						{stat.label}
						{#if stat.label === 'Pass Probability'}
							<Tooltip text="Combined real-time odds modeled against historic exam passing thresholds." />
						{:else if stat.label === 'Study Streak'}
							<Tooltip text="Maintaining streaks boosts your algorithm visibility and mastery rates." />
						{/if}
					</div>
					<div class="mt-1 text-xs font-semibold" style="color:{stat.color}">{stat.change}</div>
				</div>
			{/each}
		</div>

		<!-- Tab navigation -->
		<div class="border-border no-scrollbar mb-8 flex gap-1 overflow-x-auto border-b">
			{#each tabs as tab}
				<button
					class="tab-btn px-4 {activeTab === tab.id ? 'active' : ''}"
					onclick={() => (activeTab = tab.id)}
				>
					<tab.icon class="h-4 w-4" />{tab.label}
				</button>
			{/each}
		</div>

		<!-- Tab content -->
		{#if activeTab === 'overview'}
			<div class="grid gap-6 lg:grid-cols-3">
				<!-- Subject Progress -->
				<div class="glass-panel p-6 lg:col-span-2">
					<h3 class="text-foreground mb-5 text-base font-bold">Subject Performance</h3>
					<div class="space-y-5">
						{#each subjects as sub}
							<div>
								<div class="mb-2 flex items-center justify-between">
									<span class="text-foreground text-sm font-bold">{sub.name}</span>
									<div class="flex items-center gap-3">
										<span class="text-muted-foreground text-xs">{sub.batches} batches</span>
										<span class="text-sm font-black" style="color:{sub.color}">{sub.score}%</span>
										<span
											class="text-xs"
											style="color:{sub.trend === 'up' ? 'hsl(145,100%,39%)' : 'hsl(0,84%,55%)'}"
										>
											{sub.trend === 'up' ? '↑' : '↓'}
										</span>
									</div>
								</div>
								<div class="progress-bar">
									<div
										class="progress-bar-fill"
										style="width:{sub.score}%; background:{sub.color}"
									></div>
								</div>
							</div>
						{/each}
					</div>
				</div>

				<!-- Awards -->
				<div class="glass-panel p-6">
					<h3 class="text-foreground mb-5 text-base font-bold">Recent Awards</h3>
					<div class="grid grid-cols-2 gap-3">
						{#each awards as award}
							<div
								class="rounded-xl border p-3 text-center transition-all {award.earned
									? 'border-[hsl(var(--accent)/0.4)] bg-[hsl(var(--accent)/0.06)]'
									: 'border-border opacity-40'}"
							>
								<div class="mb-1 text-2xl">{award.icon}</div>
								<p class="text-foreground text-xs font-bold">{award.title}</p>
								<p class="text-muted-foreground mt-0.5 text-[10px]">{award.desc}</p>
							</div>
						{/each}
					</div>
				</div>

				<!-- Recent Batches -->
				<div class="glass-panel p-6 lg:col-span-2">
					<div class="mb-5 flex items-center justify-between">
						<h3 class="text-foreground text-base font-bold">Recent Batches</h3>
						<a
							href="/dashboard"
							class="text-xs font-bold text-[hsl(var(--primary))] hover:underline">View all</a
						>
					</div>
					<div class="space-y-3">
						{#each recentBatches as batch}
							<div
								class="border-border bg-card flex items-center gap-4 rounded-xl border p-4 transition-all hover:border-[hsl(var(--primary)/0.3)]"
							>
								<div
									class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--primary)/0.1)]"
								>
									<BookOpen class="h-5 w-5 text-[hsl(var(--primary))]" />
								</div>
								<div class="min-w-0 flex-grow">
									<p class="text-foreground truncate text-sm font-bold">{batch.subject}</p>
									<p class="text-muted-foreground text-xs">{batch.topic}</p>
								</div>
								<div class="shrink-0 text-right">
									<p class="text-foreground text-sm font-black">{batch.score}/{batch.total}</p>
									<p class="text-muted-foreground text-xs">{batch.date}</p>
								</div>
								<div
									class="text-sm font-bold {batch.score / batch.total >= 0.75
										? 'text-[hsl(145,100%,39%)]'
										: batch.score / batch.total >= 0.5
											? 'text-[hsl(var(--accent))]'
											: 'text-[hsl(0,84%,55%)]'}"
								>
									{Math.round((batch.score / batch.total) * 100)}%
								</div>
							</div>
						{/each}
					</div>
				</div>

				<!-- Weekly Chart -->
				<div class="glass-panel p-6">
					<h3 class="text-foreground mb-5 text-base font-bold">Weekly Score Trend</h3>
					<div class="flex h-32 items-end justify-between gap-2">
						{#each weeklyData as val, i}
							<div class="flex flex-1 flex-col items-center gap-1">
								<div
									class="w-full rounded-t-lg transition-all hover:opacity-80"
									style="height:{Math.round(
										(val / maxVal) * 100
									)}%; background:hsl(145,100%,39%); min-height:8px"
								></div>
								<span class="text-muted-foreground text-[10px] font-medium">{days[i]}</span>
							</div>
						{/each}
					</div>
					<div class="mt-4 flex items-center justify-between text-xs">
						<span class="text-muted-foreground"
							>7-day average: <strong class="text-foreground">76%</strong></span
						>
						<span class="font-bold text-[hsl(var(--primary))]">↑ +11pts</span>
					</div>
				</div>
			</div>
		{:else if activeTab === 'analytics'}
			<div class="glass-panel p-8 text-center">
				<LineChart class="mx-auto mb-4 h-12 w-12 text-[hsl(var(--primary))]" />
				<h3 class="text-foreground mb-2 text-lg font-bold">Detailed Analytics</h3>
				<p class="text-muted-foreground mb-6 text-sm">
					Full topic-by-topic breakdown, time-per-question analysis, and predictive score
					trajectories.
				</p>
				<a href="/auth/signup" class="btn-primary inline-flex rounded-xl px-6 py-3 text-sm"
					>Unlock Full Analytics</a
				>
			</div>
		{:else if activeTab === 'study'}
			<div class="grid gap-6 md:grid-cols-2">
				<div class="glass-panel p-6">
					<h3 class="text-foreground mb-4 text-base font-bold">AI Study Plan — Week 3</h3>
					<div class="space-y-3">
						{#each [{ day: 'Mon', topic: 'Sets & Number Theory', done: true }, { day: 'Tue', topic: 'Quadratic Equations', done: true }, { day: 'Wed', topic: 'Trigonometry Basics', done: false }, { day: 'Thu', topic: 'Organic Chemistry', done: false }, { day: 'Fri', topic: "Newton's Laws", done: false }] as item}
							<div
								class="flex items-center gap-3 rounded-xl border p-3 {item.done
									? 'border-[hsl(145,100%,39%,0.3)] bg-[hsl(145,100%,39%,0.05)]'
									: 'border-border'}"
							>
								<div
									class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold {item.done
										? 'bg-[hsl(145,100%,39%)] text-white'
										: 'bg-muted text-muted-foreground'}"
								>
									{item.done ? '✓' : item.day}
								</div>
								<span
									class="text-sm font-medium {item.done
										? 'text-muted-foreground line-through'
										: 'text-foreground'}">{item.topic}</span
								>
								{#if !item.done}
									<a
										href="/exam"
										class="btn-ghost ml-auto rounded-lg px-3 py-1.5 text-xs text-[hsl(var(--primary))]"
										>Start →</a
									>
								{/if}
							</div>
						{/each}
					</div>
				</div>
				<div class="glass-panel p-6">
					<h3 class="text-foreground mb-4 text-base font-bold">Quick Start CBT</h3>
					<div class="space-y-3">
						{#each subjects as sub}
							<div
								class="border-border flex items-center justify-between rounded-xl border p-4 transition-all hover:border-[hsl(var(--primary)/0.4)]"
							>
								<div>
									<p class="text-foreground text-sm font-bold">{sub.name}</p>
									<p class="text-muted-foreground text-xs">50 questions · 50s each</p>
								</div>
								<a href="/exam" class="btn-primary rounded-xl px-4 py-2 text-xs">Start</a>
							</div>
						{/each}
					</div>
				</div>
			</div>
		{:else if activeTab === 'reports'}
			<div class="glass-panel p-6">
				<div class="mb-6 flex items-center justify-between">
					<h3 class="text-foreground text-base font-bold">Performance Reports</h3>
					<button class="btn-outline gap-2 rounded-xl px-4 py-2 text-xs">
						<Download class="h-3.5 w-3.5" /> Export PDF
					</button>
				</div>
				<div class="space-y-3">
					{#each recentBatches as batch, i}
						<div class="border-border flex items-center gap-4 rounded-xl border p-4">
							<div
								class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--primary)/0.1)] text-sm font-black text-[hsl(var(--primary))]"
							>
								{Math.round((batch.score / batch.total) * 100)}
							</div>
							<div class="flex-grow">
								<p class="text-foreground text-sm font-bold">{batch.subject} — {batch.topic}</p>
								<p class="text-muted-foreground text-xs">{batch.date} at {batch.time}</p>
							</div>
							<span
								class="text-sm font-bold {batch.score / batch.total >= 0.75
									? 'text-[hsl(145,100%,39%)]'
									: 'text-[hsl(var(--accent))]'}">{batch.score}/{batch.total}</span
							>
						</div>
					{/each}
				</div>
			</div>
		{:else if activeTab === 'tutors'}
			<div class="glass-panel p-8 text-center">
				<Users class="mx-auto mb-4 h-12 w-12 text-[hsl(var(--primary))]" />
				<h3 class="text-foreground mb-2 text-lg font-bold">Find Your AI-Matched Tutor</h3>
				<p class="text-muted-foreground mx-auto mb-6 max-w-md text-sm">
					Based on your Chemistry weakness, we've identified 3 qualified tutors ready for 1-on-1
					sessions.
				</p>
				<a
					href="/auth/signup?plan=premium"
					class="btn-gold inline-flex gap-2 rounded-xl px-6 py-3 text-sm"
				>
					Upgrade to Student + Tutor Plan
				</a>
			</div>
		{/if}
	</div>
</div>
