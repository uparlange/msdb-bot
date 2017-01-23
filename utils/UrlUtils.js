module.exports = {
    getBaseUrl: function () {
        return "https://msdb.lapli.fr";
    },
    getBaseServiceUrl: function () {
        return this.getBaseUrl() + "/php/services";
    },
    getInitServiceUrl: function () {
        return this.getBaseServiceUrl() + "/init.php";
    },
    getSearchServiceUrl: function (gameName, token) {
        return this.getBaseServiceUrl() + "/search.php?params={\"description\":\"" + gameName + "\"}&token=" + token;
    },
    getGameSnapUrl: function (gameName) {
        return this.getBaseUrl() + "/games/" + gameName + "/snap.png";
    },
    getGameTitlesUrl: function (gameName) {
        return this.getBaseUrl() + "/games/" + gameName + "/titles.png";
    },
    getGameDetailUrl: function (gameName) {
        return this.getBaseUrl() + "/#/detail?name=" + gameName;
    },
    getLocalImageUrl: function (image) {
        return process.env.PUBLIC_URL + "/images/" + image;
    }
};