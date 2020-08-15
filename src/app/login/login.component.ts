import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../_service/login.service';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { MenuService } from '../_service/menu.service';
import { Menu } from '../_model/menu';
import { Subject } from 'rxjs';
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

  // Se crear la variable para liberar recursos
  private ngUnsubscribe: Subject<void> = new Subject();

  constructor(private LoginService: LoginService,
              private route : Router,
              private menuService: MenuService,
              private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer) { 

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
      this.listarMenus();
      this.route.navigate(['/infoPerfil']);
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

      this.listarMenus();
      this.route.navigate(['/infoPerfil']);
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

  listarMenus() {
    // .pipe(takeUntil(this.ngUnsubscribe)): Vas hacer esto hasta que el subscribe sea necesaria para librerar recursos
    this.menuService.listar().pipe(takeUntil(this.ngUnsubscribe)).subscribe(menus => {

      this.LoginService.user.pipe(takeUntil(this.ngUnsubscribe)).subscribe(userData => {
        if (userData) {
          //console.log(userData);
          let user_roles: string[] = userData.roles
          let final_menus: Menu[] = [];

          for (let menu of menus) {
            n2: for (let rol of menu.roles) {
              for (let urol of user_roles) {
                if (rol === urol) {
                  let m = new Menu();
                  m.nombre = menu.nombre;
                  m.icono = menu.icono;
                  m.url = menu.url;
                  final_menus.push(m);
                  break n2;
                }
              }
            }

            this.menuService.menuCambio.next(final_menus);
            this.route.navigate(['/infoPerfil']);
          }
        }
      });
    });
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
