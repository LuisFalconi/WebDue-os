import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PerfilService } from '../../_service/perfil.service';
import { Perfil } from '../../_model/perfil';
import Swal from 'sweetalert2';
import { ModalComponent } from '../../modal/modal/modal.component';
import { NuevoRestauranteComponent } from '../nuevo-restaurante/nuevo-restaurante.component';
import { NuevoResComponent } from '../../modal/nuevo-res/nuevo-res.component';
import { EditCoordenadasModalComponent } from '../../modal/edit-coordenadas-modal/edit-coordenadas-modal.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-lista-restaurantes',
  templateUrl: './lista-restaurantes.component.html',
  styleUrls: ['./lista-restaurantes.component.css']
})
export class ListaRestaurantesComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['nombreR', 'tipoR', 'capacidadR', 'verificado', 'acciones'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  
  constructor(private perfilSvc: PerfilService, public dialog: MatDialog) { }

  ngOnInit() {
    this.perfilSvc.recuperarDatos().subscribe(perfiles => (this.dataSource.data = perfiles));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applicarFiltro(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

    // De esta manera abro el Dialogo
  editarRestaurante(perfil: Perfil) {
    this.dialogoNuevoRestaurante(perfil);
  }

  editarCoordenadasRestaurante(perfil: Perfil) {
    this.dialogoCoordenadasRestaurante(perfil);
  }

  eliminarRestaurante(perfil: Perfil) {
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        this.perfilSvc.eliminar(perfil).then(() => {
          Swal.fire('Deleted!', 'Your  post has been deleted.', 'success');
        }).catch((error) => {
          Swal.fire('Error!', 'There was an error deleting this post', 'error');
        });
      }
    });

  }


  // Dialogo que valida si al abrir el Dialogo, me muestra el contenido
  // para crear o editar un Restaurante
  // OBSERVACION: Esta  de prueba, en realidad en el Admin no deberia crear un restaurante
  // solo editarlo o eliminarlo
  dialogoNuevoRestaurante(perfil?: Perfil): void {
    const config ={
      data:{
        mensaje: perfil ? 'Cambiar Estado': 'Nuevo Perfil',
        contenido: perfil
      }
    };
    const dialogRef = this.dialog.open(NuevoResComponent, config);
    dialogRef.afterClosed().subscribe(resultado => {
      console.log(`Dialog result ${resultado}`);
    });
  }

  dialogoCoordenadasRestaurante(perfil?: Perfil): void {
    const config ={
      data:{
        mensaje: 'Cambiar coordenadas',
        contenido: perfil
      }
    };
    const dialogRef = this.dialog.open(EditCoordenadasModalComponent, config);
    dialogRef.afterClosed().subscribe(resultado => {
      console.log(`Dialog result ${resultado}`);
    });
  }

  
  // nuevoRestaurante() {
  //   this.dialogoNuevoRestaurante();
  // }

  
  // openDialog(perfil?: Perfil): void {
  //   const config = {
  //     data: {
  //       message: perfil ? 'Edit Post' : 'New Post',
  //       content: perfil
  //     }
  //   };

  //   const dialogRef = this.dialog.open(ModalComponent, config);
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result ${result}`);
  //   });
  // }


}

