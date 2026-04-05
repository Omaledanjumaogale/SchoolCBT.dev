<script lang="ts">
	import { page } from '$app/stores';
	import { Home, BookOpen, FileText, LayoutDashboard, DollarSign } from 'lucide-svelte';

	const items = [
		{ name: 'Home', href: '/', icon: Home },
		{ name: 'Curriculum', href: '/curriculum', icon: BookOpen },
		{ name: 'CBT Demo', href: '/exam', icon: FileText },
		{ name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
		{ name: 'Pricing', href: '/pricing', icon: DollarSign }
	];

	function isActive(href: string) {
		if (href === '/') return $page.url.pathname === '/';
		return $page.url.pathname.startsWith(href);
	}
</script>

<!-- Mobile-only bottom navigation bar -->
<nav
	class="glass-nav border-border fixed right-0 bottom-0 left-0 z-[100] border-t md:hidden"
	style="padding-bottom: env(safe-area-inset-bottom, 0px);"
	aria-label="Mobile bottom navigation"
>
	<div class="flex h-16 items-stretch justify-around">
		{#each items as item}
			<a
				href={item.href}
				class="flex min-h-[44px] flex-1 flex-col items-center justify-center gap-0.5 px-1 transition-all
					{isActive(item.href)
					? 'text-[hsl(var(--primary))]'
					: 'text-muted-foreground hover:text-foreground'}"
				aria-current={isActive(item.href) ? 'page' : undefined}
			>
				<!-- Active indicator dot -->
				{#if isActive(item.href)}
					<div class="absolute top-1 h-1 w-1 rounded-full bg-[hsl(var(--primary))]"></div>
				{/if}
				<item.icon class="h-5 w-5 shrink-0 {isActive(item.href) ? 'stroke-[2.5]' : 'stroke-2'}" />
				<span class="text-[10px] leading-none font-semibold">{item.name}</span>
			</a>
		{/each}
	</div>
</nav>
