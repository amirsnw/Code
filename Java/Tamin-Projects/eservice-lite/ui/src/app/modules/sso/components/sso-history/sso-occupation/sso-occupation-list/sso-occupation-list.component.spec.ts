import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoOccupationListComponent } from './sso-occupation-list.component';

describe('OccupationListComponent', () => {
  let component: SsoOccupationListComponent;
  let fixture: ComponentFixture<SsoOccupationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoOccupationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoOccupationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
