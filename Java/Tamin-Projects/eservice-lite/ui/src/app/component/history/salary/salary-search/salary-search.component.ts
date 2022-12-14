import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TaminStaticDataService} from '../../../../services/tamin-static-data.service/tamin-static-data.service';

@Component({
  selector: 'app-salary-search',
  templateUrl: './salary-search.component.html',
  styleUrls: ['./salary-search.component.css']
})
export class SalarySearchComponent implements OnInit {

  @Output() submitt = new EventEmitter<any>();
  searchForm: FormGroup;


  constructor(public formBuilder: FormBuilder, private taminStaticDataService: TaminStaticDataService) {
  }

  ngOnInit() {
    this._initializeFromGroup();
    //this.searchForm.patchValue({insuranceNumber:'0010718859', nationalCode:'4132247791'})
  }

  resetForm() {
    this.searchForm.reset();
    this.submitt.emit(this.searchForm.getRawValue());
  }

  searchFormSubmit() {
    this.submitt.emit(this.searchForm.getRawValue());
  }

  private _initializeFromGroup() {
    this.searchForm = this.formBuilder.group({
      insuranceNumber: [''],
      nationalCode: ['']
    });
  }
}
