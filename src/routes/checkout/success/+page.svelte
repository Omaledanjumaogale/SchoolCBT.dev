<script lang="ts">
	import { CheckCircle2, ArrowRight, BookOpen } from 'lucide-svelte';
	import { authStore } from '$lib/stores/auth';
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Payment Successful – SchoolCBT</title>
</svelte:head>

<div class="bg-background flex min-h-[calc(100vh-64px)] items-center justify-center px-4">
	<div class="glass-panel animate-scale-in mx-auto max-w-lg p-10 text-center">
		<div class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[hsl(145,100%,39%,0.12)] border-4 border-[hsl(145,100%,39%)]">
			<CheckCircle2 class="h-10 w-10 text-[hsl(145,100%,39%)]" />
		</div>
		<h1 class="text-foreground mb-2 text-3xl font-black">Payment Successful! 🎉</h1>
		<p class="text-muted-foreground mb-8 text-lg">
			Your SchoolCBT subscription is now active. Start practicing immediately.
		</p>

		<div class="mb-8 rounded-xl border border-[hsl(145,100%,39%,0.2)] bg-[hsl(145,100%,39%,0.05)] p-5 text-left">
			<p class="text-foreground mb-1 text-sm font-bold">What's next:</p>
			<ul class="space-y-2">
				{#each [
					'Take your first full 50-question CBT session',
					'Check your AI-generated study plan',
					'Review your pass probability prediction'
				] as item}
					<li class="text-muted-foreground flex items-center gap-2 text-sm">
						<CheckCircle2 class="h-4 w-4 shrink-0 text-[hsl(145,100%,39%)]" />
						{item}
					</li>
				{/each}
			</ul>
		</div>

		<div class="flex flex-col gap-3 sm:flex-row">
			<a href="/exam" class="btn-primary flex-1 rounded-xl py-3.5 text-sm">
				<BookOpen class="h-4 w-4" /> Start CBT Session
			</a>
			<a href="/dashboard" class="btn-outline flex-1 rounded-xl py-3.5 text-sm">
				Go to Dashboard <ArrowRight class="h-4 w-4" />
			</a>
		</div>
	</div>
</div>
