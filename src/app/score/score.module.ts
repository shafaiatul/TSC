import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { ScoreRoutingModule } from './score-routing.module';
import { PlayerInputComponent } from './player-input/player-input.component';
import { PlayerScoreControlComponent } from './player-score-control/player-score-control.component';
import { AngularMaterialModule } from '../angular-material.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [PlayerInputComponent, PlayerScoreControlComponent],
  imports: [
    CommonModule,
    ScoreRoutingModule,
    FormsModule,
    AngularMaterialModule,
    SharedModule
  ]
})
export class ScoreModule { }
