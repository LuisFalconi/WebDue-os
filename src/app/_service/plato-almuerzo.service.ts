import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { PlatoAlmuerzo } from '../_model/platoAlmuerzo';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlatoAlmuerzoService {

  private platoCollection: AngularFirestoreCollection<PlatoAlmuerzo>;
  private usuarioLogeado: string;


  constructor(private afs: AngularFirestore,
              private loginService: LoginService) {

    this.loginService.user.subscribe(data =>{
      if(typeof data === 'undefined'){
        console.log('Data no definida');
      }else{
        this.usuarioLogeado = data.uid;
      }
    });

    this.platoCollection = afs.collection<PlatoAlmuerzo>('platoAlmuerzo');

   }

   recuperarMenus(): Observable<PlatoAlmuerzo[]>{
    return this.afs
      .collection('platoAlmuerzo')
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a =>{
          const data = a.payload.doc.data() as PlatoAlmuerzo;
          const id = a.payload.doc.id;
          return {id, ...data}; //SPREAD OPERATOR
        }))
      );
  }

  listar() {
    return this.afs.collection<PlatoAlmuerzo>('platoAlmuerzo').valueChanges();
  }

  modificar(platoDes: PlatoAlmuerzo){
    return this.afs.collection('platoAlmuerzo').doc(platoDes.id).set(Object.assign({}, platoDes));	
  }

  leer(documentId: string){
    return this.afs.collection<PlatoAlmuerzo>('platoAlmuerzo').doc(documentId).valueChanges(); 
  }

  eliminar(plato: PlatoAlmuerzo){
  return this.afs.collection('platoAlmuerzo').doc(plato.id).delete();
  }

  editarMenu(platoDes: PlatoAlmuerzo){
    return this.platoCollection.doc(platoDes.id).update(platoDes);
  }

  subirMenu(menusDes: PlatoAlmuerzo): void{
    this.guardarDesayuno(menusDes);
  }


  private guardarDesayuno(platoDes: PlatoAlmuerzo) {

    //this.idRes =perfil.id;
    let idExiste = platoDes.id;
    if(idExiste){
      const menuDesObj = {
        //id: perfil.id,
        userUID: this.usuarioLogeado,
        entradaAlmuerzo: platoDes.entradaAlmuerzo,
        segundoAlmuerzo: platoDes.segundoAlmuerzo,
        jugoAlmuerzo: platoDes.jugoAlmuerzo,
        precioAlmuerzo: platoDes.precioAlmuerzo, 
      };
      return this.platoCollection.doc(platoDes.id).update(menuDesObj);      
    }else{      
      let idPlato = this.afs.createId();
      platoDes.id = idPlato;
      this.afs.collection('platoAlmuerzo').doc(idPlato).set({
        id: platoDes.id,
        userUID: this.usuarioLogeado,
        entradaAlmuerzo: platoDes.entradaAlmuerzo,
        segundoAlmuerzo: platoDes.segundoAlmuerzo,
        jugoAlmuerzo: platoDes.jugoAlmuerzo,
        precioAlmuerzo: platoDes.precioAlmuerzo, 
      });
    }
  }


}
