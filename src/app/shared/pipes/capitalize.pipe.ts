import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    if (!value) return;
    value.trim();
    const splittedValue = value.split(/(?=[A-Z])/);
    let transformedValue = '';
    splittedValue.map((s) => (transformedValue += ' ' + s));
    transformedValue = transformedValue.trim().toLowerCase();
    return transformedValue.charAt(0).toUpperCase() + transformedValue.slice(1);
  }
}
