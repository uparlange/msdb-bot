const builder = require('botbuilder');
const rp = require('request-promise');

const baseUrl = 'https://msdb.lapli.fr/php/services';

let token = null;

const getInitUrl = function () {
    return baseUrl + '/init.php';
};

const getSearchUrl = function (gameName, token) {
    return baseUrl + '/search.php?params={"description":"' + gameName + '"}&token=' + token
}

const getToken = function (callback) {
    if (token === null) {
        rp({
            uri: getInitUrl(),
            json: true
        }).then(function (result) {
            token = result.data.token;
            callback(token);
        });
    }
    else {
        callback(token);
    }
}

const findGames = function (gameName, callback) {
    getToken((token) => {
        rp({
            uri: getSearchUrl(gameName, token),
            json: true
        }).then(function (result) {
            callback(result.data);
        }).catch(function (err) {
            callback(games);
        });
    });
}

module.exports = {
    label: 'DIALOG_FIND_GAME',
    dialog: [
        function (session, args) {
            builder.Prompts.text(session, 'L10N_PROMPT_GAME_NAME');
        },
        function (session, results) {
            findGames(results.response, (games) => {
                if (games.length > 0) {
                    const cards = [];
                    games.forEach((element, index, array) => {
                        cards.push(new builder.HeroCard(session)
                            .title(element.description)
                            .images([
                                builder.CardImage.create(session, 'https://msdb.lapli.fr/games/' + element.name + '/titles.png')
                            ])
                            .buttons([
                                builder.CardAction.openUrl(session, 'https://msdb.lapli.fr/#/detail?name=' + element.name, 'L10N_CONSULT')
                            ]));
                    });
                    const msg = new builder.Message(session)
                        .attachmentLayout(builder.AttachmentLayout.carousel)
                        .attachments(cards);
                    session.send(msg);
                }
                else {
                    session.send('L10N_NO_RESULT');

                }
                const L10N_YES = session.localizer.gettext(session.preferredLocale(), "L10N_YES");
                const L10N_NO = session.localizer.gettext(session.preferredLocale(), "L10N_NO");
                const card = new builder.HeroCard(session)
                    .title('L10N_PROMPT_NEW_SEARCH')
                    .buttons([
                        builder.CardAction.imBack(session, L10N_YES, L10N_YES),
                        builder.CardAction.imBack(session, L10N_NO, L10N_NO)
                    ]);
                const msg = new builder.Message(session).addAttachment(card);
                builder.Prompts.choice(session, msg, [L10N_YES, L10N_NO]);
            });
        },
        function (session, results) {
            const selection = results.response.entity;
            const L10N_YES = session.localizer.gettext(session.preferredLocale(), "L10N_YES");
            const L10N_NO = session.localizer.gettext(session.preferredLocale(), "L10N_NO");
            switch (selection) {
                case L10N_YES:
                    session.replaceDialog('DIALOG_FIND_GAME');
                    break;
                case L10N_NO:
                    session.replaceDialog('DIALOG_MENU');
                    break;
            }
        }
    ],
    triggerAction: { matches: 'INTENT_FIND_GAME' }
};