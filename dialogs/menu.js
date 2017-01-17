const builder = require('botbuilder');
const Shell = require('./../Shell');

module.exports = {
    label: 'DIALOG_MENU',
    dialog: [
        function (session, args) {
            const L10N_FIND_GAME = Shell.getLabel('L10N_FIND_GAME');
            builder.Prompts.choice(session, 'L10N_PROMPT_SELECT_ACTIVITY', [L10N_FIND_GAME]);
        },
        function (session, results) {
            const selection = results.response.entity;
            const L10N_FIND_GAME = Shell.getLabel('L10N_FIND_GAME');
            switch (selection) {
                case L10N_FIND_GAME:
                    session.replaceDialog('DIALOG_FIND_GAME');
                    break;
            }
        }
    ]
};