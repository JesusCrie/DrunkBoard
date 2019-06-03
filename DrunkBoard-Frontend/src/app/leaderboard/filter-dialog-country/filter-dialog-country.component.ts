import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { COUNTRIES, Country } from '../../country';
import { MatDialogRef } from '@angular/material';
import { CountryFilter } from '../filter';

@Component({
  selector: 'app-filter-dialog-country',
  templateUrl: './filter-dialog-country.component.html',
  styleUrls: ['./filter-dialog-country.component.scss']
})
export class FilterDialogCountryComponent {

  public countryCode = new FormControl();

  constructor(private dialogRef: MatDialogRef<FilterDialogCountryComponent>) {}

  // Convert and sort available countries
  get countries(): Country[] {
    return Array.from<Country>(COUNTRIES.values()).sort((c1: Country, c2: Country) => {
      return c1.name.localeCompare(c2.name);
    });
  }

  // Construct the filter and return it
  public confirm(): void {
    const country: Country = this.countryCode.value;
    const filter = new CountryFilter(country);
    this.dialogRef.close(filter);
  }
}
