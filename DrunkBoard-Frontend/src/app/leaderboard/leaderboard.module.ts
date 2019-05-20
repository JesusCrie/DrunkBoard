import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { LeaderboardPaginatorComponent } from './leaderboard-paginator/leaderboard-paginator.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDialogModule,
  MatDividerModule, MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule, MatTableModule, MatTooltipModule,
  MatTreeModule
} from '@angular/material';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterFormComponent } from './filter-form/filter-form.component';
import { FilterContentAutodetectComponent } from './filter-content-autodetect/filter-content-autodetect.component';
import { FilterDialogCountryComponent } from './filter-dialog-country/filter-dialog-country.component';
import { FilterDialogRatingComponent } from './filter-dialog-rating/filter-dialog-rating.component';
import { Ng5SliderModule } from 'ng5-slider';
import { FilterDialogAlcoholComponent } from './filter-dialog-alcohol/filter-dialog-alcohol.component';

@NgModule({
  declarations: [
    LeaderboardComponent,
    LeaderboardPaginatorComponent,
    FilterFormComponent,
    FilterContentAutodetectComponent,
    FilterDialogCountryComponent,
    FilterDialogRatingComponent,
    FilterDialogAlcoholComponent
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
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    Ng5SliderModule,
    MatExpansionModule,
    MatTableModule
  ]
})
export class LeaderboardModule {
}
