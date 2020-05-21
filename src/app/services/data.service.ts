import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
  import { from } from 'rxjs';


import { environment } from 'src/environments/environment.prod';
import { TextRecognitionResponse } from '../models/text.model';
import { ApiKey } from './api.key';

@Injectable({
  providedIn: 'root'
})
export class DataService {
 
   constructor(private httpClient: HttpClient) { }
  
  private url = 'https://westcentralus.api.cognitive.microsoft.com/vision/v2.0/recognizeText?Printed';
 
  getBillValue(base64Image:string){
    const headers = this.getHeaders(this.url);
    const params = this.getParams();
    const blob = this.makeblob(base64Image);

    return this.httpClient.post<TextRecognitionResponse>(
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

  private getHeaders(imageUrl: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/octet-stream');
    headers = headers.set('Ocp-Apim-Subscription-Key', ApiKey.arguments);

    return headers;
}

  private getParams() {
  const httpParams = new HttpParams()
    .set('status', 'true')
    .set('text', 'true')
     .set('boundingBox', 'text, words');

    return httpParams;

  }

}
