/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as auth from '../auth.js';
import type * as cache from '../cache.js';
import type * as contacts from '../contacts.js';
import type * as crawler from '../crawler.js';
import type * as crons from '../crons.js';
import type * as questions from '../questions.js';
import type * as rateLimit from '../rateLimit.js';
import type * as sessions from '../sessions.js';
import type * as triggers from '../triggers.js';
import type * as users from '../users.js';
import type * as validators from '../validators.js';
import type * as workflows from '../workflows.js';

import type { ApiFromModules, FilterApi, FunctionReference } from 'convex/server';

declare const fullApi: ApiFromModules<{
	auth: typeof auth;
	cache: typeof cache;
	contacts: typeof contacts;
	crawler: typeof crawler;
	crons: typeof crons;
	questions: typeof questions;
	rateLimit: typeof rateLimit;
	sessions: typeof sessions;
	triggers: typeof triggers;
	users: typeof users;
	validators: typeof validators;
	workflows: typeof workflows;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<typeof fullApi, FunctionReference<any, 'public'>>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<typeof fullApi, FunctionReference<any, 'internal'>>;

export declare const components: {};
