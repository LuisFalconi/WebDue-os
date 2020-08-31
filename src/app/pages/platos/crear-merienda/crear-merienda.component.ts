import { PlatoDesayuno } from './../../../_model/platoDesayuno';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { LoginService } from '../../../_service/login.service';
import { PlatoDesayunoService } from '../../../_service/plato-desayuno.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { PlatoEspecial } from '../../../_model/platoEspecial';
import { PlatoMeriendaService } from '../../../_service/plato-merienda.service';

@Component({
  selector: 'app-crear-merienda',
  templateUrl: './crear-merienda.component.html',
  styleUrls: ['./crear-merienda.component.css']
})
export class CrearMeriendaComponent implements OnInit, OnDestroy {

 // VARIABLES

   // Se crear la variable para liberar recursos
   private ngUnsubscribe: Subject<void> = new Subject();
   public usuarioLogeado: string;
   miform: FormGroup;
 
 
   constructor(private loginService: LoginService,
               private platoEspecialSvs: PlatoMeriendaService,
               private router: Router,
               private fb: FormBuilder) { }
 
 
   public desayunoForm = new FormGroup({
     id: new FormControl (''),
     platoMerienda: new FormControl ('', [Validators.required]),  
     detalleMerienda: new FormControl('', [Validators.required]),
     precioMerienda: new FormControl('',  [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern(/^[1-9]/)]),
   });
 
 
 
   ngOnInit() {
 
     this.loginService.user.pipe(takeUntil(this.ngUnsubscribe)).subscribe(data =>{
       this.usuarioLogeado = data.uid;
     });

     this.miform = this.fb.group({
      // platoDesayuno: ['', [Validators.required]],
      platoEspecial: ['', [Validators.required]],
      precioEspecial: ['',  [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern(/^[1-9]/)]],
      ingredientes: this.fb.array([this.fb.group({ingrediente: ['']})])
    })

   }
 
   addMenu(menuMerienda: PlatoEspecial) {
     this.platoEspecialSvs.subirMenu(menuMerienda);
     this.router.navigate(['dueño/miMenu']);
   }
 
   cancelar(event: any){
     Swal.fire({
       icon: 'error',
       showConfirmButton: false,
       text: 'Menú no agregado!',
     });
   }

   onSubmit(formValue: any){
    const especial = new PlatoEspecial();
    especial.platoEspecial = formValue.platoEspecial,
    especial.precioEspecial = formValue.precioEspecial,
    especial.ingredientes = formValue.ingredientes;
    // console.log("i", ing);


    this.platoEspecialSvs.subirMenu(especial);
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
 
 
 
   ngOnDestroy(){
     this.ngUnsubscribe.next();
     this.ngUnsubscribe.complete();
   }
}
