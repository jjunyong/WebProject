import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../components/login/login.component';
import { MainComponent } from '../components/main/main.component';
import { RankComponent } from '../components/rank/rank.component';
import { RegisterComponent } from '../components/register/register.component';


const routes: Routes = [
  { path: 'rank', component: RankComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
