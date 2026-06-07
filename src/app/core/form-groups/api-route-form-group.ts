import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

function atLeastOneMethod(control: AbstractControl) {
  const value = control.value;
  if (!value || !Array.isArray(value) || value.length === 0) {
    return { required: true };
  }
  return null;
}

export class ApiRouteFormGroupHelper {
  public static createApiRouteFormGroup(fb: UntypedFormBuilder): UntypedFormGroup {
    return fb.group({
      routeId: ['', [Validators.required]],
      path: ['', [Validators.required]],
      methods: [[], [atLeastOneMethod]],
      isActive: [true],
      rateLimiterPolicy: ['', [Validators.required]],
      clusterId: ['', [Validators.required]],
      headers: fb.array([]),
      transforms: fb.array([]),
    });
  }

  public static createApiRouteFilterFormGroup(fb: UntypedFormBuilder): UntypedFormGroup {
   const group = fb.group({
    cluster: [null],
    status: [null],
    rateLimiterPolicy: [null],
    fromDate: [null],
    toDate: [null],
   });

   group.get('fromDate').valueChanges.subscribe(value => {
     if(value){
      group.get('toDate').setValidators([Validators.required]);
     }else{
      group.get('toDate').setValidators([]);
     }
     group.get('toDate').markAsTouched();
     group.get('toDate').updateValueAndValidity({ emitEvent: false });
   });

   group.get('toDate').valueChanges.subscribe(value => {
    if(value){
      group.get('fromDate').setValidators([Validators.required]);
    }else{
      group.get('fromDate').setValidators([]);
    }
    group.get('fromDate').markAsTouched();
    group.get('fromDate').updateValueAndValidity({ emitEvent: false });
   });

   return group;
  }
}

export class ApiRouteHeadersFormGroupHelper {
  public static createRouteHeaderFormGroup(fb: UntypedFormBuilder): UntypedFormGroup {
    return fb.group({
      name: ['', [Validators.required]],
      values: ['', [Validators.required]], // Comma-separated string, e.g. "v2,v3"
      mode: ['exactheader', [Validators.required]],
      isActive: [true],
    });
  }
}

export class ApiRouteTransformsFormGroupHelper {
  public static createRouteTransformFormGroup(fb: UntypedFormBuilder): UntypedFormGroup {
    return fb.group({
      pathPattern: ['', [Validators.required]],
      isActive: [true],
    });
  }
}