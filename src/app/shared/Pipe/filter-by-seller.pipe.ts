import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBySeller'
})
export class FilterBySellerPipe implements PipeTransform {

 /*  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  } */
  transform(items: any[], seller: string): any[] {
    return items.filter(item => item.seller_name ===  seller);
  }
}
