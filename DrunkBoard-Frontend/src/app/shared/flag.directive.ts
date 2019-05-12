import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appFlag]'
})
export class FlagDirective implements OnInit {

  @Input('appFlag') countryIso = 'fr';
  @Input() squared: boolean;

  constructor(private el: ElementRef<HTMLElement>) {
  }

  public ngOnInit(): void {
    this.el.nativeElement.classList.add('flag-icon', `flag-icon-${this.countryIso.toLowerCase()}`);
    if (this.squared) {
      this.el.nativeElement.classList.add('flag-icon-squared');
    }
  }

}
