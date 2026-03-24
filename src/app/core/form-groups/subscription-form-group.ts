import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

export class SubscriptionFormGroupHelper {
  public static createApiProductFormGroup(fb: UntypedFormBuilder): UntypedFormGroup {
    return fb.group({
      productName: ['', [Validators.required]],
      productDescription: ['', [Validators.required]],
    });
  }

  public static createSubscribedApiFormGroup(fb: UntypedFormBuilder, productId?: string): UntypedFormGroup {
    return fb.group({
      apiName: ['', [Validators.required]],
      apiPath: ['', [Validators.required]],
      apiDescription: ['', [Validators.required]],
      productId: [productId, [Validators.required]],
    });
  }

  public static createSubscriptionFormGroup(fb: UntypedFormBuilder, productId?: string): UntypedFormGroup {
    return fb.group({
      subscriptionName: ['', [Validators.required]],
      subscriptionDescription: ['', [Validators.required]],
      productId: [productId, [Validators.required]],
    });
  }
}
