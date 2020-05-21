import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import * as firebase from 'firebase'; 
import { Camera } from '@ionic-native/camera/ngx';
import { DataService } from './services/data.service';
import { CargarArchivoService } from './services/cargar-archivo.service';

import { from } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { Vibration } from '@ionic-native/vibration/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
// import { HttpModule } from '@angular/http';




var firebaseConfig = {
  apiKey: "AIzaSyC2VzTmbgzCrxIzPbb_yU31GpuI-1aVR3s",
  authDomain: "billrecognizer-2dc95.firebaseapp.com",
  databaseURL: "https://billrecognizer-2dc95.firebaseio.com",
  projectId: "billrecognizer-2dc95",
  storageBucket: "billrecognizer-2dc95.appspot.com",
  messagingSenderId: "266360068290",
  appId: "1:266360068290:web:7051f056c3b5e04388835b",
  measurementId: "G-DSY5DQZEC6"
};
firebase.initializeApp(firebaseConfig);


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera,
    DataService,
    CargarArchivoService,
    Vibration,
    NativeAudio
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
