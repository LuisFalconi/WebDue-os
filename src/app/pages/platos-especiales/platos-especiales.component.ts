import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { PlatoEspecial } from '../../_model/platoEspecial1';
import { Perfil } from '../../_model/perfil';
import { Plato } from '../../_model/plato';
import { PromocionService } from '../../_service/promocion.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { PerfilService } from '../../_service/perfil.service';
import { PlatoService } from '../../_service/plato.service';
import { LoginService } from '../../_service/login.service';
import { PlatoEspecialService } from '../../_service/plato-especial.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-platos-especiales',
  templateUrl: './platos-especiales.component.html',
  styleUrls: ['./platos-especiales.component.css']
})
export class PlatosEspecialesComponent implements OnInit {

  platoEspecial$: Observable<PlatoEspecial[]>;
  usuarioLog: string;
  

  
  restaurantelog : Perfil[];

  valorRestaurante: boolean=true;
  validacionR: boolean=true;
  valor: boolean=true;
  estadoRestaurante: boolean=true;

  menuLog : Plato[];

  plato$: Observable<Plato[]>;
  perfil$: Observable<Perfil[]>;

  constructor(private platoEspecialSvc: PlatoEspecialService,
              private afa: AngularFireAuth,
              private router: Router,
              private perfilService: PerfilService,
              private platoService : PlatoService,
              private loginService: LoginService) { }

  ngOnInit() {

    let currenUser = this.afa.auth.currentUser;
    this.usuarioLog = currenUser.uid

    this.platoEspecial$ = this.platoEspecialSvc.recuperarDatos();
    this.plato$ = this.platoService.recuperarMenus(); // recuperamos esta data con ASYNC
    this.perfil$ = this.perfilService.recuperarDatos(); // recuperamos esta data con ASYNC

    // this.jsonObject = JSON.parse(this.promociones$);
  }

  deshabilitarPromo(promo: PlatoEspecial){    
    Swal.fire({
      title: 'Deseas deshabilitar tu plato?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "No!",
      confirmButtonText: 'Si!'
    }).then((result) => {
      if (result.value) {       
        this.platoEspecialSvc.editarPlatoEspeciales(promo).then(() =>{
          //this.timer();
          //window.location.reload(true);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Plato deshabilitado',
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

  eliminarPromo(promo: PlatoEspecial){    
    Swal.fire({
      title: 'Deseas eliminar tu plato Especial?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "No!",
      confirmButtonText: 'Si!'
    }).then((result) => {
      if (result.value) {       
        this.platoEspecialSvc.eliminar(promo).then(() =>{
          //this.timer();
          //window.location.reload(true);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Plato eliminado',
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

  habilitarPromo(promo: PlatoEspecial){
    
    Swal.fire({
      title: 'Deseas habilitar tu plato?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "No!",
      confirmButtonText: 'Si!'
    }).then((result) => {
      if (result.value) {       
        this.platoEspecialSvc.habilitarPlatoEspecial(promo).then(() =>{
          //this.timer();
          //window.location.reload(true);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Plato habilitado!',
            showConfirmButton: false,
            timer: 1500
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
          timer: 1500
        });
    }
    })
  }

}

