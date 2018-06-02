import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';

import { MaterialModule } from './modules/material/material.module';
import { RankComponent } from './components/rank/rank.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AppRoutingModule } from './modules/app-routing.module';
import { NavigationComponent } from './components/navigation/navigation.component';

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

@NgModule({
  declarations: [
    AppComponent,
    RankComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
    NavigationComponent,
    SidenavComponent,
    FooterComponent,
    NoticeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    FlexLayoutModule
  ],
  providers: [
    AuthService,
    NoticeService,
    RankService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
