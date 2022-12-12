import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoCompleteViewComponent } from './sso-complete-view.component';

describe('SsoCompleteViewComponent', () => {
  let component: SsoCompleteViewComponent;
  let fixture: ComponentFixture<SsoCompleteViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoCompleteViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoCompleteViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
