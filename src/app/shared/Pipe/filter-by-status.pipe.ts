import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByStatus'
})
export class FilterByStatusPipe implements PipeTransform {

 /*  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  } */
  transform(orders: any[], status: string): any[] {
    if (!status) {
      return orders; // If no status provided, return all orders
    }

    return orders.filter(order => order.order_status === status);
  }

}
