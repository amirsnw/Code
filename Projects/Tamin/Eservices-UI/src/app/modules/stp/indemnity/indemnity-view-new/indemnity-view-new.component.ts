import {Component, ElementRef, Injector, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {TaminImageGalleryManagedComponent, TaminPageBaseComponent} from 'tamin-framework';
import {StpHeaderViewComponent} from '../../stp-header-view/stp-header-view.component';
import {ActivatedRoute} from '@angular/router';
import {Urls} from '../../../../settings/urls';
import {promise} from 'selenium-webdriver';
import {StpHeaderNewComponent} from '../../stp-header-new/stp-header-new.component';
import {StpUrls} from '../../stp-urls';

@Component({
  selector: 'app-indemnity-view-new',
  templateUrl: './indemnity-view-new.component.html',
  styleUrls: ['./indemnity-view-new.component.css']
})
export class IndemnityViewNewComponent extends TaminPageBaseComponent{

  theForm: FormGroup;
  private _overlay: any;
  requestId: string;
  @ViewChild('imageGallery') imageGallery: TaminImageGalleryManagedComponent;
  @ViewChild('header') header: StpHeaderNewComponent;
  @ViewChild('panelData') panelData: ElementRef;

  constructor(injector: Injector, private activeRoute: ActivatedRoute) {
    super(injector);
  }

  protected initializePage(): void {
    this.theForm = this.formBuilder.group({
      bimSdateTimeStamp: [''],
      bimEdateTimeStamp: [''],
      bimDrname: [''],
      bimDrid: [''],
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

  private loadData(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.restService.getById(StpUrls.STP_LOAD_DATA, this.requestId.toString())
        .then(value => {
          this.theForm.get('bimSdateTimeStamp').setValue(new Date(value.data.list[0].shorttermIllness[0].bimSDate));
          this.theForm.get('bimEdateTimeStamp').setValue(new Date(value.data.list[0].shorttermIllness[0].bimEdate));
          this.theForm.get('bimDrname').setValue(value.data.list[0].shorttermIllness[0].bimDrname);
          this.theForm.get('bimDrid').setValue(value.data.list[0].shorttermIllness[0].bimDrid);
          this.theForm.get('resultMessage').setValue(value.data.list[0].shorttermIllness[0].shorttermRequest.resultMessage);
          this.theForm.get('branchName').setValue(value.data.list[0].shorttermIllness[0].shorttermRequest.branchName);
          // this.header.setData(value.data.list[0].shorttermIllness[0]);
          if (value.data.list[0].shorttermIllness) {
            (<Array<any>>value.data.list[0].shorttermIllness[0].shorttermRequest.requestFileList).forEach((item) => {
              this.imageGallery.downloadImage(item.documentFile, 'تجویز پزشک معالج', '0', '0');
            });
          }
          resolve();
        })
        .catch(reason => {
          reject(reason);
        });
    });
  }
}
