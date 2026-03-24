export const environment = {
  production: true,
  maintenanceMode: false,
  oidc: {
    authority: 'http://localhost:5000',
    clientId: 'blogsphere-management',
    scope: 'openid profile email apigateway:read apigateway:write apigateway:delete offline_access bffapi:manage',
  },
  blogShereApiGatewayBaseUrl: 'http://localhost:8000/api/v1',
  blogsphereSearchApiBaseUrl: 'http://localhost:8000/search',
  blogsphereBffBaseUrl: 'http://localhost:8000/bff',

  blogsphereSearchApiSubscriptionKey: 'efc2253f-6d87-40bb-9623-88c0e2bbaa4b',
  blogsphereBffSubscriptionKey: '5fd27de1-4fb8-4651-898e-933a35be3b5e',
  // Production feature flags
  useMockService: false, // Always false in production
  dashboardRefreshIntervalSeconds: 30,
};
