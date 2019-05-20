import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlcoholRatePipe } from './alcohol-rate.pipe';
import { FlagDirective } from './flag.directive';
import { BeerRatingComponent } from './beer-rating/beer-rating.component';

@NgModule({
  declarations: [
    AlcoholRatePipe,
    FlagDirective,
    BeerRatingComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    AlcoholRatePipe,
    FlagDirective,
    BeerRatingComponent
  ]
})
export class SharedModule {}
