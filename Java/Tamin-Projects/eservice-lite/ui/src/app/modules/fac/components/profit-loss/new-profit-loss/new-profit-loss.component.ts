import {Component, EventEmitter, Injector, OnInit, Output, ViewChild} from '@angular/core';
import {TaminFieldComboBoxStaticComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {FacUrls} from '../../../fac-urls';
import {AloRequestDetAuditors} from '../../../models/alo-request-det-auditors';
import {AloRequest} from '../../../models/alo-request';
import {AloRequestDetProfitLoss} from '../../../models/alo-request-det-profitLoss';

@Component({
  selector: 'app-new-profit-loss',
  templateUrl: './new-profit-loss.component.html',
  styleUrls: ['./new-profit-loss.component.css']
})
export class NewProfitLossComponent extends TaminPageBaseComponent {

  @Output() close = new EventEmitter<any>();
  editForm: FormGroup;
  private requestId: any;
  private editMode: any;
  private requestDetProfitLossId: any;
  startFiscalYear: any;
  endFiscalYear: any;
  items: any;
  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);
  }

  protected initializePage(): void {
    debugger;
    this.editForm = this.formBuilder.group({
      endDate: [''],
      netSales: ['', [Validators.required]],
      reportResult: [''],
      otherIncome: ['', [Validators.required]],
      totalSalary: ['', [Validators.required]],
      otherBenefits: ['', [Validators.required]],
      adviceCost: ['', [Validators.required]],
      propagandaCost: ['', [Validators.required]],
      sakhtemaniCost: ['', [Validators.required]],
      otherCosts: ['', [Validators.required]],
     });
    this.requestId = this.route.snapshot.params['requestId'];
    this.editMode = this.route.snapshot.params['editMode'];
    this.requestDetProfitLossId = this.route.snapshot.params['profitLossId'];
    debugger;
    this.loadData();
  }

  loadData() {
    debugger;
    if (this.editMode === '1') {
    const theUrl = `${FacUrls.PROFIT_LOSS_BY_ID}/` + this.requestDetProfitLossId;
    this.restService.getAll(theUrl)
      .then(values => {
        debugger;
        if (values.data &&  this.editMode === '1' ) {
          this.editForm.patchValue(values.data.list[0]);
          this.editForm.get('endDate').setValue(values.data.list[0].companyAccountPeriod.endDate);
        }
      })
      .catch(error => {
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
    }
  }
  onSave(values) {
    debugger;
    if (!this.editForm.valid) {
      this.markFormGroupAsTouched(this.editForm);
      return;
    }
    const jsondata = new AloRequestDetProfitLoss();
    jsondata.netSales = values.netSales;
    jsondata.constructionCosts = values.constructionCosts;
    jsondata.otherIncome = values.otherIncome;
    jsondata.totalSalary = values.totalSalary;
    jsondata.otherBenefits = values.otherBenefits;
    jsondata.totalSalary = values.totalSalary;
    jsondata.adviceCost = values.adviceCost;
    jsondata.propagandaCost = values.propagandaCost;
    jsondata.sakhtemaniCost = values.sakhtemaniCost;
    jsondata.otherCosts = values.otherCosts;
    jsondata.aloRequests = new (AloRequest);
    if (this.editMode === '0') {
      jsondata.aloRequests.requestId = this.requestId;
    } else {
      jsondata.aloRequests.requestId = this.requestId;
    }
    if (this.editMode === '1') {
      jsondata.requestDetProfitLossId = this.requestDetProfitLossId;
    }
    debugger;
    if (this.requestDetProfitLossId === undefined || this.requestDetProfitLossId === '') {
      this.restService.create(FacUrls.AUDITORS_SAVE, jsondata)
        .then(resulttt => {
          this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد', () => {
            debugger;
            this.close.emit();
            this.redirectTo('/fac/profitLoss/' + this.requestId);
          });
        })
        .catch(result => {
          alert('در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
        });

    } else {
      this.restService.update(FacUrls.PROFIT_LOSS_EDIT, this.requestDetProfitLossId.toString(), jsondata)
        .then(resulttt => {
          this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد', () => {
            debugger;
            this.close.emit();
            this.redirectTo('/fac/profitLoss/' + this.requestId);
          });
        })
        .catch(result => {
          alert('در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
        });

    }
  }


  back() {
    this.redirectTo('/fac/profitLoss/' +  this.requestId);
  }

}
