import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { env } from '$env/dynamic/private';

const FLW_SECRET_KEY = env.FLW_SECRET_KEY || '';
const FLW_BASE = 'https://api.flutterwave.com/v3';

// POST /api/payments/verify — verifies Flutterwave or Korapay transaction & activates plan
export const POST: RequestHandler = async ({ request }) => {
	try {
		const { provider, txRef, transactionId, plan } = await request.json();

		if (!provider || !txRef || !plan) {
			return json({ success: false, message: 'Missing parameters' }, { status: 400 });
		}

		if (provider === 'flutterwave') {
			// Verify via Flutterwave API
			const res = await fetch(`${FLW_BASE}/transactions/${transactionId}/verify`, {
				headers: { Authorization: `Bearer ${FLW_SECRET_KEY}` }
			});
			const data = await res.json();

			if (data.status === 'success' && data.data?.status === 'successful') {
				// Subscription activated — in production call Convex activation mutation here
				return json({ success: true, amount: data.data.amount, reference: txRef });
			}
			return json({ success: false, message: 'Payment verification failed' }, { status: 400 });
		}

		if (provider === 'korapay') {
			// Korapay verification
			const KORAPAY_SECRET = env.KORAPAY_SECRET_KEY || '';
			const res = await fetch(`https://api.korapay.com/merchant/api/v1/charges/${txRef}`, {
				headers: { Authorization: `Bearer ${KORAPAY_SECRET}` }
			});
			const data = await res.json();

			if (data.status === true && data.data?.status === 'success') {
				return json({ success: true, amount: data.data.amount, reference: txRef });
			}
			return json({ success: false, message: 'Korapay verification failed' }, { status: 400 });
		}

		return json({ success: false, message: 'Unknown payment provider' }, { status: 400 });
	} catch (e: any) {
		return json({ success: false, message: e.message }, { status: 500 });
	}
};
