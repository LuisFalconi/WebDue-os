import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { Usuario } from 'app/_model/usuario';
import { UsuarioService } from '../../_service/usuario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-perfil-user',
  templateUrl: './edit-perfil-user.component.html',
  styleUrls: ['./edit-perfil-user.component.css']
})
export class EditPerfilUserComponent implements OnInit {

  @Input() user: Usuario;

  constructor(private usuarioScv: UsuarioService) { }

  public editDesayunoForm = new FormGroup({
    uid: new FormControl (''),
    nombre: new FormControl ('', [Validators.required]),  
    email: new FormControl('',  [Validators.required]),
    numero: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern(/^[1-9]/)])
  });

  ngOnInit() {
    this.iniciarForm();
  }

  editUser(menu: Usuario){

    if(this.editDesayunoForm.invalid){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al editar el usuario!',
      }); 
    }else{
        this.usuarioScv.editarUsuario(menu);
        Swal.fire({
          icon: 'success',
          showConfirmButton: false,
          text: 'Usuario editado!',
        });
    }    
  }

  cancelar(event: any){
    Swal.fire({
      icon: 'error',
      showConfirmButton: false,
      text: 'Usuario no editado!',
    });
  }


  // Metodo que va recibir lo que tenga en el form @input = menu
  private iniciarForm():void{
    this.editDesayunoForm.patchValue({
      uid: this.user.uid,
      nombre: this.user.nombre, 
      email: this.user.email,
      numero: this.user.numero,
    });
  } 

}
