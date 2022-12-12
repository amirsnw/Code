import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConContraComponent } from './con-contra.component';

describe('ConContraComponent', () => {
  let component: ConContraComponent;
  let fixture: ComponentFixture<ConContraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConContraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConContraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
