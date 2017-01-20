define(["app:CommonModule", "app:AppView", "app:AppUtils"],
	function (CommonModule, AppView, AppUtils) {
		ng.platformBrowserDynamic.platformBrowserDynamic().bootstrapModule(
			ng.core.NgModule({
				imports: [
					CommonModule,
					ng.platformBrowser.BrowserModule,
					ng.router.RouterModule.forRoot([
						{ path: "", redirectTo: "intents", pathMatch: "full" },
						{ path: "intents", loadChildren: AppUtils.getModuleName("IntentsModule") }
					], { useHash: true })
				],
				declarations: [
					AppView
				],
				providers: [

				],
				bootstrap: [
					AppView
				]
			}).Class({
				constructor: [
					function AppModule() {

					}
				]
			})
		);
	});