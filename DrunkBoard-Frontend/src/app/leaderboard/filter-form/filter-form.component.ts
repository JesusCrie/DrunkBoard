import { Component, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocomplete } from '@angular/material';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss']
})
export class FilterFormComponent {

  public separatorKeyCodes = [ENTER, COMMA];

  public filters: string[] = [
    'Country: FR',
    'Hey'
  ];

  public filterControl = new FormControl();
  @ViewChild('auto')
  public autocomplete: MatAutocomplete;
}
