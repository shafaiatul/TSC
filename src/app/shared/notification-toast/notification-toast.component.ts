import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';


@Component({
  selector: 'app-notification-toast',
  templateUrl: './notification-toast.component.html',
  styleUrls: ['./notification-toast.component.scss']
})

/*
  Please Check the 'Popup-invoke.service.ts' for popup method definition
*/

export class NotificationToastComponent implements OnInit {

  constructor(public snackBarRef: MatSnackBarRef<any>, @Inject(MAT_SNACK_BAR_DATA) public data: any) {
    console.log(this.data);
  }

  ngOnInit() {
  }
}
