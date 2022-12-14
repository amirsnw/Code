import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {SearchOperator, SearchParam, TaminPageBaseComponent} from "tamin-framework";
import {FormGroup} from "@angular/forms";
import {WageAssignmentModel} from "../../../../../../models/pensioner/wageAssignment.model";
import {SubdominantInfoComponent} from "../../../../../../component/pensioner/wage-assignment/subdominant-info/subdominant-info.component";
import {ActivatedRoute} from "@angular/router";
import {Urls} from "../../../../../../settings/urls";
import {SsoSubdominantInfoComponent} from "../sso-subdominant-info/sso-subdominant-info.component";
import {WageAssignmentBranchModel} from "../../../../../../models/pensioner/wageAssignmentBranch.model";

@Component({
  selector: 'app-sso-wage-assignment-evaluate',
  templateUrl: './sso-wage-assignment-evaluate.component.html',
  styleUrls: ['./sso-wage-assignment-evaluate.component.css']
})
export class SsoWageAssignmentEvaluateComponent extends TaminPageBaseComponent {
  public viewForm: FormGroup;

  private _overlay: any;
  private searchParams: SearchParam[];
  private wageAssignmentModel: WageAssignmentModel;
  @ViewChild('subdominantComponent') subdominantComponent: SsoSubdominantInfoComponent;
  private router: ActivatedRoute;

  constructor(injector: Injector) {
    super(injector);
    this.router = injector.get(ActivatedRoute);
  }

  protected initializePage(): void {
    this.createForm();
  }

  protected loadPageData(): void {
    debugger;
    if (this.router.snapshot.params['request-id'] !== null && this.router.snapshot.params['request-id'] !== undefined) {
      this.loadData(this.router.snapshot.params['request-id']);
    } else {
      this.wageAssignmentModel = new WageAssignmentModel();
    }
  }

  private createForm() {
    debugger;
    this.viewForm = this.formBuilder.group({
      bank: [''],
      bankBranch: [''],
      installmentAmount: [''],
      installmentCount: [''],
      loanAmount: [''],
      guaranteeAmount: [''],
      pensionerId: [''],
      garanteeType: [''],
      pensionerNationalId: [''],
      userFirstName: [''],
      userLastName: [''],
    });

  }

  loadData(id) {
    this._overlay = this.showOverlay();
    const searchParams = new Array<SearchParam>();
    const searchParam = new SearchParam();
    searchParam.property = 'request.id';
    searchParam.value = id;
    searchParam.operator = SearchOperator.EQ;
    searchParams.push(searchParam);
    this.restService.getById(Urls.WAGE_ASSIGNMENT + "/request", id.toString())
      .then(value => {

        this.hideOverlay(this._overlay);
        this.wageAssignmentModel = value.data;
        this.viewForm.patchValue(this.wageAssignmentModel);
        this.viewForm.get('bank').setValue(this.wageAssignmentModel.bank.bankName);
        this.viewForm.get('garanteeType').setValue(value.data.garanteeType === '1');
        // if(value.data.garanteeType==='1'){
        //   this.viewForm.get('garanteeType').setValue(true);
        // }

        this.subdominantComponent.subForm.patchValue(this.wageAssignmentModel);

      })
      .catch(error => {
        this.hideOverlay(this._overlay);
        // this.modalError.show('خطا', 'امکان برقراری ارتباط با سرویس دهنده مرکزی وجود ندارد');
      });
  }

  Confirm() {

    this.searchParams = [];


    this.searchParams.push({
      property: 'pensionerId',
      value: this.wageAssignmentModel.pensionerId,
      operator: SearchOperator.EQ

    });


    this.searchParams.push({
      property: 'pensionerNationalId',
      value: this.wageAssignmentModel.pensionerNationalId,
      operator: SearchOperator.EQ

    });
    this._overlay = this.showOverlay();
    this.restService.getAll(Urls.SSO_WAGE_ASSIGNMENT_OLD, this.searchParams).then(data => {
      this.hideOverlay(this._overlay);
      if (data.data.total > 0) {
        this.calculate();
      } else {
        this.showQuestionBox('پیام سیستم', "آیا مستمری بگیر سوابق صدور گواهی کسر اقساط پیش از مکانیزه دارد؟", () => {
          this.redirectTo('/sso/wage-assignment');
        }, () => {
          const jsondata = new WageAssignmentBranchModel();
          jsondata.guaranteeAmount = 0;
          jsondata.installmentCount = 0;
          jsondata.installmentAmount = 0;
          jsondata.loanAmount = 0;
          jsondata.requestDate = new Date();
          jsondata.pensionerId = this.wageAssignmentModel.pensionerId;
          jsondata.pensionerNationalId = this.wageAssignmentModel.pensionerNationalId;
          jsondata.id = null;
          jsondata.garanteeType = '0';
          jsondata.nationalId = this.wageAssignmentModel.pensionerNationalId;

          this.restService.create(Urls.SSO_WAGE_ASSIGNMENT_OLD, jsondata)
            .then(resulttt => {
              this.calculate();
            }).catch(reason => {

          })

        })
      }
    }).catch(reason => {
      this.hideOverlay(this._overlay);
    })

  }

  calculate() {
    console.log('calculate');

    const jsondata = new WageAssignmentModel();
    jsondata.id = this.wageAssignmentModel.id;

    this.restService.update(Urls.SSO_WAGE_ASSIGNMENT + '/confirm', this.wageAssignmentModel.id.toString(), jsondata)
      .then(resulttt => {
        this.showInfoMessageBox('پیام سیستم', 'درخواست با موفقیت تایید شد.', () => {
          this.redirectTo('/sso/request');
        });
      }).catch(reason => {

    })


  }
}
