import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class OccureFormGeneratorService {

  constructor(private formBuilder: FormBuilder) { }

  public getFormOne(type: number): FormGroup {
    const formOne = this.formBuilder.group({
      pNationalCode: ['', [Validators.required, Validators.pattern('^[۰۱۲۳۴۵۶۷۸۹0-9]{10}$')]],
      pFirstName: ['', [Validators.required, Validators.pattern('^[\u0600-\u06FF\\s]+$')]],
      pLastName: ['', [Validators.required, Validators.pattern('^[\u0600-\u06FF\\s]+$')]],
      nationCode: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      gender: ['', Validators.required],
      genderDesc: ['', Validators.required],
      marriageStatusCode: ['', Validators.required],
      jobDesc: ['', Validators.required],
      reportJobLocation: ['', Validators.required],
      branchCode: ['', Validators.required],
      branchName: ['', Validators.required],
      reportAddress: ['', Validators.required],
      reportTelephone: ['', [Validators.required, Validators.pattern('^[۰۱۲۳۴۵۶۷۸۹0-9]{8,11}$')]],
      reportPostalCode: ['', [Validators.pattern('^[۰۱۲۳۴۵۶۷۸۹0-9]{10}$')]],
      insuranceId: ['', ],
      employeeDate: ['', Validators.required],
      isuTypecode: ['', Validators.required],
      isuTypeDesc: ['', Validators.required],
      vehicle: ['', Validators.required],
      rwworkstart: ['', Validators.required],
      rwworkfinish: ['', Validators.required],
    });
   return formOne;
  }

  public getFormTwo(): FormGroup {
   return this.formBuilder.group({
     workshopCode: ['', [Validators.required, Validators.pattern('^[۰۱۲۳۴۵۶۷۸۹0-9]{10}$')]],
     workshopBranchCode: ['', [Validators.required, Validators.pattern('^[۰۱۲۳۴۵۶۷۸۹0-9]{4}$')]],
     workshopName: ['', [Validators.required, Validators.pattern('^[\u0600-\u06FF\\s]+$')]],
     bossFullName: ['', [Validators.required, Validators.pattern('^[\u0600-\u06FF\\s]+$')]],
     bossMobileNumber: ['', [Validators.required, Validators.pattern('^[۰۱۲۳۴۵۶۷۸۹0-9]{11}$')]],
     workshopAddress: ['', Validators.required],
     workshopTelephone: ['', [Validators.required, Validators.pattern('^[۰۱۲۳۴۵۶۷۸۹0-9]{8,11}$')]],
     workshopPostalCode: ['', [Validators.required, Validators.pattern('^[۰۱۲۳۴۵۶۷۸۹0-9]{10}$')]],
    });
  }

  public getFormThree(): FormGroup {
    return this.formBuilder.group({
      occurrenceDate: ['', Validators.required],
      occurrenceTime: ['', Validators.required],
      occurrenceAddress: ['', Validators.required],
      occurrenceResult: ['', Validators.required],
      occurrenceDesc: ['', Validators.required],
      occurDocumentType: ['', ],
    });
  }
}
