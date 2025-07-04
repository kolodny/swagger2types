import { writeFileSync } from 'fs';
import { generate } from 'swagger2types';

const GITHUB_SPEC = `https://raw.githubusercontent.com/github/rest-api-description/refs/heads/main/descriptions/api.github.com/api.github.com.json`;
const PETSTORE_SPEC = `https://petstore.swagger.io/v2/swagger.json`;
const SWAPI = `https://swapi.profiq.com/api/openapi`;


(async () => {
  const downloadSpec = async (name, specUrl) => {
    const response = await fetch(specUrl);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch spec from ${specUrl}: ${response.statusText}`
      );
    }
    const spec = await response.json();
    const generated = await generate(spec);
    writeFileSync(`./generated/${name}.ts`, generated);
  };

  await downloadSpec('github', GITHUB_SPEC);
  await downloadSpec('petstore', PETSTORE_SPEC);
  await downloadSpec('swapi', SWAPI);
})();
