import {Component, Input, ViewChild} from '@angular/core';
import {SearchOperator, SearchParam, TaminImageGalleryManagedComponent, TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {DocumentModel} from '../../../models/registration/document.model';
import {PersonalModel} from '../../../models/registration/personal.model';
import {DocumentUiModel} from '../../../models/registration/documentUi.model';
import {Urls} from '../../../settings/urls';

@Component({
  selector: 'app-guarfian-document',
  templateUrl: './guarfian-document.component.html',
  styleUrls: ['../guardian.css']
})
export class GuardianDocumentComponent extends TaminPageBaseComponent {

  public personalid: number;
  public restUrlImages;
  public documentModel = new DocumentModel;
  public documentsModel: Array<DocumentModel> = [];
  private personal = new PersonalModel;
  private _overlay: any;
  private searchParams: SearchParam[];
  private original: any;
  @ViewChild('imageGallery') imageGallery: TaminImageGalleryManagedComponent;
  @ViewChild('theModal') theModal: TaminModalComponent;
  @Input()
  documentModelUi: DocumentUiModel;

  hasImage(name: string): boolean {
    return this.imageGallery.images.filter(c => c.tag === name).length !== 0;
  }

  initializePage() {

    this.imageGallery.saveUrl = Urls.UploadImage;
    this.imageGallery.getUrl = Urls.UploadImage;
    this.restUrlImages = Urls.UploadImage;
  }


  initialize(personelid) {
    this.loadData(personelid);
  }


  saveForm() { // personalId
    return new Promise<string>((resolve, reject) => {
      const documentModelLocal = new DocumentModel();
      const ppp = [];
      const documentFile = {};
      this.personal.id = this.personalid;
      documentModelLocal.id = null;
      documentModelLocal.personal = this.personal;

      this.imageGallery.images.forEach(value => {
        let type = '';
        switch (value.tag) {
          case 'image1':
            type = '01';
            break;
          case 'image2':
            type = '02';
            break;
          case 'image3':
            type = '03';
            break;
          case 'image4':
            type = '04';
            break;
          case 'image5':
            type = '05';
            break;
          case 'image6':
            type = '06';
            break;
          case 'image7':
            type = '07';
            break;
        }
        ppp.push(
          {
            id: null,
            personal: this.personal,
            documentFile: { id: value.guid },
            documentType: type

          }
        );
      });
      if (JSON.stringify(this.original) === JSON.stringify(ppp)) {
        resolve('true');
        return;
      }
      this.restService.update(Urls.Document, this.personalid.toString(), ppp).then(() => {
        resolve('true');
      });
    });
  }

  loadData(id) {
    // this.imageGallery.images.push();
    this._overlay = this.showOverlay();
    this.searchParams = new Array<SearchParam>();
    const searchParam = new SearchParam();
    searchParam.property = 'personal.id';
    searchParam.value = id;
    searchParam.operator = SearchOperator.EQUAL;
    this.searchParams.push(searchParam);
    this.restService.getPage(Urls.Document, 1, 10, this.searchParams, [])
      .then(value => {
        this.original = value.data.list;
        this.hideOverlay(this._overlay);
        if (value.data.list.length > 0) {
          (<Array<any>>value.data.list).forEach((item) => {
            this.imageGallery.downloadImage(item.documentFile.id, this.getImageTitle(item.documentType), '0', '0', true, this.getTag(item.documentType));
          });
        }
        if (value.data.list[0] !== undefined && value.data.list[0] !== null) {
          this.personalid = value.data.list[0].id.toString();
        }
      })
      .catch(error => {
        this.hideOverlay(this._overlay);
      });
  }

  addImage(title: string, id: string) {
    this.imageGallery.selectImage(title, id);
  }

  getImageTitle(index) {
    switch (index) {
      // case '01':
      //   return 'تصویر پرسنلی';
      // case '02':
      //   return 'صفحه اول پرسشنامه';
      case '01':
        return 'صفحه اول شناسنامه';
      case '02':
        return 'صفحه دوم شناسنامه';
      case '03':
        return 'صفحه مراتب عقد در عقدنامه';
      case '04':
        return 'گواهی اشتغال به تحصیل  ';
      // case '05':
      //   return 'صفحه اول کارت ملی';
      // case '06':
      //   return 'صفحه دوم کارت ملی';
      // case '07':
      //   return 'صفحه توضیحات شناسنامه';
      // case '08':
      //   return 'صفحه دوم پرسشنامه';
    }
  }

  getTag(index) {
    switch (index) {
      case '01':
        return 'image1';
      case '02':
        return 'image2';
      case '03':
        return 'image3';
      case '04':
        return 'image4';
      // case '05':
      //   return 'image5';
      // case '06':
      //   return 'image6';
      // case '07':
      //   return 'image7';
      // case '08':
      //   return 'image8';
    }
  }
  open(id) {
    //  this.formpersonalsub.reset();
    this.loadData(id);
    this.theModal.show();

  }
}
