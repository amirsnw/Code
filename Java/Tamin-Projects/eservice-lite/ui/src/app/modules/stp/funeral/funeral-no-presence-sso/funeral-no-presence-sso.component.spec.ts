import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuneralNoPresenceSsoComponent } from './funeral-no-presence-sso.component';

describe('SsoPersonalImageComponent', () => {
  let component: FuneralNoPresenceSsoComponent;
  let fixture: ComponentFixture<FuneralNoPresenceSsoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuneralNoPresenceSsoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuneralNoPresenceSsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
