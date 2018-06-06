import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from '../../../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-matching-detail',
  templateUrl: './matching-detail.component.html',
  styleUrls: ['./matching-detail.component.scss']
})
export class MatchingDetailComponent implements OnInit {

  match: any;
  result;
  text: string;
  comments: any;
  teams: any;
  selectedTeam;

  constructor(public auth: AuthService,
    public afs: AngularFirestore, private route: ActivatedRoute,
    public afAuth: AngularFireAuth) {

    const id = this.route.snapshot.paramMap.get('id');

    this.afs.collection('matches').doc(id).valueChanges()
      .subscribe((data) => {
        this.match = data;
        this.result = this.match.result;
      });

    this.afs.collection('matches').doc(id).collection('comments').valueChanges()
      .subscribe((data) => {
        this.comments = data;
      });
    this.afs.collection('teams', ref => ref.orderBy('name', 'asc')).valueChanges()
      .subscribe((data) => {
        this.teams = data;
      });

  }

  ngOnInit() {
  }

  submit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    console.log(this.text);
    this.afs.collection('matches').doc(id).collection('comments').add({
      content: this.text,
      writer: this.afAuth.auth.currentUser.displayName,
      timestamp: new Date()
    });
  }

  change() {
    const id = this.route.snapshot.paramMap.get('id');
    this.afs.collection('matches').doc(id).update({
      result: this.selectedTeam.name
    });
  }

}
