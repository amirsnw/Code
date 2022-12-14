import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FreelanceIntroduceToExaminationComponent} from './freelance-introduce-to-examination.component';

describe('FreelanceIntroduceToExaminationComponent', () => {
  let component: FreelanceIntroduceToExaminationComponent;
  let fixture: ComponentFixture<FreelanceIntroduceToExaminationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreelanceIntroduceToExaminationComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelanceIntroduceToExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
