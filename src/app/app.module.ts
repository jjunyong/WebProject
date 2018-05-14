import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';

import { MaterialModule } from './modules/material/material.module';
import { RankComponent } from './components/rank/rank.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';
import { AppRoutingModule } from './modules/app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    RankComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
    AppRoutingModule

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
