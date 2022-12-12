import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFromFileComponent } from './upload-from-file.component';

describe('UploadFromFileComponent', () => {
  let component: UploadFromFileComponent;
  let fixture: ComponentFixture<UploadFromFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadFromFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFromFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
