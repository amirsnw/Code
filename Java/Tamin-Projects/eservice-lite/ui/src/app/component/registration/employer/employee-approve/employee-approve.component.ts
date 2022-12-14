import {Component, ElementRef, Injector, Input, OnInit, ViewChild} from '@angular/core';
import {
  SearchParam,
  SearchOperator,
  TaminPersianService,
  TaminPageBaseComponent,
  TaminLazyLoadService, ImageModel, TaminImageGalleryComponent
} from 'tamin-framework';
import {ApproveModel} from '../../../../models/registration/approve.model';
import {Urls} from '../../../../settings/urls';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

declare let Viewer: any;

@Component({
  selector: 'app-approve',
  templateUrl: './employee-approve.component.html',
  styleUrls: ['./employee-approve.component.css']
})
export class EmployeeApproveComponent extends TaminPageBaseComponent {

  // public formapprove: FormGroup;
  public personalId;
  private requestId: string;
  private _overlay: any;
  private searchParams: SearchParam[];
  public approveModel: ApproveModel;
  ishiddenAddButton: boolean;
  // private persianService: TaminPersianService;
  /*  constructor(injector: Injector) {
      super(injector);
      this.persianService = injector.get(TaminPersianService);
    }*/

  //@ViewChild('imageContainer') imageContainer: ElementRef;
  @ViewChild('imageGallery') imageGallery: TaminImageGalleryComponent;
  refrecneCode: string;
  persoanlData: any;
  images = [];
  imageViewer: any;
  private _subscription = new Subscription();

  constructor(injector: Injector,
              private router: ActivatedRoute,
              private taminLazyLoadService: TaminLazyLoadService,
              private persianService: TaminPersianService, private theRouter: Router) {
    super(injector);
  }

  initializePage() {
    // this._subscription.add(this.taminLazyLoadService.loadJs('assets/viewerjs/dist/viewer.js').subscribe(value => {
    //     this._subscription.add(
    //       this.taminLazyLoadService.loadCss('assets/viewerjs/dist/viewer.css').subscribe(value1 => {
    //         this.imageViewer = new Viewer(this.imageContainer.nativeElement, {inline: false, title: ''});
    //       })
    //     );
    //   })
    // );

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
    ;
    if (this.router.snapshot.params['requestid'] !== null && this.router.snapshot.params['requestid'] !== undefined) {
      this.initialize(this.router.snapshot.params['requestid']);
    }
    if (this.router.snapshot.params['personalid'] !== null && this.router.snapshot.params['personalid'] !== undefined) {
      this.ishiddenAddButton = true;
    }
    else {
      this.ishiddenAddButton = false;
    }
  }


  initialize(requestId) {
    //if (this.router.snapshot.params['id'] !== null && this.router.snapshot.params['id'] !== undefined && this.router.snapshot.params['id'] !== '-1') {
    this.requestId = requestId;
    //}
debugger;
    this.personalLoad();
  }

  private personalLoad() {
    this.restService.getById(Urls.RegSummary, this.requestId.toString())
      .then(value => {
        this.persoanlData = value.data;
        this.refrecneCode = value.data.refCode;
        // 'data:image/jpeg;base64,'
        // this.changeDetectorRef.checkNoChanges();


        if (value.data.documents !== null && value.data.documents.length > 0) {
          (<Array<any>> value.data.documents).forEach((item) => {
            //this.images.push('data:image/jpeg;base64,' + item.documentFile.image)

            const model = new ImageModel();
            model.title = this.getImageTitle(item.documentType);
            model.source = 'data:image/jpeg;base64,' + item.documentFile.image;
            model.removeable = false;
            this.imageGallery.addImage(model);

          });
          setTimeout(() => {
            this.imageViewer.update()
          }, 0);
        }


      })
      .catch(error => {
        console.log(error);
      });
  }


  ApproveClick() {
    /*this.restService.update(Urls.RegRequestPut, this.requestId.toString(), {})
      .then(result => {
        const massage = 'درخواست شما با کد  ' + this.refrecneCode + ' در صف بررسی مرکز قرار گرفته است.';
        this.showInfoMessageBox('پیام سیستم', massage, () => {
          this.redirectTo('/employer-registration/personal-list');
        });
      })
      .catch(error => {
        console.log(error);
      });
*/
    this.showQuestionBox('پیام سیستم', 'آیا مطمئن هستید؟', () => {
      this._overlay = this.showOverlay();
      this.restService.update(Urls.RegRequestPut, this.requestId.toString(), {})
        .then(result => {
          this.hideOverlay(this._overlay);
          const massage = 'درخواست شما با کد  ' + this.refrecneCode + ' در صف بررسی مرکز قرار گرفته است.';
          this.showInfoMessageBox('پیام سیستم', massage, () => {
            this.redirectTo('/employer-registration/personal-list');
          });
        })
        .catch(error => {
          this.hideOverlay(this._overlay);
          console.log(error);
          this.showErrorMessageBox('خطا', error.error.data.message);
        });
    }, () => {
    });

  }

  AddPersonal() {
    this.redirectTo('/reloader/' + encodeURIComponent('{' + this.theRouter.url + '}'));
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
    }
  }
}


