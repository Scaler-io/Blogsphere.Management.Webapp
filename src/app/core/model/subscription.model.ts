export interface ApiProduct {
  productId: string;
  productName: string;
  productDescription: string;
  isActive: boolean;
  subscribedApiCount: number;
  subscriptionCount: number;
  createdAt: string;
  updatedAt: string | null;
  createdBy: string;
  updatedBy: string | null;
}

export interface SubscribedApi {
  id: string;
  apiPath: string;
  apiName: string;
  apiDescription: string;
  apiProductDetails: ApiProductDetails;
  createdAt: string;
  updatedAt: string | null;
  createdBy: string;
  updatedBy: string | null;
}

export interface Subscription {
  id: string;
  subscriptionName: string;
  subscriptionDescription: string;
  apiProductDetails: ApiProductDetails;
  createdAt: string;
  updatedAt: string | null;
  createdBy: string;
  updatedBy: string | null;
}

export interface PaginatedResult<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

interface ApiProductDetails {
  id: string;
  productName: string;
}

// Request Models
export interface CreateApiProductRequest {
  productName: string;
  productDescription: string;
}

export interface CreateSubscribedApiRequest {
  apiPath: string;
  apiName: string;
  apiDescription: string;
  productId: string;
}

export interface CreateSubscriptionRequest {
  subscriptionName: string;
  subscriptionDescription: string;
  productId: string;
}
