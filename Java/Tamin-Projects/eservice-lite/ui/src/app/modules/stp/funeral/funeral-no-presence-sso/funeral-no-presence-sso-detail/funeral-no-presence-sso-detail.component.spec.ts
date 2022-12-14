import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuneralNoPresenceSsoDetailComponent } from './funeral-no-presence-sso-detail.component';

describe('FuneralComponent', () => {
  let component: FuneralNoPresenceSsoDetailComponent;
  let fixture: ComponentFixture<FuneralNoPresenceSsoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuneralNoPresenceSsoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuneralNoPresenceSsoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
