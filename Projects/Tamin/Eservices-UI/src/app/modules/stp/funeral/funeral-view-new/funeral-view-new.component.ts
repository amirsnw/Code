import {Component, ElementRef, Injector, ViewChild} from '@angular/core';
import {TaminImageGalleryManagedComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Urls} from '../../../../settings/urls';
import {StpHeaderNewComponent} from '../../stp-header-new/stp-header-new.component';
import {StpUrls} from '../../stp-urls';

@Component({
  selector: 'app-funeral-view-new',
  templateUrl: './funeral-view-new.component.html',
  styleUrls: ['./funeral-view-new.component.css']
})
export class FuneralViewNewComponent extends TaminPageBaseComponent {
  theForm: FormGroup;
  private _overlay: any;
  private requestId: string;
  @ViewChild('imageGallery') imageGallery: TaminImageGalleryManagedComponent;
  @ViewChild('dataPanel') dataPanel: ElementRef;
  @ViewChild('header') header: StpHeaderNewComponent;

  constructor(injector: Injector, private activeRoute: ActivatedRoute) {
    super(injector);
  }

  protected initializePage(): void {
    this.theForm = this.formBuilder.group({
      kddateTimeStamp: [''],
      kdno: [''],
      dtype: [''],
      resultMessage: [''],
      branchName:['']
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
          this.hideOverlay(this._overlay);
          this.theForm.get('kddateTimeStamp').setValue(new Date(value.data.list[0].shorttermKdfMain[0].kddate));
          this.theForm.get('kdno').setValue(value.data.list[0].shorttermKdfMain[0].kdno);

          // this.theForm.get('dtype').setValue('همسر');
          this.theForm.get('dtype').setValue(value.data.list[0].consequential[0].risuFname + ' ' + value.data.list[0].consequential[0].risuLName);

          this.theForm.get('resultMessage').setValue(value.data.list[0].shorttermKdfMain[0].shorttermRequest.resultMessage);
          this.theForm.get('branchName').setValue(value.data.list[0].shorttermKdfMain[0].shorttermRequest.branchName);
          this.requestId = value.data.list[0].shorttermKdfMain[0].shorttermRequest.request.requestId;
          if (value.data.list[0].shorttermKdfMain) {
            (<Array<any>>value.data.list[0].shorttermKdfMain[0].shorttermRequest.requestFileList).forEach((item) => {
              this.imageGallery.downloadImage(item.documentFile, 'گواهی فوت', '0', '0');
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
