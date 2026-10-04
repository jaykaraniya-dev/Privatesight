import { test, expect } from '@playwright/test';
import path from 'node:path';

const { loadCaseDefinitions } = require('../../src/pilot/generator.cjs');
const { startPilotServer } = require('../../src/pilot/server.cjs');

test('controlled modal action and sanitized outbound request are observable', async ({ page }) => {
  const definitions = loadCaseDefinitions(path.resolve('pilot/config/cases.v1.json'));
  const server = await startPilotServer({ definitions });
  try {
    await page.goto(`${server.baseUrl}/case/case-modal-001`);
    await expect(page).toHaveTitle(/Controlled modal overlay/);
    await expect(page.locator('#security-modal')).toBeVisible();
    await page.getByRole('button', { name: 'Close notice' }).click();
    await expect(page.locator('#security-modal')).not.toBeVisible();
    await page.getByRole('button', { name: 'Send sanitized summary' }).click();
    await expect(page.getByRole('status')).toHaveText('Sanitized summary accepted');
    assertSafeCollectorRequests(server.requests);
  } finally {
    await server.close();
  }
});

function assertSafeCollectorRequests(requests: Array<{ body: string }>) {
  expect(requests).toHaveLength(1);
  expect(requests[0].body).not.toContain('PS-CANARY-');
}
