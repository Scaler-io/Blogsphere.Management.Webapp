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
        authority: 'http://secure-identity.blogsphere.in',
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        clientId: 'blogsphere-management',
        scope:
          'openid profile email apigateway:read apigateway:write apigateway:delete offline_access bffapi:manage',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        autoUserInfo: true,
        logLevel: 0,
      },
    }),
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  exports: [AuthModule],
})
export class CoreModule {}
