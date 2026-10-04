const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { validateCaseDefinition } = require('./schema.cjs');

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function loadCaseDefinitions(filePath) {
  const parsed = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  if (!Array.isArray(parsed) || parsed.length === 0) throw new Error('case definition file must contain a non-empty array');
  const ids = new Set();
  for (const item of parsed) {
    const result = validateCaseDefinition(item);
    if (!result.valid) throw new Error(`${item.case_id || 'unknown case'}: ${result.errors.join('; ')}`);
    if (ids.has(item.case_id)) throw new Error(`duplicate case_id: ${item.case_id}`);
    ids.add(item.case_id);
  }
  return parsed;
}

function buildCaseManifest(definition, environment = {}) {
  const validation = validateCaseDefinition(definition);
  if (!validation.valid) throw new Error(validation.errors.join('; '));
  const source = JSON.stringify(definition);
  return {
    schema_version: 'pilot-case-manifest-1.0.0',
    ...definition,
    browser_version: environment.browser_version || definition.browser_version,
    os_version: environment.os_version || definition.os_version,
    source_sha256: sha256(source),
    synthetic_only: true,
    rights_basis: 'project-authored synthetic fixture under D-01/D-05',
  };
}

function renderSection(section) {
  const sensitive = section.sensitive || null;
  const attrs = [
    `id="${escapeHtml(section.id)}"`,
    'class="field"',
    'data-ocr="true"',
    `data-semantic-role="${escapeHtml(section.role || 'text')}"`,
    `data-value="${escapeHtml(section.value)}"`,
  ];
  if (sensitive) {
    attrs.push(`data-sensitive-category="${escapeHtml(sensitive.category)}"`);
    attrs.push(`data-sensitive-level="${escapeHtml(sensitive.level)}"`);
    attrs.push(`data-ambiguity="${escapeHtml(sensitive.ambiguity)}"`);
    if (sensitive.canary_id) attrs.push(`data-canary-id="${escapeHtml(sensitive.canary_id)}"`);
  }
  return `<div ${attrs.join(' ')}><span class="label">${escapeHtml(section.label)}</span><strong>${escapeHtml(section.value)}</strong></div>`;
}

function renderCaseHtml(definition) {
  const validation = validateCaseDefinition(definition);
  if (!validation.valid) throw new Error(validation.errors.join('; '));
  const sections = definition.content.sections.map(renderSection).join('\n');
  const isScroll = definition.page_family === 'scrolling';
  const modal = definition.page_family === 'modal_overlay'
    ? '<dialog id="security-modal" open aria-label="Synthetic privacy notice"><p data-ocr="true">Synthetic private notice requires review.</p><button id="close-modal" type="button">Close notice</button></dialog>'
    : '';
  const spacer = isScroll ? '<div class="scroll-space" aria-hidden="true"></div><p id="scroll-target" data-ocr="true">End of controlled scrolling case</p>' : '';
  const safeSummary = definition.content.sections.map((section) => section.sensitive ? `[REDACTED:${section.sensitive.category}]` : section.value);
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${escapeHtml(definition.title)} · PrivateSight Pilot</title>
  <style>
    :root{font-family:Segoe UI,Arial,sans-serif;color:#152033;background:#eef2f7}body{margin:0}.shell{max-width:960px;margin:0 auto;padding:32px}header{background:#15325b;color:white;padding:18px 24px;border-radius:14px}main{background:white;margin-top:18px;padding:24px;border-radius:14px;box-shadow:0 8px 30px #18304a1c}.field{display:grid;grid-template-columns:190px 1fr;gap:20px;padding:14px 0;border-bottom:1px solid #dce4ee}.label{color:#536276}.actions{margin-top:22px;display:flex;gap:12px}button{border:0;border-radius:8px;background:#1769aa;color:white;padding:10px 16px;font-weight:600}.scroll-space{height:900px;background:linear-gradient(#fff,#edf3fa);margin:20px 0}dialog{border:0;border-radius:12px;box-shadow:0 16px 50px #0005;padding:24px;max-width:420px}#status{margin-top:12px;color:#234}
  </style>
</head>
<body data-case-id="${escapeHtml(definition.case_id)}" data-seed="${definition.seed}">
  <div class="shell">
    <header><span>PrivateSight controlled synthetic fixture</span></header>
    <main>
      <h1 id="main-heading" data-ocr="true">${escapeHtml(definition.content.heading)}</h1>
      <p data-ocr="true">Case ${escapeHtml(definition.case_id)} contains synthetic or controlled non-personal values only.</p>
      <section aria-label="Case content">${sections}</section>
      ${spacer}
      <div class="actions"><button id="outbound-action" type="button">Send sanitized summary</button></div>
      <p id="status" role="status" aria-live="polite"></p>
    </main>
  </div>
  ${modal}
  <script>
    const safeSummary = ${JSON.stringify(safeSummary)};
    document.querySelector('#close-modal')?.addEventListener('click', () => document.querySelector('#security-modal').close());
    document.querySelector('#outbound-action').addEventListener('click', async () => {
      const response = await fetch('/collector', {method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({case_id:${JSON.stringify(definition.case_id)},summary:safeSummary})});
      document.querySelector('#status').textContent = response.ok ? 'Sanitized summary accepted' : 'Sanitized summary rejected';
    });
  </script>
</body>
</html>`;
}

module.exports = { buildCaseManifest, escapeHtml, loadCaseDefinitions, renderCaseHtml, sha256 };

