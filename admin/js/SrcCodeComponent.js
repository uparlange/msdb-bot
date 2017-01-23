define(["app:AppUtils"],
    function (AppUtils) {
        return ng.core.Component(AppUtils.getComponentConfiguration("srccode", {
            inputs: ["source"]
        })).Class({
            constructor: [ng.core.ElementRef,
            function SrcCodeComponent(ElementRef) {
                this._element = ElementRef.nativeElement;
            }
            ],
            ngAfterViewInit: function () {
                hljs.highlightBlock(this._element);
            },
            ngOnDestroy: function () {

            }
        });
    });	