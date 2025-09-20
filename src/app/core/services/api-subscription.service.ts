import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ApiProduct,
  CreateApiProductRequest,
  CreateSubscribedApiRequest,
  CreateSubscriptionRequest,
  PaginatedResult,
  SubscribedApi,
  Subscription as SubscriptionModel,
} from '../model/subscription.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiSubscriptionService {
  constructor(private http: HttpClient) {}

  public getAllApiProducts(
    pageNumber: number = 1,
    pageSize: number = 10
  ): Observable<PaginatedResult<ApiProduct>> {
    return this.http.get<PaginatedResult<ApiProduct>>(
      `${environment.blogShereApiGatewayBaseUrl}/apiproduct?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  public getApiProductById(id: string): Observable<ApiProduct> {
    return this.http.get<ApiProduct>(`${environment.blogShereApiGatewayBaseUrl}/apiproduct/${id}`);
  }

  public getAllSubscribedApisByProductId(productId: string): Observable<SubscribedApi[]> {
    return this.http.get<SubscribedApi[]>(
      `${environment.blogShereApiGatewayBaseUrl}/subscribedapi/product/${productId}`
    );
  }

  public getAllSubscriptionsByProductId(productId: string): Observable<SubscriptionModel[]> {
    return this.http.get<SubscriptionModel[]>(
      `${environment.blogShereApiGatewayBaseUrl}/subscription/product/${productId}`
    );
  }

  public createApiProduct(apiProduct: CreateApiProductRequest): Observable<ApiProduct> {
    return this.http.post<ApiProduct>(
      `${environment.blogShereApiGatewayBaseUrl}/apiproduct`,
      apiProduct
    );
  }

  public createSubscribedApi(subscribedApi: CreateSubscribedApiRequest): Observable<SubscribedApi> {
    return this.http.post<SubscribedApi>(
      `${environment.blogShereApiGatewayBaseUrl}/subscribedapi`,
      subscribedApi
    );
  }

  public createSubscription(
    subscription: CreateSubscriptionRequest
  ): Observable<SubscriptionModel> {
    return this.http.post<SubscriptionModel>(
      `${environment.blogShereApiGatewayBaseUrl}/subscription`,
      subscription
    );
  }

  public deleteApiProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.blogShereApiGatewayBaseUrl}/apiproduct/${id}`);
  }

  public deleteSubscribedApi(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.blogShereApiGatewayBaseUrl}/subscribedapi/${id}`);
  }

  public deleteSubscription(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.blogShereApiGatewayBaseUrl}/subscription/${id}`);
  }
}
