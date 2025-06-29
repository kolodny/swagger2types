export const getDirname = async () => {
  let dirname = typeof __dirname !== 'undefined' ? __dirname : '';
  if (dirname) return dirname;
  // @ts-ignore
  return (await import('./dirname-esm.js')).dirname;
};
