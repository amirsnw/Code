import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSubWorkShopLocationComponent } from './info-sub-work-shop-location.component';

describe('InfoSubWorkShopLocationComponent', () => {
  let component: InfoSubWorkShopLocationComponent;
  let fixture: ComponentFixture<InfoSubWorkShopLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoSubWorkShopLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoSubWorkShopLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
