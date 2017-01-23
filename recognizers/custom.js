const Model = require("./../model/Model");

module.exports = {
    recognizer: {
        recognize: function (context, done) {
            done(null, Model.recognize(context.message.text));
        }
    }
};