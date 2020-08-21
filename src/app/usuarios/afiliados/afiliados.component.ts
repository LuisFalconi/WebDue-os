import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Usuario } from '../../_model/usuario';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UsuarioService } from '../../_service/usuario.service';
import { Afiliados } from '../../_model/afiliados';
import { AfiliadoServiveService } from '../../_service/afiliado-servive.service';
import { PerfilService } from '../../_service/perfil.service';
import { Perfil } from '../../_model/perfil';
import { AngularFireAuth } from '@angular/fire/auth';
import { ValidacionService } from '../../_service/validacion.service';


@Component({
  selector: 'app-afiliados',
  templateUrl: './afiliados.component.html',
  styleUrls: ['./afiliados.component.css']
})
export class AfiliadosComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'numero', 'estado', 'acciones'];
  dataSource = new MatTableDataSource();


  afiliados$: Observable<Afiliados[]>;
  restaurante$: Observable<Perfil[]>;
  restaurantelog : Perfil[];
  perfil$: Observable<Perfil[]>;



  afi :Afiliados[] =[];

  uidResta: Perfil[];
  usuarioLogueado: string;
  variable: boolean;
  validacionR: boolean = true;
  valorRestaurante: boolean = true;
  estadoRestaurante: boolean=true;



  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(private afiliadoSvc: AfiliadoServiveService, private restauranteSvc: PerfilService, private afa: AngularFireAuth, 
    private route: Router,
    private validacionService: ValidacionService,
    private perfilService: PerfilService) { }

  ngOnInit() {

    let currenUser = this.afa.auth.currentUser;
    this.usuarioLogueado = currenUser.uid;


    this.variable = true;  
    if(this.variable){
      this.tabla();
    }else{
      console.log("tabla falsa");
    }

    this.afiliados$ = this.afiliadoSvc.recuperarDatos();
    this.restaurante$ = this.restauranteSvc.recuperarDatos();

    
    // Esto funciona para verificar si un restaurant tiene un documento subido
    this.validacionService.listar().subscribe(data => {
      // console.log(data);
      for(let x of data){
        if(this.usuarioLogueado == x.userUID){
          this.validacionR = true;
          this.validacionDocRestauranteExiste(this.validacionR);
          break;   
        }else{
          this.validacionR = false;
          this.validacionDocRestauranteExiste(this.validacionR);
        } 
      }
  });


  this.perfilService.listar().subscribe(data => {
    for(let x of data){
      if(this.usuarioLogueado == x.userUID){
        //console.log("Si");
        this.restaurantelog = [x];
        this.valorRestaurante = true;
        this.validacionRestauranteExiste(this.valorRestaurante);
        // De esta manera valido si el rstaurante esta habilitado
        this.restaurantelog.forEach(element => {
          if (element.estado === 'verdadero') {
            this.estadoRestaurante = true;
            this.estadoRestauranteActual(this.estadoRestaurante); 
          } else if (element.estado === 'falso') {
            this.estadoRestaurante = false;
            this.estadoRestauranteActual(this.estadoRestaurante); 
          }
        }); 
        break;   
      }else{
        // console.log("No");
        this.valorRestaurante = false;
        this.validacionRestauranteExiste(this.valorRestaurante);
      } 
    }
  });

  this.perfil$ = this.perfilService.recuperarDatos(); // recuperamos esta data con ASYNC

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


  tabla(){
    this.afi=[];
    this.afiliadoSvc.recuperarDatos()
      .subscribe(
        // afil['estado'] == 'falso'
        data=>{
          for(let key$ in data){
            let afil = data[key$];
            // console.log("p", afil['uidResta']);
            if(this.usuarioLogueado == afil['uidResta'] && afil['estado'] == "verdadero"){
              // console.log("aaaaa", afil['_id']);
              // afil['_id']=key$;
              this.afi.push(afil);
              // console.log("vvvv", this.afi);
              // console.log("xxx", this.afi[2]);
              // console.log("si");
            }else{
              console.log("no");
            }

          }
          this.dataSource.data = this.afi;
          this.dataSource.paginator = this.paginator;      
        },
        error=>{
          console.log(error);
        }

      );
  }

  deshabilitarA(afiliado: Afiliados) {   
     
    Swal.fire({
      title: '¿Desea desafiliar este cliente?',
      text: `El cliente perderá sus beneficios.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!'
    }).then(result => {
      if (result.value) {
        this.afiliadoSvc.deshabilitarAfiliado(afiliado).then(() => {
          this.variable = false;
          this.route.navigate(['dueño/noAfiliados'])
          Swal.fire('Deshabilitado!', '.', 'error');
        }).catch((error) => {
          Swal.fire('Error!', 'There was an error deleting this post', 'error');
        });
      }
    });
  }

  validacionDocRestauranteExiste(valor: boolean){
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

  estadoRestauranteActual(valor: boolean){
    if (valor){
      return true;
    }else{
      return false;
    }
  }

}
