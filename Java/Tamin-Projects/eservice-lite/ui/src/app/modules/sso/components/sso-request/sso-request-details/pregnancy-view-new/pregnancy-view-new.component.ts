import {Component, ElementRef, Injector, ViewChild} from '@angular/core';
import {TaminImageGalleryManagedComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Urls} from  '../../../../../../settings/urls';
import {StpHeaderNewComponent} from '../stp-header-new/stp-header-new.component';
import {StpUrls} from '../../../../../stp/stp-urls';

@Component({
  selector: 'app-pregnancy-view-new',
  templateUrl: './pregnancy-view-new.component.html',
  styleUrls: ['./pregnancy-view-new.component.css']
})
export class PregnancyViewNewComponent extends TaminPageBaseComponent {

  @ViewChild('imageGallery') imageGallery: TaminImageGalleryManagedComponent;
  @ViewChild('header') header: StpHeaderNewComponent;
  @ViewChild('dataPanel') dataPanel: ElementRef;
  theForm: FormGroup;
  requestId = '';
  barTypes = [];
  barChild = [];
  hasImage1 = false;
  hasImage2 = false;
  hasImage3 = false;
  hasImage4 = false;
  hasImage5 = false;
  private _overlay: any;

  constructor(injector: Injector, private activeRoute: ActivatedRoute) {
    super(injector);
  }

  protected initializePage(): void {
    this.theForm = this.formBuilder.group({
      barSDateTimeStamp: [''],
      barEDateTimeStamp: [''],
      barDemDatTimeStamp: [''],
      barDrname: [''],
      barDRid: [''],
      barDd: [''],
      barType: [''],
      barChild: [''],
      resultMessage: [''],
      branchName: ['']
    });
    this.imageGallery.getUrl = StpUrls.STP_NEW_LOAD_IMAGE;
  }

  protected loadPageData(): void {
    this.activeRoute.params.subscribe(params => {
      if (params['id']) {
        this.requestId = params['id'];
        this._overlay = this.showOverlay();
        this.header
          .loadData()
          .then(value => {
            this.loadData()
              .then(value1 => {
                this.hideOverlay(this._overlay);
              })
              .catch(reason => {
                this.hideOverlay(this._overlay);
                this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
              });
          })
          .catch(reason => {
            this.hideOverlay(this._overlay);
            this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
          });
      } else {
        this.redirectTo('/');
      }
    });
  }


  getBarType() {
    return new Promise<boolean>((resolve, reject) => {
      this.restService.getAll(StpUrls.STP_NEW_ORTHOSIS_BAR_TYPES)
        .then(value => {
          (<Array<any>>(value.data.list)).forEach(item => {
            this.barTypes.push({
              name: item.name,
              value: item.code,
            });
          });
          resolve();
        })
        .catch(reason => {
          reject();
        });
    });
  }

  getBarChild() {
    return new Promise<boolean>((resolve, reject) => {
      this.restService.getAll(StpUrls.STP_NEW_ORTHOSIS_BAR_CHILD)
        .then(value => {
          (<Array<any>>(value.data.list)).forEach(item => {
            this.barChild.push({
              name: item.name,
              value: item.code,
            });
          });
          resolve();
        })
        .catch(reason => {
          reject();
        });
    });
  }

  getImageTitle(index) {
    switch (index) {
      case '0201' :
        return 'صفحه اول شناسنامه مادر';
      case '0202' :
        return 'صفحه دوم شناسنامه مادر';
      case '0203' :
        return 'صفحه اول شناسنامه فرزند';
      case '0204' :
        return 'گواهی ولادت';
      case '0205' :
        return 'استراحت پزشکی';
      case '0206' :
        return 'گواهی ولادت یا شناسنامه نوزاد';
    }
  }

  private loadData(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.getBarType().then(value0 => {
        this.getBarChild().then(value1 => {
          this.restService.getById(StpUrls.STP_LOAD_DATA_SSO, this.requestId.toString())
            .then(value => {
              this.theForm.get('barSDateTimeStamp').setValue(new Date(value.data.list[0].shorttermPragnent[0].barSDate));
              this.theForm.get('barEDateTimeStamp').setValue(new Date(value.data.list[0].shorttermPragnent[0].barEDate));
              this.theForm.get('barDemDatTimeStamp').setValue(new Date(value.data.list[0].shorttermPragnent[0].barDemDat));
              this.theForm.get('barDrname').setValue(value.data.list[0].shorttermPragnent[0].barDrname);
              this.theForm.get('barDRid').setValue(value.data.list[0].shorttermPragnent[0].barDRid);
              this.theForm.get('barType').setValue(this.barTypes.find(c => c.value === value.data.list[0].shorttermPragnent[0].barType).name);
              this.theForm.get('barDd').setValue(value.data.list[0].shorttermPragnent[0].barDd);
              this.theForm.get('barChild').setValue(this.barChild.find(c => c.value === value.data.list[0].shorttermPragnent[0].barChild).name);
              this.theForm.get('resultMessage').setValue(value.data.list[0].shorttermPragnent[0].shorttermRequest.resultMessage);
              this.theForm.get('branchName').setValue(value.data.list[0].shorttermPragnent[0].shorttermRequest.branchName);
              if (value.data.list[0].shorttermPragnent) {
                (<Array<any>>value.data.list[0].shorttermPragnent[0].shorttermRequest.requestFileList).forEach((item) => {
                  this.imageGallery.downloadImage(item.documentFile, this.getImageTitle(item.documentType), '0', '0', false);
                });
              }
              resolve();
            })
            .catch(reason => {
              reject(reason);
            });
        }).catch(reason => {
          reject(reason);
        });
      }).catch(reason => {
        reject(reason);
      });
    });
  }
}
