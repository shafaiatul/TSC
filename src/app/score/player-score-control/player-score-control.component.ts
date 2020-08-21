import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlayerData } from 'src/app/_models/player';
import { NotificationToastComponent } from 'src/app/shared/notification-toast/notification-toast.component';
import { PopupInvokeService } from 'src/app/_services/popup-invoke.service';

@Component({
  selector: 'app-player-score-control',
  templateUrl: './player-score-control.component.html',
  styleUrls: ['./player-score-control.component.scss']
})
export class PlayerScoreControlComponent implements OnInit {

  activeServer1: boolean = true;
  activeServer2: boolean = false;

  changeServer() {
    if(this.activeServer1) {
      this.activeServer1 = false;
      this.activeServer2 = true;
    } else {
      this.activeServer1 = true;
      this.activeServer2 = false;
    }
  }

  game1: number = 0;
  point1: any = 0;

  game2: number = 0;
  point2: any = 0;

  isGamePoints: boolean = true;

  isTieBreaker: boolean = false;

  tiebreakPoint1: number;
  tiebreakPoint2: number;

  makePoints_outOfScene_for_tieBreak() {
    this.point1 = 'outOfscene';
    this.point2 = 'outOfscene';
  }

  constructor(
    public popup: PopupInvokeService,
    public dialogRef: MatDialogRef<PlayerScoreControlComponent>,
    @Inject(MAT_DIALOG_DATA) public playerInfo: PlayerData
  ) { }

  ngOnInit() {

  }

  winOverAllMatch(p) {
    if(p === 'p1') {
      this.popup.CallNotification(
        NotificationToastComponent, '', '',`🏆Winner🏆 is ${this.playerInfo.playerOne} 🎉🎉`, 6000, 'center', ''
      );
      this.dialogRef.close({ "action": "close" });
    }
    if(p === 'p2') {
      this.popup.CallNotification(
        NotificationToastComponent, '', '',`🏆Winner🏆 is ${this.playerInfo.playerTwo} 🎉🎉`, 6000, 'center', ''
      );
      this.dialogRef.close({ "action": "close" });
    }
  }

  startTieBreaker() {
    this.isTieBreaker = true;
    this.tiebreakPoint1 = 0;
    this.tiebreakPoint2 = 0;
    this.isGamePoints = false;
    this.popup.CallNotification(
      NotificationToastComponent, '', '', 'Tie Breaker', 2000, 'center', ''
    );
  }


  fireDeuce(p, oppnent) {

    if(
      this.point2 === this.playerInfo.gamePoints &&
      this.point1 === this.playerInfo.gamePoints
    ) {
      this.popup.CallNotification(
        NotificationToastComponent, '', '', 'DEUCE', 3000, 'center', ''
      );
    }

    if(p === 'p1' && oppnent === 'Ad') {
      this.point2 = this.playerInfo.gamePoints;
      this.point1 = this.playerInfo.gamePoints;
      this.popup.CallNotification(
        NotificationToastComponent, '', '', 'DEUCE', 3000, 'center', ''
      );
    }
    if(p === 'p2' && oppnent === 'Ad') {
      this.point1 = this.playerInfo.gamePoints;
      this.point2 = this.playerInfo.gamePoints;
      this.popup.CallNotification(
        NotificationToastComponent, '', '', 'DEUCE', 3000, 'center', ''
      );
    }


  }

  winGame(p) {
    // Change Serving
    this.changeServer();
    // make the points back to Zero
    this.point1 = 0;
    this.point2 = 0;
    // Add 1 game to Winner
    if(p === 'p1') {
      this.game1++;
      if(this.game1 === (this.playerInfo.gamePoints/10)) {
        this.winOverAllMatch(p);
      }
    }
    if(p === 'p2') {
      this.game2++;
      if(this.game2 === (this.playerInfo.gamePoints/10)) {
        this.winOverAllMatch(p);
      }
    }

    if(this.game1 === this.game2) {
      this.startTieBreaker();
    }
  }

  win_without_deuce(p, opponent) {
    if(
      (p > this.playerInfo.gamePoints) &&
      (opponent < this.playerInfo.gamePoints)
    ) {
      return true
    }
  }

  playerOneScored(p1) {
    // Before Tie Breaker
    if(this.isGamePoints) {
      if(this.point1 === 'Ad') {
        return this.winGame(p1);
      }


      if (this.check_if_p1_and_p2_same_as_gamePonts(this.point1, this.point2)) {
        this.point1 = 'Ad';
      } else {
        this.point1 += 10;
        if(this.win_without_deuce(this.point1, this.point2)) {
          return this.winGame(p1);
        }
      }

      this.fireDeuce(p1, this.point2);
    }

    // During Tie Breaker
    if(this.isTieBreaker) {
      this.makePoints_outOfScene_for_tieBreak();
      this.tiebreakPoint1 += 1;
      if(this.tiebreakPoint1 === (this.playerInfo.gamePoints/10)) {
        this.winOverAllMatch(p1);
      }
      // Change Serving
      this.changeServer();
    }

  }

  playerTwoScored(p2) {
    // Before Tie Breaker
    if(this.isGamePoints) {
      if(this.point2 === 'Ad') {
        return this.winGame(p2);
      }


      if (this.check_if_p1_and_p2_same_as_gamePonts(this.point1, this.point2)) {
        this.point2 = 'Ad';
      } else {
        this.point2 += 10;
        if(this.win_without_deuce(this.point2, this.point1)) {
          return this.winGame(p2);
        }
      }

      this.fireDeuce(p2, this.point1);
    }

    // During Tie Breaker
    if(this.isTieBreaker) {
      this.makePoints_outOfScene_for_tieBreak();
      this.tiebreakPoint2 += 1;
      if(this.tiebreakPoint2 === (this.playerInfo.gamePoints/10)) {
        this.winOverAllMatch(p2);
      }
      // Change Serving
      this.changeServer();
    }

  }

  playerOne_undoScore(p1) {
    // Before Tie Breaker
    if(this.isGamePoints) {
      if(this.point1 === 'Ad') {
        this.point1 = this.playerInfo.gamePoints
      } else {
        this.point1 -= 10;
      }
    }
    // During Tie Breaker
    if(this.isTieBreaker) {
      this.tiebreakPoint1 -= 1;
    }

  }

  playerTwo_undoScore(p2) {
    // Before Tie Breaker
    if(this.isGamePoints) {
      if(this.point2 === 'Ad') {
        this.point2 = this.playerInfo.gamePoints
      } else {
        this.point2 -= 10;
      }
    }
    // During Tie Breaker
    if(this.isTieBreaker) {
      this.tiebreakPoint2 -= 1;
    }



  }

  check_if_p1_and_p2_same_as_gamePonts(p1, p2) {
    if (
      (p1 === this.playerInfo.gamePoints) &&
      (p2 === this.playerInfo.gamePoints)
    ) {
      return true;
    }
  }




  quitMatch() {
    this.dialogRef.close({ "action": "close" });
  }

}
