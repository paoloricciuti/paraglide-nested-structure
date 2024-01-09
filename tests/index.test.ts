import { expect } from '@playwright/test';
import { test } from './test';

test('has title', async ({ page, m }) => {
	await page.goto('/');
	// Expect a title "to contain" a substring.
	await expect(
		page.getByText(
			m.nested.no.matter.how.much.i.like({
				param: ''
			})
		)
	).toBeVisible();
});
