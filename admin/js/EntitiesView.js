define(["AppUtils"],
	function (AppUtils) {
		return ng.core.Component(AppUtils.getComponentConfiguration("entities")).Class({
			constructor: [ng.http.Http, ng.router.ActivatedRoute,
			function EntitiesView(Http, ActivatedRoute) {
				this._http = Http;
				this._activatedRoute = ActivatedRoute;
				this._activatedRouteQueryParamsSubscriber = null;
				this.provider = [];
			}
			],
			ngOnInit: function () {
				this._activatedRouteQueryParamsSubscriber = this._activatedRoute.queryParams.subscribe((params) => {
					const url = "/api/entities";
					const search = new ng.http.URLSearchParams();
					search.set("name", params.name);
					this._http.get(url, { search: search }).subscribe((result) => {
						this.provider = result.json();
					});
				});
			},
			ngOnDestroy: function () {
				this._activatedRouteQueryParamsSubscriber.unsubscribe();
			}
		});
	});