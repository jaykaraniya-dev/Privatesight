const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { chromium } = require('playwright');
const { buildCaseManifest, sha256 } = require('./generator.cjs');

function writeArtifact(outputDir, relativePath, value, encoding) {
  const target = path.join(outputDir, relativePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  const body = Buffer.isBuffer(value) ? value : Buffer.from(value, encoding || 'utf8');
  fs.writeFileSync(target, body);
  return { path: relativePath.replaceAll('\\', '/'), sha256: sha256(body), bytes: body.length };
}

async function capturePilotCases({ definitions, baseUrl, outputDir, browserChannel = 'chrome' }) {
  fs.mkdirSync(outputDir, { recursive: true });
  const browser = await chromium.launch({ channel: browserChannel, headless: true });
  const browserVersion = browser.version();
  const records = [];
  try {
    for (const definition of definitions) {
      const context = await browser.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });
      const page = await context.newPage();
      const started = process.hrtime.bigint();
      await page.goto(`${baseUrl}/case/${encodeURIComponent(definition.case_id)}`, { waitUntil: 'networkidle' });
      if (definition.page_family === 'scrolling') {
        await page.locator('#scroll-target').scrollIntoViewIfNeeded();
      }
      const title = await page.title();
      const url = page.url();
      const viewport = page.viewportSize();
      const scroll = await page.evaluate(() => ({ x: window.scrollX, y: window.scrollY }));
      const dom = await page.evaluate(() => ({
        schema_version: 'pilot-dom-1.0.0',
        elements: Array.from(document.querySelectorAll('[id]')).map((element) => {
          const box = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          return {
            id: element.id,
            tag: element.tagName.toLowerCase(),
            role: element.getAttribute('role') || element.dataset.semanticRole || null,
            text: element.textContent.trim(),
            value: element.dataset.value || null,
            dataset: { ...element.dataset },
            box: { x: box.x, y: box.y, width: box.width, height: box.height },
            visible: style.display !== 'none' && style.visibility !== 'hidden' && box.width > 0 && box.height > 0,
          };
        }),
      }));
      const accessibility = await page.locator('body').ariaSnapshot({ mode: 'ai', boxes: true, depth: 12 });
      const ocrRecords = await page.evaluate(() => Array.from(document.querySelectorAll('[data-ocr]')).map((element, index) => {
        const box = element.getBoundingClientRect();
        return {
          record_id: `ocr-${index + 1}`,
          dom_id: element.id || null,
          text: element.dataset.value || element.textContent.trim(),
          confidence: 1,
          box: { x: box.x, y: box.y, width: box.width, height: box.height },
        };
      }));
      const screenshot = await page.screenshot({ type: 'png', fullPage: false, scale: 'css' });
      const elapsedMs = Number(process.hrtime.bigint() - started) / 1e6;
      const caseDir = definition.case_id;
      const artifacts = {
        screenshot: writeArtifact(outputDir, path.join(caseDir, 'screenshot.png'), screenshot),
        dom_html: writeArtifact(outputDir, path.join(caseDir, 'dom.html'), await page.content()),
        dom: writeArtifact(outputDir, path.join(caseDir, 'dom.json'), JSON.stringify(dom, null, 2)),
        accessibility: writeArtifact(outputDir, path.join(caseDir, 'accessibility.yml'), accessibility),
        ocr: writeArtifact(outputDir, path.join(caseDir, 'ocr.json'), JSON.stringify({
          schema_version: 'pilot-ocr-1.0.0',
          engine: 'dom-rendered-text-surrogate',
          engine_version: '1.0.0',
          status: 'TEST INFRASTRUCTURE DEPENDENCY; not pixel OCR',
          case_id: definition.case_id,
          screenshot: `${caseDir}/screenshot.png`,
          records: ocrRecords,
        }, null, 2)),
        task: writeArtifact(outputDir, path.join(caseDir, 'task.json'), JSON.stringify({
          schema_version: 'pilot-task-1.0.0',
          case_id: definition.case_id,
          task_id: definition.task_id,
          expected_action: definition.expected_action,
          expected_outcome: definition.expected_outcome,
        }, null, 2)),
      };
      const manifest = buildCaseManifest(definition, { browser_version: browserVersion, os_version: os.version() });
      const record = {
        ...manifest,
        title,
        url,
        viewport,
        scroll,
        capture_duration_ms: elapsedMs,
        screenshot_bounds: { width: viewport.width, height: viewport.height },
        artifacts,
      };
      artifacts.capture = writeArtifact(outputDir, path.join(caseDir, 'capture.json'), JSON.stringify(record, null, 2));
      records.push(record);
      await context.close();
    }
  } finally {
    await browser.close();
  }
  writeArtifact(outputDir, 'capture-index.json', JSON.stringify({
    schema_version: 'pilot-capture-index-1.0.0',
    count: records.length,
    case_ids: records.map((item) => item.case_id),
  }, null, 2));
  return records;
}

module.exports = { capturePilotCases, writeArtifact };
