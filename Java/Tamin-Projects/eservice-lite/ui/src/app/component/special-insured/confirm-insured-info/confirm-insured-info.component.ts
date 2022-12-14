import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {TaminPageBaseComponent} from 'tamin-framework';

declare var alertify: any;

@Component({
  selector: 'app-confirm-insured-info',
  templateUrl: './confirm-insured-info.component.html',
  styleUrls: ['./confirm-insured-info.component.css']
})

export class ConfirmInsuredInfoComponent extends TaminPageBaseComponent {
  viewForm: FormGroup;
  @ViewChild('theForm') theForm: ElementRef;
  @Output() ClearForm = new EventEmitter<any>();
  public continueBtnDisabled: boolean;
  public editInfoBtnDisabled: boolean;

  initializePage() {
    this.continueBtnDisabled = true;
    this.editInfoBtnDisabled = true;
    this.viewForm = this.formBuilder.group({
      checkInfo: ['', Validators.required]
    });
  }

  resetForm() {
    this.continueBtnDisabled = true;
    this.editInfoBtnDisabled = true;
    this.viewForm.reset();
    this.ClearForm.emit();
    this.redirectTo('/');
  }

  onCheckInfoClick() {
    this.continueBtnDisabled = true;
    this.editInfoBtnDisabled = false;
  }

  onConfirmInfoClick() {
    this.continueBtnDisabled = false;
    this.editInfoBtnDisabled = true;
  }

  redirectToRegistrationPage() {
    alertify.alert('در حال حاضر امکان اصلاح اطلاعات نامنویسی به صورت غیر حضوری وجود ندارد، لطفا به شعبه مربوطه مراجعه فرمایید.');
  }

  redirectToContractPage() {
    this.redirectTo('/optional-insurance/contract');
  }
}
