import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable()
export class RankService {
  private rankCollection: AngularFirestoreCollection<any>;
  private rankDoc: AngularFirestoreDocument<any>;

  constructor(private afs: AngularFirestore) {
    this.rankCollection = this.afs.collection<any>('teams', ref => ref.orderBy('win', 'desc'));
  }

  getTeams() {
    return this.rankCollection.valueChanges();
    // .snapshotChanges().map(actions => {
    //   return actions.map(a => {
    //     // tslint:disable-next-line:prefer-const
    //     let data = a.payload.doc.data();
    //     const id = a.payload.doc.id;
    //     return { id, data };
    //   });
    // });
  }

  getTeam(id: string) {
    this.rankDoc = this.rankCollection.doc(id);
    return this.rankDoc.snapshotChanges().map(a => {
      const data = a.payload.data();
      // tslint:disable-next-line:no-shadowed-variable
      const id = a.payload.id;
      return { id, data };
    });
  }
}
