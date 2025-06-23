//fully qualyfied project name
import path from 'path';
import {} from '../cli/index.js';
export const fqpn = (configuration) => {
    const project = path.resolve(process.cwd(), configuration.name);
    return project;
};
//# sourceMappingURL=fqpn.js.map