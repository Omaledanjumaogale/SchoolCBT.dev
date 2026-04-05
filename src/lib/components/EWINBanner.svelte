<script lang="ts">
	// E-WIN Ecosystem Banner
	// Schema.org: itemscope/itemtype="Organization" for search engine domain authority
</script>

<!-- 
  E-WIN Ecosystem Banner
  SEO: Schema.org Organization structured data binds SchoolCBT to the E-WIN ecosystem.
  UX: Subtle pulse dot + flex layout scales perfectly on all breakpoints.
-->
<div
	itemscope
	itemtype="https://schema.org/Organization"
	aria-label="Part of the Elite Workforce Impact Nigeria (E-WIN) Project Ecosystem"
	class="ewin-banner"
	role="complementary"
>
	<!-- hidden SEO metadata nodes — parsed by crawlers -->
	<meta itemprop="name" content="SchoolCBT" />
	<meta
		itemprop="description"
		content="Nigeria's premier AI-powered CBT platform for JAMB, WAEC, NECO and NABTEB exam preparation."
	/>
	<meta itemprop="url" content="https://schoolcbt.dev" />
	<link itemprop="sameAs" href="https://ewinproject.org" />

	<div class="ewin-inner">
		<!-- Pulse indicator -->
		<span class="ewin-pulse" aria-hidden="true">
			<span class="ewin-dot"></span>
		</span>

		<!-- Banner text -->
		<p class="ewin-text" itemprop="memberOf" itemscope itemtype="https://schema.org/Organization">
			<span itemprop="name" class="ewin-brand">
				<a
					href="https://ewinproject.org"
					target="_blank"
					rel="noopener noreferrer"
					class="ewin-link"
					title="Visit Elite Workforce Impact Nigeria (E-WIN) Project"
					itemprop="url"
				>
					Elite Workforce Impact Nigeria (E-WIN) Project
				</a>
			</span>
			<span class="ewin-separator" aria-hidden="true">·</span>
			<span class="ewin-label">A Platform Under the E-WIN Ecosystem</span>
		</p>
	</div>
</div>

<style>
	.ewin-banner {
		width: 100%;
		background: rgba(108, 217, 115, 0.08);
		border-bottom: 1px solid rgba(108, 217, 115, 0.18);
		padding: 0.55rem 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.ewin-inner {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.6rem;
		flex-wrap: wrap;
		max-width: 1280px;
		width: 100%;
	}

	/* pulse ring */
	.ewin-pulse {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		width: 14px;
		height: 14px;
	}

	.ewin-dot {
		display: block;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: hsl(145, 70%, 45%);
		box-shadow: 0 0 0 0 rgba(108, 217, 115, 0.55);
		animation: ewin-pulse 2.4s ease-out infinite;
	}

	@keyframes ewin-pulse {
		0% {
			box-shadow: 0 0 0 0 rgba(108, 217, 115, 0.55);
		}
		60% {
			box-shadow: 0 0 0 7px rgba(108, 217, 115, 0);
		}
		100% {
			box-shadow: 0 0 0 0 rgba(108, 217, 115, 0);
		}
	}

	.ewin-text {
		margin: 0;
		font-size: 0.76rem;
		font-weight: 500;
		color: hsl(var(--muted-foreground, 220 10% 50%));
		display: flex;
		align-items: center;
		gap: 0.4rem;
		flex-wrap: wrap;
		justify-content: center;
		text-align: center;
		line-height: 1.4;
	}

	.ewin-brand {
		font-weight: 700;
		color: hsl(145, 65%, 38%);
	}

	.ewin-link {
		color: inherit;
		text-decoration: none;
		border-bottom: 1px dotted hsl(145, 55%, 45%);
		transition:
			color 0.2s ease,
			border-color 0.2s ease;
	}

	.ewin-link:hover {
		color: hsl(145, 80%, 35%);
		border-bottom-color: hsl(145, 80%, 35%);
	}

	.ewin-separator {
		color: hsl(var(--border, 220 10% 80%));
		font-size: 0.7rem;
	}

	.ewin-label {
		color: hsl(var(--muted-foreground, 220 10% 50%));
		font-size: 0.74rem;
	}

	/* Mobile: stack gracefully */
	@media (max-width: 480px) {
		.ewin-separator {
			display: none;
		}
		.ewin-label {
			display: block;
			width: 100%;
			text-align: center;
		}
		.ewin-text {
			gap: 0.25rem;
		}
		.ewin-banner {
			padding: 0.6rem 0.75rem;
		}
	}
</style>
