import { Component, OnInit, Input } from '@angular/core';
import { Perfil } from '../../_model/perfil';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PerfilService } from '../../_service/perfil.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-restaurante-dueno',
  templateUrl: './edit-restaurante-dueno.component.html',
  styleUrls: ['./edit-restaurante-dueno.component.css']
})
export class EditRestauranteDuenoComponent implements OnInit {
  private imagen: any;
  public labelImage: string;
  private imagenOriginal: any;

  // Lo que nos va pasar el modal
  @Input() perfil: Perfil;

  constructor(private perfilSvc: PerfilService,
              private snackBar: MatSnackBar) { }

  public editResForm = new FormGroup({
    id: new FormControl (''),
    nombreRestaurante: new FormControl ('' ,[Validators.required, Validators.minLength(3), Validators.maxLength(20)]),  
    tipoRestaurante: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    capacidadRestaurante: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern(/^[1-9]/)]),
    horaApertura: new FormControl('',  [Validators.required,Validators.pattern("^([0]?[6-9]|1[0-1]):[0-5][0-9]$")]),
    horaCierre: new FormControl('',  [Validators.required, Validators.pattern("^([1]?[2-9]|2[0-3]):[0-5][0-9]$")]),
    direccionRestaurante: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    fotoRes: new FormControl('')
    //resVerificado: new FormControl ('', Validators.required)
  });

  ngOnInit() {
    this.imagen = this.perfil.imagenRes;
    this.imagenOriginal = this.perfil.imagenRes;
    this.iniciarForm();
  }

  editPerfil(perfil: Perfil){

    if (this.editResForm.invalid){
      // let mensaje;
      // mensaje = "Error al editar el Restaurante";
      // this.snackBar.open(mensaje, 'AVISO', {
      //   duration: 5000
      // });
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al editar el Restaurante!',
      });
    }else{ 
      if(this.imagen === this.imagenOriginal){
        perfil.imagenRes = this.imagenOriginal;
        this.perfilSvc.editarPerfil(perfil);
        Swal.fire({
          icon: 'success',
          showConfirmButton: false,
          text: 'Restaurante editado!',
        });
      }else if (this.imagen != this.imagenOriginal){
        this.perfilSvc.editarPerfil(perfil, this.imagen); 
      }else{
        
      }
    }
  }

  cancelar(event: any){
    Swal.fire({
      icon: 'error',
      showConfirmButton: false,
      text: 'Restaurante no editado!',
    });
  }

  seleccionar(event: any): void{
  

    let typeImage = event.target.files[0].type;
    let sizeFile = event.target.files[0].size;
    console.log("tamaño de la imagene", sizeFile);
    console.log("tipo de la imagene", typeImage);

    if(typeImage === 'image/gif' || typeImage === 'image/jpeg' || typeImage === 'image/png' ){
      
      // Imagen minima de 5 Mb aproimadamente 5242880
      if(sizeFile <= 5000000){
        this.imagen = event.target.files[0];
        this.labelImage = event.target.files[0].name;
      }
    }else{
      Swal.fire({
        icon: 'error',
        showConfirmButton: false,
        text: 'Archivo no permitido!',
      });
    }
    
  }

  // Metodo que va recibir lo que tenga en el form @input = perfil
  private iniciarForm():void{
    this.editResForm.patchValue({
      id: this.perfil.id,
      nombreRestaurante: this.perfil.nombreRestaurante,
      tipoRestaurante: this.perfil.tipoRestaurante, 
      capacidadRestaurante: this.perfil.capacidadRestaurante,
      horaApertura: this.perfil.horaApertura,
      horaCierre: this.perfil.horaCierre,
      direccionRestaurante: this.perfil.direccionRestaurante,
      resVerificado: this.perfil.resVerificado
      //fotoRes: this.perfil.imagenRes
    });
  } 

}
