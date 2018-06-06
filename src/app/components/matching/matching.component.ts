import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { MatchService } from '../../services/match.service';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TeamService } from '../../services/team.service';


// class Team{
//   name : string;
// }

@Component({
  selector: 'app-matching',
  templateUrl: './matching.component.html',
  styleUrls: ['./matching.component.css']
})
export class MatchingComponent implements OnInit {

  id: any;
  // selected1: Team;
  // selected2: Team;
  // myTeamControl = new FormControl('', [Validators.required]);
  // teamControl = new FormControl('', [Validators.required]);
  // teams : Team[];
  //myTeams : Team[];
  //teams : Team[];

  matches: any;

  constructor(private snackBar: MatSnackBar,
    private afAuth: AngularFireAuth,
    public afs: AngularFirestore, public matService: MatchService,
    public auth: AuthService,
    public router: Router,
    private dialog: MatDialog
  ) {
    this.afs.collection("matches")
      .snapshotChanges().map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data }
        });
      }).subscribe((data) => {
        this.matches = data;
      })
  }

  ngOnInit() {
  }

  matchRequest(match) {


    let dialog = this.dialog.open(DialogOverviewExampleDialog2, {
      width: '300px',
      height: '300px',
      data: match
    })

    dialog.afterClosed().subscribe(result => {

    })
  }
}



@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'test.html',
})
export class DialogOverviewExampleDialog2 {

  teamControl = new FormControl('', [Validators.required]);
  selectedTeam;
  myTeams = new Array();
  id;
  match
  constructor(private auth: AuthService,
    private teamService: TeamService,
    private afs: AngularFirestore,
    private matService: MatchService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    const uid = this.auth.userDetails.uid;
    this.getTeams(uid);

  }

  getTeams(uid) {
    this.teamService.getMyTeams(uid)
      .subscribe(teams => {
        console.log(teams);
        teams.forEach(v => {
          console.log(v);
          this.teamService.getMyTeam(v.tid)
            .subscribe(team => {
              console.log(team);
              this.myTeams.push(team);
            });
        });
      });

      this.afs.collection('matches').doc(this.data).valueChanges()
      .subscribe((data) => {
        this.match = data
        this.afs.collection('teams').doc(this.match.host_id).collection('members').valueChanges()
          .subscribe((members) => {
            let member = members;

            member.forEach(
              (element) => {
                this.afs.collection('users').doc(element.uid).update({
                  matchRequestFrom: this.selectedTeam.tid,
                  matchRequestMatch: this.data.id
                })
              }
            )
          })
      });




    // this.snackBar.open("매치 신청 완료!", "", {
    //   duration: 1000,
    // });

    // this.afs.collection('matches').doc(this.data).update({
    //   away_id: this.selectedTeam.tid,
    //   away_team: this.selectedTeam.name
    // })
  }
}

