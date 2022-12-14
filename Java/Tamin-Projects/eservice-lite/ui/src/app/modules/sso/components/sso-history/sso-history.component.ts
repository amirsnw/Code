import {Component, ElementRef, ViewChild , Injector} from '@angular/core';
import {PersianNumberPipe, TaminPageBaseComponent , OverlayService , TaminPersianService } from 'tamin-framework';
import {FormGroup , FormBuilder} from '@angular/forms';
import {Urls} from '../../../../settings/urls';
import {TaminStaticDataService} from '../../../../services/tamin-static-data.service/tamin-static-data.service';


@Component({
  selector: 'app-sso-history',
  templateUrl: './sso-history.component.html',
  styleUrls: ['./sso-history.component.css']
})

export class SsoHistoryComponent extends TaminPageBaseComponent {
    theForm: FormGroup;
    private persianService: TaminPersianService;
    private taminStaticDataService: TaminStaticDataService;
    private overlayService: OverlayService;
    private _overlay: any;
    historyypeList = [];
    institutionNameList = [];
    institutionNameCode: '1' | '2';

    constructor(injector: Injector) {
      super(injector);
      this.taminStaticDataService = injector.get(TaminStaticDataService);
    }

    initializePage() {
      this._initializeFromGroup();
      // this.institutionTypeList = this.taminStaticDataService.getInstitutionType();
      // this.institutionNameList = this.taminStaticDataService.getInstitutionType();

   }

    private _initializeFromGroup() {
      this.theForm = this.formBuilder.group({
        // institutionType: [''],
        // institutionName: [''],
        historyType1 : [''],
        historyType2 : [''],
        historyType3 : [''],
        historyType4 : ['']
      });
    }

  redirectToPage() {
    const type1  = this.theForm.get('historyType1').value as boolean;
    const type2 = this.theForm.get('historyType2').value as boolean;
    const type3 = this.theForm.get('historyType3').value as boolean;
    const type4 = this.theForm.get('historyType4').value as boolean;
     if ( type1 === false && type2 === false && type3 === false && type4 === false ) {
      this.showErrorMessageBox('پیام سیستم', 'هیچ گزینه ای انتخاب نشده است');
      return;
     }
     if ((type1 === true && type2 === true) ||
        (type1 === true && type3 === true) ||
        (type1 === true && type4 === true) ||
        (type2 === true && type3 === true) ||
        (type2 === true && type4 === true) ||
        (type3 === true && type4 === true)) {
        this.showErrorMessageBox('پیام سیستم', 'فقط یک گزینه را انتخاب کنید');
        return;
     }
     if (type1 !== null && type1 === true) {
      this.redirectTo('/sso/sso-complete');
     }
     if (type2 !== null && type2 === true) {
      this.redirectTo('/sso/sso-salary');
     }
     if (type3 !== null && type3 === true) {
      this.redirectTo('/sso/sso-combined');
     }
     if (type4 !== null && type4 === true) {
      this.redirectTo('/sso/sso-occupation');
     }
    }

    resetForm() {
      this.redirectTo('/sso');
    }
}
