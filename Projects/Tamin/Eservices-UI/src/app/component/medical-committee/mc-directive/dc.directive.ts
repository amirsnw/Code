import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[DCDirective]'
})
export class DCDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
