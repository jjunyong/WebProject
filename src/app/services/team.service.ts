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
    this.teamDoc = this.teamCollection.doc(tid);
    return this.teamDoc.snapshotChanges().map(a => {
      const data = a.payload.data();
      // tslint:disable-next-line:no-shadowed-variable
      const id = a.payload.id;
      return { id, data };
    });
  }

}
