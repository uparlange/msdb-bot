const Shell = require('./../Shell');

module.exports = {
    recognizer: {
        recognize: function (context, done) {
            let result = null;
            if (context.message.text) {
                const intents = require('./../model/intents.json');
                const regexps = require('./../locale/' + Shell.getLocale() + '/regexp.json');
                for (var regId in regexps) {
                    if (context.message.text.search(new RegExp(regexps[regId], 'i')) !== -1) {
                        intents.forEach((intent, index) => {
                            intent.regexps.forEach((regexp, index) => {
                                if (regexp.id === regId) {
                                    result = { score: 1.0, intent: intent.id };
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
            done(null, result);
        }
    }
};