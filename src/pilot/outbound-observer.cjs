const crypto = require('node:crypto');
const { scanForCanaries } = require('./canary.cjs');

const ALL_CHANNELS = ['HTTP', 'SERVER_PAYLOAD', 'CONSOLE', 'WEBSOCKET', 'TELEMETRY', 'ERROR_REPORTING'];

function observeOutboundEvent({ channel, payload, registry, negative_control = false }) {
  const serialized = typeof payload === 'string' ? payload : JSON.stringify(payload);
  const matches = scanForCanaries(serialized, registry);
  return {
    schema_version: 'pilot-outbound-event-1.0.0',
    channel,
    status: matches.length > 0 ? 'BLOCKED' : 'PASS',
    stop_test: matches.length > 0,
    negative_control,
    payload_sha256: crypto.createHash('sha256').update(serialized).digest('hex'),
    payload_bytes: Buffer.byteLength(serialized),
    matches,
  };
}

function summarizeOutboundObservation(events, instrumentedChannels) {
  const observedChannels = [...new Set(events.map((event) => event.channel))].sort();
  const instrumented = [...new Set(instrumentedChannels)].sort();
  return {
    schema_version: 'pilot-outbound-summary-1.0.0',
    status: events.some((event) => event.status === 'BLOCKED' && !event.negative_control) ? 'FAIL' : 'PASS',
    observed_channels: observedChannels,
    instrumented_channels: instrumented,
    unobserved_channels: ALL_CHANNELS.filter((channel) => !instrumented.includes(channel)),
    safe_event_count: events.filter((event) => event.status === 'PASS').length,
    blocked_event_count: events.filter((event) => event.status === 'BLOCKED').length,
    negative_control_detected: events.some((event) => event.status === 'BLOCKED'),
    events,
  };
}

module.exports = { ALL_CHANNELS, observeOutboundEvent, summarizeOutboundObservation };
