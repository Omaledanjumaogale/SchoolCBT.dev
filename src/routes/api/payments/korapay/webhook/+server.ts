import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import crypto from 'crypto';

import { env } from '$env/dynamic/private';

const KORAPAY_SECRET = env.KORAPAY_SECRET_KEY || '';
const KORAPAY_BASE = 'https://api.korapay.com/merchant/api/v1';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const signature = request.headers.get('x-korapay-signature') || '';
		const rawBody = await request.text();

		// Verify signature
		const hash = crypto
			.createHmac('sha256', KORAPAY_SECRET)
			.update(rawBody)
			.digest('hex');

		if (hash !== signature) {
			return json({ error: 'Invalid signature' }, { status: 401 });
		}

		const event = JSON.parse(rawBody);

		if (event.event === 'charge.success') {
			const { reference, amount, customer } = event.data;
			// TODO: Activate subscription via Convex mutation
			console.log('Korapay payment success:', { reference, amount, customer });
		}

		return json({ received: true });
	} catch (e: any) {
		return json({ error: e.message }, { status: 500 });
	}
};
