import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataColumnViewType, SearchOperator, SearchParam, TaminDataGridConfigurationFactory, TaminFieldAutoCompleteDataGridComponent, TaminPageBaseComponent , TaminDataGridComponent,TaminValidators} from 'tamin-framework';
import {FormBuilder, FormGroup ,Validators} from '@angular/forms';
// import {TaminStaticDataService} from '../../../../../../services/tamin-static-data.service/tamin-static-data.service';

@Component({
  selector: 'app-marriage-no-presence-search',
  templateUrl: './marriage-no-presence-search.component.html',
  styleUrls: ['./marriage-no-presence-search.component.css']
})

export class MarriageNoPresenceSearchComponent implements OnInit {
  @Output() Submitt = new EventEmitter<any>();
  searchForm: FormGroup;
  searchParams: SearchParam[];


  constructor(public formBuilder: FormBuilder) {//, private taminStaticDataService: TaminStaticDataService
  }

  ngOnInit() {
    this._initializeFromGroup();
  }

  resetForm() {
    this.searchForm.reset();
    // this.Submitt.emit(this.searchForm.getRawValue());
  }

  searchFormSubmit(value) {
    if (value.nationalCode.length === 0 || value.nationalCode.length !== 10 ) {
      // this.showErrorMessageBox('پیام سیستم', 'مقدار کد ملی معتبر نمی باشد ');
      return;
    }
    debugger;
    this.Submitt.emit(value);
  }

  private _initializeFromGroup() {
    this.searchForm = this.formBuilder.group({
      nationalCode: ['', [Validators.required, TaminValidators.nationalId]]
    });
  }
}
