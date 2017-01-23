const builder = require('botbuilder');
const Shell = require('./Shell');

module.exports = {
    getIntents: function () {
        return require('./model/intents.json');
    },
    getRegexps4locale: function (locale) {
        return require('./locale/' + locale + '/regexp.json');
    },
    getRegexps: function (group) {
        const result = [];
        const locales = Shell.getLocales();
        locales.forEach((locale) => {
            const regexps = this.getRegexps4locale(locale);
            regexps.forEach((regexp) => {
                if (group === undefined || regexp.group === group) {
                    result.push({
                        group: regexp.group,
                        value: regexp.value,
                        locale: locale
                    });
                }
            });
        });
        return result;
    },
    recognize: function (message) {
        let result = null;
        if (message) {
            const intents = this.getIntents();
            const regexps = this.getRegexps4locale(Shell.getLocale());
            regexps.forEach((regexp) => {
                const regexpGroup = regexp.group;
                if (message.search(new RegExp(regexp.value, 'i')) !== -1) {
                    intents.forEach((intent) => {
                        if (regexpGroup === intent.regexpGroup) {
                            result = {
                                score: 1.0,
                                intent: intent.name,
                                entities: []
                            };
                            return;
                        }
                    });
                }
                if (result !== null) {
                    return;
                }
            });
        }
        if (result === null) {
            result = { score: 0.0 };
        }
        return result;
    }
};