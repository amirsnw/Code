import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PensionAccountComponent } from './pension-account.component';

describe('PensionAccountComponent', () => {
  let component: PensionAccountComponent;
  let fixture: ComponentFixture<PensionAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PensionAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PensionAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
