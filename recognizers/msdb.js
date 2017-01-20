const Shell = require('./../Shell');

const getIntent = function (message) {
    let result = null;
    if (message) {
        const intents = require('./../model/intents.json');
        const regexps = require('./../locale/' + Shell.getLocale() + '/regexp.json');
        for (var regId in regexps) {
            if (message.search(new RegExp(regexps[regId], 'i')) !== -1) {
                intents.forEach((intent) => {
                    intent.regexps.forEach((regexp) => {
                        if (regexp.id === regId) {
                            result = {
                                score: 1.0,
                                intent: intent.id,
                                entities: getEntities(message)
                            };
                            return;
                        }
                    });
                    if (intent !== null) {
                        return;
                    }
                });
            }
        }
    }
    if (result === null) {
        result = { score: 0.0 };
    }
    return result;
};

const getEntities = function () {
    return [];
};

module.exports = {
    recognizer: {
        recognize: function (context, done) {
            done(null, getIntent(context.message.text));
        }
    }
};