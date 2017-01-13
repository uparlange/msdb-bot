const builder = require('botbuilder');

module.exports = {
    label: 'DialogInfo',
    dialog: [
        function (session, args) {
            const card = new builder.HeroCard(session)
                .title('L10N_MAME_TITLE')
                .text('L10N_MAME_DESCRIPTION')
                .images([
                    builder.CardImage.create(session, 'http://localhost:' + process.env.PORT + '/public/images/msdb_capture.png')
                ])
                .buttons([
                    builder.CardAction.openUrl(session, 'https://msdb.lapli.fr', 'L10N_CONSULT')
                ]);
            const msg = new builder.Message(session).addAttachment(card);
            session.send(msg);
            session.endDialog();
        }
    ],
    triggerAction: { matches: 'INTENT_INFO' }
};