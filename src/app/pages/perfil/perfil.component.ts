import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../_model/usuario';
import { AngularFireAuth } from '@angular/fire/auth';
import { Perfil } from '../../_model/perfil';
import { PerfilService } from '../../_service/perfil.service';
import { LoginService } from '../../_service/login.service';
import { PlatoService } from '../../_service/plato.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../modal/modal/modal.component';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario: string;
  ultimaConexion: string;
  desde: string;
  usuarioSocial: string;
  emailVerificado: boolean;
  fotoSocial: string;

  perfil : Perfil[];
  restaurantelog : Perfil[];

  usuarioLog: string;
  perfil$: Observable<Perfil[]>;

  valor: boolean=true;
  editarMenu: boolean;
  resDeshabilitado: boolean;

  
  constructor(private afa: AngularFireAuth, private perfilService: PerfilService,
              private loginService: LoginService,
              private platoService: PlatoService,
              private dialog: MatDialog,
              private route: Router) { }

  ngOnInit() {
    let currenUser = this.afa.auth.currentUser;
    this.usuario = currenUser.phoneNumber;
    this.usuarioLog = currenUser.uid;
    // variable para validar si el correo del usuaro 
    this.emailVerificado = currenUser.emailVerified;
    this.editarMenu = false;
    //this.ultimaConexion = currenUser.metadata.lastSignInTime;
    //this.desde = currenUser.metadata.creationTime;
    // this.usuarioSocial = currenUser.displayName;
    // this.fotoSocial = currenUser.photoURL;
    
    // Programacion reactiva: Me permite mostrar los datos de la tabla del usuario logueado para que el pueda editar
    this.perfilService.listar().subscribe(data => {
      for(let x of data){
        if(this.usuarioLog == x.userUID){
          this.restaurantelog = [x];
          this.valor = true;
          this.validacion(this.valor);
          console.log("Existe informacion del restaurante", this.validacion(this.valor));
          console.log("Este restaurante", this.restaurantelog); 
          break;   
        }else{
          this.valor = false;
          console.log("No exite informacion del restaurante", this.validacion(this.valor));
        } 
      }
  });
   
    this.perfilService.listar().subscribe(data=>{
      this.perfil = data;
      //console.log(this.perfil);     
    });

    this.perfil$ = this.perfilService.recuperarDatos();
  }

  // Metodo para validar si existe informacion del restaurante
  // y mostrar la opcion para cargar promociones
  validacion(valor: boolean){
      if (valor){
        return true;
      }else{
        return false;
      }
    }

    deshabilitarRestaurante(res: Perfil){    
      Swal.fire({
        title: 'Deseas deshabilitar tu restaurante?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: "No!",
        confirmButtonText: 'Si!'
      }).then((result) => {
        if (result.value) {       
          this.perfilService.deshabilitarRestaurante(res).then(() =>{
            //this.timer();
            // Controlo el Ng model para que aparezca el restaurante Deshabilitad
            this.resDeshabilitado = true;
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Restaurante deshabilitado',
              showConfirmButton: false,
              timer: 1000
            })
                .then(() =>{
                //this.router.navigate(['/perfil']);
              });
            }).catch((error =>{
              Swal.fire('Error!', error ,'error');
            }));
        }else {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Cancelado',
            showConfirmButton: false,
            timer: 1000
          });
      }
      })
    }

    habilitarRestaurante(res: Perfil){    
      Swal.fire({
        title: 'Desea habilitar su restaurante?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: "No!",
        confirmButtonText: 'Si!'
      }).then((result) => {
        if (result.value) {       
          this.perfilService.habilitarRestaurante(res).then(() =>{
            //this.timer();
            //window.location.reload(true);
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Restaurante habilitado',
              showConfirmButton: false,
              timer: 1000
            })
              .then(() =>{
                //this.router.navigate(['/perfil']);
              });
            }).catch((error =>{
              Swal.fire('Error!', error ,'error');
            }));
        }else {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Cancelado',
            showConfirmButton: false,
            timer: 1000
        });
      }
    })
  }

  enviarEmail(){
    this.route.navigate(['/verificacionE']);
  }
  
    onNewPost() {
      this.openDialog();
    }
  
    openDialog(): void {
      const dialogRef = this.dialog.open(ModalComponent, {panelClass: 'myapp-no-padding-dialog'});
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result ${result}`);
      });
    }
}
