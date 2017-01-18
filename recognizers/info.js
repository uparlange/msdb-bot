const builder = require('botbuilder');
const Shell = require('./../Shell');

module.exports = {
    recognizer: {
        recognize: function (context, done) {
            done(null, Shell.checkIntent(context.message.text, 'L10N_REGEXP_INFO', 'INTENT_INFO'));
        }
    }
};