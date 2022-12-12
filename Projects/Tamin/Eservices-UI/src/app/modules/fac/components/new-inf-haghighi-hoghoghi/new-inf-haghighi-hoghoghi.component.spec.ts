import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInfHaghighiHoghoghiComponent } from './new-inf-haghighi-hoghoghi.component';

describe('NewInfHaghighiHoghoghiComponent', () => {
  let component: NewInfHaghighiHoghoghiComponent;
  let fixture: ComponentFixture<NewInfHaghighiHoghoghiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewInfHaghighiHoghoghiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewInfHaghighiHoghoghiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
