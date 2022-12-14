import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoHistoryComponent } from './sso-history.component';

describe('SsoHistoryComponent', () => {
  let component: SsoHistoryComponent;
  let fixture: ComponentFixture<SsoHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
