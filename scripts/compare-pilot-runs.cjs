#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');
const { comparePilotRuns } = require('../src/pilot/reproducibility.cjs');

const left = path.resolve(process.argv[2] || 'artifacts/pilot/current');
const right = path.resolve(process.argv[3] || 'artifacts/pilot/repeat');
const output = path.resolve(process.argv[4] || 'artifacts/pilot/reproducibility-report.json');
const result = comparePilotRuns(left, right);
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, `${JSON.stringify(result, null, 2)}\n`);
process.stdout.write(`${JSON.stringify({ status: result.status, output })}\n`);
if (result.status !== 'PASS') process.exitCode = 1;
