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
  constructor(public auth: AuthService,
    public dialog: MatDialog,
    public teamService: TeamService,
    public afAuth: AngularFireAuth,
    public afs:AngularFirestore) {
    this.currentUser;
  }

  ngOnInit() {


  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
  pop() {
    // this.currentUser = this.afAuth.auth.currentUser.uid;
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '300px',
      // height: '300px',
      // data : this.info
    })

    dialogRef.afterClosed().subscribe(result=>{
     
      this.teamService.getRequest(this.afAuth.auth.currentUser.uid)
      .subscribe((data) => {
        this.info = data;

        if(result){//신청이 들어온 해당 매치의 isMatched를 바꾸어주어야 함. 
          this.afs.collection('matches').doc(this.info.matchRequestMatch).update({
            // away_team : ,
            // away_id: ,
            isMatched : true
          })
        }
        else{
          console.log("거부");
        }
      })

      
    })
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog.html',
})
export class DialogOverviewExampleDialog {

  info;
  requestTeam;

  constructor(
    private teamService: TeamService,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.teamService.getRequest(this.afAuth.auth.currentUser.uid)
      .subscribe((data) => {
        this.info = data;
        // console.log(this.info)

        this.afs.collection('users').doc(this.info.matchRequestFrom).valueChanges()
          .subscribe((data) => {
            this.requestTeam = data;
          })
      })



  }
}


