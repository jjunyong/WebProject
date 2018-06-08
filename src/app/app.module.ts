import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';

import { MaterialModule } from './modules/material/material.module';
import { RankComponent } from './components/rank/rank.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AppRoutingModule } from './modules/app-routing.module';
import { NavigationComponent} from './components/navigation/navigation.component';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FooterComponent } from './components/footer/footer.component';
import { NoticeComponent } from './components/notice/notice.component';

import { AuthService } from './services/auth.service';
import { NoticeService } from './services/notice.service';
import { RankService } from './services/rank.service';
import { CreateMatchComponent } from './components/matching/create-match/create-match.component';
import { MAT_DATE_LOCALE, MAT_CHECKBOX_CLICK_ACTION } from '@angular/material';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatchService } from './services/match.service';
import { MatchingDetailComponent } from './components/matching/matching-detail/matching-detail.component';
import { MatchingComponent, DialogOverviewExampleDialog2 } from './components/matching/matching.component';
import { MyteamComponent } from './components/myteam/myteam.component';
import { CreateTeamComponent } from './components/myteam/create-team/create-team.component';
import { TeamDetailComponent } from './components/myteam/team-detail/team-detail.component';
import { TeamService } from './services/team.service';
import { DialogOverviewExampleDialog } from './components/navigation/navigation.component';
import { TeamEditComponent } from './components/myteam/team-edit/team-edit.component'

@NgModule({
  declarations: [
    AppComponent,
    RankComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
    MatchingComponent,
    MatchingDetailComponent,
    NavigationComponent,
    SidenavComponent,
    FooterComponent,
    NoticeComponent,
    CreateMatchComponent,
    MyteamComponent,
    CreateTeamComponent,
    TeamDetailComponent,
    DialogOverviewExampleDialog,
    DialogOverviewExampleDialog2,
    TeamEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    FlexLayoutModule
  ],
  entryComponents: [
    DialogOverviewExampleDialog,
    DialogOverviewExampleDialog2
  ],
  providers: [
    AuthService,
    NoticeService,
    RankService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check' },
    MatchService,
    TeamService
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
