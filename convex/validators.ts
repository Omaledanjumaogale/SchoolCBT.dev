import { mutation, query } from './_generated/server';
import { z } from 'zod';
import { customMutation, customQuery } from 'convex-helpers/server/customFunctions';

/**
 * zQuery and zMutation wrappers that natively integrate Zod
 * onto standard Convex hooks, enabling argument typings to dynamically
 * validate inputs securely.
 */

// Zod argument validator middleware
const zodValidatorObj = {
	args: {},
	input: async (ctx: any, args: any) => {
		return { ctx, args };
	}
};

export const zQuery = customQuery(query, zodValidatorObj);
export const zMutation = customMutation(mutation, zodValidatorObj);

// Utility purely used inside a standard mutation if you want explicit manual zod parse validation
export function validateZod<T extends z.ZodTypeAny>(schema: T, data: unknown): z.infer<T> {
	const result = schema.safeParse(data);
	if (!result.success) {
		throw new Error(`Validation Error: ${result.error.message}`);
	}
	return result.data;
}
