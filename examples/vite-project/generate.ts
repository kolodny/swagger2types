import { $, YAML, fs } from 'zx';

import { generate } from 'swagger2types';

const OPENAPI_SPEC = `https://app.stainless.com/api/spec/documented/openai/openapi.documented.json`;
const GITHUB_SPEC = `https://raw.githubusercontent.com/github/rest-api-description/refs/heads/main/descriptions/api.github.com/api.github.com.json`;
const PETSTORE_SPEC = `https://petstore.swagger.io/v2/swagger.json`;
const SWAPI = `https://swapi.profiq.com/api/openapi`;

const downloadSpec = async (name: string, specUrl: string) => {
  const response = await fetch(specUrl);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch spec from ${specUrl}: ${response.statusText}`
    );
  }
  const spec = YAML.parse((await response.text()).replace(/\*\//g, ''));

  await fs.ensureDir('./specs');
  await fs.writeFile(`./specs/${name}.json`, JSON.stringify(spec, null, 2));

  const generated = await generate(spec);
  await fs.ensureDir('./generated');
  await fs.writeFile(`./generated/${name}.ts`, generated);

  await fs.ensureDir('./src/sta');
  await $`npx swagger-typescript-api -p specs/${name}.json --union-enums -o ./src/sta -n ${name}`;
};

await $`rm -rf ./generated`;
await $`rm -rf ./specs`;
await $`rm -rf ./src/sta`;
await downloadSpec('openai', OPENAPI_SPEC);
await downloadSpec('github', GITHUB_SPEC);
await downloadSpec('petstore', PETSTORE_SPEC);
await downloadSpec('swapi', SWAPI);
