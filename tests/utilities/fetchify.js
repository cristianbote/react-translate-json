import fs from 'fs';

// Define the global fetch
global.fetch = (url) => {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(url)) {
            resolve({
                json: () => new Promise(res => {
                    const fileContent = fs.readFileSync(url, 'utf-8');
                    const json = JSON.parse(fileContent);
                    res(json);
                })
            });
        } else {
            reject();
        }
    })
};