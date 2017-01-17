const rp = require('request-promise');

const call = function (options, callback, defaultValue) {
    rp(options).then((result) => {
        callback(result);
    }).catch(() => {
        callback(defaultValue || null);
    });
};

module.exports = {
    get: function (options, callback, defaultValue) {
        const params = Object.assign({ method: 'GET', json: true }, options);
        call(params, callback, defaultValue)
    }
};