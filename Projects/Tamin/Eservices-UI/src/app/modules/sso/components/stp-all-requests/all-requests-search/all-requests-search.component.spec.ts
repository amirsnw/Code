import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {AllRequestSearchComponent} from './all-requests-search.component';


describe('AllRequestsearchComponent', () => {
  let component: AllRequestSearchComponent;
  let fixture: ComponentFixture<AllRequestSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllRequestSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllRequestSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
