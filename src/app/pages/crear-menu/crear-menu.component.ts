import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { LoginService } from '../../_service/login.service';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PlatoService } from '../../_service/plato.service';
import { Plato } from '../../_model/plato';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Menu } from '../../_model/menu';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-menu',
  templateUrl: './crear-menu.component.html',
  styleUrls: ['./crear-menu.component.css']
})
export class CrearMenuComponent implements OnInit, OnDestroy {

  form: FormGroup;
  id: string;
  edicion: boolean;
  usuarioLogeado: string;

  // variables para subir imagen
  file: any;
  labelFile: string;
  urlImage: string;

   // Se crear la variable para liberar recursos
  private ngUnsubscribe: Subject<void> = new Subject();

  constructor(private loginService: LoginService,
              private route: ActivatedRoute,
              private platoService: PlatoService,
              private afStorage: AngularFireStorage, 
              private afs: AngularFirestore,
              private router: Router) { }

public menuForm = new FormGroup({
    id: new FormControl (''),
    platoDesayuno: new FormControl ('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),  
    detalleDesayuno: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
    precioDesayuno: new FormControl('',  [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern(/^[1-9]/)]),
    entradaAlmuerzo: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
    segundoAlmuerzo: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
    jugoAlmuerzo: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
    precioAlmuerzo: new FormControl('',  [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern(/^[1-9]/)]),
    //imgEsp: new FormControl('')
  });

  ngOnInit() {

    this.loginService.user.pipe(takeUntil(this.ngUnsubscribe)).subscribe(data =>{
      this.usuarioLogeado = data.uid;
    });
  }

  addMenu(menu: Plato) {
    console.log('New menu', menu);
    this.platoService.subirMenu(menu);
    this.router.navigate(['miMenu']);
  }

  // Funcion para mostrar el nombre del archivo seleccionado
  // seleccionar(e: any){
  //   this.file = e.target.files[0];
  //   this.labelFile = e.target.files[0].name;
  //   console.log(this.file);
  // }

  cancelar(event: any){
    Swal.fire({
      icon: 'error',
      showConfirmButton: false,
      text: 'Menú no editado!',
    });
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
