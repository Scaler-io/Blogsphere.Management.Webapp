import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material.module';
import { CoreModule } from './core/core.module';
import { ButtonModule } from './shared/components/button/button.module';
import { SidebarModule } from './features/sidebar/sidebar.module';
import { NavbarModule } from './shared/components/navbar/navbar.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './store/app.state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { PageHeaderModule } from './shared/components/page-header/page-header.module';
import { AuthModule } from 'angular-auth-oidc-client';
import { LoaderModule } from './shared/components/loader/loader.module';
import { ErrorEffects } from './state/error/error.effect';
import { GenericErrorModule } from './features/generic-error/generic-error.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    ButtonModule,
    SidebarModule,
    NavbarModule,
    PageHeaderModule,
    LoaderModule,
    GenericErrorModule,
    CoreModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([ErrorEffects]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
