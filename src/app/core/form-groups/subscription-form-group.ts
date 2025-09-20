import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class SubscriptionFormGroupHelper {
  public static createApiProductFormGroup(fb: FormBuilder): FormGroup {
    return fb.group({
      productName: ['', [Validators.required]],
      productDescription: ['', [Validators.required]],
    });
  }

  public static createSubscribedApiFormGroup(fb: FormBuilder, productId?: string): FormGroup {
    return fb.group({
      apiName: ['', [Validators.required]],
      apiPath: ['', [Validators.required]],
      apiDescription: ['', [Validators.required]],
      productId: [productId, [Validators.required]],
    });
  }

  public static createSubscriptionFormGroup(fb: FormBuilder, productId?: string): FormGroup {
    return fb.group({
      subscriptionName: ['', [Validators.required]],
      subscriptionDescription: ['', [Validators.required]],
      productId: [productId, [Validators.required]],
    });
  }
}
