<script lang="ts">
	import { onMount } from 'svelte';
	import {
		LayoutDashboard,
		BookOpen,
		LineChart,
		FileText,
		Users,
		Bell,
		TrendingUp,
		Award,
		Target,
		Clock,
		Play,
		Download,
		Brain,
		ChevronRight,
		CheckCircle2,
		AlertCircle,
		BarChart2,
		Calendar,
		Settings,
		Zap
	} from 'lucide-svelte';
	import { authStore } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
	import Tooltip from '$lib/components/Tooltip.svelte';

	let activeTab = $state('overview');

	// Redirect if not authenticated
	onMount(() => {
		const unsub = authStore.subscribe((s) => {
			if (!s.loading && !s.user) {
				goto('/auth/login?role=student&redirect=/dashboard');
			}
		});
		return unsub;
	});

	const tabs = [
		{ id: 'overview', label: 'Overview', icon: LayoutDashboard },
		{ id: 'analytics', label: 'Analytics', icon: LineChart },
		{ id: 'study', label: 'Study Plan', icon: BookOpen },
		{ id: 'reports', label: 'Reports', icon: FileText },
		{ id: 'tutors', label: 'Tutors', icon: Users }
	];

	const stats = [
		{ label: 'Batches Done', value: '24', change: '+3 this week', icon: BookOpen, color: 'hsl(145,100%,39%)' },
		{ label: 'Average Score', value: '78%', change: '+4% improvement', icon: TrendingUp, color: 'hsl(var(--accent))' },
		{ label: 'Pass Probability', value: '87%', change: 'JAMB 2025', icon: Target, color: 'hsl(174,60%,28%)' },
		{ label: 'Study Streak', value: '12 days', change: 'Keep it up! 🔥', icon: Award, color: 'hsl(262,80%,60%)' }
	];

	const subjects = [
		{ name: 'Mathematics', score: 82, batches: 8, trend: 'up', color: 'hsl(145,100%,39%)' },
		{ name: 'Physics', score: 74, batches: 6, trend: 'up', color: 'hsl(174,60%,28%)' },
		{ name: 'Chemistry', score: 69, batches: 5, trend: 'down', color: 'hsl(var(--accent))' },
		{ name: 'English', score: 91, batches: 5, trend: 'up', color: 'hsl(210,80%,55%)' }
	];

	const recentBatches = [
		{ subject: 'Mathematics', topic: 'Algebra & Sets', score: 44, total: 50, date: 'Today', time: '14:22', pct: 88 },
		{ subject: 'Physics', topic: 'Motion & Forces', score: 38, total: 50, date: 'Yesterday', time: '10:05', pct: 76 },
		{ subject: 'Chemistry', topic: 'Organic Compounds', score: 32, total: 50, date: '2 days ago', time: '16:40', pct: 64 }
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

	// Study plan
	const studyPlan = [
		{ day: 'Mon', topic: 'Sets & Number Theory', done: true, subject: 'Mathematics' },
		{ day: 'Tue', topic: 'Quadratic Equations', done: true, subject: 'Mathematics' },
		{ day: 'Wed', topic: 'Trigonometry Basics', done: false, subject: 'Mathematics' },
		{ day: 'Thu', topic: 'Organic Chemistry', done: false, subject: 'Chemistry' },
		{ day: 'Fri', topic: "Newton's Laws", done: false, subject: 'Physics' },
		{ day: 'Sat', topic: 'Comprehension Practice', done: false, subject: 'English' },
		{ day: 'Sun', topic: 'Mixed Review Session', done: false, subject: 'All Subjects' }
	];

	// Analytics data
	const topicBreakdown = [
		{ topic: 'Sets & Logic', score: 92, attempts: 5 },
		{ topic: 'Quadratic Equations', score: 84, attempts: 4 },
		{ topic: "Organic Chemistry", score: 61, attempts: 3 },
		{ topic: "Newton's Laws", score: 78, attempts: 4 },
		{ topic: "Essay Writing", score: 88, attempts: 2 }
	];

	// Tutors
	const tutors = [
		{ name: 'Dr. Amina Hassan', subjects: ['Chemistry', 'Biology'], rating: 4.9, sessions: 142, rate: '₦3,500/hr', available: true },
		{ name: 'Mr. Emeka Okafor', subjects: ['Mathematics', 'Physics'], rating: 4.8, sessions: 203, rate: '₦2,800/hr', available: true },
		{ name: 'Ms. Fatimah Bello', subjects: ['English', 'Literature'], rating: 4.7, sessions: 98, rate: '₦2,500/hr', available: false }
	];

	const displayName = $derived(
		$authStore.user?.displayName ?? $authStore.user?.email?.split('@')[0] ?? 'Student'
	);
</script>

<svelte:head>
	<title>Dashboard – SchoolCBT</title>
	<meta name="description" content="Your SchoolCBT student dashboard — track progress, analytics, and study plans." />
</svelte:head>

<div class="bg-background min-h-[calc(100vh-64px)]">
	<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

		<!-- ── Page Header ──────────────────────────────────── -->
		<div class="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
			<div>
				<h1 class="text-foreground text-2xl font-black">Welcome back, {displayName} 👋</h1>
				<p class="text-muted-foreground mt-1 text-sm">JAMB 2025 · Physics, Mathematics, Chemistry, English</p>
			</div>
			<div class="flex gap-3">
				<button
					class="btn-ghost relative rounded-xl px-3 py-2.5"
					aria-label="Notifications"
					onclick={() => {}}
				>
					<Bell class="h-5 w-5" />
					<span class="border-card absolute top-1.5 right-1.5 h-2 w-2 rounded-full border-2 bg-red-500"></span>
				</button>
				<a href="/exam" class="btn-primary rounded-xl px-5 py-2.5 text-sm" id="start-cbt-btn">
					<Play class="h-4 w-4" /> Start CBT Session
				</a>
			</div>
		</div>

		<!-- ── Pass Probability Banner ──────────────────────── -->
		<div class="mb-8 rounded-2xl border border-[hsl(var(--primary)/0.25)] bg-gradient-to-br from-[hsl(var(--primary)/0.06)] to-[hsl(174,60%,28%,0.04)] p-6">
			<div class="flex flex-col gap-6 md:flex-row md:items-center">
				<div class="flex-grow">
					<div class="mb-2 flex items-center gap-2">
						<Target class="h-5 w-5 text-[hsl(var(--primary))]" />
						<span class="text-sm font-bold tracking-wider text-[hsl(var(--primary))] uppercase">Predictive Pass Analysis</span>
						<Tooltip text="Our AI analyzes your performance trends to calculate real-world pass probability. Updated after every session." />
					</div>
					<h3 class="text-foreground mb-1 text-xl font-black">87% chance of passing JAMB 2025</h3>
					<p class="text-muted-foreground text-sm">
						Improve Chemistry by 12 points to reach 95% probability. Focus on Organic Compounds this week.
					</p>
				</div>
				<div class="flex shrink-0 items-center gap-6">
					<div class="text-center">
						<div class="text-4xl font-black text-[hsl(var(--primary))]">87%</div>
						<div class="text-muted-foreground mt-1 text-xs font-semibold">Pass Probability</div>
					</div>
				</div>
			</div>
		</div>

		<!-- ── Stats Grid ─────────────────────────────────────── -->
		<div class="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
			{#each stats as stat}
				<div class="glass-panel card-hover p-5">
					<div class="mb-3 flex items-start justify-between">
						<div
							class="flex h-10 w-10 items-center justify-center rounded-xl"
							style="background:{stat.color}18"
						>
							<stat.icon class="h-5 w-5" style="color:{stat.color}" />
						</div>
					</div>
					<div class="text-foreground mb-0.5 text-2xl font-black">{stat.value}</div>
					<div class="text-muted-foreground flex items-center text-xs font-medium">
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

		<!-- ── Tab Navigation ─────────────────────────────────── -->
		<div class="border-border no-scrollbar mb-8 flex gap-1 overflow-x-auto border-b">
			{#each tabs as tab}
				<button
					id="tab-{tab.id}"
					class="tab-btn px-4 {activeTab === tab.id ? 'active' : ''}"
					onclick={() => (activeTab = tab.id)}
					aria-selected={activeTab === tab.id}
				>
					<tab.icon class="h-4 w-4" />{tab.label}
				</button>
			{/each}
		</div>

		<!-- ── Tab Content ─────────────────────────────────────── -->

		<!-- OVERVIEW TAB -->
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
										<span class="text-xs" style="color:{sub.trend === 'up' ? 'hsl(145,100%,39%)' : 'hsl(0,84%,55%)'}">
											{sub.trend === 'up' ? '↑ Up' : '↓ Down'}
										</span>
									</div>
								</div>
								<div class="progress-bar">
									<div class="progress-bar-fill" style="width:{sub.score}%; background:{sub.color}"></div>
								</div>
							</div>
						{/each}
					</div>
					<a href="/exam" class="btn-primary mt-6 w-full rounded-xl py-2.5 text-sm">
						<Play class="h-4 w-4" /> Start New CBT Session
					</a>
				</div>

				<!-- Awards -->
				<div class="glass-panel p-6">
					<h3 class="text-foreground mb-5 text-base font-bold">Achievements</h3>
					<div class="grid grid-cols-2 gap-3">
						{#each awards as award}
							<div class="rounded-xl border p-3 text-center transition-all {award.earned
								? 'border-[hsl(var(--accent)/0.4)] bg-[hsl(var(--accent)/0.06)]'
								: 'border-border opacity-40'}">
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
						<h3 class="text-foreground text-base font-bold">Recent Sessions</h3>
						<button onclick={() => (activeTab = 'reports')} class="text-xs font-bold text-[hsl(var(--primary))] hover:underline">
							View all →
						</button>
					</div>
					<div class="space-y-3">
						{#each recentBatches as batch}
							<div class="border-border bg-card flex items-center gap-4 rounded-xl border p-4 transition-all hover:border-[hsl(var(--primary)/0.3)]">
								<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--primary)/0.1)]">
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
								<div class="text-sm font-bold {batch.pct >= 75 ? 'text-[hsl(145,100%,39%)]' : batch.pct >= 50 ? 'text-[hsl(var(--accent))]' : 'text-[hsl(0,84%,55%)]'}">
									{batch.pct}%
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
									style="height:{Math.round((val / maxVal) * 100)}%; background:hsl(145,100%,39%); min-height:8px"
								></div>
								<span class="text-muted-foreground text-[10px] font-medium">{days[i]}</span>
							</div>
						{/each}
					</div>
					<div class="mt-4 flex items-center justify-between text-xs">
						<span class="text-muted-foreground">7-day avg: <strong class="text-foreground">76%</strong></span>
						<span class="font-bold text-[hsl(var(--primary))]">↑ +11pts</span>
					</div>
				</div>
			</div>

		<!-- ANALYTICS TAB -->
		{:else if activeTab === 'analytics'}
			<div class="grid gap-6 lg:grid-cols-2">
				<!-- Top/Weak topics -->
				<div class="glass-panel p-6">
					<h3 class="text-foreground mb-5 flex items-center gap-2 text-base font-bold">
						<BarChart2 class="h-5 w-5 text-[hsl(var(--primary))]" /> Topic Breakdown
					</h3>
					<div class="space-y-4">
						{#each topicBreakdown as item}
							<div>
								<div class="mb-1.5 flex items-center justify-between text-sm">
									<span class="text-foreground font-semibold">{item.topic}</span>
									<div class="flex items-center gap-2">
										<span class="text-muted-foreground text-xs">{item.attempts} attempts</span>
										<span class="font-black {item.score >= 75 ? 'text-[hsl(145,100%,39%)]' : item.score >= 50 ? 'text-[hsl(var(--accent))]' : 'text-[hsl(0,84%,55%)]'}">
											{item.score}%
										</span>
									</div>
								</div>
								<div class="progress-bar">
									<div class="progress-bar-fill" style="width:{item.score}%; background:{item.score >= 75 ? 'hsl(145,100%,39%)' : item.score >= 50 ? 'hsl(var(--accent))' : 'hsl(0,84%,55%)'}"></div>
								</div>
							</div>
						{/each}
					</div>
				</div>

				<!-- Score Distribution -->
				<div class="glass-panel p-6">
					<h3 class="text-foreground mb-5 flex items-center gap-2 text-base font-bold">
						<LineChart class="h-5 w-5 text-[hsl(var(--primary))]" /> Score Distribution
					</h3>
					<div class="flex h-40 items-end justify-between gap-2">
						{#each weeklyData as val, i}
							<div class="flex flex-1 flex-col items-center gap-1">
								<span class="text-muted-foreground text-[10px]">{val}%</span>
								<div
									class="w-full rounded-t-lg"
									style="height:{Math.round((val / maxVal) * 100)}%; background:linear-gradient(to top, hsl(var(--primary)), hsl(145,80%,55%)); min-height:6px"
								></div>
								<span class="text-muted-foreground text-[10px]">{days[i]}</span>
							</div>
						{/each}
					</div>
					<div class="mt-4 grid grid-cols-3 gap-3 text-center text-xs">
						<div class="bg-card rounded-lg border p-2">
							<div class="text-foreground font-black text-base">76%</div>
							<div class="text-muted-foreground">7-day avg</div>
						</div>
						<div class="bg-card rounded-lg border p-2">
							<div class="font-black text-base text-[hsl(145,100%,39%)]">87%</div>
							<div class="text-muted-foreground">Best score</div>
						</div>
						<div class="bg-card rounded-lg border p-2">
							<div class="font-black text-base text-[hsl(0,84%,55%)]">65%</div>
							<div class="text-muted-foreground">Lowest</div>
						</div>
					</div>
				</div>

				<!-- Weakest Areas -->
				<div class="glass-panel p-6 lg:col-span-2">
					<h3 class="text-foreground mb-4 flex items-center gap-2 text-base font-bold">
						<AlertCircle class="h-5 w-5 text-[hsl(var(--accent))]" /> Areas Needing Attention
					</h3>
					<div class="grid gap-3 sm:grid-cols-3">
						{#each [
							{ subject: 'Chemistry', topic: 'Organic Chemistry', priority: 'High', score: 61 },
							{ subject: 'Physics', topic: 'Electromagnetic Induction', priority: 'Medium', score: 68 },
							{ subject: 'Mathematics', topic: 'Integration', priority: 'Medium', score: 70 }
						] as weak}
							<div class="border-border rounded-xl border p-4">
								<div class="mb-2 flex items-center justify-between">
									<span class="rounded-lg bg-[hsl(var(--primary)/0.08)] px-2 py-0.5 text-xs font-bold text-[hsl(var(--primary))]">
										{weak.subject}
									</span>
									<span class="text-xs font-bold {weak.priority === 'High' ? 'text-red-500' : 'text-[hsl(var(--accent))]'}">
										{weak.priority}
									</span>
								</div>
								<p class="text-foreground mb-2 text-sm font-semibold">{weak.topic}</p>
								<div class="progress-bar mb-2">
									<div class="progress-bar-fill" style="width:{weak.score}%; background:hsl(0,84%,55%)"></div>
								</div>
								<div class="flex items-center justify-between">
									<span class="text-xs text-[hsl(0,84%,55%)] font-bold">{weak.score}%</span>
									<a href="/exam" class="text-xs font-bold text-[hsl(var(--primary))] hover:underline">Practice →</a>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>

		<!-- STUDY PLAN TAB -->
		{:else if activeTab === 'study'}
			<div class="grid gap-6 md:grid-cols-2">
				<!-- AI Study Plan -->
				<div class="glass-panel p-6">
					<h3 class="text-foreground mb-2 flex items-center gap-2 text-base font-bold">
						<Brain class="h-5 w-5 text-[hsl(var(--primary))]" /> AI Study Plan — Week 3
					</h3>
					<p class="text-muted-foreground mb-4 text-xs">Generated based on your weak areas and exam date.</p>
					<div class="space-y-3">
						{#each studyPlan as item}
							<div class="flex items-center gap-3 rounded-xl border p-3 {item.done
								? 'border-[hsl(145,100%,39%,0.3)] bg-[hsl(145,100%,39%,0.05)]'
								: 'border-border'}">
								<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold {item.done
									? 'bg-[hsl(145,100%,39%)] text-white'
									: 'bg-muted text-muted-foreground'}">
									{item.done ? '✓' : item.day}
								</div>
								<div class="min-w-0 flex-grow">
									<p class="text-foreground text-sm font-semibold {item.done ? 'line-through opacity-60' : ''}">{item.topic}</p>
									<p class="text-muted-foreground text-xs">{item.subject}</p>
								</div>
								{#if !item.done}
									<a href="/exam" class="btn-ghost rounded-lg px-3 py-1.5 text-xs text-[hsl(var(--primary))]">
										Start →
									</a>
								{/if}
							</div>
						{/each}
					</div>
				</div>

				<!-- Quick Start -->
				<div class="glass-panel p-6">
					<h3 class="text-foreground mb-4 flex items-center gap-2 text-base font-bold">
						<Zap class="h-5 w-5 text-[hsl(var(--accent))]" /> Quick Start CBT
					</h3>
					<div class="space-y-3">
						{#each subjects as sub}
							<div class="border-border flex items-center justify-between rounded-xl border p-4 transition-all hover:border-[hsl(var(--primary)/0.4)]">
								<div>
									<p class="text-foreground text-sm font-bold">{sub.name}</p>
									<p class="text-muted-foreground text-xs">50 questions · 60s each</p>
								</div>
								<a href="/exam" class="btn-primary rounded-xl px-4 py-2 text-xs">Start</a>
							</div>
						{/each}
					</div>

					<!-- Recommended next session -->
					<div class="mt-4 rounded-xl border border-[hsl(var(--accent)/0.3)] bg-[hsl(var(--accent)/0.06)] p-4">
						<div class="mb-1 flex items-center gap-2">
							<Target class="h-4 w-4 text-[hsl(var(--accent))]" />
							<span class="text-xs font-bold text-[hsl(var(--accent))]">RECOMMENDED NEXT</span>
						</div>
						<p class="text-foreground text-sm font-bold">Chemistry — Organic Chemistry</p>
						<p class="text-muted-foreground mb-3 text-xs">Your lowest scoring topic this week</p>
						<a href="/exam" class="btn-gold w-full rounded-xl py-2.5 text-xs">
							Start Recommended Session →
						</a>
					</div>
				</div>
			</div>

		<!-- REPORTS TAB -->
		{:else if activeTab === 'reports'}
			<div class="glass-panel p-6">
				<div class="mb-6 flex items-center justify-between">
					<h3 class="text-foreground text-base font-bold">Performance Reports</h3>
					<button class="btn-outline gap-2 rounded-xl px-4 py-2 text-xs">
						<Download class="h-3.5 w-3.5" /> Export PDF
					</button>
				</div>
				<div class="space-y-3">
					{#each recentBatches as batch}
						<div class="border-border flex items-center gap-4 rounded-xl border p-4 transition-all hover:border-[hsl(var(--primary)/0.3)]">
							<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--primary)/0.1)] text-sm font-black text-[hsl(var(--primary))]">
								{batch.pct}
							</div>
							<div class="flex-grow">
								<p class="text-foreground text-sm font-bold">{batch.subject} — {batch.topic}</p>
								<p class="text-muted-foreground text-xs">{batch.date} at {batch.time}</p>
							</div>
							<div>
								<span class="text-sm font-bold {batch.pct >= 75 ? 'text-[hsl(145,100%,39%)]' : 'text-[hsl(var(--accent))]'}">
									{batch.score}/{batch.total}
								</span>
							</div>
							<button class="btn-ghost rounded-lg px-3 py-2 text-xs">Review</button>
						</div>
					{/each}
				</div>

				<!-- Monthly summary -->
				<div class="mt-6 rounded-xl border border-[hsl(var(--primary)/0.2)] bg-[hsl(var(--primary)/0.04)] p-5">
					<h4 class="text-foreground mb-3 text-sm font-bold">Monthly Summary — April 2025</h4>
					<div class="grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
						{#each [
							{ label: 'Sessions', value: '24' },
							{ label: 'Questions', value: '1,200' },
							{ label: 'Avg Score', value: '78%' },
							{ label: 'Study Hours', value: '18h' }
						] as s}
							<div class="glass-panel p-3">
								<div class="text-foreground text-lg font-black">{s.value}</div>
								<div class="text-muted-foreground text-xs">{s.label}</div>
							</div>
						{/each}
					</div>
				</div>
			</div>

		<!-- TUTORS TAB -->
		{:else if activeTab === 'tutors'}
			<div class="space-y-6">
				<!-- AI Match Banner -->
				<div class="glass-panel border-[hsl(var(--accent)/0.3)] border p-6">
					<div class="flex items-start gap-4">
						<div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--accent)/0.1)]">
							<Brain class="h-6 w-6 text-[hsl(var(--accent))]" />
						</div>
						<div class="flex-grow">
							<h3 class="text-foreground mb-1 font-bold">AI Tutor Match Ready</h3>
							<p class="text-muted-foreground text-sm">
								Based on your Chemistry weakness (61%), we've found 3 qualified tutors specializing in Organic Chemistry.
							</p>
						</div>
					</div>
				</div>

				<!-- Tutor Cards -->
				<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					{#each tutors as tutor}
						<div class="glass-panel card-hover p-5">
							<div class="mb-4 flex items-start justify-between">
								<div class="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(174,60%,28%)] text-lg font-bold text-white">
									{tutor.name.charAt(0)}
								</div>
								<span class="rounded-full px-2.5 py-1 text-xs font-bold {tutor.available ? 'bg-[hsl(145,100%,39%,0.1)] text-[hsl(145,60%,30%)]' : 'bg-muted text-muted-foreground'}">
									{tutor.available ? '● Available' : '○ Busy'}
								</span>
							</div>
							<h4 class="text-foreground mb-1 font-bold">{tutor.name}</h4>
							<div class="mb-2 flex flex-wrap gap-1">
								{#each tutor.subjects as s}
									<span class="rounded-lg bg-[hsl(var(--primary)/0.08)] px-2 py-0.5 text-xs font-medium text-[hsl(var(--primary))]">{s}</span>
								{/each}
							</div>
							<div class="text-muted-foreground mb-3 flex items-center justify-between text-xs">
								<span>⭐ {tutor.rating} · {tutor.sessions} sessions</span>
								<span class="font-bold text-[hsl(var(--primary))]">{tutor.rate}</span>
							</div>
							{#if tutor.available}
								<a href="/pricing?plan=premium" class="btn-primary w-full rounded-xl py-2 text-xs">
									Book Session
								</a>
							{:else}
								<button disabled class="btn-outline w-full cursor-not-allowed rounded-xl py-2 text-xs opacity-50">
									Currently Booked
								</button>
							{/if}
						</div>
					{/each}
				</div>

				<div class="glass-panel p-6 text-center">
					<p class="text-muted-foreground mb-4 text-sm">Want access to all tutor features including 1-on-1 sessions?</p>
					<a href="/pricing" class="btn-gold inline-flex rounded-xl px-6 py-3 text-sm">
						Upgrade to Student + Tutor Plan
					</a>
				</div>
			</div>
		{/if}

	</div>
</div>
