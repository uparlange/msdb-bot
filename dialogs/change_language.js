const builder = require('botbuilder');
const Shell = require('./../Shell');

module.exports = {
    label: 'DIALOG_CHANGE_LANGUAGE',
    dialog: [
        function (session) {
            builder.Prompts.choice(session, 'L10N_PROMPT_LANGUAGE', 'Français|English');
        },
        function (session, results) {
            let locale;
            switch (results.response.entity) {
                case 'English':
                    locale = 'en';
                    break;
                case 'Français':
                    locale = 'fr';
                    break;
            }
            Shell.setLocale(session, locale, () => {
                session.endDialog('L10N_LOCALE_UPDATED');
            });
        }
    ],
    triggerAction: { matches: 'INTENT_CHANGE_LANGUAGE' }
};