import {Component, ElementRef, ViewChild , Injector} from '@angular/core';
import {PersianNumberPipe, TaminPageBaseComponent , OverlayService , TaminPersianService } from 'tamin-framework';
import {FormGroup , FormBuilder} from '@angular/forms';
import {Urls} from '../../../settings/urls';
import {SalaryListComponent} from '../salary/salary-list/salary-list.component';
import {TaminStaticDataService} from '../../../services/tamin-static-data.service/tamin-static-data.service';

@Component({
  selector: 'app-institutions-announcement-history',
  templateUrl: './institutions-announcement-history.component.html',
  styleUrls: ['./institutions-announcement-history.component.css']
})
export class InstitutionsAnnouncementHistoryComponent extends TaminPageBaseComponent {
  theForm: FormGroup;
  private persianService: TaminPersianService;
  private taminStaticDataService: TaminStaticDataService;
  private overlayService: OverlayService;
  private _overlay: any;
  institutionTypeList = [];
  institutionNameList = [];
  institutionNameCode: '1' | '2';

  constructor(injector: Injector) {
    super(injector);
    this.taminStaticDataService = injector.get(TaminStaticDataService);
  }

  private _initializeFromGroup() {
    this.theForm = this.formBuilder.group({
      institutionType: [''],
      institutionName: [''],
      historyType1 : [''],
      historyType2 : [''],
      historyType3 : ['']
    });

    this.theForm.get('institutionType').valueChanges.subscribe(value => {
        if (value === '1') {
          this.institutionNameCode = '1';
        } else {
          this.institutionNameCode = '2';
        }
    });

  }

  initializePage() {
     this._initializeFromGroup();
     this.institutionTypeList = this.taminStaticDataService.getInstitutionType();
     this.institutionNameList = this.taminStaticDataService.getInstitutionType();

  }


  protected loadPageData(): void {
    // this.restService.getAll(Urls.InstitutionType).then(value => {
    //   (<Array<any>>value.data.list).forEach((item) => {
    //     this.institutionTypeList.push({
    //       name: item.title,
    //       value: item.id
    //     });
    //   });
    // }).catch(reason => {
    // });
    // this.restService.getAll(Urls.InstitutionName).then(value => {
    //   (<Array<any>>value.data.list).forEach((item) => {
    //     this.institutionNameList.push({
    //       name: item.requestDesc,
    //       value: item.requestCode
    //     });
    //   });
    // }).catch(reason => {
    // });

  }
  resetForm() {
    this.theForm.get('historyType1').setValue (false) ;
    this.theForm.get('historyType2').setValue (false) ;
    this.theForm.get('historyType3').setValue (false) ;
  }

  sendToInbox() {
    const type1  = this.theForm.get('historyType1').value as boolean;
    const type2 = this.theForm.get('historyType2').value as boolean;
    const type3 = this.theForm.get('historyType3').value as boolean;
    if ( !type1 && !type2 && !type3 ) {
      this.showInfoMessageBox('پیام سیستم' , 'هیچ نوع سابقه ای برای ارسال به صندوق شخصی انتخاب نشده است');
      return;
    } else {
      this.showInfoMessageBox('پیام سیستم' , 'هیچ نوع سابقه ای برای ارسال به صندوق شخصی انتخاب نشده است');

    }
    this._overlay = this.showOverlay();
    this.restService.getAll(Urls.HistorySendToInstitution,  null,  null,
      {
        type1,
        type2,
        type3
      }).then(value => {
        this.hideOverlay(this._overlay);
        if (value) {
          this.showInfoMessageBox('پیام سیستم', 'ارسال سابقه به موسسات با موفقیت انجام شد');
        } else {
          this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
        }
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });

  }

}
