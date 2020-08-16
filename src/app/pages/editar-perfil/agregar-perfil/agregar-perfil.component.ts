import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PerfilService } from '../../../_service/perfil.service';
import { takeUntil } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../../_service/login.service';
import Swal from 'sweetalert2';
import { Perfil } from '../../../_model/perfil';

@Component({
  selector: 'app-agregar-perfil',
  templateUrl: './agregar-perfil.component.html',
  styleUrls: ['./agregar-perfil.component.css']
})
export class AgregarPerfilComponent implements OnInit, OnDestroy {

  form: FormGroup;
  id: string;
  edicion: boolean;
  usuarioLogeado: string;

  file: any;
  labelFile: string;
  urlImage: string;

  private image: any;
  private imagenOriginal: any;


  @Input() infoPerfiles: Perfil;


  // Se crear la variable para liberar recursos
  private ngUnsubscribe: Subject<void> = new Subject();
  constructor(private route: ActivatedRoute,
              private perfilService: PerfilService,
              private afStorage: AngularFireStorage,
              private afs: AngularFirestore,
              private snackBar: MatSnackBar,
              private router: Router,
              private loginService: LoginService) { }

  public editPerfil = new FormGroup({
    id: new FormControl (''),
    nombreRestaurante: new FormControl ('', Validators.required),  
    tipoRestaurante: new FormControl('', Validators.required),
    capacidadRestaurante: new FormControl('', Validators.required),
    horarioRestaurante: new FormControl('', Validators.required),
    direccionRestaurante: new FormControl('', Validators.required),
    //imagenPost: new FormControl(''),
    // imagePost: new FormControl('', Validators.required)
  });

  ngOnInit() {

    // Metodo para traer el id del usuario
    this.loginService.user.pipe(takeUntil(this.ngUnsubscribe)).subscribe(data =>{
    this.usuarioLogeado = data.uid;
    this.image = this.infoPerfiles.imagenRes;
    this.imagenOriginal = this.infoPerfiles.imagenRes;    
    })

     this.form = new FormGroup({
    //   // Setear el formulario
    //   // Variables que se colocan en el FormControlName del html
       'id': new FormControl(''),
       'nombreR': new FormControl(''),
       'tipoR': new FormControl(''),
       'direccionR': new FormControl(''),
       'horarioA': new FormControl(''),
       'horarioC': new FormControl(''),
       'capacidadR': new FormControl('')

     });
    //his.image = this.infoPerfiles.imagenRes;
    //this.imagenOriginal = this.infoPerfiles.imagenRes;
    // Esto sirve para mostrar los datos del Grid al componente de edicion
    this.route.params.subscribe((params: Params) =>{
      this.id = params['id'];
      this.edicion = this.id != null;
      this.initForm();
    });
  }

  initForm(){

    console.log("IMG" , this.image);
    console.log("IMG original" , this.imagenOriginal);

    if(this.edicion){   // Metodo para mostrar lo que esta en la tabla al grid de edicion
      this.perfilService.leer(this.id).pipe(takeUntil(this.ngUnsubscribe)).subscribe((data: Perfil) => {
         this.form = new FormGroup({
           'id': new FormControl(data.id),
           'nombreR': new FormControl(data.nombreRestaurante),
           'tipoR': new FormControl(data.tipoRestaurante),
           'direccionR': new FormControl(data.direccionRestaurante),
           'horarioA': new FormControl(data.horaApertura),
           'horarioC': new FormControl(data.horaCierre),
           'capacidadR': new FormControl(data.capacidadRestaurante),
         });

        // this.editPerfil = new FormGroup({
        //   id: new FormControl (data.id),
        //   nombreRestaurante: new FormControl (data.nombreRestaurante, Validators.required),  
        //   fotoRestaurante: new FormControl(data.fotoRestaurante, Validators.required),
        //   tipoRestaurante: new FormControl(data.tipoRestaurante, Validators.required),
        //   capacidadRestaurante: new FormControl(data.capacidadRestaurante, Validators.required),
        //   horarioRestaurante: new FormControl(data.horarioRestaurante, Validators.required),
        //   direccionRestaurante: new FormControl(data.direccionRestaurante, Validators.required),
        //   imagenPost: new FormControl(data.imagenRes, Validators.required)
        // });
        
          this.urlImage = data.imagenRes;
          //data.userUID = this.usuarioLogeado;
        // Aqui no se usa el ngUnsubscribe porque se esta conectando con FireStorage
          if(data != null){
            this.afStorage.ref(`perfiles/${data.id}`).getDownloadURL().subscribe(data => {
             //this.urlImage = data;
            })
           }
      });
    }
  }

  operar() {
    
    Swal.fire({
      title: '¿Deseas editar tu restaurante?',
      text: "Podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "No!",
      confirmButtonText: 'Si!'
    }).then((result) => {
      if (result.value) {
 
        let perfil = new Perfil();
        perfil.nombreRestaurante = this.form.value['nombreR'];
        perfil.tipoRestaurante = this.form.value['tipoR'];
        perfil.horaApertura = this.form.value['horarioA'];
        perfil.horaCierre = this.form.value['horarioC'];
        perfil.direccionRestaurante = this.form.value['direccionR'];
        perfil.capacidadRestaurante = this.form.value['capacidadR'];
        

        perfil.userUID = this.usuarioLogeado;
        
        // Guardar la imagen atado al ID
        if(this.edicion){
          perfil.id = this.form.value['id'];
        }else{
          perfil.id = this.afs.createId();
        }    

        // Funcion para subir imagenes
        if(this.file != null){
          let ref = this.afStorage.ref(`perfiles/${perfil.id}`);
          ref.put(this.file);
        }

        if(this.edicion){
          this.perfilService.modificar(perfil);
          Swal.fire('Editado!','Tu Restaurante ha sido cambiado','success')
        } else{
          this.perfilService.registrar(perfil);   
          //mensaje = "Perfil Registrado con existo";
        }

        this.router.navigate(['editar']);

    }else {
      Swal.fire("Cancelado", "Puedes seguir pensando :)", "error");
    }
});

  }

  editarPerfil(data: Perfil) {

    console.log("IMG" , this.image);
    console.log("IMG original" , this.imagenOriginal);
    this.perfilService.modificar(data);
    this.router.navigate(['editar']);


    // if(this.image === this.imagenOriginal){
    //   //llamar al metodo (post)
    //   //data.imagenRes = this.imagenOriginal;
    //   console.log("IMG" , this.image);
    // console.log("IMG" , this.imagenOriginal);
    // }else{
    //   console.log("IMG" , this.image);
    // console.log("IMG" , this.imagenOriginal);
      // Llamar al metodo (post, this.image) , es decir con la nueva imagen
    }
    
  //   console.log('New perfil', data);
  //  //this.id = this.afs.createId();
  //  //perfil.id = this.id;
  //  //perfil.userUID = this.usuarioLogeado;
  //   this.perfilService.subirPerfilconImagen(data, this.file);
  //   this.router.navigate(['editar']);
  //}

  // Funcion para mostrar el nombre del archivo seleccionado
  seleccionar(e: any): void{
    this.file = e.target.files[0];
    this.labelFile = e.target.files[0].name;
    console.log("s",this.file);
    
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  

}
