import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Validacion } from '../../_model/validacion';
import Swal from 'sweetalert2';
import { ValidacionService } from '../../_service/validacion.service';

@Component({
  selector: 'app-validacion',
  templateUrl: './validacion.component.html',
  styleUrls: ['./validacion.component.css']
})
export class ValidacionComponent implements OnInit {

  file_val: any = null;
  labelFile: string;
  filesName: File[];
  imgSrc: string;
  isSubmitted: boolean = false;
  
  constructor(private validacionService: ValidacionService, private route: Router) { }

  public newValForm = new FormGroup({
    id: new FormControl (''),
    imagePost: new FormControl('', Validators.required)
  });

  ngOnInit() {
    this.resetForm();
  }

  addDocumento(data: Validacion) {
    Swal.fire({
      title: '¿Agregar documento?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "No!",
      confirmButtonText: 'Si!'
    }).then((result) => {
      if (result.value) { 
          this.validacionService.subirRestauranteconValidacion(data, this.file_val);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Documento agregado',
            text: 'Tu documentos va ser revisado por el Administrador',
            showConfirmButton: false,
            timer: 2500
          });
        this.resetForm();

      }else {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Cancelado',
          showConfirmButton: false,
          timer: 1500
        });
      this.resetForm();
    }
    });
    
    //this.router.navigate(['editar']);
  }

  seleccionar_doc(e: any): void{
    console.log("documento");
    
    this.isSubmitted = true;
    console.log(this.isSubmitted);
    this.file_val = e.target.files[0];
    this.labelFile = e.target.files[0].name;    
  }

  ir(){
    this.route.navigate(['dueño/restaurante']);
  }

  resetForm() {
    this.newValForm.reset();
    this.newValForm.setValue({
      id: '',
      imagePost: ''
    });
    this.file_val = null;
    this.labelFile = "";
    console.log("Documento Agregada");
    this.isSubmitted = false;
  }

}
