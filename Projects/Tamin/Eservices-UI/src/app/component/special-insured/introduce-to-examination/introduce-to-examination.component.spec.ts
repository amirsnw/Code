import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {IntroduceToExaminationComponent} from './introduce-to-examination.component';

describe('IntroduceToExaminationComponent', () => {
  let component: IntroduceToExaminationComponent;
  let fixture: ComponentFixture<IntroduceToExaminationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroduceToExaminationComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroduceToExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
