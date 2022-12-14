import {Component, EventEmitter, Injector, OnInit, Output, ViewChild} from '@angular/core';
import {TaminFieldComboBoxStaticComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {FacUrls} from '../../../fac-urls';
import {AloRequestDetStackholders} from '../../../models/alo-request-det-stackholders';
import {AloRequest} from '../../../models/alo-request';

@Component({
  selector: 'app-info-sub-work-shop-location',
  templateUrl: './info-sub-work-shop-location.component.html',
  styleUrls: ['./info-sub-work-shop-location.component.css']
})
export class InfoSubWorkShopLocationComponent extends TaminPageBaseComponent {

@Output() close = new EventEmitter<any>();
@ViewChild('sigOwnerCombobBox') sigOwnerCombobBox: TaminFieldComboBoxStaticComponent;
@ViewChild('positionCombobBox') positionCombobBox: TaminFieldComboBoxStaticComponent;
@ViewChild('nationalityCodeCombobBox') nationalityCodeCombobBox: TaminFieldComboBoxStaticComponent;
@ViewChild('characterCombobBox') characterCombobBox: TaminFieldComboBoxStaticComponent;
  editForm: FormGroup;
private requestId: any;
private editMode: any;
private detStackholdersId: any;


  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);
  }

protected initializePage(): void {
    debugger;
  this.editForm = this.formBuilder.group({
    nationality: [''],
    workshopCharacter: [''],
    nationCode: [''],
    birthDate: [''],
    firstName: [''],
    lastName: [''],
    position: [''],
    sigOwner: [''],
    requests: [''],
    findNationCode: [''],
    positionDesk: [''],
    detResponsiblesId: [''],
    character: [''],
  });
  this.characterCombobBox.dataItems = [
    {
      name: 'حقیقی',
      value: '1'
    }, {
      name: 'حقوقی',
      value: '2'
    }
  ];
  this.nationalityCodeCombobBox.dataItems = [
    {
      name: 'ایرانی',
      value: '1'
    }, {
      name: 'تبعه خارجی',
      value: '2'
    }
  ];
  this.requestId = this.route.snapshot.params['requestId'];
  this.editMode = this.route.snapshot.params['editMode'];
  this.sigOwnerCombobBox.dataItems = [
    {
      name: 'مجاز  مشترک',
      value: '1'
    },
    {
      name:  'مجاز منفرد',
      value: '2'
    }
  ];
  this.positionCombobBox.dataItems = [
    {
      name: 'مدیرعامل',
      value: '1'
    },
    {
      name:  'رئیس هیئت مدیره',
      value: '2'
    },
    {
      name: 'نائب رئیس هیئت مدیره',
      value: '3'
    },
    {
      name:  'اعضاء هیئت مدیره',
      value: '4'
    },
    {
      name: 'بازرس',
      value: '5'
    },
    {
      name:  'بازرس علی البدل',
      value: '6'
    }
  ];
  debugger;
  this.loadData();
}

  loadData() {
    debugger;
    const theUrl = `${FacUrls.SIG_OWNER}/` + this.requestId;
    this.restService.getAll(theUrl)
      .then(values => {
        debugger;
        // &&  this.editMode === '1'
        if (values.data &&  this.editMode === '1' ) {
          this.editForm.patchValue(values.data.list[0]);
          this.detStackholdersId = values.data.list[0].detStackholdersId;
          // this.editForm.get('nationalityCode').setValue(this.cellServiceNationalityCode(values.data.list[0].nationality));
          // this.editForm.get('character').setValue(this.cellServiceCharacter(values.data.list[0].character));
          // this.editForm.get('position').setValue(this.cellServicePosition(values.data.list[0].position));
        }
      })
      .catch(error => {
        this.showErrorMessageBox('پیام سیستم', this.constants.getNetworkErrorMessage());
      });
  }
  cellServiceNationalityCode(item) {
    switch (item) {
      case '1':
        return 'ایرانی';
      case '2':
        return 'تبعه خارجی';
    }
  }
  cellServicePosition(item) {
    switch (item) {
      case '1':
        return 'مدیرعامل';
      case '2':
        return 'رئیس هیئت مدیره';
      case '3':
        return 'نائب رئیس هیئت مدیره';
      case '4':
        return 'اعضاء هیئت مدیره';
      case '5':
        return 'بازرس';
      case '6':
        return 'بازرس علی البدل';
    }
  }
  cellServiceCharacter(item) {
    switch (item) {
      case '1':
        return 'حقیقی';
      case '2':
        return 'حقوقی ';
    }
  }

  onSave(values) {
    debugger;
    if (!this.editForm.valid) {
      this.markFormGroupAsTouched(this.editForm);
      return;
    }
    const jsondata = new AloRequestDetStackholders();
    jsondata.nationality = values.nationality;
    jsondata.character = values.character;
    jsondata.nationCode = values.nationCode;
    jsondata.birthDate = values.birthDate;
    jsondata.firstName = values.firstName;
    jsondata.lastName = values.lastName;
    jsondata.position = values.position;
    jsondata.sigOwner = values.sigOwner;
    jsondata.requests = new (AloRequest);
    if (this.editMode === '0' ) {
      jsondata.requests.requestId = this.requestId;
    } else {
      jsondata.requests.requestId = values.requests.requestId;
    }
    if (values.findNationCode === true) {
      jsondata.positionDesk = '';
    }
    if ( this.editMode === '1') {
      jsondata.detStackholdersId = this.detStackholdersId ;
    }
    debugger;
    if (this.detStackholdersId === undefined || this.detStackholdersId === '') {
      this.restService.create(FacUrls.SIG_OWNER_SAVE, jsondata)
        .then(resulttt => {
          this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد', () => {
            debugger;
            this.close.emit();
            this.redirectTo('/fac/infoSubWorkshop/' + this.requestId);
          });
        })
        .catch(result => {
          alert('در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
        });

    } else {
      this.restService.update(FacUrls.SIG_OWNER_EDIT, this.detStackholdersId.toString(), jsondata)
        .then(resulttt => {
          this.showInfoMessageBox('پیام سیستم', 'اطلاعات با موفقیت ذخیره شد', () => {
            debugger;
            this.close.emit();
            this.redirectTo('/fac/infoSubWorkshop/' + this.requestId);
          });
        })
        .catch(result => {
          alert('در ذخیره کردن اطلاعات مشکلی پیش آمده است !');
        });

    }
  }

  back() {
    this.redirectTo('/fac/infoSubWorkshop/' +  this.requestId);
  }

}
