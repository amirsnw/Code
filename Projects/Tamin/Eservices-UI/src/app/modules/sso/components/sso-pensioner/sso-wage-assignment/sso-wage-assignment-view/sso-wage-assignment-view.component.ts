import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {
  DataColumnViewType, PersianNumberPipe, SearchOperator,
  SearchParam,
  TaminDataGridConfigurationFactory,
  TaminFieldAutoCompleteDataGridComponent,
  TaminPageBaseComponent
} from "tamin-framework";
import {FormGroup, Validators} from "@angular/forms";
import {WageAssignmentModel} from "../../../../../../models/pensioner/wageAssignment.model";
import {SubdominantInfoComponent} from "../../../../../../component/pensioner/wage-assignment/subdominant-info/subdominant-info.component";
import {Urls} from "../../../../../../settings/urls";
import {WageAssignmentBranchModel} from "../../../../../../models/pensioner/wageAssignmentBranch.model";
import {SsoSubdominantInfoComponent} from "../sso-subdominant-info/sso-subdominant-info.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-sso-wage-assignment-view',
  templateUrl: './sso-wage-assignment-view.component.html',
  styleUrls: ['./sso-wage-assignment-view.component.css']
})
export class SsoWageAssignmentViewComponent extends TaminPageBaseComponent {
  public viewForm: FormGroup;
  @ViewChild('bank') bank: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('subdominantComponent') subdominantComponent: SsoSubdominantInfoComponent;
  private _overlay: any;
  private wageAssignmentModel: WageAssignmentBranchModel;
  private router: ActivatedRoute;
  private pnp = new PersianNumberPipe();
  constructor(injector: Injector) {
    super(injector);
    this.router = injector.get(ActivatedRoute);
  }
  protected initializePage(): void {
    debugger;
    this.createForm();
    this._initializeBank();
  }

  loadPageData() {
    debugger;
    if (this.router.snapshot.params['id'] !== null && this.router.snapshot.params['id'] !== undefined) {
      this.loadData(this.router.snapshot.params['id']);
    }
    else{
      this.wageAssignmentModel=new WageAssignmentBranchModel();
    }
  }


  private createForm() {
    this.viewForm = this.formBuilder.group({
      bank: ['',[Validators.required]],
      bankBranch: ['', [Validators.required, Validators.maxLength(50)]],
      installmentAmount: ['', [Validators.required]],
      installmentCount: ['', [Validators.required]],
      loanAmount: [''],
      guaranteeAmount: ['', [Validators.required]],
      requestDate: ['',[Validators.required]],
      pensionerId: ['',[Validators.required]],
      garanteeType: [''],
      pensionerNationalId: ['',[Validators.required]]
    });
    this.validateGuaranteeAmount();
    this.viewForm.get('installmentAmount').valueChanges.subscribe(val => {
      this.viewForm.get('loanAmount').setValue(this.pnp.transform(val * this.viewForm.get('installmentCount').value, 'cs'));
    });
    this.viewForm.get('installmentCount').valueChanges.subscribe(val => {
      this.viewForm.get('loanAmount').setValue(this.pnp.transform(val * this.viewForm.get('installmentAmount').value, 'cs'));
    });
  }

  private _initializeBank() {
    this.bank.valueField = 'bankCode';
    this.bank.displayField = 'bankName';
//    this.bank.searchPattern = '*{term}*';
    this.bank.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.banks)
      .setShowPager(true)
      .setFirstLoad(true)
      .setId('bankCode')

      .addVisibleColumn({columnName: 'bankName', columnCaption: 'نام بانک', columnViewType: DataColumnViewType.Label})

      .setPagerCurrentPage(1)
      .setPagerSize(50)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setShowFooter(false)
      .setShowPager(false)
      .setViewType('GridView')
      .getData();
  }
  confirmClick(values) {
    debugger;

    //const values1 = this.viewComponent.viewForm.getRawValue();
    const values2 = this.subdominantComponent.subForm.getRawValue();
    const jsondata = new WageAssignmentBranchModel();
    //jsondata.nationalId = values.accountNumber,
    jsondata.bank = {bankCode:values.bank};
    jsondata.bankBranch = values.bankBranch;
    jsondata.guaranteeAmount = values.guaranteeAmount;
    jsondata.installmentCount = values.installmentCount;
    jsondata.installmentAmount = values.installmentAmount;
    jsondata.loanAmount = values.installmentAmount*values.installmentCount;
    jsondata.requestDate = values.requestDate;
    jsondata.pensionerId = values.pensionerId;
    jsondata.pensionerNationalId = values.pensionerNationalId;
    if (this.wageAssignmentModel.id === null){
      jsondata.id=null;
    }
    else{
      jsondata.id=this.wageAssignmentModel.id;
    }
    if (values.garanteeType === true) {
      jsondata.garanteeType = '1';
      jsondata.nationalId = values2.nationalId;
      jsondata.birthDate = values2.birthDate;
      jsondata.firstName = values2.firstName;
      jsondata.lastName = values2.lastName;
    } else {
      jsondata.garanteeType = '0';
      jsondata.nationalId = values.pensionerNationalId;
    }
    this._overlay = this.showOverlay();
    if (this.wageAssignmentModel.id == null) {
    this.restService.create(Urls.SSO_WAGE_ASSIGNMENT_OLD, jsondata)
      .then(resulttt => {
        this.hideOverlay(this._overlay);
        this.wageAssignmentModel = resulttt.data as WageAssignmentBranchModel;


        this.showInfoMessageBox('پیام سیستم', 'درخواست با موفقیت ثبت شد.', () => {
          this.redirectTo('/sso/wage-assignment');
        });


      })
      .catch(result => {
        debugger;
        this.hideOverlay(this._overlay);
        this.showErrorMessageBox('پیام سیستم', result.error.data.message);
      });
    }
    else {
      this.restService.update(Urls.SSO_WAGE_ASSIGNMENT_OLD,this.wageAssignmentModel.id .toString(), jsondata)
        .then(resulttt => {
          this.hideOverlay(this._overlay);
          this.wageAssignmentModel = resulttt.data as WageAssignmentBranchModel;


          this.showInfoMessageBox('پیام سیستم', 'درخواست با موفقیت ثبت شد.', () => {
            this.redirectTo('/sso/wage-assignment');
          });
        })
        .catch(result => {
          this.hideOverlay(this._overlay);
          this.showErrorMessageBox('پیام سیستم', result.error.data.message);
        });
    }
  }
  loadData(id) {
    this._overlay = this.showOverlay();
    const searchParams = new Array<SearchParam>();
    const searchParam = new SearchParam();
    searchParam.property = 'id';
    searchParam.value = id;
    searchParam.operator = SearchOperator.EQ;
    searchParams.push(searchParam);
    this.restService.getById(Urls.SSO_WAGE_ASSIGNMENT_OLD, id.toString())
      .then(value => {

        this.hideOverlay(this._overlay);
        this.wageAssignmentModel =value.data;
        this.viewForm.patchValue(this.wageAssignmentModel);
        this.viewForm.get('bank').setValue(this.wageAssignmentModel.bank.bankName);
        if(value.data.garanteeType==='1'){
          this.viewForm.get('garanteeType').setValue(value.data.garanteeType==='1');
        }
        else{
          this.viewForm.get('nationalId').setValue('');
        }

        this.subdominantComponent.subForm.patchValue(this.wageAssignmentModel);

      })
      .catch(error => {
        this.hideOverlay(this._overlay);
        // this.modalError.show('خطا', 'امکان برقراری ارتباط با سرویس دهنده مرکزی وجود ندارد');
      });
  }
  validateGuaranteeAmount() {
    const loanAmount = this.viewForm.get('loanAmount');
    const installmentCount = this.viewForm.get('installmentCount');
    const installmentAmount = this.viewForm.get('installmentAmount');
    const guaranteeAmount = this.viewForm.get('guaranteeAmount');
    this.viewForm.get('loanAmount').valueChanges
      .subscribe(amount => {
        const val = installmentCount.value * installmentAmount.value;
        guaranteeAmount.setValidators([Validators.required, Validators.min(val)]);
        guaranteeAmount.updateValueAndValidity();

      });
  }
}
