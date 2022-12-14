import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {DataColumnViewType, TaminDataGridComponent, TaminDataGridConfigurationFactory, TaminPageBaseComponent} from 'tamin-framework';
import {ActivatedRoute} from '@angular/router';
import {FacUrls} from '../../fac-urls';
import {Urls} from '../../../../settings/urls';
import {AloReqDetWorkshopAddress} from '../../models/alo-req-det-workshop-address';
import {Branch} from '../../models/branch';
import {City} from '../../models/baseinfo/city';
import {Province} from '../../models/baseinfo/province';
import {AloRequest} from '../../models/alo-request';

@Component({
  selector: 'app-info-sub-workshop',
  templateUrl: './info-sub-workshop.component.html',
  styleUrls: ['./info-sub-workshop.component.css']
})
export class InfoSubWorkshopComponent extends TaminPageBaseComponent {

  @ViewChild('gridDetWorkshopAddress') gridDetWorkshopAddress: TaminDataGridComponent;
  @ViewChild('gridDetDafaterAddress') gridDetDafaterAddress: TaminDataGridComponent;
  private requestId: any;
  private editMode: any;
  private _overlay: any;
  private aloRefineId: any;
   setDisableDafaterAddress: any;
  private overlay: any;

  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);
  }

  protected initializePage(): void {
    this.requestId = this.route.snapshot.params['requestId'];
    this._initializeDataGridWorkshopAddress();
    debugger;
    this._initializeDataGridDafaterAddress();
    this.setDisableDafaterAdd();

  }

  private _initializeDataGridWorkshopAddress() {
    debugger;
    const theUrl = `${FacUrls.WORKSHOP_ADDREES}/${this.requestId}`;
    this.gridDetWorkshopAddress.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setFirstLoad(true)
      .addUrl(theUrl)
      // .addVisibleColumn({columnCaption: 'ردیف', columnViewType: DataColumnViewType.})
      .addVisibleColumn({columnName: 'legalResidence', columnCaption: 'اقامتگاه قانونی ', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'name', columnCaption: 'عنوان', columnViewType: DataColumnViewType.Custom, columnTranslator: this.gridCellServiceName})
      .addVisibleColumn({columnName: 'workshopId', columnCaption: 'شماره کارگاه', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'workshopAddressDesc', columnCaption: 'آدرس ', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'codePosti', columnCaption: 'کد پستی ', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'faxNo', columnCaption: 'شماره فکس', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'email', columnCaption: 'ایمیل', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'locationId', columnCaption: 'محل نگهداری دفاتر ', columnViewType: 'Label'})
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setActionColumnCaption('عملیات')
      .addActionColumn({
        columnName: 'editModir',
        columnCaption: 'ویرایش',
        columnViewType: 'Button',
        icon: '',
        columnIconUrl: '',
        columnActionName: 'editModir',
        isActionAuthorized: false,
        visible: true,
        enable: true

      })
      .addActionColumn({
        columnName: 'deleteModir',
        columnCaption: 'حذف',
        columnViewType: 'Button',
        icon: '',
        columnIconUrl: '',
        columnActionName: 'deleteModir',
        isActionAuthorized: false,
        visible: true,
        enable: true

      })
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(true)
      .setShowFooter(false)
      .setShowPager(true)
      .setViewType('GridView')
      .setFirstLoad(true)
      .getData();

    this.gridDetWorkshopAddress.cellRenderer = (item, column) => {
      // if (column.columnName === 'startDate' && item.startDate && item.startDate.length === 6) {
      //   const tmp = item.startDate.substr(0, 4) + '/' + item.startDate.substr(4, 2);
      //   return {handled: true, data: tmp};
      // }
      // item.aloRefineId;
      return {handled: false, data: ''};
    };
    this.gridDetWorkshopAddress.actionRenderer = (item, actionCells) => {
      const result = [];
      result.push(actionCells.find(c => c.columnActionName === 'editModir'));
      result.push(actionCells.find(c => c.columnActionName === 'deleteModir'));
      return result;
    };
  }

  private _initializeDataGridDafaterAddress() {
    debugger;
    const theUrl = `${FacUrls.SIG_OWNER}/${this.requestId}`;
    this.gridDetDafaterAddress.configuration = (new TaminDataGridConfigurationFactory())
      .clearActionColumns()
      .clearSearchParams()
      .clearSortParams()
      .clearVisibleColumns()
      .setFirstLoad(true)
      .addUrl(theUrl)
      .addVisibleColumn({columnName: 'docLocationAddress', columnCaption: 'آدرس محل نگهداری دفاتر', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'codePosti', columnCaption: 'کد پستی ', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'province', columnCaption: 'استان', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'city', columnCaption: 'شهر', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'workshopAddressPhone1', columnCaption: 'تلفن', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'refineNationalId', columnCaption: 'کد ملی مدیر تصفیه ', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'refineName', columnCaption: 'نام مدیر تصفیه', columnViewType: 'Label'})
      .addVisibleColumn({columnName: 'refineLastName', columnCaption: 'نام خانوادگی مدیر تصفیه', columnViewType: 'Label'})
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(false)
      .setActionColumnCaption('عملیات')
      .addActionColumn({
        columnName: 'edit',
        columnCaption: 'ویرایش',
        columnViewType: 'Button',
        icon: '',
        columnIconUrl: '',
        columnActionName: 'edit',
        isActionAuthorized: false,
        visible: true,
        enable: true

      })
      .addActionColumn({
        columnName: 'delete',
        columnCaption: 'حذف',
        columnViewType: 'Button',
        icon: '',
        columnIconUrl: '',
        columnActionName: 'delete',
        isActionAuthorized: false,
        visible: true,
        enable: true

      })
      .setPagerCurrentPage(1)
      .setPagerSize(10)
      .setRowDeletable(false)
      .setRowEditable(false)
      .setShowActionColumn(true)
      .setShowFooter(false)
      .setShowPager(true)
      .setViewType('GridView')
      .setFirstLoad(true)
      .getData();

    this.gridDetDafaterAddress.actionRenderer = (item, actionCells) => {
      const result = [];
      result.push(actionCells.find(c => c.columnActionName === 'edit'));
      result.push(actionCells.find(c => c.columnActionName === 'delete'));
      return result;
    };
    this.gridDetDafaterAddress.cellRenderer = (item, column) => {
      return {handled: false, data: ''};
    };
  }

  gridCellServiceName(item) {
    switch (item) {
      case '1':
        return 'دفتر مرکزي(اقامتگاه قانونی)';
      case '2':
        return 'کارخانه';
      case '3':
        return 'نمایندگی';
      case '4':
        return 'انبار';
      case '5':
        return 'فروشگاه';
      case '6':
        return 'دفتر اداری';

    }
  }

  gridCellServiceMovazaf(item) {
    switch (item) {
      case '1':
        return 'موظف';
      case '2':
        return 'غیر موظف';
      case '0':
        return 'نامشخص';

    }
  }

  gridCellServiceNationality(item) {
    debugger;
    switch (item) {
      case '1':
        return 'ایرانی';
      case '2':
        return 'تبعه خارجی';
      case '0':
        return 'نامشخص';

    }
  }

  onNewWorkshopAddress() {
    debugger;
    this.editMode = '0';
    this.redirectTo('/fac/newInfoSubWorkshop/' + this.editMode + '/' + this.requestId);
  }

  onNewDafaterAddress() {
    debugger;
    this.editMode = '0';
    this.redirectTo('/fac/newInfoSubWorkshop/' + this.editMode + '/' + this.requestId);
  }

  onAction(param: any) {
    debugger;
    const actionName = param.actionColumn.columnActionName;
    switch (actionName) {
      case 'editModir':
        this.editMode = '1';
        this.redirectTo('/fac/newInfoSubWorkshop/' + this.editMode + '/' + this.requestId);
        break;
      case 'deleteModir':
        this.delete(param.item.detStackholdersId.toString());
        break;
    }
  }

  onEdit(param: any) {
    debugger;
    const actionName = param.actionColumn.columnActionName;
    switch (actionName) {
      case 'edit':
        this.editMode = '1';
        this.redirectTo('/fac/newInfoSubWorkshop/' + this.editMode + '/' + this.requestId);
        break;
      case 'delete':
        this.delete(param.item.detStackholdersId.toString());
        break;
    }
  }

  delete(id) {
    this.showQuestionBox('پیام سیستم', 'آیا از حذف اطلاعات اطمینان دارید؟', () => {
      this._overlay = this.showOverlay();
      this.restService.delete(FacUrls.SIG_OWNER_DELETE, id)
        .then(value => {
          this.hideOverlay(this._overlay);
          // this.theModal.hide();
          this.changeDetectorRef.detectChanges();
          this.showInfoMessageBox('پیام سیستم', 'حذف با موفقیت انجام شد.', () => {
            this.gridDetDafaterAddress.refreshData();
          });
        })
        .catch(reason => {
          this.hideOverlay(this._overlay);
          this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
        });
    }, () => {
    });
  }

  back() {
    this.redirectTo('/fac/portal-forms/' + this.requestId);
  }

  onBackInfoSubWorkshop() {
    debugger;
    this.redirectTo('/fac/responsible/' + this.requestId);
  }

  setDisableDafaterAdd() {
    const theUrl = `${FacUrls.REQUEST}/` + this.requestId;
    this.restService.getAll(theUrl)
      .then(values => {
        debugger;
        // &&  this.editMode === '1'
        if (values.data.list[0].requestReasonTypesId.code !== 2) {
          this.setDisableDafaterAddress = false;
        } else {
          this.setDisableDafaterAddress = true;
        }
      })
      .catch(error => {
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
  }


  onLocation() {
    debugger;
    if (this.gridDetWorkshopAddress.selectedDataItem === undefined) {
      this.showErrorMessageBox('توجه', 'لطفا رديف مورد نظر را انتخاب نماييد');
      return;
    } else {
      let mahal = '';
      if (this.gridDetWorkshopAddress.selectedDataItem.name === '1') {
        mahal = ' دفتر مرکزي(اقامتگاه قانونی)';
      } else if (this.gridDetWorkshopAddress.selectedDataItem.name === '2') {
        mahal = 'کارخانه';
      } else if (this.gridDetWorkshopAddress.selectedDataItem.name === '3') {
        mahal = 'نمایندگی';
      } else if (this.gridDetWorkshopAddress.selectedDataItem.name === '4') {
        mahal = 'انبار';
      } else if (this.gridDetWorkshopAddress.selectedDataItem.name === '5') {
        mahal = 'فروشگاه';
      } else if (this.gridDetWorkshopAddress.selectedDataItem.name === '6') {
        mahal = 'دفتر اداری';
      }
      this.showQuestionBox('پیام سیستم', 'آیا مطمئن هستید محل نگهداری دفاتر ' + mahal + ' است؟', () => {
        if (this.gridDetWorkshopAddress.selectedDataItem.name === '' || this.gridDetWorkshopAddress.selectedDataItem.name === null) {
          this.showErrorMessageBox('توجه', 'کاربر گرامی  عنوان باید پر باشد.');
          return;
        }
        ///save dar workshop address
        const jsondata = new AloReqDetWorkshopAddress();
        jsondata.name = this.gridDetWorkshopAddress.selectedDataItem.name;
        jsondata.nationalCode = this.gridDetWorkshopAddress.selectedDataItem.nationalCode;
        jsondata.branch = new (Branch);
        jsondata.branch.brhCode = this.gridDetWorkshopAddress.selectedDataItem.branchCode;
        jsondata.workshopId = this.gridDetWorkshopAddress.selectedDataItem.workshopId;
        jsondata.city = new (City);
        jsondata.city.cityCode = this.gridDetWorkshopAddress.selectedDataItem.cityCode;
        jsondata.province = new (Province);
        jsondata.province.provinceCode = this.gridDetWorkshopAddress.selectedDataItem.provinceCode;
        jsondata.mobail = this.gridDetWorkshopAddress.selectedDataItem.mobail;
        jsondata.email = this.gridDetWorkshopAddress.selectedDataItem.email;
        jsondata.codePosti = this.gridDetWorkshopAddress.selectedDataItem.codePosti;
        jsondata.workshopAddressDesc = this.gridDetWorkshopAddress.selectedDataItem.workshopAddressDesc;
        jsondata.detWorkshopAddressId = this.gridDetWorkshopAddress.selectedDataItem.detWorkshopAddressId;
        jsondata.workshopAddressPhone1 = this.gridDetWorkshopAddress.selectedDataItem.workshopAddressPhone1;
        jsondata.cityCode1 = this.gridDetWorkshopAddress.selectedDataItem.cityCode1;
        jsondata.workshopAddressPhone3 = this.gridDetWorkshopAddress.selectedDataItem.workshopAddressPhone3;
        jsondata.cityCode2 = this.gridDetWorkshopAddress.selectedDataItem.cityCode2;
        jsondata.workshopAddressPhone2 = this.gridDetWorkshopAddress.selectedDataItem.workshopAddressPhone2;
        jsondata.cityCode3 = this.gridDetWorkshopAddress.selectedDataItem.cityCode3;
        jsondata.faxNo = this.gridDetWorkshopAddress.selectedDataItem.faxNo;
        jsondata.cityCodefax = this.gridDetWorkshopAddress.selectedDataItem.cityCodefax;
        jsondata.requests = new (AloRequest);
        jsondata.requests.requestId = this.requestId;
        if (this.gridDetWorkshopAddress.selectedDataItem.detWorkshopAddressId !== undefined) {
          jsondata.detWorkshopAddressId = this.gridDetWorkshopAddress.selectedDataItem.detWorkshopAddressId;
        }
        jsondata.legalResidence = '1';
        debugger;
        if (this.gridDetWorkshopAddress.selectedDataItem.detWorkshopAddressId === undefined ||
          this.gridDetWorkshopAddress.selectedDataItem.detWorkshopAddressId === '') {
          this.restService.create(FacUrls.WORKSHOP_ADDREES_SAVE, jsondata)
            .then(resulttt => {
              this.statusInfoSubWorkshop();
              this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد', () => {
              });
            })
            .catch(result => {
              alert('در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
            });

        } else {
          this.restService.update(FacUrls.WORKSHOP_ADDREES_EDIT, this.gridDetWorkshopAddress.selectedDataItem.detWorkshopAddressId.toString(), jsondata)
            .then(resulttt => {
              this.statusInfoSubWorkshop();
              this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد', () => {
              });
            })
            .catch(result => {
              alert('در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
            });

        }

      }, () => {
        return;
      });
    }
  }

  statusInfoSubWorkshop() {
    const theUrl = `${FacUrls.STATUS_INFO_SUB_WORKSHOP}/` + this.requestId + '/2';
    this.restService.getAll(theUrl)
      .then(values => {
      })
      .catch(error => {
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
  }

  onResidence() {
    if (this.gridDetWorkshopAddress.selectedDataItem === undefined) {
      this.showErrorMessageBox('توجه', 'لطفا رديف مورد نظر را انتخاب نماييد');
      return;
    } else {
      this.showQuestionBox('پیام سیستم', 'آیا مایل به انتخاب ردیف مورد نظر به عنوان اقامتگاه قانونی هستید؟', () => {
        ///save dar workshop address
        const jsondata = new AloReqDetWorkshopAddress();
        jsondata.name = this.gridDetWorkshopAddress.selectedDataItem.name;
        jsondata.nationalCode = this.gridDetWorkshopAddress.selectedDataItem.nationalCode;
        jsondata.branch = new (Branch);
        jsondata.branch.brhCode = this.gridDetWorkshopAddress.selectedDataItem.branchCode;
        jsondata.workshopId = this.gridDetWorkshopAddress.selectedDataItem.workshopId;
        jsondata.city = new (City);
        jsondata.city.cityCode = this.gridDetWorkshopAddress.selectedDataItem.cityCode;
        jsondata.province = new (Province);
        jsondata.province.provinceCode = this.gridDetWorkshopAddress.selectedDataItem.provinceCode;
        jsondata.mobail = this.gridDetWorkshopAddress.selectedDataItem.mobail;
        jsondata.email = this.gridDetWorkshopAddress.selectedDataItem.email;
        jsondata.codePosti = this.gridDetWorkshopAddress.selectedDataItem.codePosti;
        jsondata.workshopAddressDesc = this.gridDetWorkshopAddress.selectedDataItem.workshopAddressDesc;
        jsondata.detWorkshopAddressId = this.gridDetWorkshopAddress.selectedDataItem.detWorkshopAddressId;
        jsondata.workshopAddressPhone1 = this.gridDetWorkshopAddress.selectedDataItem.workshopAddressPhone1;
        jsondata.cityCode1 = this.gridDetWorkshopAddress.selectedDataItem.cityCode1;
        jsondata.workshopAddressPhone3 = this.gridDetWorkshopAddress.selectedDataItem.workshopAddressPhone3;
        jsondata.cityCode2 = this.gridDetWorkshopAddress.selectedDataItem.cityCode2;
        jsondata.workshopAddressPhone2 = this.gridDetWorkshopAddress.selectedDataItem.workshopAddressPhone2;
        jsondata.cityCode3 = this.gridDetWorkshopAddress.selectedDataItem.cityCode3;
        jsondata.faxNo = this.gridDetWorkshopAddress.selectedDataItem.faxNo;
        jsondata.cityCodefax = this.gridDetWorkshopAddress.selectedDataItem.cityCodefax;
        jsondata.requests = new (AloRequest);
        jsondata.requests.requestId = this.requestId;
        if (this.gridDetWorkshopAddress.selectedDataItem.detWorkshopAddressId !== undefined) {
          jsondata.detWorkshopAddressId = this.gridDetWorkshopAddress.selectedDataItem.detWorkshopAddressId;
        }
        debugger;
        if (this.gridDetWorkshopAddress.selectedDataItem.detWorkshopAddressId === undefined ||
          this.gridDetWorkshopAddress.selectedDataItem.detWorkshopAddressId === '') {
          this.restService.create(FacUrls.WORKSHOP_ADDREES_SAVE, jsondata)
            .then(resulttt => {
               this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد', () => {
              });
            })
            .catch(result => {
              alert('در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
            });

        } else {
          this.restService.update(FacUrls.WORKSHOP_ADDREES_EDIT, this.gridDetWorkshopAddress.selectedDataItem.detWorkshopAddressId, jsondata)
            .then(resulttt => {
              this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد', () => {
              });
            })
            .catch(result => {
              alert('در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
            });

        }

      }, () => {
        return;
      });
    }
  }
}
