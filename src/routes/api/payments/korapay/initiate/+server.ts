import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { env } from '$env/dynamic/private';

const KORAPAY_SECRET = env.KORAPAY_SECRET_KEY || '';
const KORAPAY_BASE = 'https://api.korapay.com/merchant/api/v1';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();

		const payload = {
			reference: body.reference,
			amount: body.amount,
			currency: body.currency || 'NGN',
			narration: body.narration || 'SchoolCBT Subscription',
			customer: {
				name: body.customer.name,
				email: body.customer.email,
				phone: body.customer.phone
			},
			redirect_url: `${getBaseUrl()}/checkout/success`,
			channels: ['card', 'bank_transfer', 'ussd']
		};

		const res = await fetch(`${KORAPAY_BASE}/charges/initialize`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${KORAPAY_SECRET}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		});

		const data = await res.json();
		return json(data);
	} catch (e: any) {
		return json({ status: 'error', message: e.message }, { status: 500 });
	}
};

function getBaseUrl() {
	return typeof globalThis !== 'undefined' && (globalThis as any).location
		? (globalThis as any).location.origin
		: 'https://schoolcbt.dev';
}
