import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import * as firebase from 'firebase';
import { LoginPage } from '../login/login.page';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DataService } from '../services/data.service';
import { FaceRecognitionResponse } from '../models/face.model';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-cam',
  templateUrl: './cam.page.html',
  styleUrls: ['./cam.page.scss'],
})
export class CamPage implements OnInit {
  
  image: string;
  faceApiResponse: Observable<FaceRecognitionResponse>;
  subscriptionKey: '4fd64726c73d4241a89008f9ad86adc0';



  constructor(public navCrl: NavController, public loadCrl: LoadingController,
    public toastCrl: ToastController, private camera: Camera, private dataService: DataService) { }

  ngOnInit() {
  }

  logout(){
    firebase.auth().signOut().then(async ()=>{
      let loading = (await this.loadCrl.create({
        animated: true,
        spinner: "bubbles",
        duration:500,
        translucent: true
      })).present();
      let toast = (await this.toastCrl.create({
        message: "SEE YOU NEXT TIME!",
        duration: 3000
      })).present();
      this.navCrl.navigateForward('login');
    });
  }

  addPhoto(){
    this.launchCamera();
  }

  launchCamera(){
    let options: CameraOptions={
      quality: 100,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      targetHeight: 512,
      targetWidth: 512,
      allowEdit: true
    }

    this.camera.getPicture(options).then((base64Image)=>{
      console.log(base64Image);
      this.image = "data:image/png;base64," + base64Image;
      this.dataService.getBillValue(this.subscriptionKey,base64Image)
    }).catch((err)=>{
      console.log(err)
    })
  }

  processImage(){
    if (!this.subscriptionKey) {
      return;
    }

     this.camera.getPicture().then(
     (base64Image: string) => {
        this.image = base64Image;
        return this.dataService.getBillValue(
          this.subscriptionKey,
          base64Image
        );
      })
    ;
  }

}
