import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeroComponent } from './page-hero.component';
import { PageHeroAvatarModule } from '../page-hero-avatar/page-hero-avatar.module';

@NgModule({
  declarations: [PageHeroComponent],
  imports: [CommonModule, PageHeroAvatarModule],
  exports: [PageHeroComponent, PageHeroAvatarModule],
})
export class PageHeroModule {}
