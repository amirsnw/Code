import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFixedAssetsComponent } from './new-fixed-assets.component';

describe('NewFixedAssetsComponent', () => {
  let component: NewFixedAssetsComponent;
  let fixture: ComponentFixture<NewFixedAssetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFixedAssetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFixedAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
