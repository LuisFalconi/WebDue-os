import { Usuario } from './../../_model/usuario';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { PerfilService } from '../../_service/perfil.service';
import { LoginService } from '../../_service/login.service';
import { UsuarioService } from '../../_service/usuario.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-info-perfil',
  templateUrl: './info-perfil.component.html',
  styleUrls: ['./info-perfil.component.css']
})
export class InfoPerfilComponent implements OnInit {

  usuario: string;
  usuarioLogueado: string;
  fotoSocial: string;
  userEmail: string;
  userTelefono: string;

  userLog : Usuario[];
  user$: Observable<Usuario[]>;
  
  constructor(private afa: AngularFireAuth, 
              private usuarioService: UsuarioService,
              private loginService: LoginService) { }

  ngOnInit() {
    let currenUser = this.afa.auth.currentUser;
    this.usuario = currenUser.displayName;
    this.usuarioLogueado = currenUser.uid;
    this.fotoSocial = currenUser.photoURL;
    this.userEmail= currenUser.email;
    this.userTelefono = currenUser.phoneNumber;

    this.user$ = this.usuarioService.recuperarDatos();

    // Programacion reactiva: Me permite mostrar los datos de la tabla del usuario logueado para que el pueda editar
    this.usuarioService.listar().subscribe(data => {
      for(let x of data){
        if(this.usuarioLogueado == x.uid){
          console.log("Si");
          this.userLog = [x];
          console.log("Este usuario", this.userLog); 
          break;   
        }else{
          console.log("No");
        } 
      }
      
  });
  }

  



}
