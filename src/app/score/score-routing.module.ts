import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerInputComponent } from './player-input/player-input.component';


const routes: Routes = [
  { path: '', component: PlayerInputComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScoreRoutingModule { }
