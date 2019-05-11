import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alcoholRate'
})
export class AlcoholRatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value + 'g/L';
  }

}
