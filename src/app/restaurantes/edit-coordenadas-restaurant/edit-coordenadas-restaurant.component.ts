
import { Component, OnInit, Input } from '@angular/core';
import { Perfil } from '../../_model/perfil';
import { PerfilService } from '../../_service/perfil.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-coordenadas-restaurant',
  templateUrl: './edit-coordenadas-restaurant.component.html',
  styleUrls: ['./edit-coordenadas-restaurant.component.css']
})
export class EditCoordenadasRestaurantComponent implements OnInit {

  // Lo que nos va pasar el modal
  @Input() perfil: Perfil;
  private imagen: any;
  private imagenOriginal: any;


  constructor(private perfilSvc: PerfilService) { }

  public editCoorResForm = new FormGroup({
    id: new FormControl (''),
    nombreRestaurante: new FormControl ({value: '', disabled: true },Validators.required),  
    latitud:  new FormControl ({value: '', disabled: false },Validators.required),
    longitud:  new FormControl ({value: '', disabled: false },Validators.required),
    resVerificado: new FormControl ({value: '', disabled: true}, Validators.required)
  });

  ngOnInit() {
    this.imagen = this.perfil.imagenRes;
    this.imagenOriginal = this.perfil.imagenRes;
    this.iniciarForm();
  }

  editPerfil(perfil: Perfil){    
    if(this.imagen === this.imagenOriginal){
      perfil.imagenRes = this.imagenOriginal;
      console.log("No se cambio nada");
      this.perfilSvc.editarPerfil(perfil);
    }else{
      console.log("Se cambio la imagen");
      this.perfilSvc.editarPerfil(perfil, this.imagen);      
    }

  }

  seleccionar(event: any): void{
    this.imagen = event.target.files[0];
  }

  // Metodo que va recibir lo que tenga en el form @input = perfil
  private iniciarForm():void{
    //const c = new GeoPoint(this.lat, this.lon);
    
    this.editCoorResForm.patchValue({
      id: this.perfil.id,
      nombreRestaurante: this.perfil.nombreRestaurante,
      latitud: this.perfil.latitud,
      longitud: this.perfil.longitud,
      //tipoRestaurante: this.perfil.tipoRestaurante, 
      //capacidadRestaurante: this.perfil.capacidadRestaurante,
      //horarioRestaurante: this.perfil.horaApertura,
      //direccionRestaurante: this.perfil.direccionRestaurante,
      resVerificado: this.perfil.resVerificado
      //fotoRes: this.perfil.imagenRes
    });
  } 

}
