import { replaceInFile } from 'replace-in-file';

// Used for when you need to change a typescript baseURL after the project is big

const prefix = `from '`
const stringsToMatch = [
    `foo`,
    `bar`
];

(async () => {
    try {
        const results = await replaceInFile({
            files: './src/**/*.{ts,tsx}',
            from: () => new RegExp(`(${prefix})(${pathsToUpdate.join('|')})`, 'g'),
            to: (pattern, prefixMatch, pathMatch) => {
                const replacement = `${prefixMatch}src/${pathMatch}`;
                console.log(`${pattern} -> ${replacement}`);
                return replacement;
            },
        });
        console.log('Replacement results:', results);
        process.exit();
    } catch (error) {
        console.error('ERROR: ', error.message);
        process.exit(1);
    }
})();
