define(["app:AppUtils"],
	function (AppUtils) {
		return ng.core.Component(AppUtils.getComponentConfiguration("dialogs")).Class({
			constructor: [ng.http.Http,
			function DialogsView(Http) {
				this._http = Http;
				this.provider = [];
			}
			],
			ngOnInit: function () {

			}
		});
	});