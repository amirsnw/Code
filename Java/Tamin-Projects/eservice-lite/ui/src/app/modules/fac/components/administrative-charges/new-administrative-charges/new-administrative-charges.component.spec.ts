import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAdministrativeChargesComponent } from './new-administrative-charges.component';

describe('NewAdministrativeChargesComponent', () => {
  let component: NewAdministrativeChargesComponent;
  let fixture: ComponentFixture<NewAdministrativeChargesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAdministrativeChargesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAdministrativeChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
