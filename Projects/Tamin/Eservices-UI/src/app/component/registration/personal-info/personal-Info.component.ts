import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Urls } from '../../../settings/urls';
import { Router } from '@angular/router';
import { GenericRestService, TaminPersianService, SearchParam, SearchOperator } from 'tamin-framework';
import { PersonalModel } from '../../../models/registration/personal.model';
import { TaminValidators } from 'tamin-framework/lib/validators/tamin-validators';

@Component({
  selector: 'app-personal',
  templateUrl: './personal-Info.component.html',
  styleUrls: ['./personal-Info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  @Input() showType: string; // full | compact

  public restUrlPersonal;
  formpersonal: FormGroup;
  public operators;
  public genders;
  private searchParams: SearchParam[];
  private searchParams1: SearchParam[];

  public personalModel: PersonalModel;

  public countriesSearchParams: any[] = [];


  constructor(private genericRestServiceLocal: GenericRestService<any>,
    private route: ActivatedRoute, public fb: FormBuilder,
    public persianService: TaminPersianService,
    private router: Router) {
    this.restUrlPersonal = Urls.personal;

    this.formpersonal = this.fb.group({
      nationalCode: [{ value: '', disabled: false }, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    });
  }

  ngOnInit() {
    // this.genericRestServiceLocal.getById(values.nationalCode)
    // .then(resulttt => {
    //     this.personalModel = resulttt.data as PersonalModel;
    // })
    //   .catch(result=>{
    //     // if(result.error.data!=null)
    //     // alert(result.error.data.cause);
    //     // else
    //     alert("این کد ملی وجود ندارد !");
    //   })
    this.genericRestServiceLocal.restUrl = this.restUrlPersonal;
    this.genericRestServiceLocal.getAll([], [])
      // this.taminSecurityService.getCurrentUser()
      .then(data => {
        this.personalModel = data.data as PersonalModel;
        this.personalModel.gender = data.data.gender === '01' ? 'مرد' : 'زن';
        this.personalModel.dateOfBirth = this.persianService.getPersianDate(new Date(data.data.dateOfBirth));
        this.personalModel.countryId = data.data.countryId === '0001' ? 'ایران' : '';
        this.personalModel.nation = 'ایرانی';
        // ---------------------------
        this.genericRestServiceLocal.restUrl = Urls.cities;
        this.searchParams = new Array<SearchParam>();
        const searchParam = new SearchParam();
        searchParam.property = 'cityCode';
        searchParam.operator = SearchOperator.EQUAL;
        searchParam.value = data.data.cityOfBirthId;
        this.searchParams.push(searchParam);
        this.genericRestServiceLocal.getPagedEntity(false, 1, 10, this.searchParams, [])
          .then(value => {
            this.personalModel.cityOfBirthName = value.data.list[0].cityName;
          });
        // ------------------------
        this.searchParams1 = new Array<SearchParam>();
        searchParam.value = data.data.cityOfIssueId;
        this.searchParams1.push(searchParam);
        this.genericRestServiceLocal.getPagedEntity(false, 1, 10, this.searchParams1, [])
          .then(value => {
            this.personalModel.cityOfIssueName = value.data.list[0].cityName;
          });
        // ------------------------
      }).catch(error => {

      });

  }

  confirmStepOneClick(values, valid) {
    this.genericRestServiceLocal.restUrl = this.restUrlPersonal;
    // this.genericRestServiceLocal.getById(values.nationalCode)
    // .then(resulttt => {
    //     this.personalModel = resulttt.data as PersonalModel;
    // })
    //   .catch(result=>{
    //     // if(result.error.data!=null)
    //     // alert(result.error.data.cause);
    //     // else
    //     alert("این کد ملی وجود ندارد !");
    //   })
    this.genericRestServiceLocal.restUrl = this.restUrlPersonal;
    this.genericRestServiceLocal.getAll([], [])
      // this.taminSecurityService.getCurrentUser()
      .then(data => {

        this.personalModel = data.data as PersonalModel;
      }).catch(error => {

      });

  }

  returnButtonClick() {
    this.router.navigateByUrl('/main');
  }

}
