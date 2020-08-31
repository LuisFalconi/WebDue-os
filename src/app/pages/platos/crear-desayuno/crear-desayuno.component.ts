import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { LoginService } from '../../../_service/login.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PlatoDesayuno } from '../../../_model/platoDesayuno';
import { PlatoDesayunoService } from '../../../_service/plato-desayuno.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Ingredientes } from '../../../_model/ingredientes';

@Component({
  selector: 'app-crear-desayuno',
  templateUrl: './crear-desayuno.component.html',
  styleUrls: ['./crear-desayuno.component.css']
})
export class CrearDesayunoComponent implements OnInit, OnDestroy {

   // VARIABLES

   // Se crear la variable para liberar recursos
  private ngUnsubscribe: Subject<void> = new Subject();
  public usuarioLogeado: string;

  miform: FormGroup;


  constructor(private loginService: LoginService,
              private platoDesayuno: PlatoDesayunoService,
              private router: Router,
              private fb: FormBuilder) { }

    // esto ya no uso
  public desayunoForm = new FormGroup({
    id: new FormControl (''),
    platoDesayuno: new FormControl ('', [Validators.required]),
    detalleDesayuno: new FormControl('', [Validators.required]),
    precioDesayuno: new FormControl('',  [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern(/^[1-9]/)]),
  });



  ngOnInit() {

    this.loginService.user.pipe(takeUntil(this.ngUnsubscribe)).subscribe(data =>{
      this.usuarioLogeado = data.uid;
    });

    this.miform = this.fb.group({
      platoDesayuno: ['', [Validators.required]],
      detalleDesayuno: ['', [Validators.required]],
      precioDesayuno: ['',  [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern(/^[1-9]/)]],
      ingredientes: this.fb.array([this.fb.group({ingrediente: ['']})])
    })
  }

  addMenu(menuDesayuno: PlatoDesayuno) {
    console.log('New menu', menuDesayuno);
    this.platoDesayuno.subirMenu(menuDesayuno);
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
    const desayuno = new PlatoDesayuno();
    desayuno.platoDesayuno = formValue.platoDesayuno,
    desayuno.detalleDesayuno = formValue.detalleDesayuno,
    desayuno.precioDesayuno = formValue.precioDesayuno,
    desayuno.ingredientes = formValue.ingredientes;
    // console.log("i", ing);


    this.platoDesayuno.subirMenu(desayuno);
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
