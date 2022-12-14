import { Component, EventEmitter, Output, ViewChild, Input } from '@angular/core';
import { TaminPageBaseComponent, TaminFieldAutoCompleteDataGridComponent, TaminDataGridConfigurationFactory, DataColumnViewType, SearchParam, SearchOperator, TaminFieldComboBoxStaticComponent, TaminImageGalleryManagedComponent, ImageModelManaged, TaminPersianService } from 'tamin-framework';
import { Urls } from '../../../settings/urls';
import { FormGroup, Validators } from '@angular/forms';
import { StpUrls } from '../../../modules/stp/stp-urls';
import { PersonalModel } from 'src/app/models/registration/personal.model';
import { Subscription } from 'rxjs';

declare var alertify: any;

@Component({
  selector: 'app-freelance-location',
  templateUrl: './freelance-location.component.html',
  styleUrls: ['./freelance-location.component.css']
})

export class FreelanceLocationComponent extends TaminPageBaseComponent {
  @Input() contractSelected: any;
  @Input() isFraction :false;
  @ViewChild('province') province: TaminFieldAutoCompleteDataGridComponent;
  @ViewChild('city') city: TaminFieldComboBoxStaticComponent;
  @Output() provinceValue = new EventEmitter<any>();
  @Output() cityValue = new EventEmitter<any>();
  @Output() branchValue = new EventEmitter<any>();
  private persianService: TaminPersianService;
  private _subscription = new Subscription();
  public viewForm: FormGroup;
  public alldisabled = false;
  public searchWorkshopParams: SearchParam[];
  public isPayment = false;
  public buttonDesabled = false;
  public paymentTabayi: any;
  branchQuatos = [];
  public cities = [];
  public branchCodes = [];
  public provinces = [];
  initializePage() {
    this._initializeProvince();
    this.viewForm = this.formBuilder.group({
      city: ['', [Validators.required]],
      province: ['', [Validators.required]],
      branchCode: ['', [Validators.required]],
      provincdis: ['', [Validators.required]],
      citydis: ['', [Validators.required]],
      branchCodedis: ['', [Validators.required]]
    });

      this._subscription.add(this.viewForm.get('province').valueChanges.subscribe(value => {
        if (value) {
          this.provinceValue.emit(value);
          this.getCities(value)
            .then(val => {
              const data = [];
              (val.data.list as Array<any>).forEach(item => {
                data.push(
                  {
                    name: item.cityName,
                    value: item.cityCode
                  });
              });
              this.cities = data;
            })
            .catch(reason => {
              this.cities = [];
            });
        } else {
          this.cities = [];
          this.viewForm.get('city').setValue('');
          this.viewForm.get('branchCode').setValue('');
        }
      }));

      this._subscription.add(this.viewForm.get('city').valueChanges.subscribe(value => {
        if (value) {
          this.cityValue.emit(value);
          this.getBranches(value)
            .then(val => {
              const data = [];
              (val.data.list as Array<any>).forEach(item => {
                data.push(
                  {
                    name: `${item.name} ${'-'} ${item.branchAddress !== null ? item.branchAddress : ''}`,
                    value: item.code
                  });
              });
              this.branchCodes = data;
            })
            .catch(reason => {
              this.branchCodes = [];
            });
        } else {
          this.branchCodes = [];
        }
        this.viewForm.get('branchCode').setValue('');
      }));

      this._subscription.add(this.viewForm.get('branchCode').valueChanges.subscribe(val => {
        if (val) {
          this.branchValue.emit(val);
          // this.getBranchQuatos(val)
          //   .then(value => {
          //     const data = [];
          //     (value.data.list as Array<any>).forEach(item => {
          //       data.push(
          //         {
          //           name: `${this.persianService.getPersianDate(new Date(item.quotaDate))} (${this.persianService.getPersianDayOfWeek(new Date(item.quotaDate))}) (ظرفیت: ${item.quota})`,
          //           value: item.quotaDate
          //         });
          //     });
          //     this.branchQuatos = data;
          //   })
          //   .catch(reason => {
          //     this.branchQuatos = [];
          //   });
        } else {
          this.branchQuatos = [];
        }
      }));
  }

  setSes(key: string, value: any): void {
    const data = value === undefined ? null : JSON.stringify(value);
    window.sessionStorage.setItem(key, data);
  }

  getSes(key: string): any {
    const data = window.sessionStorage.getItem(key);
    return JSON.parse(data);
  }

  private _initializeProvince() {
    this.province.valueField = 'provinceCode';
    this.province.displayField = 'provinceName';
    this.province.searchPattern = '*{term}*%';
    const searchParam = new SearchParam();
    searchParam.value = '1';
    searchParam.operator = SearchOperator.EQ;
    searchParam.property = 'operation';
    this.province.dataGridConfiguration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .addUrl(Urls.provinces)
      .setShowPager(true)
      .setFirstLoad(false)
      .setId('provinceCode')
      .addVisibleColumn({ columnName: 'provinceCode', columnCaption: 'کد', columnViewType: 'Label' })
      .addVisibleColumn({ columnName: 'provinceName', columnCaption: 'نام', columnViewType: 'Label' })
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setShowFooter(false)
      .setShowPager(true)
      .setViewType('GridView')
      .addSearchParam(searchParam)
      .getData();
  }


  private getBranches(cityCode): Promise<any> {
    return new Promise((resolve, reject) => {
      const searchParam = new SearchParam();
      searchParam.value = cityCode;
      searchParam.operator = SearchOperator.EQ;
      searchParam.property = 'cityCode';


      this.restService.getPage(Urls.specialInsuranceCityBranches, 1, 100, [searchParam])
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  private getCities(code): Promise<any> {
    return new Promise((resolve, reject) => {
      const searchParam = new SearchParam();
      searchParam.value = code;
      searchParam.operator = SearchOperator.EQ;
      searchParam.property = 'provincecode';

      this.restService.getPage(Urls.specialInsuranceCities, 1, 100, [searchParam])
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

}
