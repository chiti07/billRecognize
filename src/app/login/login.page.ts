import { Component } from '@angular/core';
import { ToastController, NavController, LoadingController } from '@ionic/angular';
import * as firebase from 'firebase';
import { from } from 'rxjs';
import { CamPage } from '../cam/cam.page';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {

  email: string = "";
  password: string = "";

  constructor(public toastCrl: ToastController, public navCrl: NavController, public loadingCrl: LoadingController) {}

  login(){
    firebase.auth().signInWithEmailAndPassword(this.email, this.password).then
    (async (user)=>{
        console.log(user)
        let loading = await (await this.loadingCrl.create({
          spinner: 'bubbles',
          duration: 1000,
          showBackdrop: true
        })).present();

        let toast =await this.toastCrl.create({
          message: "WELCOME " + user.user.displayName,
          duration: 3000,
          position: "top"
        })
        toast.present();

        this.navCrl.navigateForward('cam');
      }).catch(async (err)=>{
        console.log(err);
        let toast = this.toastCrl.create({
          message: err.message,
          duration: 3000,
          position: "top"
        })
        await (await toast).present();
      })
  }

}
