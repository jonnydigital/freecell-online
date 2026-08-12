#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(new URL('..', import.meta.url).pathname);
const ROOT_LAYOUT = resolve(ROOT, 'src/app/layout.tsx');

const source = readFileSync(ROOT_LAYOUT, 'utf8');

const dynamicRootPatterns = [
  {
    label: 'next/headers import',
    pattern: /from\s+["']next\/headers["']/,
    reason: 'request APIs in the root layout make the whole app render on demand',
  },
  {
    label: 'headers() call',
    pattern: /\bheaders\s*\(/,
    reason: 'headers() opts the root layout into dynamic rendering',
  },
  {
    label: 'cookies() call',
    pattern: /\bcookies\s*\(/,
    reason: 'cookies() opts the root layout into dynamic rendering',
  },
  {
    label: 'draftMode() call',
    pattern: /\bdraftMode\s*\(/,
    reason: 'draftMode() opts the root layout into dynamic rendering',
  },
  {
    label: 'force-dynamic export',
    pattern: /export\s+const\s+dynamic\s*=\s*["']force-dynamic["']/,
    reason: 'force-dynamic disables static generation for the shared shell',
  },
];

const failures = dynamicRootPatterns.filter(({ pattern }) => pattern.test(source));

if (failures.length > 0) {
  console.error('Root layout static audit failed:');
  for (const failure of failures) {
    console.error(`- ${failure.label}: ${failure.reason}`);
  }
  console.error(`\nFile: ${ROOT_LAYOUT}`);
  console.error('Move request-specific logic out of the root layout or prove the route-level tradeoff explicitly.');
  process.exit(1);
}

console.log('Root layout static audit passed.');
