<script lang="ts">
	import { ArrowRight, Mail, Smartphone, Globe, MessageCircle } from 'lucide-svelte';
</script>

<footer class="border-border bg-card border-t pt-16 pb-8">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-14 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
			<!-- Brand -->
			<div class="lg:col-span-4">
				<a href="/" class="mb-5 inline-flex items-center gap-2.5">
					<div
						class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(145,100%,39%)] to-[hsl(160,80%,30%)] shadow-md"
					>
						<span class="text-sm font-black text-white">SC</span>
					</div>
					<span class="text-foreground text-lg font-black tracking-tight"
						>School<span class="text-[hsl(var(--primary))]">CBT</span></span
					>
				</a>
				<p class="text-muted-foreground mb-6 max-w-xs text-sm leading-relaxed">
					Nigeria's premier AI-powered Results-as-a-Service platform. Delivering guaranteed exam
					readiness for JAMB, WAEC, NECO, and NABTEB.
				</p>
				<div class="flex items-center gap-2">
					{#each [{ href: 'https://twitter.com', label: 'Twitter', Icon: MessageCircle }, { href: 'https://facebook.com', label: 'Facebook', Icon: Globe }, { href: 'https://linkedin.com', label: 'LinkedIn', Icon: Globe }] as social}
						<a
							href={social.href}
							aria-label={social.label}
							class="border-border bg-background text-muted-foreground flex h-9 w-9 items-center justify-center rounded-xl border transition-all hover:border-[hsl(var(--primary)/0.4)] hover:bg-[hsl(var(--primary)/0.05)] hover:text-[hsl(var(--primary))]"
						>
							<social.Icon class="h-4 w-4" />
						</a>
					{/each}
				</div>
			</div>

			<!-- Platform Links -->
			<div class="lg:col-span-2">
				<h4 class="text-foreground mb-5 text-xs font-bold tracking-widest uppercase">Platform</h4>
				<ul class="space-y-3">
					{#each [{ label: 'Features', href: '/#features' }, { label: 'Curriculum', href: '/curriculum' }, { label: 'CBT Demo', href: '/exam' }, { label: 'Dashboard', href: '/dashboard' }, { label: 'Pricing', href: '/pricing' }] as link}
						<li>
							<a
								href={link.href}
								class="text-muted-foreground text-sm transition-colors hover:text-[hsl(var(--primary))]"
								>{link.label}</a
							>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Support Links -->
			<div class="lg:col-span-2">
				<h4 class="text-foreground mb-5 text-xs font-bold tracking-widest uppercase">Support</h4>
				<ul class="space-y-3">
					{#each [{ label: 'About Us', href: '/about' }, { label: 'Contact', href: '/contact' }, { label: 'Privacy Policy', href: '/privacy' }, { label: 'Terms of Service', href: '/terms' }, { label: 'WhatsApp Help', href: '/contact' }] as link}
						<li>
							<a
								href={link.href}
								class="text-muted-foreground text-sm transition-colors hover:text-[hsl(var(--primary))]"
								>{link.label}</a
							>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Newsletter -->
			<div class="lg:col-span-4">
				<h4 class="text-foreground mb-5 text-xs font-bold tracking-widest uppercase">
					Stay Updated
				</h4>
				<p class="text-muted-foreground mb-4 text-sm">
					Study tips, platform updates, and Nigerian education news.
				</p>
				<form class="flex flex-col gap-2 sm:flex-row" onsubmit={(e) => e.preventDefault()}>
					<div class="input-icon-wrap relative flex-grow">
						<Mail class="input-icon h-4 w-4" />
						<input
							type="email"
							placeholder="your.email@example.com"
							class="input-field rounded-xl"
							required
						/>
					</div>
					<button type="submit" class="btn-primary shrink-0 rounded-xl px-5 py-3 text-sm">
						Subscribe <ArrowRight class="h-4 w-4" />
					</button>
				</form>
				<p class="text-muted-foreground mt-3 text-xs">No spam. Unsubscribe anytime.</p>
			</div>
		</div>

		<!-- Bottom bar -->
		<div
			class="border-border flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row"
		>
			<p class="text-muted-foreground text-xs">
				© {new Date().getFullYear()} SchoolCBT by EwinProject. All rights reserved.
			</p>
			<div
				class="border-border bg-background flex items-center gap-2 rounded-full border px-4 py-2"
			>
				<span class="relative flex h-2 w-2">
					<span
						class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(142,71%,45%)] opacity-75"
					></span>
					<span class="relative inline-flex h-2 w-2 rounded-full bg-[hsl(142,71%,45%)]"></span>
				</span>
				<span class="text-muted-foreground text-xs font-semibold">All systems operational</span>
			</div>
		</div>
	</div>
</footer>
