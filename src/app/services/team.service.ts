import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

@Injectable()
export class TeamService {
  private teamCollection: AngularFirestoreCollection<any>;
  private teamDoc: AngularFirestoreDocument<any>;

  constructor(private afs: AngularFirestore) {
    this.teamCollection = this.afs.collection<any>('teams');
  }

  getMyTeams(uid) {
    return this.afs.collection('users').doc(uid).collection('teams').valueChanges();
    // .snapshotChanges().map(actions => {
    //   return actions.map(a => {
    //     // tslint:disable-next-line:prefer-const
    //     let data = a.payload.doc.data();
    //     const id = a.payload.doc.id;
    //     return { id, data };
    //   });
    // });
  }

  getMyTeam(tid: string) {
    return this.teamCollection.doc(tid).valueChanges();
  }

  getMyTeamMember(tid: string) {
    return this.teamCollection.doc(tid).collection('members').valueChanges();
  }

  addMember(tid, uid) {
    this.afs.collection('teams').doc(tid).collection('members')
      .doc(uid).set({
        uid: uid
      });
    this.afs.collection('users').doc(uid).collection('teams')
      .doc(tid).set({
        tid: tid
      });
  }

  addTeam(team, uid) {
    const id = this.afs.createId();
    this.afs.collection("teams").doc(id).set({
      name: team.name,
      thumbnail: team.thumbnail
    });

    this.afs.collection('users').doc(uid).collection('teams').doc(id).set({
      name: team.name,
      thumbnail: team.thumbnail
    })
  }
}
