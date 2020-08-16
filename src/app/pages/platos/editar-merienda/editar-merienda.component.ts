import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { Observable, Subject } from 'rxjs';
import { PlatoMeriendaService } from '../../../_service/plato-merienda.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { takeUntil } from 'rxjs/operators';
import { ModalEditarMeriendaComponent } from '../../../modal/modal-editar-merienda/modal-editar-merienda.component';
import { MatTableDataSource } from '@angular/material/table';
import { PlatoMerienda } from '../../../_model/platoMerienda';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-editar-merienda',
  templateUrl: './editar-merienda.component.html',
  styleUrls: ['./editar-merienda.component.css']
})
export class EditarMeriendaComponent implements OnInit, OnDestroy {

 //VARIABLES
 dataSource: MatTableDataSource<PlatoMerienda>;
 displayedColumns = ['acciones']; // Datos que se va amostrar en la tabla
 
 usuarioLog: string;// Validar usuario logueado
 usuarioLogeado: PlatoMerienda[]; // usario logueado dueño del plato
 menuDesayuno : PlatoMerienda[];
 platoDes$: Observable<PlatoMerienda[]>;
 private ngUnsubscribe: Subject<void> = new Subject();// Se crear la variable para liberar recursos

 

 constructor(private meriendaService: PlatoMeriendaService,
             private router: Router,
             public dialog: MatDialog,
             private afa: AngularFireAuth) { }


 

 ngOnInit() {

   let currenUser = this.afa.auth.currentUser;
   this.usuarioLog = currenUser.uid;

      // Programacion reactiva:s
      this.meriendaService.listar().pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
       data.forEach((menus: PlatoMerienda) =>{
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

   this.platoDes$ = this.meriendaService.recuperarMenus(); // recuperamos esta data con ASYNC
 }

 eliminar(platoDes: PlatoMerienda){
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
       this.meriendaService.eliminar(platoDes).then(() =>{
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


 editarMerienda(platoDes: PlatoMerienda) {
   this.openEditDialgo(platoDes);
 }



 openEditDialgo(platoDes?: PlatoMerienda): void {
   const config ={
     data:{
       contenido: platoDes,
       panelClass: 'myapp-no-padding-dialog'
     }
   };
   const dialogRef = this.dialog.open(ModalEditarMeriendaComponent, config);
   dialogRef.afterClosed().subscribe(resultado => {
     console.log(`Dialog result ${resultado}`);
   });

 }


 ngOnDestroy(){
   this.ngUnsubscribe.next();
   this.ngUnsubscribe.complete();
 }

}
