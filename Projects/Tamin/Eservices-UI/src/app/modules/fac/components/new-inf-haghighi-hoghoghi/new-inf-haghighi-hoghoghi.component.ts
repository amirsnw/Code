import {Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild} from '@angular/core';
import {RequestModel} from '../../../../models/dynamic-request/request.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GenericRestService, TaminFieldComboBoxStaticComponent, TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {ActivatedRoute, Router} from '@angular/router';
import {Urls} from '../../../../settings/urls';

import {FacUrls} from '../../fac-urls';
import {AloRequestDetWorkshopInfo} from '../../models/alo-request-det-workshop-info.model';
import {PensionAccountModel} from '../../../../models/pensioner/pensionAccountModel';


@Component({
  selector: 'app-new-inf-haghighi-hoghoghi',
  templateUrl: './new-inf-haghighi-hoghoghi.component.html',
  styleUrls: ['./new-inf-haghighi-hoghoghi.component.css']
})
export class NewInfHaghighiHoghoghiComponent  extends TaminPageBaseComponent {
  @ViewChild('theModal') theModal: TaminModalComponent;
  @Output() close = new EventEmitter<any>();
  @ViewChild('workshopTypeCombobBox') workshopTypeCombobBox: TaminFieldComboBoxStaticComponent;
  @ViewChild('ActivityCombobBox') ActivityCombobBox: TaminFieldComboBoxStaticComponent;

  editForm: FormGroup;
  private state: 'New' | 'Edit';
  private requestId: any;
  private data: any;
  private _overlay: any;
  private buttonTitle: string;
  private detWorkshopInfoId: any;
  private brhCode: any;

   constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);
   }

  protected initializePage(): void {
    debugger;
    this.editForm = this.formBuilder.group({
      workshopName: [''],
      workshopId: [''],
      branch: [''],
      workshopOldName: [''],
      workshopTypeDesc: [''],
      workshopActivityDesc: [''],
      nationalCode: [''],
      registerNumber: [''],
      detWorkshopInfoId: [''],
      requests: [''],
      characterCode: [''],
      tradeDesc: [''],
      registerDate: ['']

    });

    this.requestId = this.route.snapshot.params['requestId'];
    debugger;
    this.loadData();
    // if (this.router.snapshot.params['mode'] === 'update') {
     this.buttonTitle = 'ثبت و تایید ';
    // } else {
    //   this.buttonTitle = 'ثبت اطلاعات حساب بانکی';
    // }
    // this._initializeFromGroup();
    this.ActivityCombobBox.dataItems = [
      {
        name: 'تولیدی',
        value: '01'
      },
      {
        name: 'بازرگانی',
        value: '02'
      },
      {
        name: 'خدماتی',
        value: '03'
      }
    ];
    this.workshopTypeCombobBox.dataItems = [
      {
        name: 'سهامی عام',
        value: '01'
      },
      {
        name: 'سهامی خاص',
        value: '02'
      },
      {
        name: 'با مسیولیت محدود',
        value: '03'
      },
      {
        name: 'تضامنی',
        value: '04'
      },
      {
        name: 'دولتی',
        value: '05'
      },
      {
        name: 'موسسه',
        value: '06'
      },
      {
        name: 'تعاونی',
        value: '07'
      },
      {
        name: 'نامشخص',
        value: '08'
      },
      {
        name: 'ساير',
        value: '09'
      }
    ];
  }
  loadData() {
    debugger;
    const theUrl = `${FacUrls.AUDIT_WORKSHOP_INFO}/` + this.requestId;
    this.restService.getAll(theUrl)
      .then(values => {
        debugger;
        if (values.data) {
          this.editForm.patchValue(values.data.list[0]);
          this.detWorkshopInfoId = values.data.list[0].detWorkshopInfoId;
          if (values.data.list[0].branch != null) {
            this.editForm.get('branch').setValue(values.data.list[0].branch.brhName);
            this.brhCode = values.data.list[0].branch.brhCode;
          }
        }
      })
      .catch(error => {
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
  }

    show(record = null) {
    this.data = null;
    this.editForm.reset();
    this.state = record ? 'Edit' : 'New';
    if (record !== null) {
      this.data = record;
      this.editForm.patchValue(record);
    }
    this.theModal.show();
  }

  onSave(values) {
    debugger;
    if (!this.editForm.valid) {
        this.markFormGroupAsTouched(this.editForm);
        return;
      }
    const jsondata = new AloRequestDetWorkshopInfo();
    jsondata.workshopName = values.workshopName;
    jsondata.branch =  this.brhCode;
    jsondata.workshopId = values.workshopId;
    jsondata.registerNumber = values.registerNumber;
    jsondata.registerDate = values.registerDate;
    jsondata.workshopActivityDesc = values.workshopActivityDesc;
    jsondata.nationalCode = values.nationalCode;
   jsondata.workshopOldName = values.workshopOldName;
    jsondata.workshopTypeDesc = values.workshopTypeDesc;
    jsondata.detWorkshopInfoId = this.detWorkshopInfoId;
    jsondata.requests = values.requests;
    jsondata.characterCode = values.characterCode;
    jsondata.tradeDesc = values.tradeDesc;
    debugger;
    this.restService.update(FacUrls.AUDIT_WORKSHOP_INFO_EDIT , this.detWorkshopInfoId.toString(), jsondata)
      .then(resulttt => {
         this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد' , () => {
          debugger;
         this.close.emit();
          this.redirectTo('/fac/infHaghighiHoghoghi/' + this.requestId);
        });
      })
      .catch(result => {
        alert('در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
      });

      }
  back() {
    this.redirectTo('/fac/infHaghighiHoghoghi/' +  this.requestId);
  }



}
