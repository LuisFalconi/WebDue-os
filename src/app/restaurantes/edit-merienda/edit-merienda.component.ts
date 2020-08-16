import { PlatoMerienda } from './../../_model/platoMerienda';
import { PlatoMeriendaService } from './../../_service/plato-merienda.service';
import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-merienda',
  templateUrl: './edit-merienda.component.html',
  styleUrls: ['./edit-merienda.component.css']
})
export class EditMeriendaComponent implements OnInit {
  @Input() menu: PlatoMerienda;

  constructor(private meriendaService: PlatoMeriendaService) { }

  public editDesayunoForm = new FormGroup({
    id: new FormControl (''),
    platoMerienda: new FormControl ('', [Validators.required]),  
    detalleMerienda: new FormControl('', [Validators.required]),
    precioMerienda: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern(/^[1-9]/)])
  });

  ngOnInit() {
    this.iniciarForm();
  }

  editMenu(menu: PlatoMerienda){

    if(this.editDesayunoForm.invalid){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al editar el Menú!',
      }); 
    }else{
        this.meriendaService.editarMenu(menu);
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
      platoMerienda: this.menu.platoMerienda, 
      detalleMerienda: this.menu.detalleMerienda,
      precioMerienda: this.menu.precioMerienda,
    });
  } 
}
