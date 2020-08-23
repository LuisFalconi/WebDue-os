import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UsuarioService } from '../../_service/usuario.service';
import { Observable } from 'rxjs';
import { Usuario } from '../../_model/usuario';
import { PerfilService } from '../../_service/perfil.service';
import { Perfil } from '../../_model/perfil';
import { Validacion } from '../../_model/validacion';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ValidacionService } from '../../_service/validacion.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-verificacion-restaurantes',
  templateUrl: './verificacion-restaurantes.component.html',
  styleUrls: ['./verificacion-restaurantes.component.css']
})
export class VerificacionRestaurantesComponent implements OnInit{

  displayedColumns: string[] = ['nombre', 'tipo', 'documento','acciones'];
  dataSource = new MatTableDataSource();

  

  documentosR: Observable<Validacion[]>;

  users: Usuario[];
  doc: Validacion[];
  perfil: Perfil[];

  restaurante :Perfil[] =[];
  verificacion :Validacion[] =[];

  panelOpenState = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private usuarioSvc: UsuarioService,
              private validacionSvC: ValidacionService,
              private perfilSvc: PerfilService) { }

  ngOnInit() {
    this.documentosR = this.validacionSvC.recuperarDatos();

    this.usuarioSvc.listar().subscribe(usuarios =>{
      this.users=usuarios;
    });

    this.validacionSvC.listar().subscribe(doc =>{
      this.doc = doc;
    });

    this.perfilSvc.listar().subscribe(perfil => {
      this.perfil = perfil;
    })

  }

}
