import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroductionListComponent } from './introduction-list.component';

describe('IntroductionListComponent', () => {
  let component: IntroductionListComponent;
  let fixture: ComponentFixture<IntroductionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroductionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroductionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
