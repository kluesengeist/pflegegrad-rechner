#!/usr/bin/env node
// Führt die Selbsttests der Rechenlogik ohne Browser aus:  node test.js
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const match = html.match(/<script id="nba-core">([\s\S]*?)<\/script>/);
if (!match) {
  console.error('Script-Block "nba-core" nicht gefunden.');
  process.exit(1);
}
const context = { console };
context.globalThis = context;
vm.runInNewContext(match[1], context);
const NBA = context.NBA;

const results = NBA.selfTest();
const failed = results.filter(r => !r.ok);
for (const r of results) console.log((r.ok ? '  ok   ' : '  FAIL ') + r.name);
console.log(`\n${results.length - failed.length} von ${results.length} Tests bestanden.`);

// Strukturprüfung: 78 Kriterien, Modulmaxima entsprechen den Skalen
let count = 0;
for (const m of NBA.MODULES) count += m.items.length;
for (const p of NBA.MODULES[4].parts) count += p.items.length;
if (count !== 78) { console.error(`Erwartet 78 Kriterien, gefunden ${count}.`); process.exit(1); }
const maxOf = m => m.items.reduce((a, i) => a + Math.max(...i.scale.map(o => o.v)), 0);
const expected = { 1: 15, 2: 33, 3: 65, 4: 54, 6: 18 };
for (const [id, max] of Object.entries(expected)) {
  const m = NBA.MODULES.find(x => x.id === Number(id));
  if (maxOf(m) !== max) { console.error(`Modul ${id}: Skalenmaximum ${maxOf(m)} statt ${max}.`); process.exit(1); }
}
console.log('Struktur: 78 Kriterien, Modulmaxima korrekt.');
process.exit(failed.length ? 1 : 0);
