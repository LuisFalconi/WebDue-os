import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FunctionService {

  constructor( private http: HttpClient, private afa: AngularFireAuth) { }

  probar(){
    const url = "https://us-central1-tesis-web.cloudfunctions.net/prueba";

    // return this.http.get(url);
    return this.afa.auth.currentUser.getIdToken().then(authToken => { 
      //console.log(authToken);
      const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + authToken});
      const body = { uid: this.afa.auth.currentUser.uid};

       return this.http.post(url, body, { headers: headers }).toPromise();
   });
  } 
}
