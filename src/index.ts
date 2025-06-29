import { join } from 'node:path';
import { generateApi } from 'swagger-typescript-api';
import { getDirname } from './dirname.js';
import type { Spec } from 'swagger-schema-official';

export const generate = async (spec: Spec) => {
  const dirname = await getDirname();
  const extraPath = join(dirname, '../../template/extra.ejs');

  const generated = await generateApi({
    spec,
    generateClient: false,
    extraTemplates: [{ name: 'extra', path: extraPath }],
    patch: true,
    output: false,
    silent: true,
  });

  const allContent = generated.files.map((f) => f.fileContent).join('\n');

  const noExports = allContent.replace(/^export\s/gm, '');
  const exportingRoutes = `${noExports}\nexport { Routes };\n`;
  return exportingRoutes;
};
