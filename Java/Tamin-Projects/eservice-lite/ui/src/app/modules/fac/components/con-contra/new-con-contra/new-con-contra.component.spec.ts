import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewConContraComponent } from './new-con-contra.component';

describe('NewConContraComponent', () => {
  let component: NewConContraComponent;
  let fixture: ComponentFixture<NewConContraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewConContraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewConContraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
