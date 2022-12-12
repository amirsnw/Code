import {Component, EventEmitter, Injector, OnInit, Output} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {SearchParam, TaminPageBaseComponent} from 'tamin-framework';
import {TaminStaticDataService} from '../../../../services/tamin-static-data.service/tamin-static-data.service';
import {Urls} from '../../../../settings/urls';

@Component({
  selector: 'app-pension-account-search',
  templateUrl: './pension-account-search.component.html',
  styleUrls: ['./pension-account-search.component.css']
})
export class PensionAccountSearchComponent extends TaminPageBaseComponent {

  @Output() afterSubmit = new EventEmitter<any>();
  @Output() afterClear = new EventEmitter<any>();

  searchForm: FormGroup;
  pensionerIds = [];
  searchParams: SearchParam[];
  isWrite = true;
  pensionerList = [];
  constructor(injector: Injector, private taminStaticDataService: TaminStaticDataService) {
    super(injector);
  }

  setPensionerIds(ids) {
    this.pensionerIds = ids;
  }

  initializePage() {
    this.searchForm = this.formBuilder.group({
      pensionerId: ['', [Validators.required]]
    });
    this._initializePensioner();
  }

  searchFormSubmit() {
    if (!this.searchForm.valid) {
      this.markFormGroupAsTouched(this.searchForm);
      return;
    }


    const data = {
      pensionerId: this.searchForm.value['pensionerId'],
    };


    this.afterSubmit.emit(data);
  }
  private _initializePensioner() {
    this.restService.getAll(Urls.PENSIONER_NO).then(result => {
      (<Array<any>>result.data.list).forEach(value => {
        this.pensionerList.push({
          name: this.getPersianNumber(value.pensionerId),
          value: value.pensionerId

        });
      });
      if (this.pensionerList.length > 0) {
        this.searchForm.get('pensionerId').setValue(this.pensionerList[0].value);
        this.isWrite = false;
      }

    })
      .catch(reason => {

      });

  }
  wirteClick(){
    this.isWrite=true;
  }
  selectClick(){
    this.isWrite=false;
  }
}
