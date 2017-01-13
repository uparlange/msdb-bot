const builder = require('botbuilder');

module.exports = {
    label: 'DIALOG_MENU',
    dialog: [
        function (session, args) {
            const L10N_FIND_GAME = session.localizer.gettext(session.preferredLocale(), "L10N_FIND_GAME");
            const card = new builder.HeroCard(session)
                .title('L10N_PROMPT_SELECT_ACTIVITY')
                .buttons([
                    builder.CardAction.imBack(session, L10N_FIND_GAME, L10N_FIND_GAME)
                ]);
            const msg = new builder.Message(session).addAttachment(card);
            builder.Prompts.choice(session, msg, [L10N_FIND_GAME], {
                maxRetries: 0
            });
        },
        function (session, results) {
            if (results.response) {
                const selection = results.response.entity;
                const L10N_FIND_GAME = session.localizer.gettext(session.preferredLocale(), "L10N_FIND_GAME");
                switch (selection) {
                    case L10N_FIND_GAME:
                        session.replaceDialog('DIALOG_FIND_GAME');
                        break;
                }
            }
            else {
                session.send('L10N_INVALID_CHOICE');
                session.replaceDialog('DIALOG_MENU');
            }
        }
    ]
};