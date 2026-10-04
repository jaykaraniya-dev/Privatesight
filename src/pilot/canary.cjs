function buildCanaryRegistry(definitions) {
  const registry = [];
  const ids = new Set();
  for (const definition of definitions) {
    for (const section of definition.content.sections) {
      const canaryId = section.sensitive?.canary_id;
      if (!canaryId) continue;
      if (ids.has(canaryId)) continue;
      ids.add(canaryId);
      registry.push({
        canary_id: canaryId,
        case_id: definition.case_id,
        element_id: section.id,
        category: section.sensitive.category,
        value: section.value,
        synthetic: true,
      });
    }
  }
  return registry;
}

function scanForCanaries(payload, registry) {
  const serialized = typeof payload === 'string' ? payload : JSON.stringify(payload);
  return registry
    .filter((entry) => serialized.includes(entry.value) || serialized.includes(entry.canary_id))
    .map((entry) => ({ canary_id: entry.canary_id, case_id: entry.case_id, category: entry.category }));
}

module.exports = { buildCanaryRegistry, scanForCanaries };

