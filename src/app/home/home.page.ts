import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  errMsg : string;

  signing : boolean; 
  SignBtnText : string = "Sign Up";
  errorShow : boolean = false;

  name : string;
  email : string;
  pass : string;

  constructor(
    public navCtrl: NavController,
  ) {
  }

  checkSignUpData(){
    if(this.name){
      if(this.email){
        if(this.pass){
          this.signUp();
        }else{this.showError("Enter your Password")}
      }else{this.showError("Enter your Email")}
    }else{this.showError("Enter your Name")}
  }

  signUp(){
    firebase.auth().createUserWithEmailAndPassword(this.email,this.pass).then(()=>{
      firebase.database().ref("User Data/Users/").child(firebase.auth().currentUser.uid).set({
        Name : this.name,
        Email : this.email,
        Password : this.pass,
        Loyalty : "Unverified"
      })
    }).catch((e)=>{
      var err = e.message;
      this.showError(err);
    })
  }

  showError(msg){
    this.errorShow = true;
      this.errMsg = msg;
    setTimeout(() => {
      this.hideError();
    }, 3000);
  }


  hideError(){
    this.errorShow = false;
    this.errMsg = null;
  }


  gtLogin(){
    this.navCtrl.navigateForward('/login');
  }
  gtSignUp(){
    this.navCtrl.navigateForward('/signUp');
  }
  

}
