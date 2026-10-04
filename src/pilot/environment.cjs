const childProcess = require('node:child_process');
const os = require('node:os');

function command(executable, args) {
  try {
    return { value: childProcess.execFileSync(executable, args, { encoding: 'utf8', windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] }).trim(), unavailable_reason: null };
  } catch (error) {
    return { value: null, unavailable_reason: `${error.code || 'COMMAND_FAILED'}: ${String(error.stderr || error.message).trim()}` };
  }
}

function powershell(script) {
  return command('powershell.exe', ['-NoProfile', '-NonInteractive', '-Command', script]);
}

function captureGpu() {
  const result = powershell("$v=Get-ItemProperty 'HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\*' -ErrorAction SilentlyContinue | Where-Object {$_.DriverDesc} | Select-Object -First 1 DriverDesc,DriverVersion; if($v){$v|ConvertTo-Json -Compress}else{throw 'GPU registry record unavailable'}");
  if (!result.value) return { name: null, driver_version: null, unavailable_reason: result.unavailable_reason };
  try {
    const parsed = JSON.parse(result.value);
    return { name: parsed.DriverDesc || null, driver_version: parsed.DriverVersion || null, unavailable_reason: null };
  } catch (error) {
    return { name: null, driver_version: null, unavailable_reason: `GPU parse failed: ${error.message}` };
  }
}

function captureReferenceEnvironment({ browserVersion }) {
  const cpus = os.cpus();
  const dpi = powershell("$v=(Get-ItemProperty 'HKCU:\\Control Panel\\Desktop\\WindowMetrics' -ErrorAction Stop).AppliedDPI; [string]$v");
  const power = command('powercfg.exe', ['/getactivescheme']);
  const gitCommit = command('git.exe', ['rev-parse', 'HEAD']);
  const gitStatus = command('git.exe', ['status', '--porcelain']);
  let playwrightVersion = null;
  let playwrightUnavailable = null;
  try {
    playwrightVersion = require('playwright/package.json').version;
  } catch (error) {
    playwrightUnavailable = error.message;
  }
  return {
    schema_version: 'pilot-environment-1.0.0',
    captured_at: new Date().toISOString(),
    hardware: {
      cpu: { model: cpus[0]?.model || 'UNKNOWN', logical_processors: cpus.length, architecture: os.arch() },
      ram_bytes: os.totalmem(),
      gpu: captureGpu(),
      display_scale: dpi.value ? { applied_dpi: Number(dpi.value), scale_factor: Number(dpi.value) / 96 } : { unavailable_reason: dpi.unavailable_reason },
      power_mode: power.value || null,
      power_mode_unavailable_reason: power.unavailable_reason,
    },
    software: {
      os: { name: os.type(), platform: os.platform(), version: os.version(), release: os.release(), architecture: os.arch() },
      browser: { name: 'Google Chrome', version: browserVersion || 'UNKNOWN' },
      node: process.version,
      playwright: { version: playwrightVersion, unavailable_reason: playwrightUnavailable },
      benchmark: 'privatesight-pilot-benchmark-1.0.0',
      git: { commit: gitCommit.value, dirty: Boolean(gitStatus.value), status_probe_error: gitStatus.unavailable_reason },
    },
    runtime: {
      backend: 'PLAYWRIGHT_CHROME_FIXTURE',
      model: 'NONE_FIXTURE_MODE',
      ocr: 'dom-rendered-text-surrogate@1.0.0',
      wasm: 'NOT_USED',
      webgpu: 'NOT_USED',
    },
  };
}

module.exports = { captureReferenceEnvironment };

