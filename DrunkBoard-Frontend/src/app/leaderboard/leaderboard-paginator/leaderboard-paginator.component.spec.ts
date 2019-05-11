import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardPaginatorComponent } from './leaderboard-paginator.component';

describe('LeaderboardPaginatorComponent', () => {
  let component: LeaderboardPaginatorComponent;
  let fixture: ComponentFixture<LeaderboardPaginatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaderboardPaginatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderboardPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
