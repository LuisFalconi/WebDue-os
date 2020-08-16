import { Usuario } from './../../_model/usuario';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UsuarioService } from '../../_service/usuario.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['email', 'rol', 'uid', 'acciones'];
  dataSource = new MatTableDataSource();


  usuarios$: Observable<Usuario[]>;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(private usuarioSvc: UsuarioService) { }

  ngOnInit() {
    this.usuarioSvc.recuperarDatos().subscribe(usuarios => (this.dataSource.data = usuarios));

    this.usuarios$ = this.usuarioSvc.recuperarDatos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applicarFiltro(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // editarRestaurante(perfil: Perfil) {
  //   console.log('Edit posta', perfil);
  //   this.dialogoNuevoRestaurante(perfil);
  // }

  eliminarUsuario(usuario: Usuario) {   
     
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
        this.usuarioSvc.eliminarUsuario(usuario).then(() => {
          Swal.fire('Deleted!', 'Your  post has been deleted.', 'success');
        }).catch((error) => {
          Swal.fire('Error!', 'There was an error deleting this post', 'error');
        });
      }
    });
  }

  habilitarUsuario(usuario: Usuario) {   
     
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
        this.usuarioSvc.habilitarUsuario(usuario).then(() => {
          Swal.fire('Deleted!', 'Your  post has been deleted.', 'success');
        }).catch((error) => {
          Swal.fire('Error!', 'There was an error deleting this post', 'error');
        });
      }
    });
  }

  deshabilitarUsuario(usuario: Usuario) {   
     
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
        this.usuarioSvc.deshabilitarUsuario(usuario).then(() => {
          Swal.fire('Deleted!', 'Your  post has been deleted.', 'success');
        }).catch((error) => {
          Swal.fire('Error!', 'There was an error deleting this post', 'error');
        });
      }
    });
  }

}
