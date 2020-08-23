import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Perfil } from '../_model/perfil';
import { Observable, EMPTY } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap, map, finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { FileI } from '../_model/imagenes';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { FileD } from '../_model/documento';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  // Variable para validar el estado del usuario
  user: Observable<Perfil>;
   private perfilCollection: AngularFirestoreCollection<Perfil>;
   private filePath: any;
   private UrlImagen: Observable<string>;

   private filePathDoc: any;
   private UrlDoc: Observable<string>;

   usuarioLogeado: string;
   idPerfil: string;
   idRes: string;
   
   

  constructor(private afs: AngularFirestore, 
              private afa: AngularFireAuth, 
              private storage: AngularFireStorage, 
              private loginService: LoginService,
              private route : Router) { 
                
    this.user = this.afa.authState.pipe(
      switchMap( user => {
        if(user){
          return this.afs.doc<Perfil>(`usuarios/${user.uid}`).valueChanges();
        }else {
          console.log("Vacio?");
          
          return EMPTY;
        }
      })
    )
    this.perfilCollection = afs.collection<Perfil>('perfiles');

    let currenUser = this.afa.auth.currentUser;

    
      // Esto sirve para algo pero no recuerdo
    this.loginService.user.subscribe(data =>{
      //this.idPerfil = this.afs.createId();
      // console.log("Data login Service??", data);
      if(typeof data === 'undefined'){
        // console.log("Sin definir");
        // console.log("Navego de nuevo a inPerfil");
        
        this.route.navigate(['infoPerfil']);
        //window.location.reload();
      }else{
        // console.log("Data Defiida");
        
        if(data.uid){
          this.usuarioLogeado = data.uid;
        }else{
          // console.log("Error");
          //this.usuarioLogeado = data.uid;      
        }
      }      
    });
    

}
  listar() {
    return this.afs.collection<Perfil>('perfiles').valueChanges();
    //return this.afs.collection<Perfil>('perfiles').snapshotChanges();
  }

  recuperar() {
    return this.afs.collection<Perfil>('perfiles').snapshotChanges();
    //return this.afs.collection<Perfil>('perfiles').snapshotChanges();
  }

  // Metodo recuperar los datos de la coleccion de Perfil, iterando por el id que devuelve 
  recuperarDatos(): Observable<Perfil[]>{
    return this.afs
      .collection('perfiles')
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a =>{
          const data = a.payload.doc.data() as Perfil;
          const id = a.payload.doc.id;
          return {id, ...data}; //SPREAD OPERATOR
        }))
      );
  }

  // Metodo usado para recibir el perfil del restaurante por ID
  public recibirPerfil(id: Perfil): Observable<Perfil> {
    return this.afs.doc<Perfil>(`perfiles/${id}`).valueChanges();
  }

  public eliminarPerfil(perfil: Perfil){
    return this.perfilCollection.doc(perfil.id).delete();
  }

  public editarPerfil(perfil: Perfil, nuevaImagen?: FileI){

    if(nuevaImagen){
      this.obternerImagen(perfil, nuevaImagen);
    }else{
      return this.perfilCollection.doc(perfil.id).update(perfil);
    }
  }


  private obternerImagen(perfil: Perfil ,image?: FileI){
      this.filePath = `imagenes/${image.name}`;
      const fileRef = this.storage.ref(this.filePath);
      const task = this.storage.upload(this.filePath, image);
      task.snapshotChanges()
       .pipe(
         finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
             this.UrlImagen = urlImage;
            console.log('urlImagen', this.UrlImagen);
             this.guardarRestaurante(perfil);          
           });
        })
       ).subscribe();     
   }

  subirRestauranteconImagen(perfiles: Perfil, image?: FileI): void{
    this.obternerImagen(perfiles, image);
  }

  
  registrar(perfil: Perfil){

    // Debido a que estamos validadndo en lato edicion que se guarde con el IDno necesitamos esto
    // let idPlato = this.afs.createId();
    // plato.id = idPlato;
    return this.afs.collection('perfiles').doc(perfil.id).set({
     id: perfil.id,
     userUID: perfil.userUID,
     nombreRestaurante: perfil.nombreRestaurante,
     tipoRestaurante: perfil.tipoRestaurante,
     capacidadRestaurante: perfil.capacidadRestaurante,
     horaApertura: perfil.horaApertura,
     horaCierre: perfil.horaCierre,
     direccionRestaurante: perfil.direccionRestaurante,
     //imagenRes: perfil.imagen
    });
  }


  modificar(perfil: Perfil){
    // return this.afs.collection('plato').doc(plato.id).set(JSON.parse(JSON.stringify(plato)));
    // Objetc.assign() Para transformar el contenido de un objeto normal a un 
    // tipo JSOn una mejor forma de JSON.parse
    return this.afs.collection('perfiles').doc(perfil.id).set(Object.assign({}, perfil));	
  }

  leer(documentId: string){
    return this.afs.collection<Perfil>('perfiles').doc(documentId).valueChanges();
  }

  eliminar(perfil: Perfil){
    return this.afs.collection('perfiles').doc(perfil.id).delete();
  }

  // Prueba
  eliminarPorID(perfil: Perfil) {
    return this.perfilCollection.doc(perfil.id).delete();
  }

   subirPerfilconImagen(perfiles: Perfil, image?: FileI): void{
     this.subirImagen(perfiles, image);
   }

   subirPerfilconDocumento(perfiles: Perfil, doc?: FileD){
    return this.subirDocument(perfiles, doc);
  }

  private guardarRestaurante(perfil: Perfil) {
    //this.idRes =perfil.id;
     
    let idExiste = perfil.id;
    if(idExiste){
      const perfilObj = {
        //id: perfil.id,
        userUID: this.usuarioLogeado,
        nombreRestaurante: perfil.nombreRestaurante,
        tipoRestaurante: perfil.tipoRestaurante,
        capacidadRestaurante: perfil.capacidadRestaurante,
        horaApertura: perfil.horaApertura,
        horaCierre: perfil.horaCierre,
        direccionRestaurante: perfil.direccionRestaurante,
        imagenRes: this.UrlImagen,
        fileRef: this.filePath,
        //coordenadas: perfil.coordenadas
        //resVerificado: ""
      };
      console.log("Estoy editando un restaurante");
      console.log("ID: ", idExiste);

      return this.perfilCollection.doc(perfil.id).update(perfilObj);      
    }else{
      console.log("Estoy creando un restaurante");
      let idPlato = this.afs.createId();
      perfil.id = idPlato; 
      this.afs.collection('perfiles').doc(idPlato).set({
        id: perfil.id,
        userUID: this.usuarioLogeado,
        nombreRestaurante: perfil.nombreRestaurante,
        tipoRestaurante: perfil.tipoRestaurante,
        capacidadRestaurante: perfil.capacidadRestaurante,
        horaApertura: perfil.horaApertura,
        horaCierre: perfil.horaCierre,
        direccionRestaurante: perfil.direccionRestaurante,
        imagenRes: this.UrlImagen,
        fileRef: this.filePath,
        resVerificado: "En revision",
        latitud: "",
        longitud: "",
        estado: "verdadero",
        estadoDocumento: "Sin Documento"
      });
    }
   }


   deshabilitarRestaurante(restaurante: Perfil){
    let idRes = restaurante.id;
      if(idRes){
        const promoObj = {
          //id: perfil.id,
          //userUID: this.usuarioLogeado,
          estado: "falso"
        };
        return this.perfilCollection.doc(restaurante.id).update(promoObj); 
    }
  }

  habilitarRestaurante(restaurante: Perfil){
    let idRes = restaurante.id;
    console.log("aaaa", idRes);
    
      if(idRes){
        const promoObj = {
          //id: perfil.id,
          //userUID: this.usuarioLogeado,
          estado: "verdadero"
        };
        console.log("paso por aqui cuando habilito??");
        
      return this.perfilCollection.doc(restaurante.id).update(promoObj); 
    }
  }

  subirDocumentoValidacion(restaurante: Perfil){
    let idRes = restaurante.id;
    console.log("llega aqui??");
    console.log("idssss", restaurante.id); 
      if(idRes){
        const promoObj = {
          documentoRes: this.UrlDoc,
          fileRefDoc: this.filePathDoc,
          estadoDocumento: "documento en Revision",
          resVerificado: "En revision"
        };
      console.log("se actualiza??");
      return this.perfilCollection.doc(restaurante.id).update(promoObj); 
    }else{
      console.log("n se acrtualiza");
      
    }
  }

   private guardarRestauranteSinFoto(perfil: Perfil) {
    
    let idPlato = this.afs.createId();
    perfil.id = idPlato;
    this.afs.collection('perfiles').doc(idPlato).set({
      id: perfil.id,
      userUID: this.usuarioLogeado,
      nombreRestaurante: perfil.nombreRestaurante,
      tipoRestaurante: perfil.tipoRestaurante,
      capacidadRestaurante: perfil.capacidadRestaurante,
      horaApertura: perfil.horaApertura,
      horaCierre: perfil.horaCierre,
      direccionRestaurante: perfil.direccionRestaurante,
      imagenRes: "",
      fileRef: "",
      resVerificado: "En revision",
      latitud: "",
      longitud: "",
      estado: "verdadero",
      estadoDocumento: "Sin Documento"
    });
    //   const postObj = {
       
    //  };
        //this.perfilCollection.add(postObj);
   }

    private subirImagen(perfil: Perfil ,image?: FileI){
    if(image){
      this.filePath = `imagenes/${image.name}`;
      const fileRef = this.storage.ref(this.filePath);
      const task = this.storage.upload(this.filePath, image);
      task.snapshotChanges()
       .pipe(
         finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
             this.UrlImagen = urlImage;
             console.log('urlImagen: ', this.UrlImagen);
             console.log("id del restaurante: ", perfil.id);
             this.guardarRestaurante(perfil);           
           });
        }) 
       ).subscribe();
    }else{
      this.guardarRestauranteSinFoto(perfil);
    }
     
   }

   private subirDocument(perfil: Perfil ,doc?: FileD){
     if(doc){
      this.filePathDoc = `documentos/${doc.name}`;
      const fileRef = this.storage.ref(this.filePathDoc);
      const task = this.storage.upload(this.filePathDoc, doc);
      task.snapshotChanges()
       .pipe(
         finalize(() => {
          fileRef.getDownloadURL().subscribe(urlDocumento => {
             this.UrlDoc = urlDocumento;
             console.log('urldoc ', this.UrlDoc);
             console.log("id del restaurante: ", perfil.id);
             this.subirDocumentoValidacion(perfil);           
           });
        }) 
       ).subscribe(); 
     }else{
       console.log("no hay documento");
     }
          
   }


}


