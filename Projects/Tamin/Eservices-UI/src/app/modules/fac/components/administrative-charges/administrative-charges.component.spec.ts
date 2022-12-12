import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrativeChargesComponent } from './administrative-charges.component';

describe('AdministrativeChargesComponent', () => {
  let component: AdministrativeChargesComponent;
  let fixture: ComponentFixture<AdministrativeChargesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrativeChargesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrativeChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
