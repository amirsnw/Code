import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoLogTableDataComponent } from './sso-log-table-data.component';

describe('SsoLogTableDataComponent', () => {
  let component: SsoLogTableDataComponent;
  let fixture: ComponentFixture<SsoLogTableDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoLogTableDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoLogTableDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
