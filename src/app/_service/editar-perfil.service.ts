import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Perfil } from '../_model/perfil';

@Injectable({
  providedIn: 'root'
})
export class EditarPerfilService {

  constructor(private afs: AngularFirestore) { }

  listar() {
    return this.afs.collection<Perfil>('perfiles').valueChanges();
  }

  registrar(perfil: Perfil){
    return this.afs.collection('perfiles').doc(perfil.id).set({
     id: perfil.id,
     nombre: perfil.nombreRestaurante,
     //precio: perfil.fotoRestaurante,
     tipo: perfil.tipoRestaurante,
     direccion: perfil.direccionRestaurante,
     horario: perfil.horaApertura,
     capacidad: perfil.capacidadRestaurante,
    });
  }

 modificar(perfil: Perfil){
   return this.afs.collection('perfiles').doc(perfil.id).set(Object.assign({}, perfil));	
 }

 leer(documentId: string){
     return this.afs.collection<Perfil>('perfiles').doc(documentId).valueChanges();
 }

 eliminar(perfil: Perfil){
   return this.afs.collection('perfiles').doc(perfil.id).delete();
}

}
