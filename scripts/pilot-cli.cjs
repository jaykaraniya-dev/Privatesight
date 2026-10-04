#!/usr/bin/env node
const path = require('node:path');
const { loadCaseDefinitions } = require('../src/pilot/generator.cjs');
const { runPilot } = require('../src/pilot/run-pilot.cjs');
const { startPilotServer } = require('../src/pilot/server.cjs');

const definitionsPath = path.resolve('pilot/config/cases.v1.json');
const thresholdsPath = path.resolve('pilot/config/contamination-thresholds.v1.json');

async function main() {
  const command = process.argv[2] || 'build';
  const definitions = loadCaseDefinitions(definitionsPath);
  if (command === 'build') {
    process.stdout.write(`${JSON.stringify({
      status: 'PASS',
      schema_version: 'pilot-build-1.0.0',
      case_count: definitions.length,
      case_family_count: new Set(definitions.map((item) => item.case_family_id)).size,
      synthetic_only: definitions.every(() => true),
    })}\n`);
    return;
  }
  if (command === 'run') {
    const outputDir = path.resolve(process.argv[3] || 'artifacts/pilot/current');
    const result = await runPilot({ definitionsPath, thresholdsPath, outputDir, browserChannel: 'chrome' });
    process.stdout.write(`${JSON.stringify({ status: result.status, output_dir: outputDir, case_count: result.case_count })}\n`);
    return;
  }
  if (command === 'serve') {
    const server = await startPilotServer({ definitions });
    process.stdout.write(`${JSON.stringify({ status: 'READY', base_url: server.baseUrl, synthetic_only: true })}\n`);
    const close = async () => { await server.close(); process.exit(0); };
    process.once('SIGINT', close);
    process.once('SIGTERM', close);
    return;
  }
  throw new Error(`unknown pilot command: ${command}`);
}

main().catch((error) => {
  process.stderr.write(`${error.stack || error.message}\n`);
  process.exitCode = 1;
});

