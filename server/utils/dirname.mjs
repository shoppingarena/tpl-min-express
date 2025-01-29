import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export const getDirname = () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    console.log('Directory name:', __dirname);
    return __dirname;
}
