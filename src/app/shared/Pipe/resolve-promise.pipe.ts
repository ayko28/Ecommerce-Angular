import { Pipe, PipeTransform } from '@angular/core';
import { Observable, from } from 'rxjs';

@Pipe({ name: 'resolvePromise', pure: false })
export class ResolvePromisePipe implements PipeTransform {
  transform(promise: Promise<any>): Observable<any> {
    return from(promise);
  }
}
