define(["app:AppUtils"],
	function (AppUtils) {
		return ng.core.Component(AppUtils.getComponentConfiguration("intents")).Class({
			constructor: [ng.http.Http,
			function IntentsView(Http) {
				this._http = Http;
				this.intents = [];
			}
			],
			ngOnInit: function () {
				this._http.get("/api/intents").subscribe((result) => {
					this.intents = result.json();
				})
			},
			getDialogId:function(intentId) {
				return intentId.replace("INTENT_", "DIALOG_")
			}
		});
	});