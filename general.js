const fs = require('fs');

function parseINI(fileContent) {
    const lines = fileContent.split('\n');
    let currentSection = null;
    const data = {};

    lines.forEach(line => {
        line = line.trim();

        if (!line || line.startsWith(';')) {
            // Ignorar linhas vazias ou comentadas
            return;
        } else if (line.startsWith('[') && line.endsWith(']')) {
            // Seção encontrada
            currentSection = line.substring(1, line.length - 1);
            data[currentSection] = {};
        } else {
            // Chave-valor encontrado dentro de uma seção
            const keyValue = line.split('=');
            if (keyValue.length === 2) {
                const key = keyValue[0].trim();
                const value = keyValue[1].trim();
                data[currentSection][key] = value;
            }
        }
    });

    return data;
}

// Exemplo de uso:
const fileContent = fs.readFileSync('arquivo.ini', 'utf-8');
const parsedData = parseINI(fileContent);
console.log(parsedData);
