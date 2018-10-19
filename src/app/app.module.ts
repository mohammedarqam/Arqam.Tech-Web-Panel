import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import * as firebase from 'firebase';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

export const firebaseCred = {
  apiKey: "AIzaSyBirqKnWOtxUKau3VYbS2AZN_1UnIubHoY",
  authDomain: "arqamtechweb.firebaseapp.com",
  databaseURL: "https://arqamtechweb.firebaseio.com",
  projectId: "arqamtechweb",
  storageBucket: "arqamtechweb.appspot.com",
  messagingSenderId: "1069269221821"
};
firebase.initializeApp(firebaseCred);


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseCred),
    AngularFireDatabaseModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
