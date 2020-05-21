import { Injectable } from '@angular/core';
//import { AngularFireDatabase } from "angularfire"
import * as firebase from 'firebase';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class CargarArchivoService {

  constructor(public toastCtrl: ToastController) { }

  cargar_imagen_firebase(archivo: ArchivoSubir){
    let promesa = new Promise((resolve, reject) =>{
      this.mostrarToast('Cargando..');

      let storeRef = firebase.storage().ref();
      let nombreArchivo: string = new Date().valueOf().toString();

      let uploadTask: firebase.storage.UploadTask =
        storeRef.child(`postImg/${ nombreArchivo }`)
        .putString(archivo.img, 'base64', { contentType: 'image/jpeg' });

      uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
        ()=>{ }, 
        (error) => {
          console.error("Error en la carga");
          this.mostrarToast(JSON.stringify(error));
          reject();
          
        },
        ()=>{
          //Todo bien!
          console.log('Archivo subido');
          this.mostrarToast('Imagén cargada')

          uploadTask.snapshot.ref.getDownloadURL().then(async (url) =>{
            this.mostrarToast(url);
            firebase.firestore().collection("posts").doc(name).update({
              image: url
            }).then(() =>{
              resolve()
            }).catch((err) => {
              reject()
            })

          })
          
          
          resolve();

        }
        
        )

    });
    return promesa;
  }

  async mostrarToast(mensaje: string){
    let toast =await this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      position: "top"
    })
    toast.present();
  }


}

interface ArchivoSubir{
  titulo: string;
  img: string;
  key?: string;
}