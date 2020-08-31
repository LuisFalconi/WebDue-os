import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { PlatoEspecial } from '../_model/platoEspecial1';
import { LoginService } from './login.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, finalize } from 'rxjs/operators';
import { FileI } from '../_model/imagenes';

@Injectable({
  providedIn: 'root'
})
export class PlatoEspecialService {

  usuarioLogeado: string;
  private filePath: any;
  private UrlImagen: Observable<string>;
  private UrlImagen2: Observable<string>[];
  private platoEspecialCollection: AngularFirestoreCollection<PlatoEspecial>;
  // imageDetailList: AngularFireList<any>;

  constructor(private afs: AngularFirestore,
              private loginService: LoginService,
              private storage: AngularFireStorage,
              private firebase: AngularFireDatabase) { 

    this.platoEspecialCollection = afs.collection<PlatoEspecial>('platoEspecial');
    
    // Metodo para traer el ID del usuario logueado
    this.loginService.user.subscribe(data =>{
      this.usuarioLogeado = data.uid;
    });

  }


  listar() {
    return this.afs.collection<PlatoEspecial>('platoEspecial').valueChanges();
  }

  // Metodo recuperar los datos de la coleccion de Perfil, iterando por el id que devuelve 
  recuperarDatos(): Observable<PlatoEspecial[]>{
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

  
  
 public eliminarPlato(promo: PlatoEspecial){
    return this.platoEspecialCollection.doc(promo.id).delete();
  }

  eliminar(promo: PlatoEspecial){
    return this.afs.collection('platoEspecial').doc(promo.id).delete();
  }

  public editarPlatoEspecial(promo: PlatoEspecial, nuevaImagen?: FileI){

    if(nuevaImagen){
      this.obternerImagen(promo, nuevaImagen);
    }else{
      return this.platoEspecialCollection.doc(promo.id).update(promo);
    }
  }

  subirRestauranteconPromocion(promo: PlatoEspecial, image?: FileI): void{
    this.obternerImagen(promo, image);
  }

  // Le coloco con Return para usar el swithalert -> then((=>))
  subirRestauranteconPlatoEspecial(promo: PlatoEspecial, image?: FileI){
    return this.obternerImagen(promo, image);
  }



// Aqui esta sin la opcion de imgen64 por siacaso
  private obternerImagen(promo: PlatoEspecial ,image?: FileI){
    this.filePath = `imagenesPlatoEspecial/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
      task.snapshotChanges()
      .pipe(
        finalize(() => {
         fileRef.getDownloadURL().subscribe(urlImage => {
            this.UrlImagen = urlImage;
            this.guardarPlatoEspecial(promo);          
          });
       })
      ).subscribe();  
  }


//Metodo paradeshabilitar promociones
  editarPlatoEspeciales(promo: PlatoEspecial){
    let idPromo = promo.id;
      if(idPromo){
        const promoObj = {
          //id: perfil.id,
          userUID: this.usuarioLogeado,
          estado: "falso"
        };
        return this.platoEspecialCollection.doc(promo.id).update(promoObj); 
    }
  }


  // Metodo para habilitar promociones
  habilitarPlatoEspecial(promo: PlatoEspecial){
    let idPromo = promo.id;
      if(idPromo){
        const promoObj = {
          //id: perfil.id,
          userUID: this.usuarioLogeado,
          estado: "verdadero"
        };
        return this.platoEspecialCollection.doc(promo.id).update(promoObj); 
    }
  }

 private guardarPlatoEspecial(promo: PlatoEspecial) {
  //this.idRes =perfil.id;
  let idExiste = promo.id;
  console.log("sssss", idExiste);
  if(idExiste){
    const promoObj = {
      //id: perfil.id,
      userUID: this.usuarioLogeado,
      fotosPlato: this.UrlImagen,
      fileRef: this.filePath
    };
    return this.platoEspecialCollection.doc(promo.id).update(promoObj);      
  }else{
    console.log("ggggg");
    
    let idPromo = this.afs.createId();
    promo.id = idPromo; 
    this.afs.collection('platoEspecial').doc(idPromo).set({
      id: promo.id,
      userUID: this.usuarioLogeado,
      fotosPlato: this.UrlImagen,
      fileRef: this.filePath,
      estado: "verdadero"
    });
  }
 }






}