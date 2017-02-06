define(["AppUtils"],
	function (AppUtils) {
		return ng.core.Component(AppUtils.getComponentConfiguration("dialogs")).Class({
			constructor: [ng.http.Http, ng.router.ActivatedRoute,
			function DialogsView(Http, ActivatedRoute) {
				this._http = Http;
				this._activatedRoute = ActivatedRoute;
				this._activatedRouteQueryParamsSubscriber = null;
				this.provider = [];
				this.selectedDialog = null;
			}
			],
			ngOnInit: function () {
				this._activatedRouteQueryParamsSubscriber = this._activatedRoute.queryParams.subscribe((params) => {
					this.selectedDialog = null;
					const url = "/api/dialogs";
					const search = new ng.http.URLSearchParams();
					search.set("name", params.name);
					this._http.get(url, { search: search }).subscribe((result) => {
						this.provider = result.json();
						if(params.name !== undefined) {
							this.selectedDialog = this.provider[0];
						}
					})
				});
			},
			ngOnDestroy: function () {
				this._activatedRouteQueryParamsSubscriber.unsubscribe();
			}
		});
	});