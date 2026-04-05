import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import crypto from 'crypto';

const FLW_SECRET = 'LrOnr9SvE4FO7YN08hd6nkLYlJeWFwTy';
const FLW_BASE = 'https://api.flutterwave.com/v3';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const signature = request.headers.get('verif-hash') || '';

		if (signature !== FLW_SECRET) {
			return json({ error: 'Invalid signature' }, { status: 401 });
		}

		const event = await request.json();

		if (event.event === 'charge.completed' && event.data?.status === 'successful') {
			const { tx_ref, amount, customer } = event.data;
			// TODO: Activate subscription via Convex
			console.log('Flutterwave payment success:', { tx_ref, amount, customer });
		}

		return json({ received: true });
	} catch (e: any) {
		return json({ error: e.message }, { status: 500 });
	}
};
