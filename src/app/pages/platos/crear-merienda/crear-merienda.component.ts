import { PlatoDesayuno } from './../../../_model/platoDesayuno';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { LoginService } from '../../../_service/login.service';
import { PlatoDesayunoService } from '../../../_service/plato-desayuno.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { PlatoMerienda } from '../../../_model/platoMerienda';
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
 
 
   constructor(private loginService: LoginService,
               private platoMerienda: PlatoMeriendaService,
               private router: Router) { }
 
 
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
   }
 
   addMenu(menuMerienda: PlatoMerienda) {
     this.platoMerienda.subirMenu(menuMerienda);
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
