import { PlatoDesayuno } from './../../_model/platoDesayuno';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import Swal from 'sweetalert2';
import { PlatoDesayunoService } from '../../_service/plato-desayuno.service';
import { Ingredientes } from '../../_model/ingredientes';


@Component({
  selector: 'app-edit-desayuno',
  templateUrl: './edit-desayuno.component.html',
  styleUrls: ['./edit-desayuno.component.css']
})
export class EditDesayunoComponent implements OnInit {
  @Input() menu: PlatoDesayuno;
  miform: FormGroup;


  constructor(private desayunoService: PlatoDesayunoService, private fb: FormBuilder) { }

  public editDesayunoForm = new FormGroup({
    id: new FormControl (''),
    platoDesayuno: new FormControl ('', [Validators.required]),  
    detalleDesayuno: new FormControl('', [Validators.required]),
    precioDesayuno: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern(/^[1-9]/)]),
    ingredientes: new FormControl('')
  });

  ngOnInit() {

    this.miform = this.fb.group({
      id: ['', [Validators.required]],
      platoDesayuno: ['', [Validators.required]],
      detalleDesayuno: ['', [Validators.required]],
      precioDesayuno: ['',  [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern(/^[1-9]/)]],
      ingredientes: this.fb.array([this.fb.group({ingrediente: ['']})])
    })

    this.iniciarForm();
  }

  editMenu(menu: PlatoDesayuno){

      if(this.miform.invalid){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al editar el Menú!',
      }); 
    }else{
        this.desayunoService.subirMenu(menu);
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

  get getIngredientes(){
    return this.miform.get('ingredientes') as FormArray;
  }

  addIngredientes(ingrediente: string){
    const control = <FormArray>this.miform.controls['ingredientes'];
    control.push(this.fb.group({ingrediente: []}));
  }

  removeIngrediente(index: number){
    const control = <FormArray>this.miform.controls['ingredientes'];
    control.removeAt(index);
  }


  // Metodo que va recibir lo que tenga en el form @input = menu
  private iniciarForm():void{
    this.miform.patchValue({
      id: this.menu.id,
      platoDesayuno: this.menu.platoDesayuno, 
      detalleDesayuno: this.menu.detalleDesayuno,
      precioDesayuno: this.menu.precioDesayuno,
      ingredientes: this.menu.ingredientes,    
    });
  }
}
