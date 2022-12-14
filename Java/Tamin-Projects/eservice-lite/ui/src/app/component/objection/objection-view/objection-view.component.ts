import {Component, Injector, ViewChild} from '@angular/core';
import {OverlayService, TaminImageGalleryManagedComponent, TaminPageBaseComponent} from 'tamin-framework';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Urls} from '../../../settings/urls';

@Component({
  selector: 'app-objection-view',
  templateUrl: './objection-view.component.html',
  styleUrls: ['./objection-view.component.css']
})
export class ObjectionViewComponent extends TaminPageBaseComponent {

  theForm: FormGroup;
  @ViewChild('imageGallery') imageGallery: TaminImageGalleryManagedComponent;
  private objectionId: any;
  private objectionType: any;
  private investigationType: any;
  private _overlay: any;
  isHidden = false;
  private photoTilte: string;

  constructor(injector: Injector, private route: ActivatedRoute, private overlayService: OverlayService) {
    super(injector);
  }

  protected initializePage(): void {
    this.restService.getAll('assets/data/objection-type.json')
      .then(value => {
        this.objectionType = value.items;
        this.investigationType = value.investigationItems;
      })
      .catch(reason => {
      });
    this.theForm = this.formBuilder.group({
      objectionDesc: ['']
    });
    this.objectionId = this.route.snapshot.params['id'];
    this.imageGallery.getUrl = Urls.UploadImage;

  }

  loadPageData() {
    this.restService.getById(Urls.ObjectionRequest, this.objectionId.toString())
      .then(value => {
        if (value.data.objectionPhotos.length > 0) {
          this.theForm.get('objectionDesc').setValue(value.data.objectionDesc);
          (<Array<any>>value.data.objectionPhotos).forEach((item) => {
            switch (value.data.objectionType) {
              case '1':
              case '2':
                this.photoTilte = item.type !== '19' ? this.objectionType.find(x => x.value === item.type).name : 'لایحه اعتراض سازمان به رای بدوی';
                this.imageGallery.downloadImage(item.guid, this.photoTilte, '0', '0');
                break;
              case '3':
                this.imageGallery.downloadImage(item.guid, this.investigationType.find(x => x.value === item.type).name, '0', '0');
                this.isHidden = true;
                break;
            }
          });
        }
      })
      .catch(reason => {
      });
  }

}
