import { join } from 'node:path';
import { generateApi } from 'swagger-typescript-api';
import { getDirname } from './dirname.js';
import type { Spec } from 'swagger-schema-official';

type Params = Parameters<typeof generateApi>[0];

export const generate = async (spec: Spec, params?: Params) => {
  const dirname = await getDirname();
  const extraPath = join(dirname, '../../template/extra.ejs');

  const fixer = (key: string, value: any) => {
    const fix = key === 'description' && typeof value === 'string';
    return !fix ? value : value.replace('*/', '* /');
  };

  const fixedSpec = JSON.parse(JSON.stringify(spec, fixer));

  const generated = await generateApi({
    spec: fixedSpec,
    generateClient: false,
    extraTemplates: [{ name: 'extra', path: extraPath }],
    patch: true,
    output: false,
    silent: true,
    hooks: {
      onInit(configuration, genProcess) {
        const getInfoTypes = genProcess.schemaRoutes.getRequestInfoTypes;
        genProcess.schemaRoutes.getRequestInfoTypes = (types: any) => {
          const responses = Object.keys(types.requestInfos);

          const result = getInfoTypes.call(genProcess.schemaRoutes, types);
          const isSuccess = responses.join(',') === 'default';
          for (const r of result ?? []) r.isSuccess ||= isSuccess;

          return result;
        };
        return params?.hooks?.onInit?.(configuration, genProcess);
      },
    },
    ...params,
  });

  const allContent = generated.files.map((f) => f.fileContent).join('\n');

  const noExports = allContent.replace(/^export\s/gm, '');
  const exportingRoutes = `${noExports}\nexport type { Routes };\n`;
  return exportingRoutes;
};
