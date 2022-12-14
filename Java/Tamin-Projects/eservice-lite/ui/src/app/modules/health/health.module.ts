import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HealthRoutingModule} from "./health-routing.module";
import { TcrPriceCertificateComponent } from './components/tcr-price-certificate/tcr-price-certificate.component';
import {TaminFrameworkModule} from "tamin-framework";
import {SearchCustomersComponent} from "./components/search-customers/search-customers.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SearchProprietaryComponent} from "./components/search-proprietary/search-proprietary.component";


@NgModule({
  imports: [
    CommonModule,
    HealthRoutingModule,
    TaminFrameworkModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  declarations: [TcrPriceCertificateComponent,SearchCustomersComponent,SearchProprietaryComponent]
})
export class HealthModule { }
