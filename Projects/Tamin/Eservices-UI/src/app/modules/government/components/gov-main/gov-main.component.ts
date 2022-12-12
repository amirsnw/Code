import { Component, OnInit } from '@angular/core';
import { TaminPageBaseComponent } from 'tamin-framework';
import { Injector } from '@angular/core';
import { ComponentFactoryResolver } from '@angular/core';

@Component({
  selector: 'app-gov-main',
  templateUrl: './gov-main.component.html',
  styleUrls: ['./gov-main.component.css']
})
export class GovMainComponent  extends TaminPageBaseComponent {

  constructor(injector: Injector, private componentFactoryResolver: ComponentFactoryResolver) {
    super(injector);
  }

  public onButtonClicked(buttonName) {
    this.redirectTo('/gov/' + buttonName);
  }

}
