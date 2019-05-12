import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { ToolbarModule } from './toolbar/toolbar.module';
import { AdminDialogComponent } from './toolbar/admin-dialog/admin-dialog.component';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { FilterDialogCountryComponent } from './leaderboard/filter-dialog-country/filter-dialog-country.component';
import { FilterDialogRatingComponent } from './leaderboard/filter-dialog-rating/filter-dialog-rating.component';
import { FilterDialogAlcoholComponent } from './leaderboard/filter-dialog-alcohol/filter-dialog-alcohol.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    ToolbarModule,
    LeaderboardModule
  ],
  providers: [],
  entryComponents: [
    AdminDialogComponent,
    FilterDialogCountryComponent,
    FilterDialogRatingComponent,
    FilterDialogAlcoholComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
