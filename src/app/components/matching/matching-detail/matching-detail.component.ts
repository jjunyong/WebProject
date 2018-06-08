import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from '../../../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { variable } from '@angular/compiler/src/output/output_ast';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-matching-detail',
  templateUrl: './matching-detail.component.html',
  styleUrls: ['./matching-detail.component.scss']
})
export class MatchingDetailComponent implements OnInit {

  match: any;
  result;
  contents: string;
  comments: any;
  host: any;
  away: any;
  selectedTeam;
  condition: boolean;
  defaultImage = "https://cdn3.iconfinder.com/data/icons/soccer-14/33/soccer_team-512.png";

  constructor(public auth: AuthService,
    public afs: AngularFirestore, private route: ActivatedRoute,
    public afAuth: AngularFireAuth) {

    const id = this.route.snapshot.paramMap.get('id');

    this.afs.collection('matches').doc(id).valueChanges()
      .subscribe((data) => {
        this.match = data;
        this.result = this.match.result;

        this.afs.collection('teams').doc(this.match.host_id).valueChanges()
          .subscribe((host) => this.host = host);
        this.afs.collection('teams').doc(this.match.away_id).valueChanges()
          .subscribe((away: any) => { 
            this.away = away
            this.defaultImage = away.thumbnail;
          });

          console.log(this.match.isMatched);
        console.log(this.match.result);
        if (this.match.isMatched && this.match.result === '') {
          this.condition = true;
        } else {
          this.condition = false;
        }
      });

    this.afs.collection('matches').doc(id).collection('comments').valueChanges()
      .subscribe((data) => {
        this.comments = data;
      });
  }

  ngOnInit() {
  }

  // submit() {
  //   const id = this.route.snapshot.paramMap.get('id');
  //   console.log(id);
  //   console.log(this.text);
  //   this.afs.collection('matches').doc(id).collection('comments').add({
  //     content: this.text,
  //     writer: this.afAuth.auth.currentUser.displayName,
  //     timestamp: new Date()
  //   });
  // }

  changeStatus() {
    const id = this.route.snapshot.paramMap.get('id');
    let winner, loser;
    if (this.selectedTeam.tid === this.match.host_id) {
      winner = this.match.host_id;
      loser = this.match.away_id;
    } else {
      loser = this.match.host_id;
      winner = this.match.away_id;
    }

    this.afs.collection('matches').doc(id).update({
      result: this.selectedTeam.name
    }).then(() => {
      this.afs.collection('teams').doc(winner).ref.get()
        .then((winnerTeam) => {
          console.log(winnerTeam);
          const match_num = winnerTeam.get('match_num') + 1;
          const win = winnerTeam.get('win') + 1;
          this.afs.collection('teams').doc(winner).update({
            match_num: match_num,
            win: win
          });

        });

      this.afs.collection('teams').doc(loser).ref.get()
        .then((loserTeam) => {
          const match_num = loserTeam.get('match_num') + 1;
          const lose = loserTeam.get('lose') + 1;
          this.afs.collection('teams').doc(loser).update({
            match_num: match_num,
            lose: lose
          });
        });

    });

  }


  action(){
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    console.log(this.contents);
    this.afs.collection('matches').doc(id).collection('comments').add({
      content: this.contents,
      writer: this.afAuth.auth.currentUser.displayName,
      timestamp: new Date()
    });
  
    this.contents = '';
  }
}
