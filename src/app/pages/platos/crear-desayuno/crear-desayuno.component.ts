import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../../_service/login.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PlatoDesayuno } from '../../../_model/platoDesayuno';
import { PlatoDesayunoService } from '../../../_service/plato-desayuno.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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


  constructor(private loginService: LoginService,
              private platoDesayuno: PlatoDesayunoService,
              private router: Router) { }


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

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
