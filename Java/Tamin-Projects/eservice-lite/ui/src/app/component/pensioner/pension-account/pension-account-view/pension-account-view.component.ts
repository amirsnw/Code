import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {SearchOperator, SearchParam, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {PensionRequestModel} from '../../../../models/pensioner/pensionRequest.model';
import {ActivatedRoute} from '@angular/router';
import {Urls} from '../../../../settings/urls';


@Component({
  selector: 'app-pension-account-view',
  templateUrl: './pension-account-view.component.html',
  styleUrls: ['./pension-account-view.component.css']
})
export class PensionAccountViewComponent extends TaminPageBaseComponent {
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
}
