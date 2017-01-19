const builder = require('botbuilder');
const UrlUtils = require('./../utils/UrlUtils');

module.exports = {
    dialog: [
        function (session) {
            const card = new builder.HeroCard(session)
                .title('L10N_MAME_TITLE')
                .text('L10N_MAME_DESCRIPTION')
                .images([
                    builder.CardImage.create(session, UrlUtils.getLocalImageUrl('msdb_capture.png'))
                ])
                .buttons([
                    builder.CardAction.openUrl(session, UrlUtils.getBaseUrl(), 'L10N_CONSULT')
                ]);
            const msg = new builder.Message(session).addAttachment(card);
            session.send(msg);
            session.endDialog();
        }
    ]
};