const builder = require('botbuilder');

module.exports = {
    recognizer: new builder.RegExpRecognizer('INTENT_HELP', /^(aide)/i)
};