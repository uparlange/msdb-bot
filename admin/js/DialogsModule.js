define(["app:CommonModule", "app:DialogsView"],
	function (CommonModule, DialogsView) {
		return {
			module: ng.core.NgModule({
				imports: [
					CommonModule,
					ng.router.RouterModule.forChild([
						{ path: "", component: DialogsView }
					])
				],
				declarations: [
					DialogsView
				],
				providers: [

				]
			}).Class({
				constructor: [
					function DialogsModule() {

					}
				]
			})
		};
	});