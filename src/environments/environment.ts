// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  maintenanceMode: false,
  oidc: {
    authority: 'http://localhost:5000',
    clientId: 'blogsphere-management',
    scope: 'openid profile email apigateway:read apigateway:write apigateway:delete offline_access bffapi:manage userapi:read userapi:write',
  },
  blogShereApiGatewayBaseUrl: 'http://localhost:8000/api/v1',
  blogsphereSearchApiBaseUrl: 'http://localhost:8000/search',
  blogsphereBffBaseUrl: 'http://localhost:8000/bff',
  blogsphereUserApiBaseUrl: 'http://localhost:8000/user',

  blogsphereSearchApiSubscriptionKey: 'efc2253f-6d87-40bb-9623-88c0e2bbaa4b',
  blogsphereBffSubscriptionKey: '5fd27de1-4fb8-4651-898e-933a35be3b5e',
  blogsphereUserApiSubscriptionKey: '2cc72fa9-08cc-42af-b072-4cdf8d626612',

  // Development feature flags
  useMockService: false, // Set to true to use mock service, false for real service
  dashboardRefreshIntervalSeconds: 120,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
