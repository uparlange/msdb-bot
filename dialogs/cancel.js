const builder = require('botbuilder');
const Shell = require('./../Shell');

const L10N_YES = Shell.getLabel('L10N_YES');
const L10N_NO = Shell.getLabel('L10N_NO');

module.exports = {
    dialog: [
        function (session) {
            builder.Prompts.choice(session, 'L10N_CONFIRM_CANCEL', [L10N_YES, L10N_NO]);
        },
        function (session, results) {
            const selection = results.response.entity;
            switch (selection) {
                case L10N_YES:
                    session.replaceDialog('DIALOG_MENU');
                    break;
                case L10N_NO:
                    session.endDialog();
                    break;
            }
        }
    ]
};