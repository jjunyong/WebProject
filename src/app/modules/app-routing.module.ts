import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../components/login/login.component';
import { MainComponent } from '../components/main/main.component';
import { RankComponent } from '../components/rank/rank.component';
import { RegisterComponent } from '../components/register/register.component';
import { NoticeComponent } from '../components/notice/notice.component';
import { MatchingComponent } from '../components/matching/matching.component';
import { CreateMatchComponent } from '../components/matching/create-match/create-match.component';
import { MatchingDetailComponent } from '../components/matching/matching-detail/matching-detail.component';
import { MyteamComponent } from '../components/myteam/myteam.component';
import { CreateTeamComponent } from '../components/myteam/create-team/create-team.component';
import { TeamDetailComponent } from '../components/myteam/team-detail/team-detail.component';

const routes: Routes = [
  { path: 'rank', component: RankComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'notice/:id', component: NoticeComponent },
  { path: 'notice', component: NoticeComponent },
  { path: 'matching', component: MatchingComponent },
  { path: 'createMatch', component: CreateMatchComponent},
  { path: 'matchingDetail/:id', component : MatchingDetailComponent},
  { path: 'myteam', component : MyteamComponent},
  { path: 'createTeam', component : CreateTeamComponent},
  { path: 'teamDetail/:id', component : TeamDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
