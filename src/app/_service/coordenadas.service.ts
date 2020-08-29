import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { coor } from '../_model/coordenadas';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CoordenadasService {
  usuarioLogeado: string;

  constructor(private firestore: AngularFirestore, private loginSvc: LoginService) { 

    this.loginSvc.user.subscribe(data =>{
      if(typeof data === 'undefined'){
        console.log('Data no definida');
      }else{
        this.usuarioLogeado = data.uid;
      }
    });
  }

  listar(){    
    return this.firestore.collection<coor>('coordenadas').valueChanges();
  }
  
  registrar(cordenadas: any) {
    return this.firestore.collection('coordenadas').add(cordenadas);
  }  
   
  leer(documentId: string) {
    return this.firestore.collection<coor>('coordenadas').doc(documentId).valueChanges();
  }
    
  actualizar(cordenadas: coor) {
    return this.firestore.collection('coordenadas').doc(cordenadas.id).set(cordenadas);
  }

  eliminar(cordenadas: coor){
    return this.firestore.collection('coordenadas').doc(cordenadas.id).delete();    
  }

  guardarcoordenadas(lat: number, lng: number) {

      let coordenadas = new coor();
      console.log("Estoy guardando coordenadas");
      let idCoordenadas = this.firestore.createId();
      coordenadas.id = idCoordenadas; 
      this.firestore.collection('coordenadas').doc(idCoordenadas).set({
        id: coordenadas.id,
        userUID: this.usuarioLogeado,
        lng: lat,
        lat: lng
      });
    }
}
