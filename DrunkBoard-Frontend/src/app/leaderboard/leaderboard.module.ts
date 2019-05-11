import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { LeaderboardPaginatorComponent } from './leaderboard-paginator/leaderboard-paginator.component';
import {
  MatAutocompleteModule,
  MatCardModule,
  MatChipsModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatTreeModule
} from '@angular/material';
import { SharedModule } from '../shared/shared.module';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FilterFormComponent } from './filter-form/filter-form.component';

@NgModule({
  declarations: [
    LeaderboardComponent,
    LeaderboardPaginatorComponent,
    FilterFormComponent
  ],
  exports: [
    LeaderboardComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatTreeModule,
    MatInputModule,
    MatChipsModule,
    SharedModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatIconModule
  ]
})
export class LeaderboardModule {
}
