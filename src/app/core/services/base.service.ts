export abstract class BaseService {
  getHttpHeaders(subscriptionKey?: string, apiVersion?: string) {
    return {
      'api-version': apiVersion || '1.0',
      'subscription-key': subscriptionKey || '',
    };
  }
}
