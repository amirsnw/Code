import { Component, OnInit } from '@angular/core';
import {SearchOperator, SearchParam, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup} from '@angular/forms';
import {Urls} from '../../../../../settings/urls';

@Component({
  selector: 'app-sso-pension-final-result',
  templateUrl: './sso-pension-final-result.component.html',
  styleUrls: ['./sso-pension-final-result.component.css']
})
export class SsoPensionFinalResultComponent extends TaminPageBaseComponent {

  public finalResultForm: FormGroup;
  private _overlay: any;

  protected initializePage(): void {
    this.createForm();
  }

  private createForm() {
    this.finalResultForm = this.formBuilder.group({
      finalResult: [''],
    });

  }
  loadData(id) {
    this._overlay = this.showOverlay();
    const searchParams = new Array<SearchParam>();
    const searchParam = new SearchParam();
    searchParam.property = 'request.id';
    searchParam.value = id;
    searchParam.operator = SearchOperator.EQ;
    searchParams.push(searchParam);
    // this.restService.getById(Urls.PENSION_REQUEST , id.toString())
    this.restService.getAll(Urls.PENSION_REQUEST , searchParams)
      .then(value => {
        this.hideOverlay(this._overlay);
        // this.pensionRequestModel = value.data.list[0];
        // this.viewForm.patchValue(this.pensionRequestModel);
        // this.viewForm.get('gender').setValue(this.pensionRequestModel.gender === '01' ?  'مرد' : 'زن');
      })
      .catch(error => {
        this.hideOverlay(this._overlay);
      });
  }
}
