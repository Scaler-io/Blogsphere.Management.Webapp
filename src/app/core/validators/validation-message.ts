import { FormGroup } from '@angular/forms';

interface ValidationMessage {
  error: string;
  formControlName: string[] | string | undefined;
  message: string;
}

export const validationMessages: ValidationMessage[] = [
    {error: 'required', formControlName: ['productName'], message: 'Please enter a valid product name'},
    {error: 'required', formControlName: ['productDescription'], message: 'Please enter a valid product description'},
    {error: 'required', formControlName: ['apiName'], message: 'Please enter a valid api name'},
    {error: 'required', formControlName: ['apiPath'], message: 'Please enter a valid api path'},
    {error: 'required', formControlName: ['apiDescription'], message: 'Please enter a valid api description'},
    {error: 'required', formControlName: ['subscriptionName'], message: 'Please enter a valid subscription name'},
    {error: 'required', formControlName: ['subscriptionDescription'], message: 'Please enter a valid subscription description'},
    {error: 'required', formControlName: ['productId'], message: 'Please select a valid product'},

    {error: 'required', formControlName: ['apiName'], message: 'Please enter a valid api name'},
    {error: 'required', formControlName: ['apiPath'], message: 'Please enter a valid api path'},
    {error: 'required', formControlName: ['apiDescription'], message: 'Please enter a valid api description'},
]

export function validationMessage(
  formControl: string,
  formGroup: FormGroup
): string | undefined {
  if (formGroup && formGroup.get(formControl)) {
    for (const error of validationMessages) {
      if (
        !error.formControlName ||
        error.formControlName.length === 0 ||
        (error.formControlName.includes(formControl) &&
          formGroup.get(formControl)?.hasError(error.error))
      ) {
        return error.message;
      }
    }
  }
  return undefined;
}
