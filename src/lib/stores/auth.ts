// Auth store with Firebase integration
import { writable, derived } from 'svelte/store';
import type { User } from 'firebase/auth';

interface AuthState {
	user: User | null;
	loading: boolean;
	error: string | null;
}

function createAuthStore() {
	const { subscribe, set, update } = writable<AuthState>({
		user: null,
		loading: true,
		error: null
	});

	return {
		subscribe,
		setUser: (user: User | null) => update((s) => ({ ...s, user, loading: false, error: null })),
		setLoading: (loading: boolean) => update((s) => ({ ...s, loading })),
		setError: (error: string) => update((s) => ({ ...s, error, loading: false })),
		reset: () => set({ user: null, loading: false, error: null })
	};
}

export const authStore = createAuthStore();
export const isAuthenticated = derived(authStore, ($auth) => !!$auth.user);
export const currentUser = derived(authStore, ($auth) => $auth.user);
