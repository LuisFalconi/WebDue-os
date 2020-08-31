import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlatoEspecial } from '../_model/platoEspecial';

@Injectable({
  providedIn: 'root'
})
export class PlatoMeriendaService {

  
  private platoCollection: AngularFirestoreCollection<PlatoEspecial>;
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

    this.platoCollection = afs.collection<PlatoEspecial>('platoEspecial');

   }

   recuperarMenus(): Observable<PlatoEspecial[]>{
    return this.afs
      .collection('platoEspecial')
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a =>{
          const data = a.payload.doc.data() as PlatoEspecial;
          const id = a.payload.doc.id;
          return {id, ...data}; //SPREAD OPERATOR
        }))
      );
  }

  listar() {
    return this.afs.collection<PlatoEspecial>('platoEspecial').valueChanges();
  }

  modificar(platoDes:PlatoEspecial ){
    return this.afs.collection('platoEspecial').doc(platoDes.id).set(Object.assign({}, platoDes));	
  }

  leer(documentId: string){
    return this.afs.collection<PlatoEspecial>('platoEspecial').doc(documentId).valueChanges(); 
  }

  eliminar(plato: PlatoEspecial){
  return this.afs.collection('platoEspecial').doc(plato.id).delete();
  }

  editarMenu(platoDes: PlatoEspecial){
    return this.platoCollection.doc(platoDes.id).update(platoDes);
  }

  subirMenu(menusMer: PlatoEspecial): void{
    this.guardarMerienda(menusMer);
  }

  private guardarMerienda(platoDes: PlatoEspecial) {

    //this.idRes =perfil.id;
    let idExiste = platoDes.id;
    console.log("id", idExiste);
    
    if(idExiste){
      const menuDesObj = {
        id: idExiste,
        userUID: this.usuarioLogeado,
        platoEspecial: platoDes.platoEspecial,
        precioEspecial: platoDes.precioEspecial, 
        ingredientes: platoDes.ingredientes
      };
      return this.platoCollection.doc(platoDes.id).update(menuDesObj);      
    }else{      
      let idPlato = this.afs.createId();
      platoDes.id = idPlato;
      this.afs.collection('platoEspecial').doc(idPlato).set({
        id: platoDes.id,
        userUID: this.usuarioLogeado,
        platoEspecial: platoDes.platoEspecial,
        precioEspecial: platoDes.precioEspecial, 
        ingredientes: platoDes.ingredientes
      });
    }
  }

}
