import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { PlatoService } from '../../_service/plato.service';
import { Plato } from '../../_model/plato';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FunctionService } from '../../_service/function.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { EditMenuModalComponent } from '../../modal/edit-menu-modal/edit-menu-modal.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Perfil } from '../../_model/perfil';
import { PerfilService } from '../../_service/perfil.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ValidacionService } from '../../_service/validacion.service';

@Component({
  selector: 'app-plato',
  templateUrl: './plato.component.html',
  styleUrls: ['./plato.component.css']
})
export class PlatoComponent implements OnInit, OnDestroy {

  dataSource: MatTableDataSource<Plato>;
  dataSource2: MatTableDataSource<Plato>;
  dataSource3: MatTableDataSource<Plato>;
  displayedColumns1 = ['platoDes', 'detalleDes' ,'precioDes', 'acciones']; // Datos que se va amostrar en la tabla
  displayedColumns2 = ['entradaAlm', 'segundoAlm' ,'jugoAlm','precioAlm','acciones']; // Datos que se va amostrar en la tabla

  usuarioLog: string;// Validar usuario logueado
  usuarioLogeado: Plato[]; // variable para guardar la coleccion de los campos de los usuarios logueados
  plato$: Observable<Plato[]>;

  emailVerificado: boolean;

  restaurantelog : Perfil[];
  menuLog : Plato[];

  valor: boolean=true;
  valorRestaurante: boolean=true;
  validacionR: boolean=true;

  perfil$: Observable<Perfil[]>;

  private ngUnsubscribe: Subject<void> = new Subject();// Se crear la variable para liberar recursos

  // @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  // @ViewChild(MatSort, { static: true}) sort: MatSort;
  
  constructor(private platoService: PlatoService, 
              private snackBar: MatSnackBar, 
              private functionService: FunctionService,
              private afa: AngularFireAuth,
              private router: Router,
              public dialog: MatDialog,
              private perfilService: PerfilService,
              private validacionService: ValidacionService) {

  }

  ngOnInit() {

    // Esto permite traer la data del cloud service
    // this.functionService.probar().then( data =>{
    //   console.log(data);
    // });

    let currenUser = this.afa.auth.currentUser;
    this.usuarioLog = currenUser.uid;

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




    this.plato$ = this.platoService.recuperarMenus(); // recuperamos esta data con ASYNC
    

    

    // Programacion reactiva:s
    this.platoService.listar().pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
      data.forEach((menus: Plato) =>{
        if(this.usuarioLog == menus.userUID){
          console.log("Si");
          this.usuarioLogeado = [menus];
          console.log(this.usuarioLogeado);
          this.dataSource = new MatTableDataSource(this.usuarioLogeado);
          this.dataSource2 = new MatTableDataSource(this.usuarioLogeado);
          
        }else{
          console.log("No");
        } 
      });
      //this.dataSource = new MatTableDataSource(data);
      //this.dataSource2 = new MatTableDataSource(data);
      //this.dataSource3 = new MatTableDataSource(data);
    });

    this.plato$ = this.platoService.recuperarMenus(); // recuperamos esta data con ASYNC
    this.perfil$ = this.perfilService.recuperarDatos(); // recuperamos esta data con ASYNC
    
  }

  eliminar(plato: Plato){
    Swal.fire({
      title: 'Deseas eliminar tu menú?',
      text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "No!",
      confirmButtonText: 'Si!'
    }).then((result) => {
      if (result.value) {
        this.platoService.eliminar(plato).then(() =>{
          //this.timer();
          //window.location.reload(true);
          Swal.fire('Eliminado!','Tu Menú ha sido eliminado','success')
            .then(() =>{
              this.router.navigate(['/miMenu']);
            });
          }).catch((error =>{
            Swal.fire('Error!', error ,'error');
          }));
      }else {
        Swal.fire("Cancelado", "Tu menú esta a salvo :)", "error");
    }
    })
  }

  editarMenu(plato: Plato) {
    this.openEditDialgo(plato);
  }

  enviarEmail(){
    this.router.navigate(['/verificacionE']);
  }

  validacion(valor: boolean){
    if (valor){
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

  openEditDialgo(plato?: Plato): void {
    const config ={
      data:{
        contenido: plato,
        panelClass: 'myapp-no-padding-dialog'
      }
    };
    const dialogRef = this.dialog.open(EditMenuModalComponent, config);
    dialogRef.afterClosed().subscribe(resultado => {
      console.log(`Dialog result ${resultado}`);
    });
  }

  

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
