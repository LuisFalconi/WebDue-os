import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { LoginService } from './login.service';
import { Usuario } from '../_model/usuario';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuarioCollection: AngularFirestoreCollection<Usuario>;


  constructor(private afs: AngularFirestore, 
    private afa: AngularFireAuth, 
    private storage: AngularFireStorage, 
    private loginService: LoginService) {

    this.usuarioCollection = afs.collection<Usuario>('usuarios');
  }

  listar() {
    return this.afs.collection<Usuario>('usuarios').valueChanges();
  }

  recuperarDatos(): Observable<Usuario[]>{
    return this.usuarioCollection
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a =>{
          const data = a.payload.doc.data() as Usuario;
          const id = a.payload.doc.id;
          return {id, ...data}; //SPREAD OPERATOR
        }))
      );
  }

  public eliminarUsuario(usuario: Usuario){
    return this.usuarioCollection.doc(usuario.uid).delete();
  }

  public editarUsuario(usuario: Usuario){
    return this.usuarioCollection.doc(usuario.uid).update(usuario);
  }

  // opcional
  modificarUsuario(usuario: Usuario){
    // return this.afs.collection('plato').doc(plato.id).set(JSON.parse(JSON.stringify(plato)));
    // Objetc.assign() Para transformar el contenido de un objeto normal a un 
    // tipo JSOn una mejor forma de JSON.parse
    return this.afs.collection('usuarios').doc(usuario.uid).set(Object.assign({}, usuario));	
  }

  leer(documentId: string){
    return this.afs.collection<Usuario>('usuarios').doc(documentId).valueChanges();
  }

  obtenerUsuario(uid: string){
    let user = this.afa.auth.currentUser;
    
    if(uid){
      console.log("user", user.uid);
      user.delete();
    }else{
      console.log("user", user.uid);
    }
    
  }

  deshabilitarUsuario(user: Usuario){
    let idUser = user.uid;
      if(idUser){
        const promoObj = {
          //id: perfil.id,
          //userUID: this.usuarioLogeado,
          estado: "falso"
        };
        return this.usuarioCollection.doc(user.uid).update(promoObj); 
    }
  }

  habilitarUsuario(user: Usuario){
    let idUser = user.uid;
      if(idUser){
        const promoObj = {
          //id: perfil.id,
          //userUID: this.usuarioLogeado,
          estado: "verdadero"
        };
        return this.usuarioCollection.doc(user.uid).update(promoObj); 
    }
  }

}
