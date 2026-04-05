<script lang="ts">
	import { onMount } from 'svelte';
	import {
		LayoutDashboard,
		BookOpen,
		Users,
		Wallet,
		Bell,
		TrendingUp,
		MessageSquare,
		Calendar,
		Video,
		Award
	} from 'lucide-svelte';
	import { authStore } from '$lib/stores/auth';
	import { goto } from '$app/navigation';

	let activeTab = $state('overview');

	onMount(() => {
		const unsub = authStore.subscribe((s) => {
			if (!s.loading && !s.user) goto('/auth/login?role=tutor&redirect=/tutor');
		});
		return unsub;
	});

	const tabs = [
		{ id: 'overview', label: 'Overview', icon: LayoutDashboard },
		{ id: 'students', label: 'My Students', icon: Users },
		{ id: 'sessions', label: 'Sessions', icon: Video },
		{ id: 'earnings', label: 'Earnings', icon: Wallet }
	];

	const stats = [
		{
			label: 'Active Students',
			value: '12',
			change: '+2 this month',
			icon: Users,
			color: 'hsl(145,100%,39%)'
		},
		{
			label: 'Sessions This Week',
			value: '8',
			change: '2 upcoming',
			icon: Video,
			color: 'hsl(var(--accent))'
		},
		{
			label: 'Avg Student Pass Rate',
			value: '89%',
			change: '+5% vs last month',
			icon: TrendingUp,
			color: 'hsl(174,60%,28%)'
		},
		{
			label: 'Wallet Balance',
			value: '₦48,500',
			change: 'Withdraw anytime',
			icon: Wallet,
			color: 'hsl(262,80%,60%)'
		}
	];

	const students = [
		{ name: 'Adaeze Okafor', exam: 'WAEC', progress: 82, subject: 'Chemistry', status: 'On track' },
		{
			name: 'Emeka Nwosu',
			exam: 'JAMB',
			progress: 74,
			subject: 'Mathematics',
			status: 'Needs help'
		},
		{ name: 'Fatimah Bello', exam: 'NECO', progress: 91, subject: 'Physics', status: 'Excellent' },
		{ name: 'Tunde Adeleke', exam: 'JAMB', progress: 63, subject: 'English', status: 'Needs help' }
	];

	const sessions = [
		{
			student: 'Adaeze Okafor',
			subject: 'Chemistry',
			date: 'Today',
			time: '4:00 PM',
			type: 'Live Video'
		},
		{
			student: 'Emeka Nwosu',
			subject: 'Mathematics',
			date: 'Tomorrow',
			time: '10:00 AM',
			type: 'Live Video'
		},
		{
			student: 'Fatimah Bello',
			subject: 'Physics',
			date: 'Thu Apr 10',
			time: '2:00 PM',
			type: 'Live Video'
		}
	];

	const displayName = $derived(
		$authStore.user?.displayName ?? $authStore.user?.email?.split('@')[0] ?? 'Tutor'
	);
</script>

<svelte:head>
	<title>Tutor Dashboard – SchoolCBT</title>
	<meta
		name="description"
		content="Manage your students, sessions, and earnings on SchoolCBT's tutor portal."
	/>
</svelte:head>

<div class="bg-background min-h-[calc(100vh-64px)] px-4 py-8">
	<div class="mx-auto max-w-7xl">
		<!-- Header -->
		<div class="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
			<div>
				<div class="section-badge mb-2">Tutor Portal</div>
				<h1 class="text-foreground text-2xl font-black">Welcome, {displayName}</h1>
				<p class="text-muted-foreground mt-0.5 text-sm">
					Mathematics · Physics · Chemistry specialist
				</p>
			</div>
			<div class="flex gap-3">
				<button class="btn-ghost relative rounded-xl px-3 py-2.5">
					<Bell class="h-5 w-5" />
					<span
						class="border-card absolute top-1.5 right-1.5 h-2 w-2 rounded-full border-2 bg-red-500"
					></span>
				</button>
				<a href="/tutor/session" class="btn-primary rounded-xl px-5 py-2.5 text-sm">
					<Video class="h-4 w-4" /> Start Session
				</a>
			</div>
		</div>

		<!-- Stats -->
		<div class="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
			{#each stats as stat}
				<div class="glass-panel card-hover p-5">
					<div
						class="mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
						style="background:{stat.color}15"
					>
						<stat.icon class="h-5 w-5" style="color:{stat.color}" />
					</div>
					<div class="text-foreground mb-0.5 text-2xl font-black">{stat.value}</div>
					<div class="text-muted-foreground text-xs font-medium">{stat.label}</div>
					<div class="mt-1 text-xs font-semibold" style="color:{stat.color}">{stat.change}</div>
				</div>
			{/each}
		</div>

		<!-- Tabs -->
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

		{#if activeTab === 'overview'}
			<div class="grid gap-6 lg:grid-cols-3">
				<!-- Upcoming sessions -->
				<div class="glass-panel p-6 lg:col-span-2">
					<div class="mb-5 flex items-center justify-between">
						<h3 class="text-foreground text-base font-bold">Upcoming Sessions</h3>
						<a
							href="/dashboard"
							class="text-xs font-bold text-[hsl(var(--primary))] hover:underline">View Calendar</a
						>
					</div>
					<div class="space-y-3">
						{#each sessions as s}
							<div
								class="border-border bg-card flex items-center gap-4 rounded-xl border p-4 transition-all hover:border-[hsl(var(--primary)/0.3)]"
							>
								<div
									class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--primary)/0.1)]"
								>
									<Video class="h-5 w-5 text-[hsl(var(--primary))]" />
								</div>
								<div class="flex-grow">
									<p class="text-foreground text-sm font-bold">{s.student}</p>
									<p class="text-muted-foreground text-xs">{s.subject} · {s.date} at {s.time}</p>
								</div>
								<button class="btn-primary rounded-xl px-4 py-2 text-xs">Join</button>
							</div>
						{/each}
					</div>
				</div>

				<!-- Quick stats -->
				<div class="space-y-4">
					<div class="glass-panel p-6">
						<h3 class="text-foreground mb-4 text-sm font-bold">Earnings This Month</h3>
						<div class="mb-1 text-3xl font-black text-[hsl(145,100%,39%)]">₦72,000</div>
						<p class="text-muted-foreground text-xs">6 students × ₦12,000 avg</p>
						<div class="progress-bar mt-4">
							<div class="progress-bar-fill" style="width:72%"></div>
						</div>
						<p class="text-muted-foreground mt-2 text-xs">72% of monthly target</p>
					</div>
					<div class="glass-panel p-6">
						<h3 class="text-foreground mb-4 text-sm font-bold">Performance Rating</h3>
						<div class="mb-2 flex items-center gap-2">
							<div class="text-3xl font-black text-[hsl(var(--accent))]">4.8</div>
							<div class="flex text-lg text-[hsl(var(--accent))]">★★★★★</div>
						</div>
						<p class="text-muted-foreground text-xs">Based on 48 student reviews</p>
					</div>
				</div>
			</div>
		{:else if activeTab === 'students'}
			<div class="glass-panel p-6">
				<h3 class="text-foreground mb-5 text-base font-bold">My Students ({students.length})</h3>
				<div class="space-y-3">
					{#each students as s}
						<div
							class="border-border bg-card flex items-center gap-4 rounded-xl border p-4 transition-all hover:border-[hsl(var(--primary)/0.3)]"
						>
							<div
								class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[hsl(145,100%,39%)] to-[hsl(174,60%,28%)] text-sm font-bold text-white"
							>
								{s.name.charAt(0)}
							</div>
							<div class="flex-grow">
								<div class="mb-1 flex items-center justify-between">
									<p class="text-foreground text-sm font-bold">{s.name}</p>
									<span
										class="rounded-full px-2 py-0.5 text-xs font-bold {s.status === 'Excellent'
											? 'bg-[hsl(145,100%,39%,0.1)] text-[hsl(145,100%,39%)]'
											: s.status === 'On track'
												? 'bg-[hsl(var(--accent)/0.1)] text-[hsl(var(--accent))]'
												: 'bg-[hsl(0,84%,55%,0.1)] text-[hsl(0,84%,55%)]'}">{s.status}</span
									>
								</div>
								<p class="text-muted-foreground mb-2 text-xs">{s.exam} · {s.subject}</p>
								<div class="progress-bar">
									<div class="progress-bar-fill" style="width:{s.progress}%"></div>
								</div>
							</div>
							<span class="shrink-0 text-sm font-black text-[hsl(var(--primary))]"
								>{s.progress}%</span
							>
						</div>
					{/each}
				</div>
			</div>
		{:else if activeTab === 'sessions'}
			<div class="glass-panel p-6">
				<h3 class="text-foreground mb-5 text-base font-bold">Session Schedule</h3>
				<div class="space-y-3">
					{#each sessions as s}
						<div
							class="border-border flex items-center gap-4 rounded-xl border p-4 transition-all hover:border-[hsl(var(--primary)/0.3)]"
						>
							<div
								class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--primary)/0.1)]"
							>
								<Calendar class="h-5 w-5 text-[hsl(var(--primary))]" />
							</div>
							<div class="flex-grow">
								<p class="text-foreground text-sm font-bold">{s.student} — {s.subject}</p>
								<p class="text-muted-foreground text-xs">{s.date} · {s.time} · {s.type}</p>
							</div>
							<button class="btn-primary rounded-xl px-4 py-2 text-xs">Join Session</button>
						</div>
					{/each}
				</div>
			</div>
		{:else if activeTab === 'earnings'}
			<div class="grid gap-6 md:grid-cols-2">
				<div class="glass-panel p-6">
					<h3 class="text-foreground mb-5 text-base font-bold">Wallet Summary</h3>
					<div class="mb-1 text-4xl font-black text-[hsl(145,100%,39%)]">₦48,500</div>
					<p class="text-muted-foreground mb-6 text-sm">Available balance</p>
					<button class="btn-primary w-full rounded-xl py-3.5 text-sm"
						>Withdraw to Bank Account</button
					>
				</div>
				<div class="glass-panel p-6">
					<h3 class="text-foreground mb-5 text-base font-bold">Earnings Breakdown</h3>
					<div class="space-y-3">
						{#each [{ label: 'Session Fees', amount: '₦36,000', pct: 75 }, { label: 'Subject Bonuses', amount: '₦8,500', pct: 18 }, { label: 'Platform Bonus', amount: '₦4,000', pct: 8 }] as item}
							<div>
								<div class="mb-1.5 flex justify-between text-sm">
									<span class="text-foreground font-medium">{item.label}</span>
									<span class="font-bold text-[hsl(var(--primary))]">{item.amount}</span>
								</div>
								<div class="progress-bar">
									<div class="progress-bar-fill" style="width:{item.pct}%"></div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
