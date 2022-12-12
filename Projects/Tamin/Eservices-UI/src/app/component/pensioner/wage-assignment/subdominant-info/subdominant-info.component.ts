import {Component, OnInit} from '@angular/core';
import {TaminPageBaseComponent, TaminValidators} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-subdominant-info',
  templateUrl: './subdominant-info.component.html',
  styleUrls: ['./subdominant-info.component.css']
})
export class SubdominantInfoComponent extends TaminPageBaseComponent {
  public subForm: FormGroup;

  protected initializePage(): void {
    this.createForm();
  }

  private createForm() {
    this.subForm = this.formBuilder.group({
      nationalId: ['', TaminValidators.nationalId],
      birthDate: [''],
      firstName: [''],
      lastName: ['']
    });
  }

}
