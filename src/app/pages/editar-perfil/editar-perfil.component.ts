import { ModalEditRestautanteComponent } from './../../modal/modal-edit-restautante/modal-edit-restautante.component';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Perfil } from '../../_model/perfil';
import { Subject, Observable } from 'rxjs';
import { PerfilService } from '../../_service/perfil.service';
import { takeUntil } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { stripSummaryForJitFileSuffix } from '@angular/compiler/src/aot/util';
import { analytics } from 'firebase';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ModalEditRestaurantDuenoComponent } from '../../modal/modal-edit-restaurant-dueno/modal-edit-restaurant-dueno.component';
import { Plato } from '../../_model/plato';
import { PlatoService } from '../../_service/plato.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ValidacionService } from '../../_service/validacion.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit, OnDestroy {

  dataSource: MatTableDataSource<Perfil>;
  dataSource1: MatTableDataSource<Perfil>;
  dataSource2: MatTableDataSource<Perfil>;
  dataSource3: MatTableDataSource<Perfil>;

  displayedColumns = ['acciones'];
  displayedColumns1 = ['nombreR','tipoR', 'acciones'];
  displayedColumns2 = ['direccionR','capacidadR', 'acciones'];
  displayedColumns3 = ['horarioA','horarioC', 'acciones'];

  private ngUnsubscribe: Subject<void> = new Subject();// Se crear la variable para liberar recursos
  usuarioLog: string;
  useremailLog: string;
  loginuser: Perfil[];
  loginuserlog: Perfil[];

  estadoEdicion: false;
  idPerfil: string;
  perfil: any[];
  n: number;
  perfil$: Observable<Perfil[]>;
  restaurantelog : Perfil[];

  emailVerificado: boolean;

  valorRestaurante: boolean=true;
  validacionR: boolean=true;
  valor: boolean=true;

  menuLog : Plato[];

  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true}) sort: MatSort;

  constructor(private perfilService: PerfilService,
              private snackBar: MatSnackBar,
              private afa: AngularFireAuth,
              private router: Router,
              public dialog: MatDialog,
              private validacionService: ValidacionService,
              private platoService: PlatoService,) { }

  ngOnInit() {

    let currenUser = this.afa.auth.currentUser;
    this.usuarioLog = currenUser.uid;
    this.useremailLog = currenUser.email;

    this.emailVerificado = currenUser.emailVerified;

    this.perfilService.listar().subscribe(data =>{
      this.perfil = data

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

    })

    // Programacion reactiva: Me permite mostrar los datos de la tabla del usuario logueado para que el pueda editar
    this.perfilService.listar().pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
        data.forEach((x: Perfil) =>{
            if(this.usuarioLog == x.userUID){
              console.log("Si");
              //console.log("Si");
              this.loginuserlog = [x];
              this.dataSource = new MatTableDataSource(this.loginuserlog);
              this.dataSource1 = new MatTableDataSource(this.loginuserlog); 
              this.dataSource2 = new MatTableDataSource(this.loginuserlog); 
              this.dataSource3 = new MatTableDataSource(this.loginuserlog); 
            }else{
              console.log("No");
              this.dataSource = new MatTableDataSource(this.loginuserlog);
            }       
        });

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.perfil$ = this.perfilService.recuperarDatos();
      // console.log("ID Login" + this.usuarioLog);
      //console.log("Usuario logueado : " + this.useremailLog);
      
    });
  }
  
  eliminar(perfil: Perfil){
    Swal.fire({
      title: 'Deseas eliminar tu restaurante?',
      text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "No!",
      confirmButtonText: 'Si!'
    }).then((result) => {
      if (result.value) {
        this.perfilService.eliminar(perfil).then(() =>{
          //this.timer();
          //window.location.reload(true);
          Swal.fire('Eliminado!','Tu Restaurante ha sido eliminado','success')
            .then(() =>{
              this.router.navigate(['/perfil']);
            });
          }).catch((error =>{
            Swal.fire('Error!', error ,'error');
          }));
      }else {
        Swal.fire("Cancelado", "Tu restaurante esta a salvo :)", "error");
    }
    })
  }

  editarRestaurante(perfil: Perfil) {
    console.log('Edit posta', perfil);
    this.abrirEditorDialogo(perfil);
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
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

  openEditDialgo(perfil?: Perfil): void {
    const config ={
      data:{
        contenido: perfil,
        panelClass: 'myapp-no-padding-dialog'
      }
    };
    const dialogRef = this.dialog.open(ModalEditRestautanteComponent, config);
    dialogRef.afterClosed().subscribe(resultado => {
      console.log(`Dialog result ${resultado}`);
    });
  }

  abrirEditorDialogo(perfil?: Perfil): void {
    const config ={
      data:{
        contenido: perfil,
        panelClass: 'myapp-no-padding-dialog'
      }
    };
    const dialogRef = this.dialog.open(ModalEditRestaurantDuenoComponent, config);
    dialogRef.afterClosed().subscribe(resultado => {
      console.log(`Dialog result ${resultado}`);
    });
  }
}
