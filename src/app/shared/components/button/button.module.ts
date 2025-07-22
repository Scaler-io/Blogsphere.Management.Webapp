import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';
import { AppRoutingModule } from "src/app/app-routing.module";

@NgModule({
  declarations: [ButtonComponent],
  imports: [CommonModule, AppRoutingModule],
  exports: [ButtonComponent],
})
export class ButtonModule {}
