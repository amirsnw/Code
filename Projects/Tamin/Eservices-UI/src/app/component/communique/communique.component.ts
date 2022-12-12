import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-communique',
  templateUrl: './communique.component.html',
  styleUrls: ['./communique.component.css']
})
export class CommuniqueComponent implements OnInit {

  searchForm: FormGroup;

  constructor(public formBuilder: FormBuilder) {
  }

  ngOnInit() {
  }


  searchFormSubmit() {
  }

  resetForm() {
  }

  private _initializeSearchGroup() {
    this.searchForm = this.formBuilder.group({
      test: ['']
    });
  }
}
