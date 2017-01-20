const builder = require('botbuilder');
const HttpUtils = require('./../utils/HttpUtils');
const UrlUtils = require('./../utils/UrlUtils');
const Shell = require('./../Shell');

const MAX_DISPLAYED_ITEMS = 5;
const L10N_YES = Shell.getLabel('L10N_YES');
const L10N_NO = Shell.getLabel('L10N_NO');

const getToken = function (callback) {
    const options = { uri: UrlUtils.getInitServiceUrl() };
    HttpUtils.get(options, (result) => {
        callback(result.data.token);
    });
}

const findGames = function (gameName, callback) {
    getToken((token) => {
        const options = { uri: UrlUtils.getSearchServiceUrl(encodeURIComponent(gameName), token) };
        HttpUtils.get(options, (result) => {
            callback(result.data);
        }, []);
    });
}

module.exports = {
    dialog: [
        function (session) {
            builder.Prompts.text(session, 'L10N_PROMPT_GAME_NAME');
        },
        function (session, results) {
            session.sendTyping();
            findGames(results.response, (games) => {
                const gamesCount = games.length;
                if (gamesCount > 0) {
                    session.send(Shell.getLabel('L10N_GAMES_FOUND', [gamesCount, Math.min(MAX_DISPLAYED_ITEMS, gamesCount)]));
                    const cards = [];
                    games.forEach((element, index) => {
                        if (index < MAX_DISPLAYED_ITEMS) {
                            cards.push(new builder.HeroCard(session)
                                .title(element.description)
                                .images([
                                    builder.CardImage.create(session, UrlUtils.getGameTitlesUrl(element.name))
                                ])
                                .buttons([
                                    builder.CardAction.openUrl(session, UrlUtils.getGameDetailUrl(element.name), 'L10N_CONSULT')
                                ]));
                        }
                    });
                    const msg = new builder.Message(session)
                        .attachmentLayout(builder.AttachmentLayout.carousel)
                        .attachments(cards);
                    session.send(msg);
                }
                else {
                    session.send('L10N_NO_RESULT');
                }
                builder.Prompts.choice(session, 'L10N_PROMPT_NEW_SEARCH', [L10N_YES, L10N_NO]);
            });
        },
        function (session, results) {
            const selection = results.response.entity;
            switch (selection) {
                case L10N_YES:
                    session.replaceDialog('DIALOG_FIND_GAME');
                    break;
                case L10N_NO:
                    session.replaceDialog('DIALOG_MENU');
                    break;
            }
        }
    ]
};