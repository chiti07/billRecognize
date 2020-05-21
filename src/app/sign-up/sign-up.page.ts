import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController, NavController } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  name: string = "";
  mail: string = "";
  password: string = "";
  confirmpw: string = "";

  constructor(public toastCrl: ToastController, public alertCrl: AlertController, public navCrl: NavController ) { }

  signup(){
    console.log(this.name, this.mail, this.password, this.confirmpw);
    firebase.auth().createUserWithEmailAndPassword(this.mail, this.password).then(
      (data)=> {
        console.log(data);

        let newUser: firebase.User = data.user;
        newUser.updateProfile({
          displayName: this.name,
          photoURL: ""
        }).then(async ()=>{
          console.log("Profile Updated")

          ;(await this.alertCrl.create({
            message: "Your account has been created successfully",
            buttons: [
              {
                text: "OK",
                handler: () => {
                  this.navCrl.navigateForward('cam');

                }
              }
            ]
          })).present()
        }).catch((err)=>{
          console.log(err)
        })
        
    }).catch(async (err)=>{
        console.log(err); 
        let toast =await this.toastCrl.create({
          message:  err.message,
          duration: 3000,
          position: "top"
        })
        await toast.present();
    })
  }
  ngOnInit() {
  }

}
