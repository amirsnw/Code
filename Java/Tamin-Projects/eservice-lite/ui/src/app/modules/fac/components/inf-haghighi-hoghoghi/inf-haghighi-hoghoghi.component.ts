import {Component, EventEmitter, Injector, OnInit, Output, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {TaminFieldComboBoxStaticComponent, TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {ActivatedRoute} from '@angular/router';
import {TaminStaticDataService} from '../../../../services/tamin-static-data.service/tamin-static-data.service';
import {FacUrls} from '../../fac-urls';
import {Urls} from '../../../../settings/urls';
import {EnquiryComponent} from '../../../../component/announcement/enquiry/enquiry.component';


@Component({
  selector: 'app-inf-haghighi-hoghoghi',
  templateUrl: './inf-haghighi-hoghoghi.component.html',
  styleUrls: ['./inf-haghighi-hoghoghi.component.css']
})
export class InfHaghighiHoghoghiComponent  extends TaminPageBaseComponent {

  @ViewChild('theModal') theModal: TaminModalComponent;
  @Output() dataChanged: EventEmitter<void> = new EventEmitter();
  form: FormGroup;
  private requestId: any;
  InfHaghighiHoghoghiEditForm: FormGroup;
  private _overlay: any;
  private workshopId: string;
  private i: string;
   buttonTitle: any;



  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);
  }
 protected initializePage(): void {
    debugger;
    this.form = this.formBuilder.group({
      workshopName: [''],
      workshopId: [''],
      branch: [''],
      workshopOldName: [''],
      workshopTypeDesc: [''],
      workshopActivityDesc: [''],
      nationalCode: [''],
      registerNumber: [''],
      registerDate: [''],
      brhCode: [''],
    });
   this.buttonTitle = 'جدید';
    this.requestId = this.route.snapshot.params['requestId'];
   debugger;
    this.loadData();
    this._initializeFromGroup();
    }
  private _initializeFromGroup() {
    this.InfHaghighiHoghoghiEditForm = this.formBuilder.group({
      workshopIdEdit: '',
      workshopBranchEdit: '',
      workshopNameEdit: '',
      workshopOldNameEdit: '',
      workshopTypeEdit: '',
      workshopActivityDescEdit: '',
      nationalCodeEdit: '',
      registerNumberEdit: '',
      tradeDescEdit: '',
      registerDateEdit: ''
      });

  }

  loadData() {
    debugger;
    const theUrl = `${FacUrls.AUDIT_WORKSHOP_INFO}/` + this.requestId;
    this.restService.getAll(theUrl)
     .then(data => {
       debugger;
        if (data.data) {
          if (data.data.list.length >= 1) {
            this.form.patchValue(data.data.list[0]);
            this.form.get('workshopTypeDesc').setValue(this.workshopTypeDescTranslator(data.data.list[0].workshopTypeDesc));
            this.form.get('workshopActivityDesc').setValue(this.workshopActivityDescTranslator(data.data.list[0].workshopActivityDesc));
            this.buttonTitle = 'ویرایش';
            if (data.data.list[0].branch !== null) {
              this.form.get('branch').setValue(data.data.list[0].branch.brhName);
              this.form.get('branch').setValue(data.data.list[0].branch.brhName);
            }
          }
        }
      })
      .catch(error => {
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
  }
  workshopTypeDescTranslator(workshopTypeDesc) {
    switch (workshopTypeDesc) {
      case '01':
        return 'سهامی عام';
      case '02':
        return 'سهامی خاص';
      case '03':
        return 'با مسیولیت محدود';
      case '04':
        return 'تضامنی';
      case '05':
        return 'دولتی';
      case '06':
        return 'موسسه';
      case '07':
        return 'تعاونی';
      case '08':
        return 'نامشخص';
      case '09':
        return 'ساير';
    }
  }

  workshopActivityDescTranslator(workshopActivityDesc) {
    switch (workshopActivityDesc) {
      case '01':
        return 'تولیدی';
      case '02':
        return 'بازرگانی';
      case '03':
        return 'خدماتی';
    }
  }
  EditForm() {
    debugger;
    this.redirectTo('/fac/newInfHaghighiHoghoghi/' + this.requestId);
   }
  back() {
    this.redirectTo('/fac/portal-forms/' +  this.requestId);
  }
  onCompleteInfHaghighiHoghoghi() {

  }
}
