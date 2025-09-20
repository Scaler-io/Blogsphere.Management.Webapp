import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from 'angular-auth-oidc-client';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthModule.forRoot({
      config: {
        authority: 'http://localhost:5000', // Replace with your identity server URL
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        clientId: 'blogsphere-management', // Replace with your client ID
        scope: 'openid profile email apigateway:read apigateway:write apigateway:delete', // Define your required scopes
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        logLevel: 0, // Set to 1 for debug logging
        refreshTokenRetryInSeconds: 3600 * 24,
        silentRenewTimeoutInSeconds: 3600 * 24,
        tokenRefreshInSeconds: 3600 * 24,
        autoUserInfo: true,
      },
    }),
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  exports: [AuthModule],
})
export class CoreModule {}
