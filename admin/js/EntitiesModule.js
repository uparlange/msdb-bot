define(["app:CommonModule", "app:EntitiesView"],
	function (CommonModule, EntitiesView) {
		return {
			module: ng.core.NgModule({
				imports: [
					CommonModule,
					ng.router.RouterModule.forChild([
						{ path: "", component: EntitiesView }
					])
				],
				declarations: [
					EntitiesView
				],
				providers: [

				]
			}).Class({
				constructor: [
					function EntitiesModule() {

					}
				]
			})
		};
	});