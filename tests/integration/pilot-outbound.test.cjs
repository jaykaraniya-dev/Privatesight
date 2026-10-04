const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { chromium } = require('playwright');

const { loadCaseDefinitions } = require('../../src/pilot/generator.cjs');
const { startPilotServer } = require('../../src/pilot/server.cjs');
const { buildCanaryRegistry } = require('../../src/pilot/canary.cjs');
const { observeOutboundEvent, summarizeOutboundObservation } = require('../../src/pilot/outbound-observer.cjs');

test('instrumented HTTP observation passes sanitized traffic and blocks a controlled raw-canary fixture', { timeout: 60_000 }, async () => {
  const definitions = loadCaseDefinitions(path.resolve('pilot/config/cases.v1.json'));
  const registry = buildCanaryRegistry(definitions);
  const server = await startPilotServer({ definitions });
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const page = await browser.newPage();
    await page.goto(`${server.baseUrl}/case/case-auth-001`);
    await page.getByRole('button', { name: 'Send sanitized summary' }).click();
    await page.getByRole('status').waitFor({ state: 'visible' });
    const safeEvents = server.requests.map((request) => observeOutboundEvent({ channel: 'HTTP', payload: request.body, registry }));
    assert.ok(safeEvents.every((event) => event.status === 'PASS'));

    const negativeControl = observeOutboundEvent({ channel: 'HTTP', payload: JSON.stringify({ secret: 'PS-CANARY-CREDENTIAL-001' }), registry });
    assert.equal(negativeControl.status, 'BLOCKED');
    assert.equal(negativeControl.stop_test, true);
    assert.equal(negativeControl.matches[0].canary_id, 'PS-CANARY-CREDENTIAL-001');

    const summary = summarizeOutboundObservation([...safeEvents, negativeControl], ['HTTP', 'SERVER_PAYLOAD', 'CONSOLE']);
    assert.ok(summary.observed_channels.includes('HTTP'));
    assert.ok(summary.unobserved_channels.includes('WEBSOCKET'));
    assert.equal(summary.negative_control_detected, true);
  } finally {
    await browser.close();
    await server.close();
  }
});
