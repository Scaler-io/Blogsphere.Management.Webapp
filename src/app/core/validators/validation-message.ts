import { UntypedFormGroup } from '@angular/forms';

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
    {error: 'required', formControlName: ['clusterId'], message: 'Please select a valid cluster'},
    {error: 'required', formControlName: ['loadBalancingPolicy'], message: 'Please select a valid load balancing policy'},
    {error: 'required', formControlName: ['healthCheckPath'], message: 'Please enter a valid health check path'},
    {error: 'required', formControlName: ['healthCheckInterval'], message: 'Please enter a valid health check interval'},
    {error: 'required', formControlName: ['healthCheckTimeout'], message: 'Please enter a valid health check timeout'},
    {error: 'required', formControlName: ['routeId'], message: 'Please enter a valid route id'},
    {error: 'required', formControlName: ['path'], message: 'Please enter a valid path'},
    {error: 'required', formControlName: ['methods'], message: 'Please select at least one method'},
    {error: 'required', formControlName: ['rateLimiterPolicy'], message: 'Please enter a valid rate limiter policy'},
    {error: 'required', formControlName: ['clusterId'], message: 'Please enter a valid cluster id'},
    {error: 'required', formControlName: ['name'], message: 'Please enter a valid header name'},
    {error: 'required', formControlName: ['values'], message: 'Please enter header values (comma-separated)'},
    {error: 'required', formControlName: ['mode'], message: 'Please select a valid header mode'},
    {error: 'required', formControlName: ['pathPattern'], message: 'Please enter a valid path pattern'},
]

export function validationMessage(
  formControl: string,
  formGroup: UntypedFormGroup
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
