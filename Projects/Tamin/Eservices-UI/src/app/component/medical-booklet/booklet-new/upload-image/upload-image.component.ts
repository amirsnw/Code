import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {GenericRestService, OverlayService, SearchParam, SearchOperator, TaminPageBaseComponent} from 'tamin-framework';
import {Router} from '@angular/router';
import {DocumentModel} from 'src/app/models/registration/document.model';
import {DocumentUiModel} from 'src/app/models/registration/documentUi.model';
import {Urls} from '../../../../settings/urls';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent extends TaminPageBaseComponent {
  public personalid: string;
  // public restUrl;
  public restUrlImages;
  // private FormRestUrl;
  public documentModel = new DocumentModel;
  public documentsModel: Array<DocumentModel> = [];
  private _overlay: any;
  private searchParams: SearchParam[];
  private original: any;
  @Input()
  documentModelUi: DocumentUiModel;

  documenteditForm: FormGroup;

  initializePage() {
    // this.restUrl = Urls.UploadImage;
    // this.FormRestUrl = Urls.Document;
    this.restUrlImages = Urls.UploadImage;
    this.documenteditForm = this.formBuilder.group({
      id: ['', Validators.pattern('[0-9]*')],
      length: ['', Validators.pattern('[0-9]*')],
      width: ['', Validators.pattern('[0-9]*')],
      height: ['', Validators.pattern('[0-9]*')],
      title: [{value: '', disabled: false}, [Validators.required/*, Validators.pattern('[a-z]*')*/]],
      DesignGuid1: [{value: '', disabled: false}, [Validators.required, Validators.pattern('[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}')]],
    });
  }


  initialize(personelid) {
    this.loadData(personelid);
  }

  // ------------------------------------
  onImageGuidUploaded1(event) {
    this.setSession('guid1', event);
    this.setSession('guidType1', '01');
  }

  onImageGuidDeleted1(event) {
    this.removeSession('guid1');
    this.removeSession('guidType1');
  }

  

  saveForm(personalId) {

    return new Promise<string>((resolve, reject) => {

      const values = this.documenteditForm.getRawValue();
      const documentModelLocal = new DocumentModel();
      const ppp = [];
      const documentFile = {};
      // this.personal.id = personalId;
      documentModelLocal.id = null;
      // documentModelLocal.personal = this.personal;

      if (this.getSession('guid1') != null) {
        const model1 = new DocumentModel();
        model1.id = null;
        // model1.personal = this.personal;
        const documentFile1 = {id: this.getSession('guid1')};
        model1.documentFile = documentFile1;
        model1.documentType = this.getSession('guidType1');
        ppp.push(model1);
        this.removeSession('guid1');
        this.removeSession('guidType1');
      }
      
      if (JSON.stringify(this.original) === JSON.stringify(ppp)) {
        resolve('true');
        return;
      }
      this.restService.update(Urls.Document, personalId.toString(), ppp).then(() => {
        resolve('true');
      });
    });
  }

  getSession(key: string): any {
    const data = window.sessionStorage.getItem(key);
    return JSON.parse(data);
  }

  setSession(key: string, value: any): void {
    const data = value === undefined ? null : JSON.stringify(value);
    window.sessionStorage.setItem(key, data);
  }

  removeSession(key: string): void {
    window.sessionStorage.removeItem(key);
  }

  loadData(id) {
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
          const values = new DocumentUiModel;
          value.data.list.forEach(element => {
            if (element.documentType === '01') {
              this.setSession('guid1', element.documentFile.id);
              this.setSession('guidType1', '01');
              values.DesignGuid1 = element.documentFile.id;
            }
           
          });
          this.documentModelUi = values;
          this.documenteditForm.patchValue(this.documentModelUi);
        }
        if (value.data.list[0] !== undefined && value.data.list[0] !== null) {
          this.personalid = value.data.list[0].id.toString();
        }
      })
      .catch(error => {
        this.hideOverlay(this._overlay);
        // this.modalError.show('خطا', 'امکان برقراری ارتباط با سرویس دهنده مرکزی وجود ندارد');
      });
  }
}
