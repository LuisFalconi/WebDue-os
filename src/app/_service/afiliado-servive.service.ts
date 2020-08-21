import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Afiliados } from '../_model/afiliados';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AfiliadoServiveService {

  private afiliadoCollection: AngularFirestoreCollection<Afiliados>;

  constructor(private afs: AngularFirestore, 
    private afa: AngularFireAuth,) { 

  this.afiliadoCollection = afs.collection<Afiliados>('afiliados');

  }


  listar() {
    return this.afs.collection<Afiliados>('afiliados').valueChanges();
  }

  recuperarDatos(): Observable<Afiliados[]>{
    return this.afiliadoCollection
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a =>{
          const data = a.payload.doc.data() as Afiliados;
          const id = a.payload.doc.id;
          return {id, ...data}; //SPREAD OPERATOR
        }))
      );
  }

  public eliminarAfiliado(afiliado: Afiliados){
    return this.afiliadoCollection.doc(afiliado.id).delete();
  }

  public editarafiliado(afiliado: Afiliados){
    return this.afiliadoCollection.doc(afiliado.id).update(afiliado);
  }

  deshabilitarAfiliado(afiliado: Afiliados){
    let idUser = afiliado.id;
      if(idUser){ 
        const promoObj = {
          //id: perfil.id,
          //userUID: this.usuarioLogeado,
          estado: "falso"
        };
        return this.afiliadoCollection.doc(afiliado.id).update(promoObj); 
    }
  }

  habilitarAfiliado(afiliado: Afiliados){
    let idUser = afiliado.id;
      if(idUser){
        const promoObj = {
          //id: perfil.id,
          //userUID: this.usuarioLogeado,
          estado: "verdadero"
        };
        return this.afiliadoCollection.doc(afiliado.id).update(promoObj); 
    }
  }



}
