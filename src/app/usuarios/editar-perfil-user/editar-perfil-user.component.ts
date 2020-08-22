import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../_service/usuario.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'app/_model/usuario';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalEditPerilUsuarioComponent } from '../../modal/modal-edit-peril-usuario/modal-edit-peril-usuario.component';


@Component({
  selector: 'app-editar-perfil-user',
  templateUrl: './editar-perfil-user.component.html',
  styleUrls: ['./editar-perfil-user.component.css']
})
export class EditarPerfilUserComponent implements OnInit, OnDestroy {
//VARIABLES
dataSource: MatTableDataSource<Usuario>;
displayedColumns = ['acciones']; // Datos que se va amostrar en la tabla

usuarioLog: string;// Validar usuario logueado
usuarioLogeado: Usuario[]; // usario logueado dueño del plato
usuario$: Observable<Usuario[]>;
private ngUnsubscribe: Subject<void> = new Subject();// Se crear la variable para liberar recursos



constructor(private usuarioSvc: UsuarioService,
            private router: Router,
            public dialog: MatDialog,
            private afa: AngularFireAuth) { }




ngOnInit() {

  let currenUser = this.afa.auth.currentUser;
  this.usuarioLog = currenUser.uid;

     // Programacion reactiva:s
     this.usuarioSvc.listar().pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
      data.forEach((user: Usuario) =>{
        if(this.usuarioLog == user.uid){
          this.usuarioLogeado = [user];
          this.dataSource = new MatTableDataSource(this.usuarioLogeado);            
        }else{
          console.log("No");            
        } 
      });
    });

  this.usuario$ = this.usuarioSvc.recuperarDatos(); // recuperamos esta data con ASYNC
}

editarUsuario(user: Usuario) {
  this.openEditDialgo(user);
}



openEditDialgo(user?: Usuario): void {
  const config ={
    data:{
      contenido: user,
      panelClass: 'myapp-no-padding-dialog'
    }
  };
  const dialogRef = this.dialog.open(ModalEditPerilUsuarioComponent, config);
  dialogRef.afterClosed().subscribe(resultado => {
    console.log(`Dialog result ${resultado}`);
  });

}


  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}