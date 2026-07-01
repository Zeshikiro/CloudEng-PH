const fs = require('fs');
let code = fs.readFileSync('src/app/playground/PlaygroundContent.tsx', 'utf8');
code = code.replace(/\\`/g, '`');
code = code.replace(/\\\${/g, '${');
code = code.replace(/}\\\`/g, '}`');
fs.writeFileSync('src/app/playground/PlaygroundContent.tsx', code);
