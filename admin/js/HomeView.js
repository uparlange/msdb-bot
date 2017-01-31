define(["app:AppUtils"],
	function (AppUtils) {
		return ng.core.Component(AppUtils.getComponentConfiguration("home")).Class({
			constructor: [ng.http.Http,
			function HomeView(Http) {
				this._http = Http;
				this.intents = [];
			}
			]
		});
	});