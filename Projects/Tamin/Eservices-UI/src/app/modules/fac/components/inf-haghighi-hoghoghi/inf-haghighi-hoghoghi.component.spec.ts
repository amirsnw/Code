import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfHaghighiHoghoghiComponent } from './inf-haghighi-hoghoghi.component';

describe('InfHaghighiHoghoghiComponent', () => {
  let component: InfHaghighiHoghoghiComponent;
  let fixture: ComponentFixture<InfHaghighiHoghoghiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfHaghighiHoghoghiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfHaghighiHoghoghiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
