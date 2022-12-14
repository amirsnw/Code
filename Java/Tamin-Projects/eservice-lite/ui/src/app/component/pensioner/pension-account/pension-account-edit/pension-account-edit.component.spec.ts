import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PensionAccountEditComponent } from './pension-account-edit.component';

describe('PensionAccountEditComponent', () => {
  let component: PensionAccountEditComponent;
  let fixture: ComponentFixture<PensionAccountEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PensionAccountEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PensionAccountEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
