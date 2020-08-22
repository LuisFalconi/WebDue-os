import { PlatoAlmuerzo } from './../../../_model/platoAlmuerzo';
import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { LoginService } from '../../../_service/login.service';
import { PlatoAlmuerzoService } from '../../../_service/plato-almuerzo.service';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-crear-almuerzo',
  templateUrl: './crear-almuerzo.component.html',
  styleUrls: ['./crear-almuerzo.component.css']
})
export class CrearAlmuerzoComponent implements OnInit, OnDestroy {

   // VARIABLES

   // Se crear la variable para liberar recursos
   private ngUnsubscribe: Subject<void> = new Subject();
   public usuarioLogeado: string;
 
 
   constructor(private loginService: LoginService,
               private platoAlmuerzo: PlatoAlmuerzoService,
               private router: Router) { }
 
 
   public almuerzoForm = new FormGroup({
     id: new FormControl (''),
     entradaAlmuerzo: new FormControl ('', [Validators.required]),  
     segundoAlmuerzo: new FormControl('', [Validators.required]),
     jugoAlmuerzo: new FormControl('',  [Validators.required]),
     precioAlmuerzo: new FormControl('',  [Validators.required, Validators.pattern(/^[1-9]/)]),
   });
 
 
 
   ngOnInit() {
 
     this.loginService.user.pipe(takeUntil(this.ngUnsubscribe)).subscribe(data =>{
       this.usuarioLogeado = data.uid;
     });
   }
 
   addMenu(menuAlmuerzo: PlatoAlmuerzo) {
     console.log('New menu', menuAlmuerzo);
     this.platoAlmuerzo.subirMenu(menuAlmuerzo);
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
