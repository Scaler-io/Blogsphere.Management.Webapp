import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class ApiClusterFormGroupHelper {
  public static createApiClusterFormGroup(fb: FormBuilder): FormGroup {
    const group = fb.group({
      clusterId: ['', [Validators.required]],
      loadBalancingPolicy: ['', [Validators.required]],
      healthCheckEnabled: [false],
      healthCheckPath: [''],
      healthCheckInterval: [''],
      healthCheckTimeout: [''],
      destinations: fb.array([]),
    });

    group.get('healthCheckEnabled').valueChanges.subscribe(value => {
      const healthCheckPath = group.get('healthCheckPath');
      const healthCheckInterval = group.get('healthCheckInterval');
      const healthCheckTimeout = group.get('healthCheckTimeout');
      if (value) {
        healthCheckPath.setValidators([Validators.required]);
        healthCheckInterval.setValidators([Validators.required]);
        healthCheckTimeout.setValidators([Validators.required]);
      } else {
        healthCheckPath.setValidators([]);
        healthCheckInterval.setValidators([]);
        healthCheckTimeout.setValidators([]);
      }
      healthCheckPath.markAsUntouched();
      healthCheckInterval.markAsUntouched();
      healthCheckTimeout.markAsUntouched();
      healthCheckPath.updateValueAndValidity();
      healthCheckInterval.updateValueAndValidity();
      healthCheckTimeout.updateValueAndValidity();
    });

    return group;
  }

  public static createApiClusterFilterFormGroup(fb: FormBuilder): FormGroup {
    const group = fb.group({
      loadBalancerName: [null],
      status: [null],
      fromDate: [null],
      toDate: [null],
    });

    group.get('fromDate').valueChanges.subscribe(value => {
      if (value) {
        group.get('toDate').setValidators([Validators.required]);
      } else {
        group.get('toDate').setValidators([]);
      }
      group.get('toDate').markAsTouched();
      group.get('toDate').updateValueAndValidity({ emitEvent: false });
    });

    group.get('toDate').valueChanges.subscribe(value => {
      if (value) {
        group.get('fromDate').setValidators([Validators.required]);
      } else {
        group.get('fromDate').setValidators([]);
      }
      group.get('fromDate').markAsTouched();
      group.get('fromDate').updateValueAndValidity({ emitEvent: false });
    });

    return group;
  }
}

export class ApiClusterDestinationsFormGroupHelper {
  public static createApiClusterDestinationsFormGroup(fb: FormBuilder): FormGroup {
    const group = fb.group({
      destinationId: ['', [Validators.required]],
      address: ['', [Validators.required]],
      isActive: [true],
    });

    group.get('address').valueChanges.subscribe(value => {
      if (value) {
        group.get('address').setValidators([Validators.pattern(/^https?:\/\/.+/)]);
      } else {
        group.get('address').setValidators([Validators.required]);
      }
      group.get('address').updateValueAndValidity({ emitEvent: false });
    });

    return group;
  }
}
