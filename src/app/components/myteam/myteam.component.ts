import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { TeamService } from '../../services/team.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material';
import { AngularFirestore } from 'angularfire2/firestore';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-myteam',
  templateUrl: './myteam.component.html',
  styleUrls: ['./myteam.component.css']
})
export class MyteamComponent implements OnInit {
  curerntUser;
  teams = new Array();

  constructor(
    private auth: AuthService,
    private teamService: TeamService,
    public snackBar: MatSnackBar,
    public afs: AngularFirestore,
    public dialog: MatDialog
  ) {
    this.curerntUser = this.auth.userDetails;
  }

  ngOnInit() {
    this.curerntUser = this.auth.userDetails;

    if (this.curerntUser != null) {
      this.getTeams();
    }

  }

  getTeams(): void {
    this.teamService.getMyTeams(this.curerntUser.uid)
      .subscribe(teams => {
        console.log(teams);
        const temp = new Array();
        teams.forEach((v: any) => {
          console.log(v);
          this.teamService.getMyTeam(v.tid)
            .subscribe((team: any) => {
              team.match_num = team.win + team.lose;
              console.log(team);

              temp.push(team);
            });
        });
        this.teams = temp;

      });
  }
  // openDialog(team){



  //   }
  //
  // this.afs.collection('teams').doc(team.tid).delete().then();
  // this.afs.collection('users').doc(this.curerntUser.uid).collection('teams').doc(team.tid).delete().then();


  deleteTeam(team) {
    this.snackBar.open('delete!', 'are you tanos?..ㅠㅠ    ', {
      duration: 3000,
    });

    console.log(team);
    this.afs.collection('teams').doc(team.tid).delete().then();
    this.afs.collection('teams').doc(team.tid).collection('members').valueChanges()
      .subscribe(a => {
        a.forEach((v: any) => {
          this.afs.collection('teams').doc(team.tid).collection('members').doc(v.uid).delete();
        });
      });

    this.afs.collection('users').doc(this.curerntUser.uid).collection('teams').doc(team.tid).delete().then();

  }
}
