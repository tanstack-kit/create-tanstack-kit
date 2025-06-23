import path from 'path';
import fs from 'fs';
export const version = () => {
    const jsonFile = path.resolve(process.cwd(), 'package.json');
    const jsonFileContent = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
    return jsonFileContent.version;
};
//# sourceMappingURL=version.js.map