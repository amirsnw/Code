import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PensionerIntroComponent } from './pensioner-intro.component';

describe('PensionerIntroComponent', () => {
  let component: PensionerIntroComponent;
  let fixture: ComponentFixture<PensionerIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PensionerIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PensionerIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
