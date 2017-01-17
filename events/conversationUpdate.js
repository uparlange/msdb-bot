module.exports = {
    handler: function (message) {
        if (message.membersAdded && message.membersAdded.length > 0) {
            var membersAdded = message.membersAdded
                .map((m) => {
                    var isSelf = m.id === message.address.bot.id;
                    return (isSelf ? message.address.bot.name : m.name) || '' + ' (Id: ' + m.id + ')';
                })
                .join(', ');

            var reply = new builder.Message()
                .address(message.address)
                .text('Welcome ' + membersAdded);
            bot.send(reply);
        }

        if (message.membersRemoved && message.membersRemoved.length > 0) {
            var membersRemoved = message.membersRemoved
                .map((m) => {
                    var isSelf = m.id === message.address.bot.id;
                    return (isSelf ? message.address.bot.name : m.name) || '' + ' (Id: ' + m.id + ')';
                })
                .join(', ');

            var reply = new builder.Message()
                .address(message.address)
                .text('The following members ' + membersRemoved + ' were removed or left the conversation :(');
            bot.send(reply);
        }
    }
};