import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { TeamService } from '../../services/team.service';


@Component({
  selector: 'app-myteam',
  templateUrl: './myteam.component.html',
  styleUrls: ['./myteam.component.css']
})
export class MyteamComponent implements OnInit {
  curerntUser;
  teams = new Array();

  constructor(
    private auth: AuthService,
    private teamService: TeamService
  ) {
    this.curerntUser = this.auth.userDetails;
  }

  ngOnInit() {
    this.curerntUser = this.auth.userDetails;

    if (this.curerntUser != null) {
      this.getTeams();
    }

  }

  getTeams(): void {
    this.teamService.getMyTeams(this.curerntUser.uid)
      .subscribe(teams => {
        console.log(teams);
        teams.forEach((v) => {
          console.log(v);
          this.teamService.getMyTeam(v.tid)
            .subscribe(team => {
              console.log(team);

              this.teams.push(team);
            });
        });

      });
  }

}
