import { PlatoAlmuerzo } from './../../_model/platoAlmuerzo';
import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { PlatoAlmuerzoService } from '../../_service/plato-almuerzo.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-almuerzo',
  templateUrl: './edit-almuerzo.component.html',
  styleUrls: ['./edit-almuerzo.component.css']
})
export class EditAlmuerzoComponent implements OnInit {
  @Input() menu: PlatoAlmuerzo;

  constructor(private almuerzoService: PlatoAlmuerzoService) { }

  public almuerzoForm = new FormGroup({
    id: new FormControl (''),
    entradaAlmuerzo: new FormControl ('', [Validators.required]),  
    segundoAlmuerzo: new FormControl('', [Validators.required]),
    jugoAlmuerzo: new FormControl('', [Validators.required]),
    precioAlmuerzo: new FormControl('', [Validators.required, Validators.pattern(/^[1-9]/)])
  });

  ngOnInit() {
    this.iniciarForm();
  }

  editMenu(menu: PlatoAlmuerzo){

    if(this.almuerzoForm.invalid){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al editar el Menú!',
      }); 
    }else{
        this.almuerzoService.editarMenu(menu);
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
    this.almuerzoForm.patchValue({
      id: this.menu.id,
      entradaAlmuerzo: this.menu.entradaAlmuerzo, 
      segundoAlmuerzo: this.menu.segundoAlmuerzo,
      jugoAlmuerzo: this.menu.jugoAlmuerzo,
      precioAlmuerzo: this.menu.precioAlmuerzo,
    });
  } 

}
