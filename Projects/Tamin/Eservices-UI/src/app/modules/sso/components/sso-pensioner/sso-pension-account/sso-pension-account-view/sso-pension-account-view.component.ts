import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {SearchOperator, SearchParam, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {PensionRequestModel} from '../../../../../../models/pensioner/pensionRequest.model';
import {ActivatedRoute} from '@angular/router';
import {Urls} from '../../../../../../settings/urls';
import {Subscription} from "rxjs";
// import {WageAssignmentBranchModel} from '../../../../../../models/pensioner/wageAssignmentBranch.model';

@Component({
  selector: 'app-sso-pension-account-view',
  templateUrl: './sso-pension-account-view.component.html',
  styleUrls: ['./sso-pension-account-view.component.css']
})
export class SsoPensionAccountViewComponent extends TaminPageBaseComponent {
  public viewForm: FormGroup;
  private _overlay: any;
  private searchParams: SearchParam[];
  private pensionRequestModel: PensionRequestModel;
  private router: ActivatedRoute;
  private accType: any;
  private bank: any;

  constructor(injector: Injector) {
    super(injector);
    this.router = injector.get(ActivatedRoute);
  }

  protected initializePage(): void {
    this.createForm();
  }

  protected loadPageData(): void {
    if (this.router.snapshot.params['request-id'] !== null && this.router.snapshot.params['request-id'] !== undefined) {
      this.loadData(this.router.snapshot.params['request-id']);
    } else {
      this.pensionRequestModel = new PensionRequestModel();
    }
  }

  private createForm() {
    this.viewForm = this.formBuilder.group({
      pensionerId: [''],
      dateOfStart: [''],
      bank: [''],
      accounttype: [''],
      accountNumber: ['']
    });

  }

  loadData(id) {
    this._overlay = this.showOverlay();
    const searchParams = new Array<SearchParam>();
    const searchParam = new SearchParam();
    searchParam.property = 'requestId';
    searchParam.value = id;
    searchParam.operator = SearchOperator.EQ;
    searchParams.push(searchParam);
    this.restService.getAll(Urls.PensionerAccount , searchParams)
      .then(value => {
        this.hideOverlay(this._overlay);
        this.pensionRequestModel = value.data.list[0];
        this.viewForm.patchValue(this.pensionRequestModel);
        const accType1 = this.viewForm.get('accounttype');
        const bank1 = this.viewForm.get('bank');
        switch (accType1.value) {
          case '01':
            this.accType = 'قرض الحسنه';
            break;
          case '02':
            this.accType = 'پس انداز عادی';
            break;
          case '03':
            this.accType = 'پس انداز همراه';
            break;
          case '04':
            this.accType = 'جاری عادی';
            break;
          case '05':
            this.accType = 'جاری همراه';
            break;
          default :
            this.accType = accType1.value;
            break;
        }
        switch (bank1.value) {
          case '01':
            this.bank = 'بانک رفاه';
            break;
          case '02':
            this.bank = 'بانک ملی ایران';
            break;
          case '03':
            this.bank = 'بانک ملت';
            break;
          case '04':
            this.bank = 'بانک تجارت';
            break;
          case '07':
            this.bank = 'بانک سپه';
            break;
          case '05':
            this.bank = 'بانک صادرات';
            break;
          default :
            this.bank = bank1.value;
            break;
        }


        this.viewForm.get('accounttype').setValue(this.accType);
        this.viewForm.get('bank').setValue(this.bank);
      })
      .catch(error => {
        this.hideOverlay(this._overlay);
      });
  }
  confirm() {
    if (!this.viewForm.valid) {
      return;
    }
    const values = this.viewForm.getRawValue();
    this.searchParams = [];
    const jsonData = new PensionRequestModel();
    jsonData.id = this.pensionRequestModel.id;
    jsonData.operation = 'CONFIRM';
     jsonData.comment = values.branchComment;
    this.showQuestionBox('پیام سیستم', 'در صورت تایید درخواست موظف به ایجاد نحوه پرداخت جدید برای این مستمری بگیر می باشید،ادامه می دهید؟', () => {
      this._overlay = this.showOverlay();
      this.restService.update(Urls.SSO_PENSION_ACCOUNT, this.pensionRequestModel.id.toString(), jsonData)
        .then(resulttt => {
          this.hideOverlay(this._overlay);
          this.showInfoMessageBox('پیام سیستم', 'درخواست با موفقیت تایید شد.', () => {
            this.redirectTo('/sso/request');
          });
        }).catch(reason => {
        this.hideOverlay(this._overlay);
      });
    }, () => {
      return;
    });
  }

  reject() {
    if (!this.viewForm.valid) {
      return;
    }
    const values = this.viewForm.getRawValue();
    this.searchParams = [];
    const jsonData = new PensionRequestModel();
    jsonData.id = this.pensionRequestModel.id;
    jsonData.operation = 'REJECT';
    jsonData.comment = values.branchComment;
    this.showQuestionBox('پیام سیستم', 'در حال رد درخواست ثبت شماره حساب بانکی مستمری بگیر می باشید،آیا اطمینان دارید؟', () => {
      this._overlay = this.showOverlay();
      // this.restService.update(Urls.SSO_PENSION_REQUEST, this.pensionRequestModel.id.toString(), jsonData)
      //   .then(resulttt => {
          this.restService.update(Urls.SSO_PENSION_ACCOUNT , this.pensionRequestModel.id.toString(), jsonData)
            .then(resulttt => {
              this.hideOverlay(this._overlay);
              this.showInfoMessageBox('پیام سیستم', 'درخواست با موفقیت مختومه گردید.', () => {
                this.redirectTo('/sso/request');
              });
            }).catch(reason => {
            this.hideOverlay(this._overlay);
          });
      // });
    }, () => {
      return;
    });
  }
}
