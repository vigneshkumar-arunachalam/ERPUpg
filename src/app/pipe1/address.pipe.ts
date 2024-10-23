import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'address'
})
export class AddressPipe implements PipeTransform {

    transform(value: any): string  {

    const { street, suite, city, zipcode } = value;

    // Format the address in a single line
    return `${street}, ${suite}, ${city} - ${zipcode}`;
  }

}