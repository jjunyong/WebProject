import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
// import { ENGINE_METHOD_DIGESTS } from 'constants';
import { AuthService } from '../../../services/auth.service';
import { TeamService } from '../../../services/team.service';

@Component({
  selector: 'app-create-match',
  templateUrl: './create-match.component.html',
  styleUrls: ['./create-match.component.css']
})
export class CreateMatchComponent implements OnInit {

  darkClock: any;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  teamControl = new FormControl('', [Validators.required]);
  fieldControl = new FormControl('', [Validators.required]);
  myTeams = new Array();
  // checked: boolean =false;
  selectedTeam;
  selectedField;
  selectedStartTime = new FormControl(new Date());
  selectedEndTime = new FormControl(new Date());
  selectedDate = new FormControl(new Date());
  host_thumbnail;

  fields = ['평봉 필드', '히딩크 드림필드'];

  constructor(private afs: AngularFirestore,
    private _formBuilder: FormBuilder,
    private auth: AuthService,
    private teamService: TeamService
  ) {
    const uid = this.auth.userDetails.uid;
    this.getTeams(uid);
    // this.afs.collection("users").doc(uid).collection("teams").valueChanges()
    //   .subscribe((data) => {
    //     this.myTeams = data;
    //   });
  }

  ngOnInit() {

    // $('#basicExample').timepicker();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    // this.afs.collection("teams", ref=> ref.where('name','==',''+this.selectedTeam.name)).valueChanges()
    //   .subscribe((data)=>{
    //     this.host_thumbnail = data[0];
    //     console.log(this.host_thumbnail);
    //   })
  }

  getTeams(uid): void {
    this.teamService.getMyTeams(uid)
      .subscribe(teams => {
        console.log(teams);
        teams.forEach((v: any) => {
          console.log(v);
          this.teamService.getMyTeam(v.tid)
            .subscribe(team => {
              console.log(team);

              this.myTeams.push(team);
            });
        });

      });
  }


  createMatch() {
    // console.log(this.selectedTeam);

    this.afs.collection('matches').add({
      host_team: this.selectedTeam.name,
      host_id: this.selectedTeam.tid,
      location: this.selectedField,
      start_date: this.selectedDate.value,
      start_time: this.selectedStartTime.value,
      end_time: this.selectedEndTime.value,
      thumbnail: this.selectedTeam.thumbnail,
      updated: new Date(),
      isMatched: false
    });
  }

  // valueChange(){
  //   if(this.checked){
  //     this.checked = false;
  //   }
  //   else{
  //     this.checked = true;
  //   }
  // }

}
