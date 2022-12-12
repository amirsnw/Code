import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoWorkshopFullInfoListComponent } from './sso-workshop-full-info-list.component';

describe('SsoWorkshopFullInfoListComponent', () => {
  let component: SsoWorkshopFullInfoListComponent;
  let fixture: ComponentFixture<SsoWorkshopFullInfoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoWorkshopFullInfoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoWorkshopFullInfoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
