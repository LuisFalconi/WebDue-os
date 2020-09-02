import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { coor } from '../_model/coordenadas';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CoordenadasService {
  usuarioLogeado: string;
  private coordenadaCollection: AngularFirestoreCollection<coor>;


  constructor(private firestore: AngularFirestore, private loginSvc: LoginService) { 

    this.loginSvc.user.subscribe(data =>{
      if(typeof data === 'undefined'){
        console.log('Data no definida');
      }else{
        this.usuarioLogeado = data.uid;
      }
    });

    this.coordenadaCollection = firestore.collection<coor>('coordenadas');

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

    actualizarC(c: coor, lat: number, lng: number){
      let idRes = c.id;
        if(idRes){
          const promoObj = {
            //id: perfil.id,
            //userUID: this.usuarioLogeado,
            lng: lat,
            lat: lng
          };
        return this.coordenadaCollection.doc(c.id).update(promoObj); 
          
      }
    }



    

    
}
