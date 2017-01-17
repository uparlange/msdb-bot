module.exports = {
    getBaseUrl: function () {
        return 'https://msdb.lapli.fr';
    },
    getBaseServiceUrl: function () {
        return this.getBaseUrl() + '/php/services';
    },
    getInitServiceUrl: function () {
        return BASE_SERVIVE_URL + '/init.php';
    },
    getSearchServiceUrl: function (gameName, token) {
        return BASE_SERVIVE_URL + '/search.php?params={"description":"' + gameName + '"}&token=' + token;
    },
    getGameSnapUrl: function (gameName) {
        return BASE_URL + '/games/' + gameName + '/snap.png';
    },
    getGameTitlesUrl: function (gameName) {
        return BASE_URL + '/games/' + gameName + '/titles.png';
    },
    getGameDetailUrl: function (gameName) {
        return BASE_URL + '/#/detail?name=' + gameName;
    },
    getLocalImageUrl: function (image) {
        return process.env.PUBLIC_URL + '/images/' + image;
    }
};