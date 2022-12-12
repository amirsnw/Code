import {Component, ElementRef, Injector, ViewChild} from '@angular/core';
import {TaminDocumentViewerComponent, TaminModalComponent, TaminPageBaseComponent} from 'tamin-framework';
import {Urls} from '../../../settings/urls';
import {FormGroup, Validators} from '@angular/forms';
import {DocumentViewerComponent} from '../../common/document-viewer/document-viewer.component';

@Component({
  selector: 'app-doclist',
  templateUrl: './doclist.component.html',
  styleUrls: ['./doclist.component.css']
})
export class DoclistComponent extends TaminPageBaseComponent {
  /* tslint:disable */
  private readonly noImage = 'data:image/png;base64,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/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAENxJREFUeNrs3UFyGzcUQMEZ3P/OyMoVlcuSTYnkYPC694ltAvh4guTknHMejzrP86F/aM55HgDAMs5HAuDRi18QAMCNA+BZF78IAIAbBMArLn4RAAALB8CrL38hAADXGUtUyBtjAwD4JACuuJBFAABcGABXXsQiAAAuCIAVLmARAABvDICVLl4RAABvfAFYiQgAgBcHwKqXrQgAgNgLgAgAgHAAiAAAeMHdehzHbS5X/8VAAAi9AHgJAIBwAIgAAIgGgAgAgGgAiAAA+OE9etzohwD/xA8GIiwxJyAYAA43LnvMDogGgIOMSx8zBKIB4ADj0scsgWgAOLi4+DFPIBoADi0ufswU+IdZOefccmA6sC5/MFfgc2PXP5iLoHfxW3PMFRAADquhDGITvtrLc87th6hnOxc/mC0QegFwUVhTsA/hLwGwe8k6qNYS7EeIvQA4qNYQ7Ev4IgAK389yUK0d2J/whxcAEYA1A/uUYACIAKwVQDQARACAuUI0AEQA1gfsW6IBIAKwLgDRABABAGYK0QAQAVgLgGgAiACsAdjLRANABABANABEAD53sKeJBoAIAIBoAIgAfNZgbxMNABEAANEAEAH4fMEeJxoAIgDADCEaACIAnylANABEAID5QTQARAA+R4BoAIgAALODaACIAHx2ANEAEAEA5gbRABAB+LwAogEgAgDMDKIBIALwGQFEA0AEAJgXRANABBh2PgWAaACIAACzgmgAiABDDoBoAIgAAHOCaACIAACIBoAI8NUN4JwQDQARAADRABAB/rzgFcB5IRoAIgAAogEgAvwZwSsARANABABANABEgD8XeAWAaACIAACIBoAI8GcBrwAQDQARAADRABABfv/gFQCiASACACAaACLA7xm8AkA0AEQAAEQDQAT4fYJXAPjmnppzOhwAEPtCc5sAEAEACIRoAIgAAARBNABEAABiIBoAIgAAMRANABEAgBCIBoAIAEAIRANABAAgBKIBIAIAEALRABABAAiB/w0fKgD0vlhNvQB4CQDAF67BFwAvAQD4gjUcACIAgHoEjPKHKgIAqEbAqH+oIgCAYgQkfwjwXXUFAKt+8Tp8jF4CAOh90SoARAAAwQgQACIAgKAfBcB5nnPH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';
  /* tslint:enalbe */

  private _firstOverlay: any;
  private _secondOverlay: any;
  hasError = false;
  data = [];

  public theForm: FormGroup;
  @ViewChild('docList') docList: ElementRef;
  @ViewChild('docDetail') docDetail: ElementRef;
  // @ViewChild('docViewer') docViewer: DocumentViewerComponent;
  @ViewChild('docViewer') docViewer: TaminDocumentViewerComponent;
  @ViewChild('theModal') theModal: TaminModalComponent;

  docStates = [
    {name: 'تصویر نیاز به چرخش دارد', value: '1'},
    {name: 'تصویر دارای حاشیه های اضافه می باشد', value: '2'},
    {name: 'صفحه خالی می باشد', value: '3'},
    {name: 'تصویر قابل مشاهده نمی باشد', value: '4'},
    {name: 'تصویر مرتبط به پرونده من نمی باشد', value: '5'},
    {name: 'نوع سند اشتباه می باشد', value: '6'}
  ];

  docTypes = [
    {name: 'هویتی - عکس پرسنلی', value: '1'},
    {name: 'هویتی - شناسنامه', value: '2'},
    {name: 'هویتی - کارت ملی', value: '3'},
    {name: 'هویتی - پرسشنامه نامنویسی', value: '4'},
    {name: 'هویتی - اثرانگشت', value: '5'},
    {name: 'هویتی - پرسشنامه نامنویسی', value: '6'},
    {name: 'هویتی - سایر مستندات', value: '7'},
    {name: 'گروههای خاص بیمه ای - بیمه صاحبان حرف و مشاغل آزاد', value: '8'},
    {name: 'تعهدات کوتاه مدت و بیمه بیکاری - غرامت دستمزد ایام بیماری و بارداری', value: '9'},
    {name: 'احکام مستمری - احکام برقراری', value: '10'},
    {name: 'تعهدنامه ها و گواهی ها - گواهی انحصار وراثت', value: '10'},
    {name: 'تعهدنامه ها و گواهی ها - تعهدنامه فرزندان اناث', value: '10'},
  ];

  fullUrl: string;

  constructor(injector: Injector/*, private changeDetectorRef: ChangeDetectorRef*/) {
    super(injector);
  }

  // constructor(
  //   public sanitizer: DomSanitizer,
  //   private genericRestService: GenericRestService<any>,
  //   private overlayService: OverlayService,
  //   private formBuilder: FormBuilder,
  //   private http: HttpClient) {
  // }

  // DomSanitizationService;


  initializePage() {
    this.createForm();
    this.loadData();
  }

  private createForm() {
    this.theForm = this.formBuilder.group({
      docState: ['', Validators.required],
      docType: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  loadData() {
    this.hasError = false;
    this._firstOverlay = this.showOverlay();
    // this.restService.restUrl = Urls.Images;
    this.restService.getPage(Urls.Images, 1, 100)
      .then((value) => {
        this.hasError = false;
        this.hideOverlay(this._firstOverlay);
        this.data = value.data.list;
      })
      .catch(reason => {
        this.hideOverlay(this._firstOverlay);
        this.hasError = true;
      });
  }

  onItemClicked(data) {
    let contentType: 'unknown' | 'image' | 'pdf' = 'unknown';
    if (data.thumb.split('.tif').length > 1 || data.thumb.split('.pdf').length > 1) {
      this.fullUrl = data.thumb.replace('thumbs', 'full-pdf');
      contentType = 'pdf';
    } else {
      this.fullUrl = data.thumb.replace('thumbs', 'full');
      contentType = 'image';
    }
    this._secondOverlay = this.showOverlay();
    this.restService.getBlob(this.fullUrl)
      .then(value => {
        debugger;
        this.hideOverlay(this._secondOverlay);
        this.theModal.show();
        if (contentType === 'pdf') {
          debugger;
          this.docViewer.loadPdf(URL.createObjectURL(value));
        } else if (contentType === 'image') {
           this.docViewer.loadImage(URL.createObjectURL(value));
        }
      })
      .catch(reason => {
        this.hideOverlay(this._secondOverlay);
      });


  }

  onSumbitReport() {
    this.showInfoMessageBox('پیام سیستم', 'امکان ثبت گزارش اشکال در این بخش در آینده نزدیک و پس از اتمام فرآیند الکترونیکی شدن اسناد کاغذی پرونده های بیمه شدگان کل کشور فراهم خواهد بود.');
  }
}
