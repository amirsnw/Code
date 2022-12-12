import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {SearchOperator, SearchParam, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup, Validators} from '@angular/forms';
import {PensionRequestModel} from '../../../../models/pensioner/pensionRequest.model';
import {ActivatedRoute} from '@angular/router';
import {Urls} from '../../../../settings/urls';


@Component({
  selector: 'app-pension-request-view',
  templateUrl: './pension-request-view.component.html',
  styleUrls: ['./pension-request-view.component.css']
})
export class PensionRequestViewComponent extends TaminPageBaseComponent {
  public viewForm: FormGroup;
  private _overlay: any;
  private searchParams: SearchParam[];
  private pensionRequestModel: PensionRequestModel;
  private router: ActivatedRoute;

  constructor(injector: Injector) {
    super(injector);
    this.router = injector.get(ActivatedRoute);
  }

  protected initializePage(): void {
    this.createForm();
  }

  protected loadPageData(): void {
    if (this.router.snapshot.params['request-id'] !== null && this.router.snapshot.params['request-id'] !== undefined) {
      this.loadData(this.router.snapshot.params['request-id']);
    } else {
      this.pensionRequestModel = new PensionRequestModel();
    }
  }

  private createForm() {
    this.viewForm = this.formBuilder.group({
      nationalCode: [''],
      mobileNumber: [''],
      phoneNumber: [''],
      issuePlace: [''],
      insuranceNumber: [''],
      firstName: [''],
      lastName: [''],
      birthDate: [''],
      fatherName: [''],
      address: [''],
      idNumber: [''],
      workshopName: [''],
      workshopCode: [''],
      managerName: [''],
      activityType: [''],
      workshopAddress: [''],
      // province: [''],
      // city: [''],
      // branch: [''],
      gender: [''],
      age: ['']
    });

  }

  loadData(id) {
    debugger;
    this._overlay = this.showOverlay();
    const searchParams = new Array<SearchParam>();
    const searchParam = new SearchParam();
    searchParam.property = 'request.id';
    searchParam.value = id;
    searchParam.operator = SearchOperator.EQ;
    searchParams.push(searchParam);
    this.restService.getAll(Urls.PENSION_REQUEST , searchParams)
      .then(value => {
        this.hideOverlay(this._overlay);
        this.pensionRequestModel = value.data.list[0];
        this.viewForm.patchValue(this.pensionRequestModel);
        this.viewForm.get('gender').setValue(this.pensionRequestModel.gender === '01' ?  'مرد' : 'زن');
      })
      .catch(error => {
        this.hideOverlay(this._overlay);
      });
  }  onReportForm() {
    this._overlay = this.showOverlay();
    this.restService

      .getBlob(Urls.PENSION_REQUESTReport + '/' + this.pensionRequestModel.id )
      .then(result => {
        this.hideOverlay(this._overlay);
        const a = document.createElement('a'),
          url = URL.createObjectURL(result);
        a.href = url;
        a.download = 'pension_request_' + this.getPersianDate(new Date()) + '.pdf';
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 0);
      })
      .catch(reason => {
        this.hideOverlay(this._overlay);
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
  }

}
