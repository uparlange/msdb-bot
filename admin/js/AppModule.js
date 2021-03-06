define(["CommonModule", "AppView", "AppUtils", "LocalesModel"],
	function (CommonModule, AppView, AppUtils, LocalesModel) {
		ng.core.enableProdMode();
		ng.platformBrowserDynamic.platformBrowserDynamic().bootstrapModule(
			ng.core.NgModule({
				imports: [
					CommonModule,
					ng.platformBrowser.BrowserModule,
					ng.router.RouterModule.forRoot([
						{ path: "", redirectTo: "home", pathMatch: "full" },
						{ path: "home", loadChildren: AppUtils.getModuleName("HomeModule") },
						{ path: "intents", loadChildren: AppUtils.getModuleName("IntentsModule") },
						{ path: "regexps", loadChildren: AppUtils.getModuleName("RegexpsModule") },
						{ path: "dialogs", loadChildren: AppUtils.getModuleName("DialogsModule") },
						{ path: "entities", loadChildren: AppUtils.getModuleName("EntitiesModule") },
						{ path: "test", loadChildren: AppUtils.getModuleName("TestModule") }
					], { useHash: true })
				],
				declarations: [
					AppView
				],
				providers: [
					LocalesModel
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