import { PlatoDesayuno } from './../../../_model/platoDesayuno';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlatoDesayunoService } from '../../../_service/plato-desayuno.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalEditarDesayunoComponent } from '../../../modal/modal-editar-desayuno/modal-editar-desayuno.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-desayuno',
  templateUrl: './editar-desayuno.component.html',
  styleUrls: ['./editar-desayuno.component.css']
})
export class EditarDesayunoComponent implements OnInit, OnDestroy {

  //VARIABLES
  dataSource: MatTableDataSource<PlatoDesayuno>;
  displayedColumns = ['acciones']; // Datos que se va amostrar en la tabla
  
  usuarioLog: string;// Validar usuario logueado
  usuarioLogeado: PlatoDesayuno[]; // usario logueado dueño del plato
  menuDesayuno : PlatoDesayuno[];
  platoDes$: Observable<PlatoDesayuno[]>;
  private ngUnsubscribe: Subject<void> = new Subject();// Se crear la variable para liberar recursos

  

  constructor(private desayunoService: PlatoDesayunoService,
              private router: Router,
              public dialog: MatDialog,
              private afa: AngularFireAuth) { }


  

  ngOnInit() {

    let currenUser = this.afa.auth.currentUser;
    this.usuarioLog = currenUser.uid;

       // Programacion reactiva:s
       this.desayunoService.listar().pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
        data.forEach((menus: PlatoDesayuno) =>{
          if(this.usuarioLog == menus.userUID){
            // console.log("usuario logado", this.usuarioLog);
            // console.log("menu logado", menus.userUID);
            
            // console.log("Si");
            this.usuarioLogeado = [menus];
            this.dataSource = new MatTableDataSource(this.usuarioLogeado);            
          }else{
            console.log("No");            
          } 
        });
        //this.dataSource = new MatTableDataSource(data);
        //this.dataSource2 = new MatTableDataSource(data);
        //this.dataSource3 = new MatTableDataSource(data);
      });

    this.platoDes$ = this.desayunoService.recuperarMenus(); // recuperamos esta data con ASYNC
  }

  eliminar(platoDes: PlatoDesayuno){
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
        this.desayunoService.eliminar(platoDes).then(() =>{
          //this.timer();
          //window.location.reload(true);
          Swal.fire('Eliminado!','Tu Menú ha sido eliminado','success')
            .then(() =>{
              this.router.navigate(['dueño/miMenu']);
            });
          }).catch((error =>{
            Swal.fire('Error!', error ,'error');
          }));
      }else {
        Swal.fire("Cancelado", "Tu menú esta a salvo :)", "error");
    }
    })
  }


  editarDesayuno(platoDes: PlatoDesayuno) {
    this.openEditDialgo(platoDes);
  }



  openEditDialgo(platoDes?: PlatoDesayuno): void {
    const config ={
      data:{
        contenido: platoDes,
        panelClass: 'myapp-no-padding-dialog'
      }
    };
    const dialogRef = this.dialog.open(ModalEditarDesayunoComponent, config);
    dialogRef.afterClosed().subscribe(resultado => {
      console.log(`Dialog result ${resultado}`);
    });

  }


  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
