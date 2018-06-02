import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Timestamp } from '@firebase/firestore-types';

export interface Notice {
  title: string;
  content: string;
  timestamp: Timestamp;
}

@Injectable()
export class NoticeService {
  private noticesCollection: AngularFirestoreCollection<Notice>;
  private noticeDoc: AngularFirestoreDocument<Notice>;

  constructor(private afs: AngularFirestore) {
    this.noticesCollection = this.afs.collection<Notice>('notices');
   }

  getNotices() {
    return this.noticesCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, data };
      });
    });
  }

  getNotice(id: string) {
    this.noticeDoc = this.noticesCollection.doc(id);
    return this.noticeDoc.snapshotChanges().map(a => {
        const data = a.payload.data();
        // tslint:disable-next-line:no-shadowed-variable
        const id = a.payload.id;
        return { id, data };
      });
  }

}
