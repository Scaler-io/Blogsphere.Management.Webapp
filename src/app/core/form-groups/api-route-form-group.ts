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
