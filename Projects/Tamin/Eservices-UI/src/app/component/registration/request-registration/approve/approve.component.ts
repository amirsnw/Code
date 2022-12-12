import {Component, ElementRef, Injector, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {
  SearchParam,
  SearchOperator,
  TaminPersianService,
  TaminPageBaseComponent,
  TaminLazyLoadService
} from 'tamin-framework';
import {ApproveModel} from '../../../../models/registration/approve.model';
import {QuestionnaireComponent} from '../questionnaire/questionnaire.component';
import {Urls} from '../../../../settings/urls';
import {RegistrationViewComponent} from "../registration-view/registration-view.component";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

declare let Viewer: any;

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.css']
})
export class ApproveComponent extends TaminPageBaseComponent {

  // public formapprove: FormGroup;
  public personalId;
  private requestId: string;
  private _overlay: any;
  private searchParams: SearchParam[];
  public approveModel: ApproveModel;
  // private persianService: TaminPersianService;
  @ViewChild('questionnaire') questionnaire: QuestionnaireComponent;
  /*  constructor(injector: Injector) {
      super(injector);
      this.persianService = injector.get(TaminPersianService);
    }*/

  @ViewChild('imageContainer') imageContainer: ElementRef;
  refrecneCode: string;
  persoanlData: any;
  images = [];
  imageViewer: any;
  private _subscription = new Subscription();

  constructor(injector: Injector, private router: ActivatedRoute, private taminLazyLoadService: TaminLazyLoadService, private persianService: TaminPersianService) {
    super(injector);
  }

  initializePage() {
    this._subscription.add(this.taminLazyLoadService.loadJs('assets/viewerjs/dist/viewer.js').subscribe(value => {
        this._subscription.add(
          this.taminLazyLoadService.loadCss('assets/viewerjs/dist/viewer.css').subscribe(value1 => {
            this.imageViewer = new Viewer(this.imageContainer.nativeElement, {inline: false, title: ''});
          })
        );
      })
    );

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


  /*  initialize(personalId) {
      this.loadData(personalId);
    }*/


  initialize(requestId) {
    //if (this.router.snapshot.params['id'] !== null && this.router.snapshot.params['id'] !== undefined && this.router.snapshot.params['id'] !== '-1') {
    this.requestId = requestId;
    //}

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
            this.images.push('data:image/jpeg;base64,' + item.documentFile.image)
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
    this.restService.update(Urls.RegRequestPut, this.requestId.toString(), {})
      .then(result => {
        const massage = 'درخواست شما با کد  ' + this.refrecneCode + ' در صف بررسی مرکز قرار گرفته است.';
        this.showInfoMessageBox('پیام سیستم', massage, () => {
          this.redirectTo('/employer-registration/personal-list');
        });
      })
      .catch(error => {
        console.log(error);
      });

  }

  questionClick() {
    this.questionnaire.initialize(this.personalId);
  }
}
