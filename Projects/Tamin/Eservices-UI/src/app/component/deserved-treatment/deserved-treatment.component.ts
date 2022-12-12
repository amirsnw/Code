import {Component, Input} from '@angular/core';
import {DeservedTreatmentModel} from '../../models/deserved-treatment/deservedTreatment.model';
import {TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {Urls} from '../../settings/urls';

@Component({
  selector: 'app-deserved-treatment',
  templateUrl: './deserved-treatment.component.html',
  styleUrls: ['./deserved-treatment.component.css']
})
export class DeservedTreatmentComponent extends TaminPageBaseComponent {

  public restUrl;
  @Input() deservedModel: DeservedTreatmentModel;
  resultForm: FormGroup;
  searchParams: any[] = [];
  sortParams: any[] = [];
  private _overlay: any;

  protected initializePage(): void {
    // this.restUrl = Urls.Deserve;
    this.resultForm = this.formBuilder.group({
      risuid: ['', Validators.pattern('[0-9]*')],
      healthBookletDate: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      brhName: ['', Validators.required],
      natCode: ['', Validators.required],
    });
    this.deservedModel = new DeservedTreatmentModel();
    this.resultForm.patchValue(this.deservedModel);
    this._overlay = this.showOverlay();
    this.restService.getAll(Urls.Deserve).then(value => {
      this.hideOverlay(this._overlay);
      this.deservedModel = value.data.list[0];

      const simpleDate =  this.getPersianDate(new Date()).replace('/','').replace('/','');

      if ( this.deservedModel.healthBookletDate !== undefined &&  !this.deservedModel.healthBookletDate.startsWith("00") &&  !this.deservedModel.healthBookletDate.startsWith("11") && !this.deservedModel.healthBookletDate.startsWith("02") &&  !this.deservedModel.healthBookletDate.startsWith("0")){
        debugger
        if (Number(simpleDate) <= Number(this.deservedModel.healthBookletDate) ) {
          const date = this.getPersianDate(new Date());
          this.deservedModel.message = 'بيمه شده محترم شما در تاريخ ' + date + ' مجوز برخورداري از حمايت هاي درماني سازمان تامين اجتماعي را دارا مي باشيد';
        } else {
          this.deservedModel.message = this.deservedModel.message !==null && this.deservedModel.message!=='' && this.deservedModel.message!==undefined ? 'عدم برخورداري از مجوز استفاده از حمايت هاي درمانی - ' + this.deservedModel.message : 'عدم برخورداري از مجوز استفاده از حمايت هاي درماني';
        }
      } else {
        this.deservedModel.message = this.deservedModel.message !==null && this.deservedModel.message!=='' && this.deservedModel.message!==undefined ? 'عدم برخورداري از مجوز استفاده از حمايت هاي درمانی - ' + this.deservedModel.message : 'عدم برخورداري از مجوز استفاده از حمايت هاي درماني';
      }
    }).catch(reason => {
      this.hideOverlay(this._overlay);
      this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
    });
  }
}
