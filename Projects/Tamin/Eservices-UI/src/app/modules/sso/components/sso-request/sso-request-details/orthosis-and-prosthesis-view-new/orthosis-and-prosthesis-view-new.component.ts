import {Component, ElementRef, Injector, ViewChild} from '@angular/core';
import {SearchOperator, SearchParam, TaminImageGalleryManagedComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Urls} from  '../../../../../../settings/urls';
import {StpHeaderNewComponent} from '../stp-header-new/stp-header-new.component';
import {StpUrls} from '../../../../../stp/stp-urls';

@Component({
  selector: 'app-orthosis-and-prosthesis-view-new',
  templateUrl: './orthosis-and-prosthesis-view-new.component.html',
  styleUrls: ['./orthosis-and-prosthesis-view-new.component.css']
})
export class OrthosisAndProsthesisViewNewComponent extends TaminPageBaseComponent {

  theForm: FormGroup;
  private _overlay: any;
  requestId = '';
  mainAndSubdominantData = [];
  @ViewChild('imageGallery') imageGallery: TaminImageGalleryManagedComponent;
  @ViewChild('header') header: StpHeaderNewComponent;
  @ViewChild('dataPanel') dataPanel: ElementRef;

  constructor(injector: Injector, private activeRoute: ActivatedRoute) {
    super(injector);
  }

  protected initializePage(): void {
    this.theForm = this.formBuilder.group({
      risuid: ['', Validators.required],
      useTajTimeStamp: ['', Validators.required],
      risuFname: [''],
      risuseLName: [''],
      relationShip: [''],
      risuIdNo: [''],
      cityName: [''],
      brithDate: [''],
      noteBookDate: [''],
      relationShipCode: [''],
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

  addImage(title: string, id: string) {
    this.imageGallery.selectImage(title, id);
  }


  getImageTitle(index) {
    switch (index) {
      case '0401':
        return 'نسخه تجویز پزشک';
      case '0402':
        return 'فاکتور خرید';
    }
  }

  private loadData(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.restService.getById(StpUrls.STP_LOAD_DATA_SSO, this.requestId.toString())
        .then(value => {
          this.hideOverlay(this._overlay);
          this.theForm.get('useTajTimeStamp').setValue(new Date(value.data.list[0].shorttermArutz[0].useTaj));
          this.theForm.get('resultMessage').setValue(value.data.list[0].shorttermArutz[0].shorttermRequest.resultMessage);
          this.theForm.get('branchName').setValue(value.data.list[0].shorttermArutz[0].shorttermRequest.branchName);


          debugger;
          // this.getMainAndSubdominantData(value.data.list[0])
          //   .then(value1 => {
               this.theForm.get('risuid').setValue(value.data.list[0].consequential[0].risuId);
          //     const data = this.mainAndSubdominantData.filter(c => c.value === value.data.list[0].shorttermArutz[0].useRisuId)[0].original;
              this.theForm.get('risuFname').setValue(value.data.list[0].consequential[0].risuFname);
              this.theForm.get('risuseLName').setValue(value.data.list[0].consequential[0].risuLName);
              this.theForm.get('relationShip').setValue(value.data.list[0].consequential[0].relationShip);
              this.theForm.get('risuIdNo').setValue(value.data.list[0].consequential[0].risuIdNo);
              this.theForm.get('cityName').setValue(value.data.list[0].consequential[0].cityName);
              this.theForm.get('brithDate').setValue(`${value.data.list[0].consequential[0].brithDate.substr(0, 4)}/${value.data.list[0].consequential[0].brithDate.substr(4, 2)}/${value.data.list[0].consequential[0].brithDate.substr(6, 2)}`);
              this.theForm.get('noteBookDate').setValue(value.data.list[0].consequential[0].bletenddate);
              this.theForm.get('relationShipCode').setValue(value.data.list[0].consequential[0].relationShipCode);
              // resolve();
            // })
            // .catch(reason => {
            //   reject(reason);
            // });





          if (value.data.list[0].shorttermArutz) {
            (<Array<any>>value.data.list[0].shorttermArutz[0].shorttermRequest.requestFileList).forEach((item) => {
              this.imageGallery.downloadImage(item.documentFile, this.getImageTitle(item.documentType), '0', '0');
            });
          }
        })
        .catch(reason => {
          reject(reason);
        });
    });
  }

  getMainAndSubdominantData(data) {
    return new Promise<boolean>((resolve, reject) => {
      const searchParam = new SearchParam();
      searchParam.operator = SearchOperator.EQUAL;
      searchParam.property = 'risuId';
      searchParam.value = data.risuid;
      const searchParams = [searchParam];
      this.restService.getPage(StpUrls.STP_ORTHOSIS_VIEW_NEW, 1, 1000, searchParams)
        .then(value => {
          (<Array<any>>(value.data.list)).forEach(item => {
            this.mainAndSubdominantData.push({
              name: this.getPersianNumber(`${item.risuId} - ${item.relationShip}`),
              value: item.risuId,
              original: item
            });
          });
          resolve(value);
        })
        .catch(reason => {
          reject(reason);
        });
    });
  }
}
