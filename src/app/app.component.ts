import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from  'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  // public appPages = [
  //   {
  //     title: 'Home',
  //     url: '/home',
  //     icon: 'home'
  //   },
  //   {
  //     title: 'List',
  //     url: '/list',
  //     icon: 'list'
  //   }
  // ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public router : Router,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
    //   firebase.auth().onAuthStateChanged((user) => {
    //     if (user) {
    //     this.router.navigateByUrl('/Dashboard');
    //     }
    //   else{
    //     this.router.navigateByUrl('/');
    //   }
    // });  



      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
