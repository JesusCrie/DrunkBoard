import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDialogRatingComponent } from './filter-dialog-rating.component';

describe('FilterDialogRatingComponent', () => {
  let component: FilterDialogRatingComponent;
  let fixture: ComponentFixture<FilterDialogRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterDialogRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterDialogRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
