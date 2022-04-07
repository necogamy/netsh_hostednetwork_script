const { exec } = require('shelljs');

const ssid: String = process.argv[2];
const key: String = process.argv[3];
const directory: String = 'hostednetwork';
const fileName: String = 'access_keys.txt';
const path: String = `./${directory}/${fileName}`;

(function createAndStartInterface(): any {
    const err = new Error('Internal script (createAndStartInterface) failed');

    const setHostedNetwork: any = exec(`netsh wlan set hostednetwork mode=allow ssid=${ssid} key=${key}`, code => {
        if (code !== 0) throw err;
        console.log('Hosted network created');
    });
    const startHostedNetwork: any = exec(`netsh wlan start hostednetwork`, code => {
        if (code !== 0) throw err;
        console.log('Hosted network started');
    });
})();

(function clearKeys(): any {
    exec(`rm ${path}`);
    exec(`rmdir ${directory}`);
})();

(function createKeys(): any {
    exec(`mkdir ${directory}`);
    exec(`touch ${path}`);
    exec(`echo ${ssid} >> ${path}`);
    exec(`echo ${key} >> ${path}`);
    console.log(`Keys created in ${path}`);
})();