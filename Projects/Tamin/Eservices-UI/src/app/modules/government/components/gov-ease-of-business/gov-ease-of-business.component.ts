import { Component, OnInit, ViewChild } from '@angular/core';
import { RegisterPropertyRegistrationComponent } from './register-property-registration/register-property-registration.component';
import { BusinessStartersIndicatorComponent } from './business-starters-indicator/business-starters-indicator.component';

@Component({
  selector: 'app-gov-ease-of-business',
  templateUrl: './gov-ease-of-business.component.html',
  styleUrls: ['./gov-ease-of-business.component.css']
})
export class GovEaseOfBusinessComponent implements OnInit {
  @ViewChild("RegisterPropertyRegistrationComponent") RegisterPropertyRegistrationComponent: RegisterPropertyRegistrationComponent;
  @ViewChild("BusinessStartersIndicatorComponent") BusinessStartersIndicatorComponent: BusinessStartersIndicatorComponent;

  constructor() { }

  ngOnInit() {
  }

}
