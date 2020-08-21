import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';





const routes: Routes = [

  { path: 'Start', loadChildren: () => import('./score/score.module').then(m => m.ScoreModule) },
  { path: "", redirectTo: "Start", pathMatch: "full" },
  { path: '**', redirectTo: 'Start', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
