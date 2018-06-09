import { Component, Inject, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TeamService } from '../../services/team.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();

  info;
  currentUser;
  temp;
  away;

  constructor(public auth: AuthService,
    public dialog: MatDialog,
    public teamService: TeamService,
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore) {

  }

  ngOnInit() {
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  pop() {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '300px',
      // height: '300px',
      // data : this.info
    });

    this.teamService.getRequest(this.afAuth.auth.currentUser.uid)
      .subscribe((data) => {
        this.info = data;
      });

    dialogRef.afterClosed().subscribe(result => {


      if (result) {// 신청이 들어온 해당 매치의 isMatched를 바꾸어주어야 함

        console.log(this.info.matchRequestFrom);

        this.afs.collection('teams').doc(this.info.matchRequestFrom).ref.get()
          .then((team) => {
            this.away = team.data();

            console.log(this.away);

            this.afs.collection('matches').doc(this.info.matchRequestMatch).update({
              away_team: this.away.name,
              away_id: this.info.matchRequestFrom,
              isMatched: true
            });

            this.afs.collection('users').doc(this.info.uid).update({
              matchRequestFrom: '',
              matchRequestMatch: ''
            });
          });
      } else {
        console.log('무시');
      }
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog.html',
})
export class DialogOverviewExampleDialog {

  info;
  public requestTeam;

  constructor(
    private teamService: TeamService,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.teamService.getRequest(this.afAuth.auth.currentUser.uid)
      .subscribe((currentUser) => {
        this.info = currentUser;

        if (this.info.matchRequestFrom !== '') {
          this.afs.collection('teams').doc(this.info.matchRequestFrom).valueChanges()
            .subscribe((team) => {
              this.requestTeam = team;
              console.log(this.requestTeam);
            });
        }
      });
  }

  onNoClick(): void {
    this.afs.collection('users').doc(this.info.uid).update({
      matchRequestFrom: '',
      matchRequestMatch: ''
    });

    this.dialogRef.close();
  }
}


