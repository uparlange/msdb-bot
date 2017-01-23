define(["app:SrcCodeComponent"],
	function (SrcCodeComponent) {
		return ng.core.NgModule({
			imports: [
				ng.common.CommonModule,
				ng.http.HttpModule,
				ng.forms.FormsModule
			],
			declarations: [
				SrcCodeComponent
			],
			exports: [
				ng.common.CommonModule,
				ng.http.HttpModule,
				ng.forms.FormsModule,
				SrcCodeComponent
			]
		}).Class({
			constructor: [
				function CommonModule() {

				}
			]
		});
	});