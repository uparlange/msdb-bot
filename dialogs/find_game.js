const builder = require('botbuilder');
const L10nUtils = require('./../utils/L10nUtils');
const HttpUtils = require('./../utils/HttpUtils');
const UrlUtils = require('./../utils/UrlUtils');

const MAX_DISPLAYED_ITEMS = 5;

const getToken = function (callback) {
    const options = { uri: UrlUtils.getInitUrl() };
    HttpUtils.get(options, (result) => {
        callback(result.data.token);
    });
}

const findGames = function (gameName, callback) {
    getToken((token) => {
        const options = { uri: UrlUtils.getSearchUrl(gameName, token) };
        HttpUtils.get(options, (result) => {
            callback(result.data);
        }, []);
    });
}

module.exports = {
    label: 'DIALOG_FIND_GAME',
    dialog: [
        function (session, args) {
            builder.Prompts.text(session, 'L10N_PROMPT_GAME_NAME');
        },
        function (session, results) {
            session.sendTyping();
            findGames(results.response, (games) => {
                const gamesCount = games.length;
                if (gamesCount > 0) {
                    session.send(L10nUtils.getLabel(session, 'L10N_GAMES_FOUND', [gamesCount, MAX_DISPLAYED_ITEMS]));
                    const cards = [];
                    games.forEach((element, index, array) => {
                        if (index < MAX_DISPLAYED_ITEMS) {
                            cards.push(new builder.HeroCard(session)
                                .title(element.description)
                                .images([
                                    builder.CardImage.create(session, 'https://msdb.lapli.fr/games/' + element.name + '/titles.png')
                                ])
                                .buttons([
                                    builder.CardAction.openUrl(session, 'https://msdb.lapli.fr/#/detail?name=' + element.name, 'L10N_CONSULT')
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
                const L10N_YES = L10nUtils.getLabel(session, "L10N_YES");
                const L10N_NO = L10nUtils.getLabel(session, "L10N_NO");
                builder.Prompts.choice(session, 'L10N_PROMPT_NEW_SEARCH', [L10N_YES, L10N_NO]);
            });
        },
        function (session, results) {
            const selection = results.response.entity;
            const L10N_YES = L10nUtils.getLabel(session, "L10N_YES");
            const L10N_NO = L10nUtils.getLabel(session, "L10N_NO");
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