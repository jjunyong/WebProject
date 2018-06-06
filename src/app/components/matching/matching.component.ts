import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { MatchService } from '../../services/match.service';
import {MatSnackBar} from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../../services/auth.service';


// class Team{
//   name : string;
// }

@Component({
  selector: 'app-matching',
  templateUrl: './matching.component.html',
  styleUrls: ['./matching.component.css']
})
export class MatchingComponent implements OnInit {

  id :any;
  // selected1: Team;
  // selected2: Team;
  // myTeamControl = new FormControl('', [Validators.required]);
  // teamControl = new FormControl('', [Validators.required]);
  // teams : Team[];
  //myTeams : Team[];
  //teams : Team[];

  matches : any;

  constructor(private snackBar: MatSnackBar,
    private afAuth : AngularFireAuth,
     public afs: AngularFirestore, public matService : MatchService,
    public auth: AuthService) {
  /*  this.afs.collection("users").doc('dhXWN9dQMHbTynfDjwkK').collection("teams").valueChanges()
      .subscribe( (data)=>{
          this.myTeams = data as Team[];
      })

    this.afs.collection("teams").valueChanges()
      .subscribe((data)=>{
        this.teams = data as Team[];
      })*/

    // this.afs.collection("matches").valueChanges()
    //   .subscribe((data)=>{
    //     this.matches = data;
    //   })
    this.afs.collection("matches")
      .snapshotChanges().map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data }
        });
      }).subscribe((data)=>{
        this.matches = data;
      })
    }

  ngOnInit() {
  }

  matchRequest(match){

    this.matService.get(match)
      .subscribe((data)=>{
        this.id = data[0].id;
        // console.log(this.id);

        this.matService.getUserId(this.id)
        .subscribe((data)=>{
          console.log(data);
        
          data.forEach(
            (element)=>{
              this.afs.collection("users").doc(element.id).update({
                matchRequestFrom : this.afAuth.auth.currentUser.uid,
                matchRequestMatch : match.id
              })
            }
          )
  
        })
      })

      this.snackBar.open("매치 신청 완료!","", {
          duration: 1000,
        });
  }

}
