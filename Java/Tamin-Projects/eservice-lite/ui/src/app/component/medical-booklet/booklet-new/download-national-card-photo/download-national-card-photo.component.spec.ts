import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadNationalCardPhotoComponent } from './download-national-card-photo.component';

describe('DownloadNationalCardPhotoComponent', () => {
  let component: DownloadNationalCardPhotoComponent;
  let fixture: ComponentFixture<DownloadNationalCardPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadNationalCardPhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadNationalCardPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
