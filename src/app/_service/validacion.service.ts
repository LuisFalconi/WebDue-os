import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Validacion } from '../_model/validacion';
import { LoginService } from './login.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, finalize } from 'rxjs/operators';
import { FileI } from '../_model/imagenes';

@Injectable({
  providedIn: 'root'
})
export class ValidacionService {

  usuarioLogeado: string;
  private filePath: any;
  private UrlImagen: Observable<string>;
  private validacionCollection: AngularFirestoreCollection<Validacion>;
  
  constructor(private afs: AngularFirestore,
    private loginService: LoginService,
    private storage: AngularFireStorage) { 

  this.validacionCollection = afs.collection<Validacion>('validaciones');
    
    // Metodo para traer el ID del usuario logueado
    this.loginService.user.subscribe(data =>{
      this.usuarioLogeado = data.uid;
    });
  }

  listar() {
    return this.afs.collection<Validacion>('validaciones').valueChanges();
  }

  leer(documentId: string){
    return this.afs.collection<Validacion>('validaciones').doc(documentId).valueChanges();
}

   // Metodo recuperar los datos de la coleccion de Perfil, iterando por el id que devuelve 
   recuperarDatos(): Observable<Validacion[]>{
    return this.afs
      .collection('validaciones')
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a =>{
          const data = a.payload.doc.data() as Validacion;
          const id = a.payload.doc.id;
          return {id, ...data}; //SPREAD OPERATOR
        }))
      );
  }

  public eliminarVal(validacion: Validacion){
    return this.validacionCollection.doc(validacion.id).delete();
  }

  public editarPromo(validacion: Validacion, nuevaImagen?: FileI){

    if(nuevaImagen){
      this.obternerImagen(validacion, nuevaImagen);
    }else{
      return this.validacionCollection.doc(validacion.id).update(validacion);
    }
  }

  subirRestauranteconValidacion(validacion: Validacion, image?: FileI): void{
    this.obternerImagen(validacion, image);
  }

  private obternerImagen(validacion: Validacion ,image?: FileI){
    this.filePath = `documentosValidacion/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
     .pipe(
       finalize(() => {
        fileRef.getDownloadURL().subscribe(urlImage => {
           this.UrlImagen = urlImage;
          console.log('urlImagen', this.UrlImagen);
           this.guardarValidacion(validacion);          
         });
      })
     ).subscribe();     
 }

 private guardarValidacion(validacion: Validacion) {
  //this.idRes =perfil.id;
  let idExiste = validacion.id;
  if(idExiste){
    const docObj = {
      //id: perfil.id,
      userUID: this.usuarioLogeado,
      docValidacion: this.UrlImagen,
      fileRef: this.filePath
    };
    return this.validacionCollection.doc(validacion.id).update(docObj);      
  }else{
    let idVal = this.afs.createId();
    validacion.id = idVal; 
    this.afs.collection('validaciones').doc(idVal).set({
      id: validacion.id,
      userUID: this.usuarioLogeado,
      docValidacion: this.UrlImagen,
      fileRef: this.filePath
      });
    }
  }

}
