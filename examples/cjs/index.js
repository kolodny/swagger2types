const { writeFileSync } = require('fs');
const { generate } = require('swagger2types');

const SPEC_URL = `https://raw.githubusercontent.com/github/rest-api-description/refs/heads/main/descriptions/api.github.com/api.github.com.json`;

(async () => {
  const spec = await fetch(SPEC_URL).then((response) => response.json());
  const generated = await generate(spec);
  writeFileSync('./generated.ts', generated);
})();
