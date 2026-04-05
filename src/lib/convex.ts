// Convex client — browser-only, lazy initialised
import { ConvexClient } from 'convex/browser';
import { browser } from '$app/environment';
import { writable, type Writable } from 'svelte/store';

const CONVEX_URL = import.meta.env.PUBLIC_CONVEX_URL ?? '';

let _client: ConvexClient | null = null;

/** Returns the singleton Convex client (browser only) */
export function getConvexClient(): ConvexClient {
	if (!browser) throw new Error('Convex client must only be called in the browser');
	if (!_client) {
		if (!CONVEX_URL) {
			console.warn('[SchoolCBT] PUBLIC_CONVEX_URL is not set — Convex disabled');
			throw new Error('PUBLIC_CONVEX_URL not configured');
		}
		_client = new ConvexClient(CONVEX_URL);
	}
	return _client;
}

/** Reactive Svelte store powered by a Convex query function */
export function convexQuery<T>(queryFn: () => Promise<T>, initialValue: T): Writable<T> {
	const store = writable<T>(initialValue);
	if (browser) {
		Promise.resolve()
			.then(() => queryFn())
			.then((data) => store.set(data))
			.catch((err) => console.error('[ConvexQuery]', err));
	}
	return store;
}

/** Fire-and-forget Convex mutation with optional error callback */
export async function convexMutate<T>(
	mutationFn: () => Promise<T>,
	onError?: (err: unknown) => void
): Promise<T | null> {
	if (!browser) return null;
	try {
		return await mutationFn();
	} catch (err) {
		console.error('[ConvexMutate]', err);
		if (onError) onError(err);
		return null;
	}
}
