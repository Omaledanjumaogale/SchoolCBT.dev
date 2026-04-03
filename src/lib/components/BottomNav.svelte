<script lang="ts">
	import { page } from '$app/state';

	const items = [
		{ name: 'Home', href: '/', emoji: '🏠' },
		{ name: 'Curriculum', href: '/curriculum', emoji: '📚' },
		{ name: 'Exam', href: '/exam', emoji: '📝' },
		{ name: 'Dashboard', href: '/dashboard', emoji: '📊' },
		{ name: 'Pricing', href: '/pricing', emoji: '💳' }
	];

	function isActive(href: string) {
		if (href === '/') return page.url.pathname === '/';
		return page.url.pathname.startsWith(href);
	}
</script>

<nav class="md:hidden fixed bottom-0 left-0 right-0 z-[100] glass-nav pb-safe">
	<div class="flex items-center justify-around h-16 px-2">
		{#each items as item}
			<a
				href={item.href}
				class="flex flex-col items-center justify-center gap-1 min-w-[64px] min-h-[44px] transition-all {isActive(item.href) ? 'text-gold scale-105' : 'text-white/40'}"
			>
				<span class="text-xl">{item.emoji}</span>
				<span class="text-[10px] font-bold uppercase tracking-tighter">{item.name}</span>
				{#if isActive(item.href)}
					<div class="absolute -bottom-1 w-1 h-1 rounded-full bg-gold glow-gold"></div>
				{/if}
			</a>
		{/each}
	</div>
</nav>

<style>
	.pb-safe {
		padding-bottom: env(safe-area-inset-bottom);
	}
</style>
