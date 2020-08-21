import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PlayerData } from 'src/app/_models/player';
import {MatDialog} from '@angular/material/dialog';
import { PlayerScoreControlComponent } from '../player-score-control/player-score-control.component';


@Component({
  selector: 'app-player-input',
  templateUrl: './player-input.component.html',
  styleUrls: ['./player-input.component.scss']
})



export class PlayerInputComponent implements OnInit {
  public game_points: number[] = [20, 40];
  public player = new PlayerData();

  @ViewChild('playerForm') playerForm :NgForm;

  constructor( public dialog: MatDialog) { }

  ngOnInit() {
  }

  startGame() {
    this.openAddEditUserDialog();
  }

  openAddEditUserDialog(): void {
    const dialogRef = this.dialog.open(PlayerScoreControlComponent, {
      panelClass: 'score__popup',
      disableClose: true,
      data: this.player
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result.action === 'close') {
        this.playerForm.resetForm();
      } else return;
    });
  }

}
