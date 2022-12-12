import {Component, ComponentFactoryResolver, Input, OnInit, Type, ViewChild} from '@angular/core';
import {AdDirective} from "../_helpers";
import {AdComponent, ComItem} from "../_models";
import {IndexComponent} from "../index";
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {Observable} from "rxjs";
import {last} from "rxjs/operators";

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnInit {
  @ViewChild(AdDirective, {static: true}) comHost: AdDirective;
  component: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver
              ,private router: Router, private currentActivatedRoute:ActivatedRoute) {
    /*router.events.subscribe(val => {
      if (location.path() != "") {
        this.route = router.location.path();
      } else {
        this.route = "Home";
      }
    });*/
  }

  ngOnInit() {
    this.initloadComponent( new ComItem(IndexComponent, {}));
  }

  loadComponent() {
    console.log(this.component)
    // Get The Component
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.component);

    //Get reference to where AdDirective is used and clear it then add component using componentFactory.
    const viewContainerRef = this.comHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<Component>(componentFactory);
    //componentRef.instance.data = rootOutlet.data;
  }

  initloadComponent(comItem: ComItem) {

    // Get The Component
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(comItem.component);

    //Get reference to where AdDirective is used and clear it then add component using componentFactory.
    const viewContainerRef = this.comHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<Component>(componentFactory);
    //componentRef.instance.data = rootOutlet.data;
  }
}
