import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../_service/login.service';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { MenuService } from '../_service/menu.service';
import { Menu } from '../_model/menu';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../_model/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  usuario: string;
  clave: string;
  nombre: string;
  numero: string;
  hide = true;

  // Validar cajas activas
  estadoLogin: boolean = true;
  estadoRecuperar: boolean;
  estadoCrear: boolean;

  usuario$: Observable<Usuario[]>;


  // Se crear la variable para liberar recursos
  private ngUnsubscribe: Subject<void> = new Subject();

  constructor(private LoginService: LoginService,
              private route : Router,
              private menuService: MenuService,
              private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer
            ) { 

    this.iconRegistry.addSvgIcon('facebook-up', this.sanitizer.bypassSecurityTrustResourceUrl("assets/facebook.svg"));
    this.iconRegistry.addSvgIcon('google-up', this.sanitizer.bypassSecurityTrustResourceUrl("assets/google.svg"));
    this.iconRegistry.addSvgIcon('food-up', this.sanitizer.bypassSecurityTrustResourceUrl("assets/food.svg"));
    this.iconRegistry.addSvgIcon('iniciar-up', this.sanitizer.bypassSecurityTrustResourceUrl("assets/chef.svg"));
    this.iconRegistry.addSvgIcon('cuenta-up', this.sanitizer.bypassSecurityTrustResourceUrl("assets/r3.svg"));
   
  }

  public nuevoUsuario = new FormGroup({
    id: new FormControl (''),
    nombre: new FormControl ('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),  
    numero: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10) ]),
    email: new FormControl('',  [Validators.required, Validators.email ]),
    clave: new FormControl('',  [Validators.required, Validators.minLength(8)])
  });

  ngOnInit() {

    // this.recuperarRol();
    this.usuario$ = this.LoginService.recuperarUsuarios();

  }

  

  login(){
    // Al momento de iniciar sesion se redirige al component "Plato"
    this.LoginService.login(this.usuario, this.clave).then( data =>{  
      
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Bienvenido',
        showConfirmButton: false,
        timer: 1500
      });
      this.getTipoUser();
    }).catch(err =>{
      if(err.code === 'auth/argument-error'){
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error desconocido',
          showConfirmButton: false,
          timer: 1500
        });
        this.route.navigate(['login']);
      }else if(err.code === 'auth/invalid-email'){
        this.limpiar();
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'La dirección de correo electrónico es incorrecta',
          showConfirmButton: false,
          timer: 1500
        });
      }else if(err.code === 'auth/wrong-password'){
        this.route.navigate(['login']);
        this.limpiar();
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Contraseña incorrecta',
          showConfirmButton: false,
          timer: 1500
        });
      }else if(err.code === 'ERROR' ){
        this.route.navigate(['/inicio']);
      }
    });
  }

  get password() {return this.clave};

  loginFacebook() {
    this.LoginService.loginFacebook().then(() => {
      // this.listarMenus();
      this.route.navigate(['dueño/perfil']);
    }).catch(err => {

      // manejo de error en caso que un usuario tenga el mismo correo con facebook y google
      if (err.code === 'auth/account-exists-with-different-credential') {
        let facebookCred = err.credential;
        let googleProvider = new auth.GoogleAuthProvider();
        googleProvider.setCustomParameters({ 'login_hint': err.email });

        return auth().signInWithPopup(googleProvider).then(result => {
          return result.user.linkWithCredential(facebookCred);
        });
      }
    });
  }

  loginGoogle() {
    this.LoginService.loginGoogle().then(() => {
      this.route.navigate(['dueño/perfil']);
    }).catch(err => console.log("Error??", err));
  }

  restablecerClave(){
    this.LoginService.restablecerClave(this.usuario).then( data =>{
      console.log(data);
    });  
  }
  crearUsuario() {
    this.LoginService.registrarUsuario(this.usuario, this.clave, this.nombre, this.numero).then( login =>{
      console.log("login", login);
    }).catch(err => console.log(err));
    //window.location.reload();
    //this.irLogin();
  }

  agregarUsuario(data: Usuario) {
    console.log('New usuario', data);
    this.LoginService.registrarUsuario(data.email, data.clave, data.nombre, data.numero).then(login =>{
      //console.log(login);
    }).catch(err =>{
      console.log(err);
      
      if(err.code === 'auth/argument-error'){
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error desconocido',
          showConfirmButton: false,
          timer: 1500
        });
        this.route.navigate(['login']);
      }else if(err.code === 'auth/email-already-in-use' && err.message === 'The email address is already in use by another account.'){
        this.resetForm();
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'La dirección de correo electrónico ya existe',
          showConfirmButton: false,
          timer: 1500
        });
      }else if(err.code === 'auth/wrong-password'){
        this.route.navigate(['login']);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Contraseña incorrecta',
          showConfirmButton: false,
          timer: 1500
        });
      }else if(err.code === 'ERROR' ){
        this.route.navigate(['/inicio']);
      }
    });
  }

  irCrear() {
    this.estadoCrear = true;
    this.estadoLogin = false;
    this.estadoRecuperar = false;
  }

  irLogin() {
    this.estadoLogin = true;
    this.estadoRecuperar = false;
    this.estadoCrear = false;
  }

  irRecuperar() {
    this.estadoRecuperar = true;
    this.estadoLogin = false;
    this.estadoCrear = false;
  }

  limpiar(){
    this.usuario = '';
    this.clave = '';
  }

  resetForm() {
    this.nuevoUsuario.reset();
    this.nuevoUsuario.setValue({
      id: '',
      nombre: '',
      numero: '',
      email: '',
      clave: ''
    });
  }

  // listarMenus() {
  //   this.menuService.listar().pipe(takeUntil(this.ngUnsubscribe)).subscribe(menus => {

  //     this.LoginService.user.pipe(takeUntil(this.ngUnsubscribe)).subscribe(userData => {
  //       if (userData) {
  //         console.log("estoy pasando pr aqui?", userData);
  //         let user_roles: string[] = userData.roles
  //         let final_menus: Menu[] = [];

  //         for (let menu of menus) {
  //           n2: for (let rol of menu.roles) {
  //             for (let urol of user_roles) {
  //               if (rol === urol) {
  //                 let m = new Menu();
  //                 m.nombre = menu.nombre;
  //                 m.icono = menu.icono;
  //                 m.url = menu.url;
  //                 final_menus.push(m);
  //                 console.log("final menu", final_menus);
                  
  //                 break n2;
  //               }
  //             }
  //           }

  //           this.menuService.menuCambio.next(final_menus);
  //           this.route.navigate(['/infoPerfil']);
  //         }
  //       }
  //     });
  //   });
  // }

  recuperarRol(){
    this.usuario$ = this.LoginService.recuperarUsuarios();

    console.log("que es esto", this.usuario$);

    this.usuario$.subscribe(data =>{
      for(let rol of data){
        console.log(this.usuario);
        console.log(rol.email);
        if(rol.email === this.usuario){
          console.log("este usuario", rol.email);
          console.log("rol?", rol.rol);
        }else{
          console.log("no es");
          
        }
        break;
      }
    } );
  }

  onLoginRedirect(){
    console.log('onLoginRedirect');
    const rol = localStorage.getItem('rol');
    if(rol==='dueño'){
      this.route.navigate(['/dueño/dashboard']);
    }else if(rol==='admin'){
      this.route.navigate(['/admin/perfil']);
    }

    //this.isInvalid=false;
  }

  getTipoUser(){
    let long=0;
    this.LoginService.listar().subscribe(x =>{
      console.log("ssss", x);
      x.forEach(element => {
        long++;
        if(element['email'] == this.usuario){
          console.log(element['rol']);  
          localStorage.setItem('rol', element['rol']);
          this.onLoginRedirect();
        }

      });
      if(x.length==long){
        let msg='No tiene Acceso al sistema';
        console.log("no tiene acceso");
            
      }
    })
  }


 

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
