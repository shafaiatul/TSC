import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { AngularMaterialModule } from '../angular-material.module';
import { NotificationToastComponent } from './notification-toast/notification-toast.component';





@NgModule({
  declarations: [NotificationToastComponent ],
  imports: [
    CommonModule, FormsModule, AngularMaterialModule
  ],
  exports: [NotificationToastComponent]
})
export class SharedModule { }
