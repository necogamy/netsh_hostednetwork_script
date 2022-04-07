var exec = require('shelljs').exec;
var ssid = process.argv[2];
var key = process.argv[3];
var directory = 'hostednetwork';
var fileName = 'access_keys.txt';
var path = "./".concat(directory, "/").concat(fileName);
(function createAndStartInterface() {
    var err = new Error('Internal script (createAndStartInterface) failed');
    var setHostedNetwork = exec("netsh wlan set hostednetwork mode=allow ssid=".concat(ssid, " key=").concat(key), function (code) {
        if (code !== 0)
            throw err;
        console.log('Hosted network created');
    });
    var startHostedNetwork = exec("netsh wlan start hostednetwork", function (code) {
        if (code !== 0)
            throw err;
        console.log('Hosted network started');
    });
})();
(function clearKeys() {
    exec("rm ".concat(path));
    exec("rmdir ".concat(directory));
})();
(function createKeys() {
    exec("mkdir ".concat(directory));
    exec("touch ".concat(path));
    exec("echo ".concat(ssid, " >> ").concat(path));
    exec("echo ".concat(key, " >> ").concat(path));
    console.log("Keys created in ".concat(path));
})();
