import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoCompleteListComponent } from './sso-complete-list.component';

describe('EdictPaymentListComponent', () => {
  let component: SsoCompleteListComponent;
  let fixture: ComponentFixture<SsoCompleteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoCompleteListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoCompleteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


