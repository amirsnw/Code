import { Component, OnInit } from '@angular/core';
import {TaminPageBaseComponent} from "tamin-framework";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-sso-subdominant-info',
  templateUrl: './sso-subdominant-info.component.html',
  styleUrls: ['./sso-subdominant-info.component.css']
})
export class SsoSubdominantInfoComponent extends TaminPageBaseComponent {
  public subForm: FormGroup;

  protected initializePage(): void {
    debugger;
    this.createForm();
  }

  private createForm() {
    this.subForm = this.formBuilder.group({
      nationalId: [''],
      birthDate: [''],
      firstName: [''],
      lastName: ['']
    });
  }

}
