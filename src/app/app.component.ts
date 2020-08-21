import { Component, OnInit } from '@angular/core';



import { slider, transformer, fader, stepper } from './route-animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [

    // fader,
    slider,
    // transformer,
    // stepper
  ]
})
export class AppComponent implements OnInit {


  constructor() {}

     /* To Check whether the token has been expired or not */


   ngOnInit () {


  }


}
