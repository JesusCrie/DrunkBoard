import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlcoholRatePipe } from './alcohol-rate.pipe';

@NgModule({
  declarations: [
    AlcoholRatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    AlcoholRatePipe
  ]
})
export class SharedModule { }
