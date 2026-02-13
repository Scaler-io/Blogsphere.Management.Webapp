export const environment = {
  production: true,
  blogShereApiGatewayBaseUrl: 'https://api.blogsphere.com/api/v1',
  blogsphereSearchApiBaseUrl: 'https://api.blogsphere.com/search',
  blogsphereBffBaseUrl: 'http://localhost:8000/bff',

  blogsphereSearchApiSubscriptionKey: 'your-production-key',
  blogsphereBffSubscriptionKey: '5fd27de1-4fb8-4651-898e-933a35be3b5e',
  // Production feature flags
  useMockService: true, // Always false in production
  dashboardRefreshIntervalSeconds: 30,
};
