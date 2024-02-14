import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupBy'
})
export class GroupByPipe implements PipeTransform {

  /* transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  } */
  transform(collection: any[], property: string): any[]|null {
    if (!collection) {
      return null;
    }

    const groupedCollection: { key: string, items: any[] }[] = [];

    collection.forEach((item) => {
      const key = item[property];
      const group = groupedCollection.find((g) => g.key === key);

      if (group) {
        group.items.push(item);
      } else {
        groupedCollection.push({ key: key, items: [item] });
      }
    });

    return groupedCollection;
  }
}
