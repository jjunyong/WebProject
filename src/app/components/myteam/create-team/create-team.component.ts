import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { TeamService } from '../../../services/team.service';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

class team{
  name : string;
  thumbnail : string;
  image : string;
}

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {

  task : AngularFireUploadTask;
  percentage : Observable<number>;
  snapshot: Observable<any>;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  teamControl = new FormControl('', [Validators.required]);
  fieldControl = new FormControl('', [Validators.required]);
  team : team;
  currentUid;
  constructor(private afs:AngularFirestore,
    private storage : AngularFireStorage,
    private teamService : TeamService,
    private location : Location,
    public snackBar : MatSnackBar,
    public auth : AngularFireAuth
  ) { 
    this.team = new team();
    this.team.thumbnail = "https://cdn3.iconfinder.com/data/icons/soccer-14/33/soccer_team-512.png";
    this.team.image = "http://img.etoday.co.kr/pto_db/2017/09/20170901085445_1120007_540_346.jpg";
    this.currentUid = this.auth.auth.currentUser.uid;
  }

  ngOnInit() {
  }

  goBack(){
    if(this.team.thumbnail == "" && this.team.image == ""){
      throw new Error("no image for your team!")
    }
    this.teamService.addTeam(this.team, this.currentUid);
    this.location.back();
    this.snackBar.open("Team added","",{
      duration: 2000
    })
  }
  startUpload(event : FileList){
    const file = event.item(0);

    // Client-side validation example
    if(file.type.split('/')[0] !== 'image'){
      console.error("Unsupported file type!");
      return;
    }

    // Storage path
    // const path = `hero_image/${new Date().getTime()}_${file.name}`;
    const path = `team_thumbnails/${file.name}`;
    const customMetadata = { app : 'My FinalExam web' }
    
    // Subscribe is not required it is automatic
    this.task = this.storage.upload(path, file, { customMetadata });

    // progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges();
    // this.snapshot = this.task.snapshotChanges().pipe(
    //   tap(snap=>{
    //     if(snap.bytesTransferred === snap.totalBytes){
    //       this.firestore.collection("test").add({
    //         path,
    //         size: snap.totalBytes
    //       })
    //     }
    //   })
    // )
    // The file's download URL! 여기서 subscribe하여 url를 hero.img에 저장해야 한다. subscribe를 해야 Observable<string> 타입이 아닌
    // string type으로 반환되기 때문!
    this.task.downloadURL()
      .subscribe(url=>
        this.team.thumbnail = url
      )
  }

  // Data contained in the snapshot is very useful for customizing behavior in Front-end as below;
  isActive(snapshot){
     return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }
}
