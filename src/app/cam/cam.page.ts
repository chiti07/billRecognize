import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import * as firebase from 'firebase';
import { LoginPage } from '../login/login.page';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DataService } from '../services/data.service';
import { FaceRecognitionResponse } from '../models/face.model';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CargarArchivoService } from '../services/cargar-archivo.service';
import { Vibration } from '@ionic-native/vibration/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { resolve } from 'url';




@Component({
  selector: 'app-cam',
  templateUrl: './cam.page.html',
  styleUrls: ['./cam.page.scss'],
})
export class CamPage implements OnInit {
  
  text: string ="";
  image: string;
  posts: any[] = [];
  imagen64: string;
  titulo: string;
  imageUrl: string;
  billValue: string;


  constructor(public navCrl: NavController, public loadCrl: LoadingController,
    imageUrl = '', private data: DataService,
    public toastCrl: ToastController, private camera: Camera,
    private dataService: DataService, public cargarArchivo: CargarArchivoService,
    private vibration: Vibration, private nativeAudio: NativeAudio) {

      this.getPosts();
     }

  ngOnInit() {
    this.nativeAudio.preloadSimple('beep', 'assets/morse.mp3');
    this.nativeAudio.preloadComplex('hello', 'assets/beep01.mp3',1,1,2);
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
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      targetHeight: 512,
      targetWidth: 512,
      allowEdit: true
    }

    this.camera.getPicture(options).then((base64Image)=>{
      console.log(base64Image);
      this.image = "data:image/jpeg;base64," + base64Image;
      this.imagen64 = base64Image;
      //this.dataService.getBillValue(this.subscriptionKey,base64Image)
    }).catch((err)=>{
      console.log(err)
    })
  }

  getPosts(){
    firebase.firestore().collection("posts").get()
    .then((docs) => {
      docs.forEach((doc)=>{
        this.posts.push(doc);
      })
    }).catch((err) => {
      console.error(err);
      
    })
  }


  count: number = 0;

  post(){
    firebase.firestore().collection("posts").add({
      text: this.text,
      created: firebase.firestore.FieldValue.serverTimestamp(),
      owner: firebase.auth().currentUser.uid,
      owner_name: firebase.auth().currentUser.displayName
    }).then((doc)=>{
      console.log(doc)
      if(this.image){
        this.mostrarLoading("Analazying..")
        this.crearPost();
        this.getValue(this.image);              
      }
      this.image = undefined;

      
      
    }).catch((err) => {
      console.error(err);
      
    })
  }


  upload(name:string){
  return new Promise(async (resolve, reject)=>{
    
    let ref =firebase.storage().ref("postImages/" + name);
    let uploadTask = ref.putString(this.image.split(',')[1], "base64");
    uploadTask.on("state_changed", (taskSnapshot: any) => {
      console.log(taskSnapshot)
      // let percentage = taskSnapshot.bytesTransferred / taskSnapshot.totalBytes *100;
      // let loading = (await this.loadCrl.create({

        // message: "Uploaded " + percentage + "% ..."
       
      // })).present();
     }, (error) => {
     // this.loadCrl.dismiss().then();
      console.log(error)
    }, () => {
      console.log("The upload is completed");
      //this.loadCrl.dismiss().then();

      uploadTask.snapshot.ref.getDownloadURL().then(async (url) => {
        console.log(url);
         let toast =await this.toastCrl.create({
           message: url,
           duration: 3000,
           position: "top"
         })
         toast.present();
        firebase.firestore().collection("posts").doc(name).update({
          image: url
          
        }).then(() => {
         // this.loadCrl.dismiss().then();
          resolve()
        }).catch((err) => {
          //this.loadCrl.dismiss().then();
          reject()
        })
        
        }).catch((err)=> {
          //this.loadCrl.dismiss().then();
          reject()
        })
       
      })
    
  })

   

  }

  crearPost(){
    let archivo = {
      img: this.imagen64,
      titulo: this.titulo
    }

    this.cargarArchivo.cargar_imagen_firebase(archivo);

  }

  getValue(imageUrl: string){
    this.data.getBillValue(imageUrl).subscribe(data =>{
      this.billValue = data.recognitionResult.text;

      if (this.billValue.search('1000')) {
        this.vibration.vibrate([1000]);
      }else  if(this.billValue.search('2000')){
        this.vibration.vibrate([1000,1000,1000]);
      }else if(this.billValue.search('5000')){
        this.vibration.vibrate([1000,1000,1000,1000,1000]);
      }else if(this.billValue.search('10000')){
        this.vibration.vibrate([1000]);
        this.nativeAudio.play('beep');
      }else if(this.billValue.search('20000')){
        this.vibration.vibrate([1000,1000,1000]);
        this.nativeAudio.play('beep');
      }else if(this.billValue.search('50000')){
        this.vibration.vibrate([1000,1000,1000,1000,1000]);
        this.nativeAudio.play('beep');
      }
    })
  }

  async mostrarLoading(mensaje: string){
    let loading = await this.loadCrl.create({
      message: mensaje,
      duration: 2000,
          })
    loading.present();
  }

}
