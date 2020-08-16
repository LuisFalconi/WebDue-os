import { PlatoDesayuno } from './../../_model/platoDesayuno';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { PlatoDesayunoService } from '../../_service/plato-desayuno.service';


@Component({
  selector: 'app-edit-desayuno',
  templateUrl: './edit-desayuno.component.html',
  styleUrls: ['./edit-desayuno.component.css']
})
export class EditDesayunoComponent implements OnInit {
  @Input() menu: PlatoDesayuno;

  constructor(private desayunoService: PlatoDesayunoService) { }

  public editDesayunoForm = new FormGroup({
    id: new FormControl (''),
    platoDesayuno: new FormControl ('', [Validators.required]),  
    detalleDesayuno: new FormControl('', [Validators.required]),
    precioDesayuno: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern(/^[1-9]/)])
  });

  ngOnInit() {
    this.iniciarForm();
  }

  editMenu(menu: PlatoDesayuno){

    if(this.editDesayunoForm.invalid){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al editar el Menú!',
      }); 
    }else{
        this.desayunoService.editarMenu(menu);
        Swal.fire({
          icon: 'success',
          showConfirmButton: false,
          text: 'Menú editado!',
        });
    }    
  }

  cancelar(event: any){
    Swal.fire({
      icon: 'error',
      showConfirmButton: false,
      text: 'Menú no editado!',
    });
  }


  // Metodo que va recibir lo que tenga en el form @input = menu
  private iniciarForm():void{
    this.editDesayunoForm.patchValue({
      id: this.menu.id,
      platoDesayuno: this.menu.platoDesayuno, 
      detalleDesayuno: this.menu.detalleDesayuno,
      precioDesayuno: this.menu.precioDesayuno,
    });
  } 
}
