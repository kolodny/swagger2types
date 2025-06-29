#!/usr/bin/env node

import { generate } from './index.js';
import { readFileSync } from 'node:fs';

const isPiping = !process.stdin.isTTY;

const main = async () => {
  const specLocation = process.argv[2] ?? '';
  if (!specLocation && !isPiping) {
    console.error('Usage: swagger2types <spec-location>');
    console.error('       swagger2types < <spec.json>');
    console.error('       swagger2types <spec-url>');
    process.exit(1);
  }

  let spec;
  if (isPiping) {
    let stream = '';
    process.stdin.on('data', (c) => (stream += c));
    await new Promise((resolve) => process.stdin.on('end', resolve));
    spec = JSON.parse(stream);
  } else if (specLocation.startsWith('http')) {
    spec = JSON.parse(await (await fetch(specLocation)).text());
  } else {
    spec = JSON.parse(readFileSync(specLocation, 'utf-8'));
  }

  const output = await generate(spec);
  console.log(output);
};

main();
