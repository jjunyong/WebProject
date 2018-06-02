import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-matching-detail',
  templateUrl: './matching-detail.component.html',
  styleUrls: ['./matching-detail.component.scss']
})
export class MatchingDetailComponent implements OnInit {

  match:any;
  result;
  text;

  constructor(public afs: AngularFirestore, private route: ActivatedRoute) { 

    const id = this.route.snapshot.paramMap.get('id');

    this.afs.collection("matches").doc(id).valueChanges()
      .subscribe((data)=>{
        this.match = data;
        this.result = this.match.result;
      })



  }

  ngOnInit() {
  }

  submit(){
    const id = this.route.snapshot.paramMap.get('id');
    this.afs.collection("matches").doc(id).collection("comments").add({
      content : this.text
    })
  }

}
