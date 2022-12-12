import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalBookletComponent } from './medical-booklet.component';

describe('MedicalBookletComponent', () => {
  let component: MedicalBookletComponent;
  let fixture: ComponentFixture<MedicalBookletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalBookletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalBookletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
