import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {TaminFrameworkModule} from 'tamin-framework';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StpRoutingModule} from '../stp/stp-routing.module';
import {FacRoutingModule} from './fac-routing.module';
import { PortalInspectionComponent } from './components/portal-inspection/portal-inspection.component';
import { FormsComponent } from './components/forms/forms.component';
import { InfHaghighiHoghoghiComponent } from './components/inf-haghighi-hoghoghi/inf-haghighi-hoghoghi.component';
import { NewInfHaghighiHoghoghiComponent } from './components/new-inf-haghighi-hoghoghi/new-inf-haghighi-hoghoghi.component';
import { StackHoldersComponent } from './components/stack-holders/stack-holders.component';
import { NewSigOwnerComponent } from './components/stack-holders/new-sig-owner/new-sig-owner.component';
import { ResponsibleComponent } from './components/responsible/responsible.component';
import { NewResponsibleComponent } from './components/responsible/new-responsible/new-responsible.component';
import { InfoSubWorkshopComponent } from './components/info-sub-workshop/info-sub-workshop.component';
import { NewInfoSubWorkshopComponent } from './components/info-sub-workshop/new-info-sub-workshop/new-info-sub-workshop.component';
import { InfoSubWorkShopLocationComponent } from './components/info-sub-workshop/info-sub-work-shop-location/info-sub-work-shop-location.component';
import { DetTaxLocationComponent } from './components/det-tax-location/det-tax-location.component';
import { NewDetTaxLocationComponent } from './components/det-tax-location/new-det-tax-location/new-det-tax-location.component';
import { CompanyAccountPeriodComponent } from './components/company-account-period/company-account-period.component';
import { NewCompanyAccountPeriodComponent } from './components/company-account-period/new-company-account-period/new-company-account-period.component';
import { DetRequestAuditorsComponent } from './components/det-request-auditors/det-request-auditors.component';
import { NewDetRequestAuditorsComponent } from './components/det-request-auditors/new-det-request-auditors/new-det-request-auditors.component';
import { AloReqDetCheckedPeriodComponent } from './components/alo-req-det-checked-period/alo-req-det-checked-period.component';
import { NewAloReqDetCheckedPeriodComponent } from './components/alo-req-det-checked-period/new-alo-req-det-checked-period/new-alo-req-det-checked-period.component';
import { NewReqDetnComputComponent } from './components/alo-req-det-checked-period/new-req-detn-comput/new-req-detn-comput.component';
import { YearsSpecComponent } from './components/years-spec/years-spec.component';
import { NewYearsSpecComponent } from './components/years-spec/new-years-spec/new-years-spec.component';
import { ProfitLossComponent } from './components/profit-loss/profit-loss.component';
import { NewProfitLossComponent } from './components/profit-loss/new-profit-loss/new-profit-loss.component';
import { StockComponent } from './components/stock/stock.component';
import { NewStockComponent } from './components/stock/new-stock/new-stock.component';
import { ContractAccComponent } from './components/contract-acc/contract-acc.component';
import { NewContractAccComponent } from './components/contract-acc/new-contract-acc/new-contract-acc.component';
import { PrepayAndDepositComponent } from './components/prepay-and-deposit/prepay-and-deposit.component';
import { NewPrepayAndDepositComponent } from './components/prepay-and-deposit/new-prepay-and-deposit/new-prepay-and-deposit.component';
import { AdministrativeChargesComponent } from './components/administrative-charges/administrative-charges.component';
import { NewAdministrativeChargesComponent } from './components/administrative-charges/new-administrative-charges/new-administrative-charges.component';
import { FinanCostComponent } from './components/finan-cost/finan-cost.component';
import { NewFinanCostComponent } from './components/finan-cost/new-finan-cost/new-finan-cost.component';
import { SaleAndDispedChargesComponent } from './components/sale-and-disped-charges/sale-and-disped-charges.component';
import { NewSaleAndDispedChargesComponent } from './components/sale-and-disped-charges/new-sale-and-disped-charges/new-sale-and-disped-charges.component';
import { SalarCostComponent } from './components/salar-cost/salar-cost.component';
import { NewSalarCostComponent } from './components/salar-cost/new-salar-cost/new-salar-cost.component';
import { ReservesComponent } from './components/reserves/reserves.component';
import { NewReservesComponent } from './components/reserves/new-reserves/new-reserves.component';
import { FixedAssetsComponent } from './components/fixed-assets/fixed-assets.component';
import { NewFixedAssetsComponent } from './components/fixed-assets/new-fixed-assets/new-fixed-assets.component';
import { NewPolompFormComponent } from './components/years-spec/new-polomp-form/new-polomp-form.component';
import { ConContraComponent } from './components/con-contra/con-contra.component';
import { NewConContraComponent } from './components/con-contra/new-con-contra/new-con-contra.component';
import { IncomeContComponent } from './components/income-cont/income-cont.component';
import { NewIncomeContComponent } from './components/income-cont/new-income-cont/new-income-cont.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    TaminFrameworkModule,
    FormsModule,
    FacRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [PortalInspectionComponent, FormsComponent, InfHaghighiHoghoghiComponent, NewInfHaghighiHoghoghiComponent, StackHoldersComponent, NewSigOwnerComponent, ResponsibleComponent, NewResponsibleComponent, InfoSubWorkshopComponent, NewInfoSubWorkshopComponent, InfoSubWorkShopLocationComponent, DetTaxLocationComponent, NewDetTaxLocationComponent, CompanyAccountPeriodComponent, NewCompanyAccountPeriodComponent, DetRequestAuditorsComponent, NewDetRequestAuditorsComponent, AloReqDetCheckedPeriodComponent, NewAloReqDetCheckedPeriodComponent, NewReqDetnComputComponent, YearsSpecComponent, NewYearsSpecComponent, ProfitLossComponent, NewProfitLossComponent, StockComponent, NewStockComponent, ContractAccComponent, NewContractAccComponent, PrepayAndDepositComponent, NewPrepayAndDepositComponent, AdministrativeChargesComponent, NewAdministrativeChargesComponent, FinanCostComponent, NewFinanCostComponent, SaleAndDispedChargesComponent, NewSaleAndDispedChargesComponent, SalarCostComponent, NewSalarCostComponent, ReservesComponent, NewReservesComponent, FixedAssetsComponent, NewFixedAssetsComponent, NewPolompFormComponent, ConContraComponent, NewConContraComponent, IncomeContComponent, NewIncomeContComponent]
})
export class FacModule { }
