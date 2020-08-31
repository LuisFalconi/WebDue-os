import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { PlatoEspecialService } from '../../../_service/plato-especial.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlatoEspecial } from '../../../_model/platoEspecial1';


@Component({
  selector: 'app-list-platos-especiales',
  templateUrl: './list-platos-especiales.component.html',
  styleUrls: ['./list-platos-especiales.component.css']
})
export class ListPlatosEspecialesComponent implements OnInit {
  file_promo: any = null;
  labelFile: string;
  // private files: FileP;
  filesName: File[];
  imgSrc: string;
  //selectedImage: any = null;
  isSubmitted: boolean = false;


  constructor(private platoEspecialSvc: PlatoEspecialService) { }

  public newPromoForm = new FormGroup({
    id: new FormControl (''),
    imagePost: new FormControl('', Validators.required)
  });


  ngOnInit() {
    this.resetForm();
  }

  addPromocion(data: PlatoEspecial) {

    
    Swal.fire({
      title: '¿Deseas agregar este plato especial ahora?',
      icon: 'info',
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) =>{
      if(result.value){
        this.platoEspecialSvc.subirRestauranteconPlatoEspecial(data, this.file_promo);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Agregado',
          showConfirmButton: false,
          timer: 1000
        });
        this.resetForm();
      }else{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Cancelado',
          showConfirmButton: false,
          timer: 1000
        });
        this.resetForm();
      }
    });    
    //this.router.navigate(['editar']);
  }

  seleccionar_promo(e: any): void{
  

    let typeImage = e.target.files[0].type;
    let sizeFile = e.target.files[0].size;

    if(typeImage === 'image/gif' || typeImage === 'image/jpeg' || typeImage === 'image/png' ){
      
      // Imagen minima de 100 Kb aproimadamente 5242880
      if(sizeFile <= 100000){
        this.isSubmitted = true;
        console.log(this.isSubmitted);
        this.file_promo = e.target.files[0];
        this.labelFile = e.target.files[0].name;
      }else{
        Swal.fire({
          icon: 'error',
          showConfirmButton: false,
          text: 'Archivo no permitido!',
        });

      }

    }else{
      Swal.fire({
        icon: 'error',
        showConfirmButton: false,
        text: 'Archivo no permitido!',
      });
    }
  }

  

  resetForm() {
    this.newPromoForm.reset();
    this.newPromoForm.setValue({
      id: '',
      imagePost: ''
    });
    this.file_promo = null;
    this.labelFile = "";
    this.isSubmitted = false;
  }


}
