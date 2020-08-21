import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class PopupInvokeService {

  constructor(public snackBar: MatSnackBar) { }

  CallNotification(popupComponent, icon, iconColorClass, text, duration, position, popupDef ) {
    // popupComponent = which component to fire
    // icon = 'check_circle' => ( for success), 'cancel' => (for error), 'notification_important ' => (for general notification)n
    // iconColorClass = 'success_icon_color' (for success) 'error_icon_color' => (for error)
    // text = 'Which describes the action'
    // duration = in miliseleconds for example 4000 (4 seconds)
    // position = 'start' | 'center' | 'end' | 'left' | 'right',
    // popupDef = optional
    this.snackBar.openFromComponent(popupComponent, {
      duration,
      horizontalPosition: position,
      data: {
        icon,
        iconColorClass,
        text,
        popupDef
      }
    });
  }
}
