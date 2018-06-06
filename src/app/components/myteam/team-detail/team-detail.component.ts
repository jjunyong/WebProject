import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { AuthService } from '../../../services/auth.service';
import { TeamService } from '../../../services/team.service';

import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {
  team;
  teamMembers = new Array();
  userCtrl: FormControl;
  filteredUsers: Observable<any[]>;

  users;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private teamService: TeamService
  ) {
    this.userCtrl = new FormControl();

  }

  ngOnInit() {
    this.getTeam();
    this.auth.getUsers()
      .subscribe(users => {
        console.log(users);
        this.users = users;
        //console.log(this.userCtrl.value);
        this.filteredUsers = this.userCtrl.valueChanges
          .pipe(
            startWith(''),
            map(user => user ? this.filterUsers(user) : this.users.slice())
          );
      });
  }

  filterUsers(name: string) {
    return this.users.filter(user =>
      user.displayName.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  addMember() {
    const tid = this.route.snapshot.paramMap.get('id');
    const uid = this.userCtrl.value;

    this.teamService.addMember(tid, uid);
  }

  getTeam() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);

    this.teamService.getMyTeam(id)
      .subscribe(team => this.team = team);
    this.teamService.getMyTeamMember(id)
      .subscribe(members => {
        members.forEach((v, i, arr) => {
          this.teamMembers = members;
          this.auth.getUser(v.uid)
            .subscribe(user => {
              // console.log(user);

              this.teamMembers.push(user);
            });
        });
      });
  }

}
