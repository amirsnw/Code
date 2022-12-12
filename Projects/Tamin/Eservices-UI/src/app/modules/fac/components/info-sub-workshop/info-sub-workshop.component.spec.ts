import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSubWorkshopComponent } from './info-sub-workshop.component';

describe('InfoSubWorkshopComponent', () => {
  let component: InfoSubWorkshopComponent;
  let fixture: ComponentFixture<InfoSubWorkshopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoSubWorkshopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoSubWorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
