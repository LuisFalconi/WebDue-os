import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { Perfil } from '../../_model/perfil';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PerfilService } from '../../_service/perfil.service';
import { MatDialog } from '@angular/material/dialog';
import { EditEstadoDocumentoModalComponent } from '../../modal/edit-estado-documento-modal/edit-estado-documento-modal.component';


@Component({
  selector: 'app-validacion-documento',
  templateUrl: './validacion-documento.component.html',
  styleUrls: ['./validacion-documento.component.css']
})
export class ValidacionDocumentoComponent implements OnInit {

  displayedColumns: string[] = ['nombreR', 'tipoR', 'documento', 'estadoDoc' ,'acciones'];
  displayedColumns2: string[] = ['nombreR', 'tipoR', 'capacidadR', 'estadoDoc'];
  dataSource = new MatTableDataSource();
  dataSource2 = new MatTableDataSource();

  resSinDocumento :Perfil[] =[];
  resconDocumento :Perfil[] =[];


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  
  constructor(private perfilSvc: PerfilService, public dialog: MatDialog,
            private route: Router) { }

  ngOnInit() {
    this.perfilSvc.recuperarDatos().subscribe(perfiles => (this.dataSource.data = perfiles));
    // this.tablaResConDocumento();
    // this.tablaResSinDocumento();

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource2.paginator = this.paginator;
    this.dataSource2.sort = this.sort;
  }

  applicarFiltro(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  editarEstadoDocumento(perfil: Perfil) {
    this.dialogoEditarDocumentoo(perfil);
  }

  dialogoEditarDocumentoo(perfil?: Perfil): void {
    const config ={
      data:{
        mensaje: 'Cambiar estado',
        contenido: perfil
      }
    };
    const dialogRef = this.dialog.open(EditEstadoDocumentoModalComponent, config);
    dialogRef.afterClosed().subscribe(resultado => {
      console.log(`Dialog result ${resultado}`);
    });
  }

}

