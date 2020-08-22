import { ModalEditarAlmuerzoComponent } from './../../../modal/modal-editar-almuerzo/modal-editar-almuerzo.component';
import { PlatoAlmuerzo } from './../../../_model/platoAlmuerzo';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PlatoAlmuerzoService } from '../../../_service/plato-almuerzo.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-almuerzo',
  templateUrl: './editar-almuerzo.component.html',
  styleUrls: ['./editar-almuerzo.component.css']
})
export class EditarAlmuerzoComponent implements OnInit, OnDestroy  {

 //VARIABLES
 dataSource: MatTableDataSource<PlatoAlmuerzo>;
 displayedColumns = ['acciones']; // Datos que se va amostrar en la tabla
 
 usuarioLog: string;// Validar usuario logueado
 usuarioLogeado: PlatoAlmuerzo[]; // usario logueado dueño del plato
 menuDesayuno : PlatoAlmuerzo[];
 platoAlm$: Observable<PlatoAlmuerzo[]>;
 private ngUnsubscribe: Subject<void> = new Subject();// Se crear la variable para liberar recursos

 

 constructor(private almuerzoService: PlatoAlmuerzoService,
             private router: Router,
             public dialog: MatDialog,
             private afa: AngularFireAuth) { }


 

 ngOnInit() {

   let currenUser = this.afa.auth.currentUser;
   this.usuarioLog = currenUser.uid;

      // Programacion reactiva:s
      this.almuerzoService.listar().pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
       data.forEach((menus: PlatoAlmuerzo) =>{
         if(this.usuarioLog == menus.userUID){
          //  console.log("usuario logado", this.usuarioLog);
          //  console.log("menu logado", menus.userUID);
           
          //  console.log("Si");
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

   this.platoAlm$ = this.almuerzoService.recuperarMenus(); // recuperamos esta data con ASYNC
 }

 eliminar(platoAlm: PlatoAlmuerzo){
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
       this.almuerzoService.eliminar(platoAlm).then(() =>{
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


 editarAlmuerzo(platoAlm: PlatoAlmuerzo) {
   this.openEditDialgo(platoAlm);
 }



 openEditDialgo(platoAlm?: PlatoAlmuerzo): void {
   const config ={
     data:{
       contenido: platoAlm,
       panelClass: 'myapp-no-padding-dialog'
     }
   };
   const dialogRef = this.dialog.open(ModalEditarAlmuerzoComponent, config);
   dialogRef.afterClosed().subscribe(resultado => {
     console.log(`Dialog result ${resultado}`);
   });

 }


 ngOnDestroy(){
   this.ngUnsubscribe.next();
   this.ngUnsubscribe.complete();
 }

}
