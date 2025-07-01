const dir = import.meta.dirname || new URL(import.meta.resolve('.')).pathname;
const dirname = dir.endsWith('/') ? dir.slice(0, -1) : dir;

export default dirname;
