import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[OccurDirective]'
})
export class OccurDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
