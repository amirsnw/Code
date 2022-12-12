import { Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import {
  ImageModel,
  PersianDateTimePipe,
  SearchOperator,
  SearchParam, TaminImageGalleryComponent,
  TaminLazyLoadService,
  TaminPageBaseComponent
} from 'tamin-framework';
import { TaminStaticDataService } from '../../../../services/tamin-static-data.service/tamin-static-data.service';
import { ActivatedRoute } from '@angular/router';
import { Urls } from '../../../../settings/urls';
import { Subscription } from "rxjs";
import { isNullOrUndefined } from "util";

declare let Viewer: any;

@Component({
  selector: 'app-registration-view',
  templateUrl: './registration-view.component.html',
  styleUrls: ['./registration-view.component.css']
})
export class RegistrationViewComponent extends TaminPageBaseComponent {
  @ViewChild('imageGallery') imageGallery: TaminImageGalleryComponent;
  requestId: string;
  refrecneCode: string;
  persoanlData: any;
  images = [];
  imageViewer: any;
  private _subscription = new Subscription();

  constructor(injector: Injector, private router: ActivatedRoute, private taminLazyLoadService: TaminLazyLoadService) {
    super(injector);
  }

  initializePage() {

    /*this._subscription.add(this.taminLazyLoadService.loadJs('assets/viewerjs/dist/viewer.js').subscribe(value => {
        this._subscription.add(
          this.taminLazyLoadService.loadCss('assets/viewerjs/dist/viewer.css').subscribe(value1 => {
            this.imageViewer = new Viewer(this.imageContainer.nativeElement, {inline: false, title: ''});
          })
        );
      })
    );*/

    const acc = document.getElementsByClassName('accordion');

    for (let i = 0; i < acc.length; i++) {
      acc[i].addEventListener('click', function () {
        this.classList.toggle('active');
        const panel = this.nextElementSibling;
        if (panel.style.display === 'block') {
          panel.style.display = 'none';
        } else {
          panel.style.display = 'block';
        }
      });
    }
  }

  loadPageData() {
    if (this.router.snapshot.params['id'] !== null && this.router.snapshot.params['id'] !== undefined && this.router.snapshot.params['id'] !== '-1') {
      this.requestId = this.router.snapshot.params['id'];
    }

    this.personalLoad();
  }

  private personalLoad() {
    this.restService.getById(Urls.RegSummary, this.requestId)
      .then(value => {
        this.persoanlData = value.data;
        this.refrecneCode = value.data.refCode;
        // 'data:image/jpeg;base64,'
        // this.changeDetectorRef.checkNoChanges();


        if (value.data.documents !== null && value.data.documents.length > 0) {
          (<Array<any>>value.data.documents).forEach((item) => {
            //this.images.push('data:image/jpeg;base64,' + item.documentFile.image)
            const model = new ImageModel();
            model.title = this.getImageTitle(item.documentType);
            model.source = 'data:image/jpeg;base64,' + item.documentFile.image;
            model.removeable = false;
            this.imageGallery.addImage(model);
          });
          /*setTimeout(() => {
            this.imageViewer.update()
          }, 0);*/
        }


      })
      .catch(error => {
      });
  }

  private loadImage(id) {
    this.restService.getById(Urls.UploadImage, id.toString())
      .then(value => {
        this.images.push(value.data);

      })
      .catch(error => {
      });
  }
  getImageTitle(index) {
    switch (index) {
      case '01':
        return 'تصویر پرسنلی';
      case '02':
        return 'صفحه اول پرسشنامه';
      case '03':
        return 'صفحه اول شناسنامه';
      case '04':
        return 'صفحه دوم شناسنامه';
      case '05':
        return 'صفحه اول کارت ملی';
      case '06':
        return 'صفحه دوم کارت ملی';
      case '07':
        return 'صفحه توضیحات شناسنامه';
      case '08':
        return 'صفحه دوم پرسشنامه';
      case '10':
        return 'صفحه مراتب عقد در عقدنامه';
      case '09':
        return 'گواهی اشتغال به تحصیل  ';
    }
  }

}
