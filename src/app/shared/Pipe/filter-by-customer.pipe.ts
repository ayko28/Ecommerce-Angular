import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByCustomer'
})
export class FilterByCustomerPipe implements PipeTransform {

  /*
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }*/
  transform(items: any[], customer: number): any[] {
    return items.filter(item => item.userId ===  customer);
  }

}
