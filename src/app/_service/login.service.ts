import { Usuario } from './../_model/usuario';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { Observable, EMPTY, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //Variable para validar el estado del usuario
  user: Observable<Usuario>;

  // otra variable para validar el estado del usario
  userData: Observable<firebase.User>

  // Se crear la variable para liberar recursos
  //private ngUnsubscribe: Subject<void> = new Subject();

  constructor(private afa: AngularFireAuth, private afs: AngularFirestore, private route: Router) {
    // authState: Devolver el estado si alguein acaba de iniciar sesion
    this.user = this.afa.authState.pipe(
      switchMap( user => {
        // console.log("Usuario??" , user);
        if(user){
          return this.afs.doc<Usuario>(`usuarios/${user.uid}`).valueChanges();
        }else {
          // console.log("Vacio?");
          return EMPTY;
        }
      })
    );

    // otra forma de validar si hay un usuario logueado
    this.userData = afa.authState;
   }



  // Login con correo
  login(usuario: string, clave: string){
    return this.afa.auth.signInWithEmailAndPassword(usuario, clave).then(res =>{
      console.log("mailverificado??", res.user.emailVerified);
      this.actualizarUsuarioData(res.user);
      if(res.user.emailVerified){
        this.actualizarUsuarioData(res.user);
        this.route.navigate(['/infoPerfil']);
      }else if(res.user.emailVerified === false){
        this.route.navigate(['verificacionE']);
      }
    });
  }

  // Login con facebook
  loginFacebook() {
    const provider = new auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  // Login con google
  loginGoogle() {
    const provider = new auth.GoogleAuthProvider();
    console.log("Provider", provider);
    return this.oAuthLogin(provider);
  }
  
  restablecerClave(email: string){
    return this.afa.auth.sendPasswordResetEmail(email);
  }

  enviarVerificacionEmail(){
    return (this.afa.auth.currentUser).sendEmailVerification();
  }

  registrarUsuario(usuario: string, clave: string, nombre: string, numero:string) {
    return this.afa.auth.createUserWithEmailAndPassword(usuario, clave).then( res =>{
      //this.enviarVerificacionEmail();
      const uid = res.user.uid;
      console.log("que es esto", res.user);
      
        this.afs.collection('usuarios').doc(uid).set({
         email: usuario,
         uid: uid,
         numero: numero,
         nombre: nombre,
         estado: "verdadero",
         roles: ['dueño']
        });
      if(res.user.emailVerified){
        this.route.navigate(['infoPerfil']);
      }else{
        this.route.navigate(['verificacionE']);
      }
    });
  }

  // Mecanismo que trabaja firebase ppara autentificar con redes sociales 
  private oAuthLogin(provider: any) {
    return this.afa.auth.signInWithPopup(provider).then( credencial => {
      console.log("Credencial", credencial.user);
      console.log("Credencial ??", credencial.user);
      this.actualizarUsuarioDataSocial(credencial.user);
    });
  }

  // Funcion para actualizar los usuarios en la base de datos de Firebase
  private actualizarUsuarioData(usuario: any) {
    const userRef: AngularFirestoreDocument<Usuario> = this.afs.doc(`usuarios/${usuario.uid}`);
    // Validacion que permite validar si un usuario ya es Admin en firebase

    // Utilizaos una variable para liberar recurson ya que estemetedo esta realizando un proceso despues de subcribirse
    let observable = userRef.valueChanges().subscribe(data => {
      // Condicion que sirve para validar si un usuario ya existente retorne el rol correspondiente
      if (data) {
        const datos: Usuario = {
          uid: usuario.uid,
          nombre: data.nombre,
          numero: data.numero,
          email: usuario.email,
          roles: data.roles
        }
        return userRef.set(datos); // Esta insertando datos, por ellos se crear la variable para liberar recursos al final
      } else {
        const datos: Usuario = {
          uid: usuario.uid,
          email: usuario.email,
          numero: usuario.numero,
          nombre: usuario.nombre,
          estado: "verdadero",
          roles: ['dueño']
        }
        return userRef.set(datos);
      }
    });
    observable.unsubscribe; // libero recursos despues del bloque de insersion 
  }


    // Metodo que se usar cuando un usuario ingresa con una red Social
  private actualizarUsuarioDataSocial(usuario: any) {
    const userRef: AngularFirestoreDocument<Usuario> = this.afs.doc(`usuarios/${usuario.uid}`);
    // Validacion que permite validar si un usuario ya es Admin en firebase


    // Utilizaos una variable para liberar recurson ya que estemetedo esta realizando un proceso despues de subcribirse
    let observable = userRef.valueChanges().subscribe(data => {
      // Condicion que sirve para validar si un usuario ya existente retorne el rol correspondiente
      //const uid = data.user.uid;
      if (data) {
        const datos: Usuario = {
          uid: usuario.uid,
          nombre: usuario.displayName,
          numero: usuario.phoneNumber,
          email: usuario.email,
          roles: data.roles
        }
        return userRef.set(datos); // Esta insertando datos, por ellos se crear la variable para liberar recursos al final
      } else {
        const datos: Usuario = {
          uid: usuario.uid,
          email: usuario.email,
          numero: usuario.phoneNumber,
          nombre: usuario.displayName,
          estado: "verdadero",
          roles: ['dueño']
        }
        return userRef.set(datos);
      }
    });
    observable.unsubscribe; // libero recursos despues del bloque de insersion 
  }

  cerrarSesion(){
    return this.afa.auth.signOut().then( ()=> {
      window.location.reload() // Esto permite recargar la pagina al cerrar sesion, y asi simular que se esta liberando recursos
      this.route.navigate(['inicio']);
    });
  }

  cerrarSesion2(){
    return this.afa.auth.signOut().then( ()=> {
      //window.location.reload() // Esto permite recargar la pagina al cerrar sesion, y asi simular que se esta liberando recursos
      this.route.navigate(['login']);
    });
  }

  estaLogeado(){
    
      this.afa.auth.currentUser != null
      
      //console.log("true??",this.afa.auth.currentUser != null );

      return true;
    
  }

  noEstaLogeado(){
    if(this.afa.auth.currentUser == null){
     // console.log("false??", this.afa.auth.currentUser == null);
      
      return false;
    }
  }


} 
