<script lang="ts">
	import { Mail, Lock, AlertCircle } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	let email = $state('');
	let loading = $state(false);
	let sent = $state(false);
	let error = $state('');

	async function handleReset(e: Event) {
		e.preventDefault();
		if (!browser) return;
		error = '';
		loading = true;
		try {
			const { auth } = await import('$lib/firebase');
			const { sendPasswordResetEmail } = await import('firebase/auth');
			if (!auth) throw new Error('Auth not initialized');
			await sendPasswordResetEmail(auth, email);
			sent = true;
		} catch (err: unknown) {
			const code = (err as { code?: string })?.code ?? '';
			if (code === 'auth/user-not-found') {
				error = 'No account found with this email address.';
			} else {
				error = 'Failed to send reset email. Please try again.';
			}
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Forgot Password – SchoolCBT</title>
</svelte:head>

<div class="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-12">
	<div class="relative w-full max-w-md">
		<div class="glass-panel border-t-2 border-t-[hsl(var(--primary)/0.4)] p-8 shadow-2xl md:p-10">
			<div class="mb-8 text-center">
				<a href="/" class="mb-6 inline-flex items-center gap-2">
					<div
						class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(145,100%,39%)] to-[hsl(160,80%,30%)] shadow-md"
					>
						<span class="text-sm font-black text-white">SC</span>
					</div>
					<span class="text-foreground text-lg font-black"
						>School<span class="text-[hsl(var(--primary))]">CBT</span></span
					>
				</a>

				{#if sent}
					<div class="animate-scale-in">
						<div
							class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[hsl(145,100%,39%,0.1)]"
						>
							<Mail class="h-7 w-7 text-[hsl(145,100%,39%)]" />
						</div>
						<h1 class="text-foreground mb-2 text-2xl font-black">Check your inbox</h1>
						<p class="text-muted-foreground mb-6 text-sm">
							A password reset link has been sent to <strong class="text-foreground">{email}</strong
							>. Check your spam folder if you don't see it.
						</p>
						<a
							href="/auth/login"
							class="btn-primary inline-flex w-full justify-center rounded-xl py-3.5 text-sm"
							>Back to Sign In</a
						>
					</div>
				{:else}
					<div
						class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[hsl(var(--primary)/0.1)]"
					>
						<Lock class="h-7 w-7 text-[hsl(var(--primary))]" />
					</div>
					<h1 class="text-foreground mb-2 text-2xl font-black">Reset your password</h1>
					<p class="text-muted-foreground text-sm">
						Enter your account email and we'll send a reset link.
					</p>
				{/if}
			</div>

			{#if !sent}
				{#if error}
					<div
						class="mb-5 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3"
					>
						<AlertCircle class="h-4 w-4 shrink-0 text-red-500" />
						<p class="text-sm font-medium text-red-700">{error}</p>
					</div>
				{/if}

				<form onsubmit={handleReset} class="space-y-5">
					<div>
						<label for="reset-email" class="text-foreground mb-1.5 block text-sm font-semibold"
							>Email Address</label
						>
						<div class="input-icon-wrap">
							<Mail class="input-icon h-4 w-4" />
							<input
								id="reset-email"
								type="email"
								bind:value={email}
								placeholder="your@email.com"
								class="input-field rounded-xl"
								required
								autocomplete="email"
							/>
						</div>
					</div>

					<button
						type="submit"
						class="btn-primary w-full rounded-xl py-3.5 text-sm"
						disabled={loading}
					>
						{#if loading}
							<span
								class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
							></span>
							Sending…
						{:else}
							Send Reset Link
						{/if}
					</button>
				</form>

				<p class="text-muted-foreground mt-6 text-center text-sm">
					Remembered it?
					<a href="/auth/login" class="ml-1 font-bold text-[hsl(var(--primary))] hover:underline"
						>Sign In</a
					>
				</p>
			{/if}
		</div>
	</div>
</div>
