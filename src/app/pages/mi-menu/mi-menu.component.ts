import { PlatoMerienda } from './../../_model/platoMerienda';
import { ModalAlmuerzoComponent } from './../../modal/modal-almuerzo/modal-almuerzo.component';
import { PlatoAlmuerzo } from './../../_model/platoAlmuerzo';
import { PlatoDesayuno } from './../../_model/platoDesayuno';
import { Component, OnInit } from '@angular/core';
import { Plato } from '../../_model/plato';
import { AngularFireAuth } from '@angular/fire/auth';
import { PlatoService } from '../../_service/plato.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddMenuModalComponent } from '../../modal/add-menu-modal/add-menu-modal.component';
import { PerfilService } from '../../_service/perfil.service';
import { Perfil } from '../../_model/perfil';
import { Usuario } from '../../_model/usuario';
import { ModalDesayunoComponent } from '../../modal/modal-desayuno/modal-desayuno.component';
import { PlatoDesayunoService } from '../../_service/plato-desayuno.service';
import { PlatoAlmuerzoService } from '../../_service/plato-almuerzo.service';
import { PlatoMeriendaService } from '../../_service/plato-merienda.service';
import { ModalMeriendaComponent } from '../../modal/modal-merienda/modal-merienda.component';
import { ValidacionService } from '../../_service/validacion.service';

@Component({
  selector: 'app-mi-menu',
  templateUrl: './mi-menu.component.html',
  styleUrls: ['./mi-menu.component.css']
})
export class MiMenuComponent implements OnInit {

  usuario: string;
  usuarioSocial: string;
  fotoSocial: string;

  platos : Plato[];
  usuarioLog: string;
  menuLog : Plato[];
  restaurantelog : Perfil[];


  usuarioDes: string;

  valor: boolean=true;
  // Variable para aparecer y desaparecer los botones
  valorD: boolean=true;
  valorA: boolean=true;
  valorM: boolean=true;


  // Variable para buscar el restaurante
  valorRestaurante: boolean=true;
  // Variable para alidar si el restaurante subio algun documento
  validacionR: boolean=true;
  // Variable para validar si el restaurante esta habilitado o no
  estadoRestaurante: boolean=true;


  plato$: Observable<Plato[]>;
  platoDes$: Observable<PlatoDesayuno[]>;
  platoAlm$: Observable<PlatoAlmuerzo[]>;
  platoMer$: Observable<PlatoMerienda[]>;
  perfil$: Observable<Perfil[]>;

  emailVerificado: boolean;


  constructor(private afa:AngularFireAuth,
              private platoService: PlatoService,
              private desayunoService: PlatoDesayunoService,
              private almuerzoService: PlatoAlmuerzoService,
              private meriendaService: PlatoMeriendaService,
              private dialog: MatDialog,
              private perfilService: PerfilService,
              private validacionService: ValidacionService) { }

  ngOnInit() {
    let currenUser = this.afa.auth.currentUser;
    this.usuario = currenUser.email;
    this.usuarioLog = currenUser.uid;
    this.usuarioSocial = currenUser.displayName;
    this.fotoSocial = currenUser.photoURL;
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

    this.desayunoService.listar().subscribe(data =>{
      for(let d of data){
        if(this.usuarioLog == d.userUID){
          this.valorD = true;
          this.validacionDes(this.valorD);
          break;   
        }else{
          this.valorD = false;
          this.validacionDes(this.valorD);
        } 
      }
    });

    this.almuerzoService.listar().subscribe(data =>{
      for(let a of data){
        if(this.usuarioLog == a.userUID){
          this.valorA = true;
          this.validacionAlm(this.valorA);
          break;   
        }else{
          this.valorA = false;
          this.validacionAlm(this.valorA);
        } 
      }
    });

    this.meriendaService.listar().subscribe(data =>{
      for(let m of data){
        if(this.usuarioLog == m.userUID){
          this.valorM = true;
          this.validacionMer(this.valorM);
          break;   
        }else{
          this.valorM = false;
          this.validacionMer(this.valorM);
        } 
      }
    });

    // Esto funciona para verificar si un restaurant tiene un documento subido
    this.validacionService.listar().subscribe(data => {
      // console.log(data);
      for(let x of data){
        if(this.usuarioLog == x.userUID){
          // console.log("Si existe documento");
          // console.log(x.docValidacion);
          //this.restaurantelog = [x];
          this.validacionR = true;
          this.validacionDocRestauranteExiste(this.validacionR);
          //console.log("Este restaurante", this.restaurantelog); 
          break;   
        }else{
          // console.log("No existe documento");
          // console.log(x.userUID);
          
          this.validacionR = false;
          this.validacionDocRestauranteExiste(this.validacionR);
        } 
      }
  });

  
    
    this.perfilService.listar().subscribe(data => {
      for(let x of data){
        if(this.usuarioLog == x.userUID){
          //console.log("Si");
          this.restaurantelog = [x];
          this.valorRestaurante = true;
          this.validacionRestauranteExiste(this.valorRestaurante);
          // De esta manera valido si el rstaurante esta habilitado
          this.restaurantelog.forEach(element => {
            if (element.estado === 'verdadero') {
              this.estadoRestaurante = true;
              this.estadoRestauranteActual(this.estadoRestaurante); 
            } else if (element.estado === 'falso') {
              this.estadoRestaurante = false;
              this.estadoRestauranteActual(this.estadoRestaurante); 
            }
          }); 
          break;   
        }else{
          // console.log("No");
          this.valorRestaurante = false;
          this.validacionRestauranteExiste(this.valorRestaurante);
        } 
      }
  });



  this.plato$ = this.platoService.recuperarMenus(); // recuperamos esta data con ASYNC
  this.platoDes$ = this.desayunoService.recuperarMenus(); // recuperamos esta data con ASYNC
  this.platoAlm$ = this.almuerzoService.recuperarMenus(); // recuperamos esta data con ASYNC
  this.platoMer$ = this.meriendaService.recuperarMenus(); // recuperamos esta data con ASYNC
  this.perfil$ = this.perfilService.recuperarDatos(); // recuperamos esta data con ASYNC
    

  }

  // Funcion que comprueba si exite informacion en la base
  validacion(valor: boolean){
    if (valor){
      return true;
    }else{
      return false;
    }
  }

  validacionAlm(valorA: boolean){
    if (valorA){
      return true;
    }else{
      return false;
    }
  }

  validacionMer(valorM: boolean){
    if (valorM){
      return true;
    }else{
      return false;
    }
  }

  validacionDes(valorD: boolean){
    if (valorD){
      return true;
    }else{
      return false;
    }
  }

  validacionRestauranteExiste(valor: boolean){
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

  estadoRestauranteActual(valor: boolean){
    if (valor){
      return true;
    }else{
      return false;
    }
  }

  nuevoMenu() {
    this.openDialog();
  }

  nuevoDesayuno() {
    this.desayunoDialog();
  }

  nuevoAlmuerzo() {
    this.almuerzoDialog();
  }

  nuevaMerienda() {
    this.meriendaDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddMenuModalComponent, {panelClass: 'myapp-no-padding-dialog'});
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result ${result}`);
    });
  }

  desayunoDialog(): void {
    const dialogRef = this.dialog.open(ModalDesayunoComponent, {panelClass: 'myapp-no-padding-dialog'});
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result ${result}`);
    });
  }

  almuerzoDialog(): void {
    const dialogRef = this.dialog.open(ModalAlmuerzoComponent, {panelClass: 'myapp-no-padding-dialog'});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result ${result}`);
    });
  }

  meriendaDialog(): void {
    const dialogRef = this.dialog.open(ModalMeriendaComponent, {panelClass: 'myapp-no-padding-dialog'});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result ${result}`);
    });
  }

}
