import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuneralNoPresenceSsoSearchComponent } from './funeral-no-presence-sso-search.component';

describe('EdictPaymentSearchComponent', () => {
  let component: FuneralNoPresenceSsoSearchComponent;
  let fixture: ComponentFixture<FuneralNoPresenceSsoSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuneralNoPresenceSsoSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuneralNoPresenceSsoSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
