import { PlatoMeriendaService } from './../../_service/plato-merienda.service';
import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, Form } from '@angular/forms';
import { PlatoEspecial } from '../../_model/platoEspecial';

@Component({
  selector: 'app-edit-merienda',
  templateUrl: './edit-merienda.component.html',
  styleUrls: ['./edit-merienda.component.css']
})
export class EditMeriendaComponent implements OnInit {
  @Input() menu: PlatoEspecial;

  miform: FormGroup;
  

  constructor(private meriendaService: PlatoMeriendaService, private fb: FormBuilder) { }

  public editDesayunoForm = new FormGroup({
    id: new FormControl (''),
    platoMerienda: new FormControl ('', [Validators.required]),  
    detalleMerienda: new FormControl('', [Validators.required]),
    precioMerienda: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern(/^[1-9]/)])
  });

  ngOnInit() {

    this.miform = this.fb.group({
      id: ['', [Validators.required]],
      platoEspecial: ['', [Validators.required]],
      precioEspecial: ['',  [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern(/^[1-9]/)]],
      ingredientes: this.fb.array([this.fb.group({ingrediente: ['']})])
    })

    // this.iniciarForm();
    this.iniciarForm2();
    
  }

  editMenu(menu: PlatoEspecial){
    console.log("ss", menu);
    
    if(this.miform.invalid){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al editar el Menú!',
      }); 
    }else{
        this.meriendaService.subirMenu(menu);
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
      platoMerienda: this.menu.platoEspecial, 
      detalleMerienda: this.menu.precioEspecial,
      precioMerienda: this.menu.ingredientes,
    });
  } 

  private iniciarForm2():void{
    this.miform.patchValue({
      id: this.menu.id,
      platoEspecial: this.menu.platoEspecial, 
      precioEspecial: this.menu.precioEspecial,
      ingredientes: this.menu.ingredientes      
    });

    console.log("que es esto", this.menu.ingredientes);

  }
  
  // getI(i){
  //   return this.getIngredientes()[i].value.ingrediente;
  // }

  get getIngredientes(){
    
    return this.miform.get('ingredientes') as FormArray;

  }

  // get getIngredientes2(index: number){
     
  //   return  (<FormArray>this.miform.get('ingredientes')).controls;
  // }

  addIngredientes(ingrediente: string){
    const control = <FormArray>this.miform.controls['ingredientes'];
    control.push(this.fb.group({ingrediente: []}));
  }

  removeIngrediente(index: number){
    const control = <FormArray>this.miform.controls['ingredientes'];
    control.removeAt(index);
  }
}
