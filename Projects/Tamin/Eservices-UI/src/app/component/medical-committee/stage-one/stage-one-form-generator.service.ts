import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class StageOneFormGeneratorService {

  constructor(private formBuilder: FormBuilder) { }

  public getFormOne(type: number): FormGroup {
    const formOne = this.formBuilder.group({
      commRelationTypeCode: ['', [Validators.required]],
      commNationalCode: ['', [Validators.required, Validators.pattern('^[۰۱۲۳۴۵۶۷۸۹0-9]{10}$')]],
      commBirthDate: ['', [Validators.required]],
      insuranceNumber: ['', Validators.required],
      commFirstName: ['', Validators.required],
      commLastName: ['', Validators.required],
      commFatherName: ['', Validators.required],
      commIdNumber: ['', Validators.required],
      commExpCityCode: ['', Validators.required],
      commExpCityName: ['', ],
      commExpCityCodeCombo: ['', ],
      isuTypeCode: ['', Validators.required],
      isuTypeDesc: ['', /*Validators.required*/],
      branchCode: ['', Validators.required],
      branchName: ['', Validators.required],
      isuCityCode: ['', Validators.required],
      isuCityName: ['', Validators.required],
      commInsuredTypeCode: ['', Validators.required],
      dependencyTypeCode: ['', Validators.required],
      isuStatusTypeCode: ['', Validators.required],
      isuStatusTypeDesc: ['', Validators.required]
    });
    if (type > 1) {
      formOne.addControl('pensionerCode', this.formBuilder.control('', Validators.required));
    }
    if (type > 2) {
      formOne.addControl('deadDate', this.formBuilder.control('', Validators.required));
      formOne.addControl('nationalCode', this.formBuilder.control('',
        [Validators.required, Validators.pattern('^[۰۱۲۳۴۵۶۷۸۹0-9]{10}$')]));
      formOne.addControl('guardianNationalCode', this.formBuilder.control('',
        [Validators.required, Validators.pattern('^[۰۱۲۳۴۵۶۷۸۹0-9]{10}$')]));
    }
    return formOne;
  }

  public getFormTwo(): FormGroup {
    return this.formBuilder.group({
      commResidenceProvinceCode: ['', [Validators.required]],
      commResidenceCityCode: ['', [Validators.required]],
      commTelephoneNumber: ['', [Validators.pattern('^[۰۱۲۳۴۵۶۷۸۹0-9]{8,11}$')]],
      commMobileNumber: ['', [Validators.required, Validators.pattern('^[۰۱۲۳۴۵۶۷۸۹0-9]{11}$')]],
      commAddress: ['', [Validators.required]],
      commPostalCode: ['', [Validators.maxLength(10), Validators.minLength(10)]]
    });
  }

  public getFormThree(): FormGroup {
    return this.formBuilder.group({
      commMarriageStatus: ['', Validators.required],
      commGender: ['', Validators.required],
      commNationality: ['', Validators.required],
    });
  }

  public getFormFour(type: number): FormGroup {
    const formFour = this.formBuilder.group({
      demandTypeCode: ['', Validators.required],
      referTypeCode: ['01', Validators.required],
    });

    if (type === 1) {
      formFour.addControl('noDarmanCheck', this.formBuilder.control(false, Validators.required));
      formFour.addControl('financialWealthCheck', this.formBuilder.control(false, Validators.required));
    }
    return formFour;
  }

  public getFormFive(): FormGroup {
    return this.formBuilder.group({
      lastJobCode: ['', ],
      lastJobDesc: ['', Validators.required],
      jobHistoryDesc: ['', ],
    });
  }
}
