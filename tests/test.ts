import { test as base } from '@playwright/test';
import * as msgs from '../src/paraglide/messages';

function create_recursive_proxy<T extends object>(fn = ''): T {
	const proxy = new Proxy(() => {}, {
		get(_, piece) {
			if (typeof piece !== 'string') {
				return undefined;
			}
			return create_recursive_proxy(fn + piece + '_');
		},
		apply(_, __, args) {
			// @ts-expect-error
			return msgs[fn.substring(0, fn.length - 1)](...args);
		}
	});
	return proxy as T;
}

const real_m = create_recursive_proxy<typeof m>();

export const test = base.extend<{ m: typeof m }>({
	page: async ({ page, javaScriptEnabled, context }, use, testInfo) => {
		// automatically wait for kit started event after navigation functions if js is enabled
		const page_navigation_functions = ['goto', 'goBack', 'reload'] as const;
		page_navigation_functions.forEach((fn) => {
			const pageFn = page[fn];
			if (!pageFn) {
				throw new Error(`function does not exist on page: ${fn}`);
			}
			// substitute the actual function with a new function that waits
			// for the selector that we've set in +layout.svelte
			page[fn] = async function (...args: Parameters<typeof pageFn>) {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-expect-error
				const res = await pageFn.call(page, ...args);
				if (
					javaScriptEnabled &&
					(args[1] as { waitForStarted: boolean })?.waitForStarted !== false
				) {
					await page.waitForSelector('body[data-kit-started]', { timeout: 15000 });
				}
				return res;
			};
		});
		await context.addCookies([
			{
				name: 'x-test-name',
				value: testInfo.titlePath
					.map((title) => `[${encodeURIComponent(title.replaceAll('/', '.'))}]`)
					.join(''),
				path: '/',
				domain: 'localhost'
			}
		]);
		await use(page);
	},
	m: async ({}, use) => {
		await use(real_m);
	}
});
