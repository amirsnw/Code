import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PortalInspectionComponent} from './components/portal-inspection/portal-inspection.component';
import {AuthGuard} from '../../guards/auth.guard';
import {FormsComponent} from './components/forms/forms.component';
import {InfHaghighiHoghoghiComponent} from './components/inf-haghighi-hoghoghi/inf-haghighi-hoghoghi.component';
import {NewInfHaghighiHoghoghiComponent} from './components/new-inf-haghighi-hoghoghi/new-inf-haghighi-hoghoghi.component';
import {StackHoldersComponent} from './components/stack-holders/stack-holders.component';
import {NewSigOwnerComponent} from './components/stack-holders/new-sig-owner/new-sig-owner.component';
import {ResponsibleComponent} from './components/responsible/responsible.component';
import {NewResponsibleComponent} from './components/responsible/new-responsible/new-responsible.component';
import {InfoSubWorkshopComponent} from './components/info-sub-workshop/info-sub-workshop.component';
import {NewInfoSubWorkshopComponent} from './components/info-sub-workshop/new-info-sub-workshop/new-info-sub-workshop.component';
import {DetTaxLocationComponent} from './components/det-tax-location/det-tax-location.component';
import {NewDetTaxLocationComponent} from './components/det-tax-location/new-det-tax-location/new-det-tax-location.component';
import {CompanyAccountPeriodComponent} from './components/company-account-period/company-account-period.component';
import {NewCompanyAccountPeriodComponent} from './components/company-account-period/new-company-account-period/new-company-account-period.component';
import {DetRequestAuditorsComponent} from './components/det-request-auditors/det-request-auditors.component';
import {NewDetRequestAuditorsComponent} from './components/det-request-auditors/new-det-request-auditors/new-det-request-auditors.component';
import {AloReqDetCheckedPeriodComponent} from './components/alo-req-det-checked-period/alo-req-det-checked-period.component';
import {NewAloReqDetCheckedPeriodComponent} from './components/alo-req-det-checked-period/new-alo-req-det-checked-period/new-alo-req-det-checked-period.component';
import {NewReqDetnComputComponent} from './components/alo-req-det-checked-period/new-req-detn-comput/new-req-detn-comput.component';
import {YearsSpecComponent} from './components/years-spec/years-spec.component';
import {NewYearsSpecComponent} from './components/years-spec/new-years-spec/new-years-spec.component';
import {ProfitLossComponent} from './components/profit-loss/profit-loss.component';
import {StockComponent} from './components/stock/stock.component';
import {NewStockComponent} from './components/stock/new-stock/new-stock.component';
import {ContractAccComponent} from './components/contract-acc/contract-acc.component';
import {NewContractAccComponent} from './components/contract-acc/new-contract-acc/new-contract-acc.component';
import {PrepayAndDepositComponent} from './components/prepay-and-deposit/prepay-and-deposit.component';
import {NewPrepayAndDepositComponent} from './components/prepay-and-deposit/new-prepay-and-deposit/new-prepay-and-deposit.component';
import {AdministrativeChargesComponent} from './components/administrative-charges/administrative-charges.component';
import {NewAdministrativeChargesComponent} from './components/administrative-charges/new-administrative-charges/new-administrative-charges.component';
import {FinanCostComponent} from './components/finan-cost/finan-cost.component';
import {NewPolompFormComponent} from './components/years-spec/new-polomp-form/new-polomp-form.component';
import {NewProfitLossComponent} from './components/profit-loss/new-profit-loss/new-profit-loss.component';
import {NewFinanCostComponent} from './components/finan-cost/new-finan-cost/new-finan-cost.component';
import {SaleAndDispedChargesComponent} from './components/sale-and-disped-charges/sale-and-disped-charges.component';
import {NewSaleAndDispedChargesComponent} from './components/sale-and-disped-charges/new-sale-and-disped-charges/new-sale-and-disped-charges.component';
import {SalarCostComponent} from './components/salar-cost/salar-cost.component';
import {NewSalarCostComponent} from './components/salar-cost/new-salar-cost/new-salar-cost.component';
import {ReservesComponent} from './components/reserves/reserves.component';
import {NewReservesComponent} from './components/reserves/new-reserves/new-reserves.component';
import {FixedAssetsComponent} from './components/fixed-assets/fixed-assets.component';
import {NewFixedAssetsComponent} from './components/fixed-assets/new-fixed-assets/new-fixed-assets.component';
import {ConContraComponent} from './components/con-contra/con-contra.component';
import {NewConContraComponent} from './components/con-contra/new-con-contra/new-con-contra.component';
import {IncomeContComponent} from './components/income-cont/income-cont.component';

const routes: Routes = [
  {
    path: 'fac',
    children: [
      {
        path: 'portal-karfarmayan',
        component: PortalInspectionComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'portal-forms/:id',
        component: FormsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'infHaghighiHoghoghi/:requestId',
        component: InfHaghighiHoghoghiComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'newInfHaghighiHoghoghi/:requestId',
        component: NewInfHaghighiHoghoghiComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'detStackholders/:requestId',
        component: StackHoldersComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'newDetStackholders/:editMode/:modirFlg/:requestId',
        component: NewSigOwnerComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'responsible/:requestId',
        component: ResponsibleComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'newResponsible/:editMode/:requestId/:responsiblesId',
        component: NewResponsibleComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'infoSubWorkshop/:requestId',
        component: InfoSubWorkshopComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'newInfoSubWorkshop/:editMode/:requestId',
        component: NewInfoSubWorkshopComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'detTaxLocation/:requestId',
        component: DetTaxLocationComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'newDetTaxLocation/:requestId/:taxLocationId/:editMode/:salaryMode',
        component: NewDetTaxLocationComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'companyAccountPeriod/:requestId',
        component: CompanyAccountPeriodComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'newCompanyAccountPeriod/:editMode/:requestId',
        component: NewCompanyAccountPeriodComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'detRequestAuditors/:requestId',
        component: DetRequestAuditorsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'newDetRequestAuditors/:editMode/:requestId/:auditorsId',
        component: NewDetRequestAuditorsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'aloReqDetCheckedPeriod/:requestId',
        component: AloReqDetCheckedPeriodComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'newAloReqDetCheckedPeriod/:editMode/:requestId/:checkedPeriodId',
        component: NewAloReqDetCheckedPeriodComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'newReqDetNComput/:editMode/:requestId',
        component: NewReqDetnComputComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'yearsSpec/:requestId',
        component: YearsSpecComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'newYearsSpec/:editMode/:requestId/:yearsSpecId',
        component: NewYearsSpecComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'newPolompForm/:editMode/:requestId',
        component: NewPolompFormComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'profitLoss/:requestId',
        component: ProfitLossComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'newProfitLoss/:editMode/:requestId/:profitLossId',
        component: NewProfitLossComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'stock/:requestId',
        component: StockComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'newStock/:editMode/:requestId/:companyId/:endDate/:stockId',
        component: NewStockComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'contractAcc/:requestId',
        component: ContractAccComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'newContractAcc/:editMode/:requestId/:companyId/:endDate/:contractAccId',
        component: NewContractAccComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'prepayAndDeposit/:requestId',
        component: PrepayAndDepositComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'newPrepayAndDeposit/:editMode/:requestId/:companyId/:endDate',
        component: NewPrepayAndDepositComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'administrativeCharges/:requestId',
        component: AdministrativeChargesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'newAdministrativeCharges/:editMode/:requestId',
        component: NewAdministrativeChargesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'finanCost/:requestId',
        component: FinanCostComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'newFinanCost/:editMode/:requestId',
        component: NewFinanCostComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'saleAndDispedCharges/:requestId',
        component: SaleAndDispedChargesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'newSaleAndDispedCharges/:editMode/:requestId',
        component: NewSaleAndDispedChargesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'salarCost/:requestId',
        component: SalarCostComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'newSalarCost/:editMode/:requestId',
        component: NewSalarCostComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'reserves/:requestId',
        component: ReservesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'newReserves/:editMode/:requestId',
        component: NewReservesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'fixedAssets/:requestId',
        component: FixedAssetsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'newFixedAssets/:editMode/:requestId',
        component: NewFixedAssetsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'conContra/:requestId',
        component: ConContraComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'newConContra/:editMode/:requestId/:conContraId',
        component: NewConContraComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'incomeCont/:requestId',
        component: IncomeContComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'newIncomeCont/:editMode/:requestId',
        component: NewAloReqDetCheckedPeriodComponent,
        canActivate: [AuthGuard],
      }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacRoutingModule {

}
