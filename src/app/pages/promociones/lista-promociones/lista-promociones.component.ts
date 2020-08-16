import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Promocion } from '../../../_model/promocion';
import { PromocionService } from '../../../_service/promocion.service';
import { AngularFireAuth } from '@angular/fire/auth';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Perfil } from '../../../_model/perfil';
import { PerfilService } from '../../../_service/perfil.service';
import { Plato } from '../../../_model/plato'
import { PlatoService } from '../../../_service/plato.service'
import { ValidacionService } from '../../../_service/validacion.service';

@Component({
  selector: 'app-lista-promociones',
  templateUrl: './lista-promociones.component.html',
  styleUrls: ['./lista-promociones.component.css']
})
export class ListaPromocionesComponent implements OnInit {

  promociones$: Observable<Promocion[]>;
  usuarioLog: string;

  emailVerificado: boolean;

  restaurantelog : Perfil[];

  valorRestaurante: boolean=true;
  validacionR: boolean=true;
  valor: boolean=true;
  menuLog : Plato[];

  plato$: Observable<Plato[]>;
  perfil$: Observable<Perfil[]>;

  constructor(private promocionSvs: PromocionService,
              private afa: AngularFireAuth,
              private router: Router,
              private validacionService: ValidacionService,
              private perfilService: PerfilService,
              private platoService : PlatoService) { }

  ngOnInit() {

    let currenUser = this.afa.auth.currentUser;
    this.usuarioLog = currenUser.uid

    // variable para validar si el correo del usuaro 
    this.emailVerificado = currenUser.emailVerified;


    this.platoService.listar().subscribe(data =>{
      for(let x of data){
        if(this.usuarioLog == x.userUID){
          //console.log("Si");
          //console.log("Si");
          this.menuLog = [x];
          this.valor = true;
          this.validacion(this.valor);
          //console.log("Validacion", this.validacion(this.valor));
          //console.log("Valor:", this.valor);
          //console.log("Este restaurante", this.menuLog); 
          break;   
        }else{
          //console.log("No");
          this.valor = false;
          //console.log("Valor:", this.valor);
          this.validacion(this.valor);
          //console.log("Validacion", this.validacion(this.valor));
        } 
      }
    });


    // Esto funciona para verificar si un restaurant tiene un documento subido
    this.validacionService.listar().subscribe(data => {
      console.log(data);
      for(let x of data){
        if(this.usuarioLog == x.userUID){
          console.log("Si existe documento");
          console.log(x.docValidacion);
          //this.restaurantelog = [x];
          this.validacionR = true;
          this.validacionDocRestauranteExiste(this.validacionR);
          //console.log("Este restaurante", this.restaurantelog); 
          break;   
        }else{
          console.log("No existe documento");
          console.log(x.userUID);
          
          this.validacionR = false;
          this.validacionDocRestauranteExiste(this.validacionR);
        } 
      }
  });


  this.perfilService.listar().subscribe(data => {
    for(let x of data){
      if(this.usuarioLog == x.userUID){
        console.log("Si");
        //console.log("Si");
        this.restaurantelog = [x];
        this.valorRestaurante = true;
        this.validacionRestauranteExiste(this.valorRestaurante);
        //console.log("Este restaurante", this.restaurantelog); 
        break;   
      }else{
        console.log("No");
        this.valorRestaurante = false;
        this.validacionRestauranteExiste(this.valorRestaurante);
      } 
    }
});

    this.promociones$ = this.promocionSvs.recuperarDatos();
    this.plato$ = this.platoService.recuperarMenus(); // recuperamos esta data con ASYNC
    this.perfil$ = this.perfilService.recuperarDatos(); // recuperamos esta data con ASYNC

  }

  deshabilitarPromo(promo: Promocion){    
    Swal.fire({
      title: 'Deseas deshabilitar tu promocion?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "No!",
      confirmButtonText: 'Si!'
    }).then((result) => {
      if (result.value) {       
        this.promocionSvs.editarPromocion(promo).then(() =>{
          //this.timer();
          //window.location.reload(true);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Promoción deshabilitada',
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

  eliminarPromo(promo: Promocion){    
    Swal.fire({
      title: 'Deseas eliminar tu promocion?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "No!",
      confirmButtonText: 'Si!'
    }).then((result) => {
      if (result.value) {       
        this.promocionSvs.eliminar(promo).then(() =>{
          //this.timer();
          //window.location.reload(true);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Promoción eliminada',
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

  habilitarPromo(promo: Promocion){
    
    Swal.fire({
      title: 'Deseas habilitar tu promocion?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "No!",
      confirmButtonText: 'Si!'
    }).then((result) => {
      if (result.value) {       
        this.promocionSvs.habilitarPromocion(promo).then(() =>{
          //this.timer();
          //window.location.reload(true);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Promoción habilitada!',
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

  enviarEmail(){
    this.router.navigate(['/verificacionE']);
  }

  validacionRestauranteExiste(valor: boolean){
    if (valor){
      return true;
    }else{
      return false;
    }
  }

  validacion(valor: boolean){
    if (valor){
      return true;
    }else{
      return false;
    }
  }

  // Validacion si el documento que valide el nuevo restaurante existe
  validacionDocRestauranteExiste(valor: boolean){
    if (valor){
      return true;
    }else{
      return false;
    }
  }

  validacionDocumento(valor: boolean){
    if (valor){
      return true;
    }else{
      return false;
    }
  }

}
