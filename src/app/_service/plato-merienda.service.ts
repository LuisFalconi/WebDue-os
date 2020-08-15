import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { PlatoMerienda } from '../_model/platoMerienda';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlatoMeriendaService {

  
  private platoCollection: AngularFirestoreCollection<PlatoMerienda>;
  private usuarioLogeado: string;


  constructor(private afs: AngularFirestore,
              private loginService: LoginService) {

    this.loginService.user.subscribe(data =>{
      if(typeof data === 'undefined'){
        // console.log('Data no definida');
      }else{
        this.usuarioLogeado = data.uid;
      }
    });

    this.platoCollection = afs.collection<PlatoMerienda>('platoMerienda');

   }

   recuperarMenus(): Observable<PlatoMerienda[]>{
    return this.afs
      .collection('platoMerienda')
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a =>{
          const data = a.payload.doc.data() as PlatoMerienda;
          const id = a.payload.doc.id;
          return {id, ...data}; //SPREAD OPERATOR
        }))
      );
  }

  listar() {
    return this.afs.collection<PlatoMerienda>('platoMerienda').valueChanges();
  }

  modificar(platoDes:PlatoMerienda ){
    return this.afs.collection('platoMerienda').doc(platoDes.id).set(Object.assign({}, platoDes));	
  }

  leer(documentId: string){
    return this.afs.collection<PlatoMerienda>('platoMerienda').doc(documentId).valueChanges(); 
  }

  eliminar(plato: PlatoMerienda){
  return this.afs.collection('platoMerienda').doc(plato.id).delete();
  }

  editarMenu(platoDes: PlatoMerienda){
    return this.platoCollection.doc(platoDes.id).update(platoDes);
  }

  subirMenu(menusMer: PlatoMerienda): void{
    this.guardarMerienda(menusMer);
  }

  private guardarMerienda(platoDes: PlatoMerienda) {

    //this.idRes =perfil.id;
    let idExiste = platoDes.id;
    if(idExiste){
      const menuDesObj = {
        //id: perfil.id,
        userUID: this.usuarioLogeado,
        platoMerienda: platoDes.platoMerienda,
        detalleMerienda: platoDes.detalleMerienda,
        precioMerienda: platoDes.precioMerienda, 
      };
      return this.platoCollection.doc(platoDes.id).update(menuDesObj);      
    }else{      
      let idPlato = this.afs.createId();
      platoDes.id = idPlato;
      this.afs.collection('platoMerienda').doc(idPlato).set({
        id: platoDes.id,
        userUID: this.usuarioLogeado,
        platoMerienda: platoDes.platoMerienda,
        detalleMerienda: platoDes.detalleMerienda,
        precioMerienda: platoDes.precioMerienda, 
      });
    }
  }

}
