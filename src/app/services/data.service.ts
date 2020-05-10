import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
  import { from } from 'rxjs';

import { FaceRecognitionResponse } from '../models/face.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DataService {
 
   constructor(private httpClient: HttpClient) { }
  
  
 
  getBillValue(subscriptionKey: string, base64Image:string){
    const headers = this.getHeaders(subscriptionKey);
    const params = this.getParams();
    const blob = this.makeblob(base64Image);

    return this.httpClient.post<FaceRecognitionResponse>(
      environment.endpoint,
      blob,
      {
        params,
        headers,
      }
    );
  }

  private makeblob(dataURL){
    const BASE64_MAKER = ';base64,';
    const parts = dataURL.split(BASE64_MAKER);
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uIntBArray = new Uint8Array(rawLength);

    for(let i = 0; i < rawLength; ++i){
      uIntBArray[i] = raw.charCodeAt(i);
    }

    return new Blob([uIntBArray],{ type: contentType});
  }

  private getHeaders(subscriptionKey: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/octet-stream');
    headers = headers.set('Ocp-Apim-Subscription-Key', subscriptionKey);

    return headers;
}

  private getParams() {
  const httpParams = new HttpParams()
    .set('returnFaceId', 'true')
    .set('returnFaceLandmarks', 'false')
    .set(
        'returnFaceAttributes',
        'age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise'
    );

    return httpParams;

  }

}
