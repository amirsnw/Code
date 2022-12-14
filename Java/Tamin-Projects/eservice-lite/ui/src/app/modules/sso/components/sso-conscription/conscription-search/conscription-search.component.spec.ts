import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ConscriptionSearchComponent} from './conscription-search.component';


describe('AllRequestsearchComponent', () => {
  let component: ConscriptionSearchComponent;
  let fixture: ComponentFixture<ConscriptionSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConscriptionSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConscriptionSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
