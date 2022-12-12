import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuneralNoPresenceSsoHeaderComponent } from './funeral-no-presence-sso-header.component';

describe('HeaderComponent', () => {
  let component: FuneralNoPresenceSsoHeaderComponent;
  let fixture: ComponentFixture<FuneralNoPresenceSsoHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuneralNoPresenceSsoHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuneralNoPresenceSsoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
