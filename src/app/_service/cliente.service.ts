import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cliente } from '../_model/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private afs: AngularFirestore) { }

  listar(){    
    return this.afs.collection<Cliente>('clientes').valueChanges();
  }
  
  registrar(cliente: Cliente) {
    return this.afs.collection('clientes').add(cliente);
  }  
   
  leer(documentId: string) {
    return this.afs.collection<Cliente>('clientes').doc(documentId).valueChanges();
  }
    
  actualizar(cliente: Cliente) {
    return this.afs.collection('clientes').doc(cliente.id).set(cliente);
  }

  eliminar(cliente: Cliente){
    return this.afs.collection('clientes').doc(cliente.id).delete();    
  }
}
