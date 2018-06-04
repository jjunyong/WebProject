import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class MatchService {

  constructor(public afs: AngularFirestore) { }


  getMatches() {
    return this.afs.collection("matches")
    .snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, data }
      });
    })
  }


  get(match){

    return this.afs.collection("teams", ref=>ref.where('name','==',''+match.host_team))
      .snapshotChanges().map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data }
        });
      });

  }

  getUserId(id){
    console.log(id);
    return this.afs.collection("teams").doc(id).collection("members")
    .snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, data }
      });
    });
  }

}
