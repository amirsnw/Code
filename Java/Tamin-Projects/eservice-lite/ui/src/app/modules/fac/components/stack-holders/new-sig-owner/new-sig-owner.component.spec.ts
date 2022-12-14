import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSigOwnerComponent } from './new-sig-owner.component';

describe('NewSigOwnerComponent', () => {
  let component: NewSigOwnerComponent;
  let fixture: ComponentFixture<NewSigOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSigOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSigOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
