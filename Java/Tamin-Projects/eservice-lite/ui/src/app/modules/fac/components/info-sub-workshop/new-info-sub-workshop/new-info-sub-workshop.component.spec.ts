import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInfoSubWorkshopComponent } from './new-info-sub-workshop.component';

describe('NewInfoSubWorkshopComponent', () => {
  let component: NewInfoSubWorkshopComponent;
  let fixture: ComponentFixture<NewInfoSubWorkshopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewInfoSubWorkshopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewInfoSubWorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
