import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textMask',
})
export class TextMaskPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if (!value) return;

    return value.toString().replace(/./g, 'x');
  }
}
