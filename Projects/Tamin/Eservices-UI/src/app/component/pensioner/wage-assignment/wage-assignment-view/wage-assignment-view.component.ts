import {Component, Injector, ViewChild} from '@angular/core';
import {
  SearchOperator, SearchParam,
  TaminPageBaseComponent
} from "tamin-framework";
import {FormGroup} from "@angular/forms";
import {Urls} from "../../../../settings/urls";
import {WageAssignmentModel} from "../../../../models/pensioner/wageAssignment.model";
import {SubdominantInfoComponent} from "../subdominant-info/subdominant-info.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-wage-assignment-view',
  templateUrl: './wage-assignment-view.component.html',
  styleUrls: ['./wage-assignment-view.component.css']
})
export class WageAssignmentViewComponent extends TaminPageBaseComponent {
  public viewForm: FormGroup;

  private _overlay: any;
  private searchParams: SearchParam[];
  private wageAssignmentModel: WageAssignmentModel;
  @ViewChild('subdominantComponent') subdominantComponent: SubdominantInfoComponent;
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
}
