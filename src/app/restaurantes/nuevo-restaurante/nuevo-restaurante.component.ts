import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PerfilService } from '../../_service/perfil.service';
import { Perfil } from '../../_model/perfil';

@Component({
  selector: 'app-nuevo-restaurante',
  templateUrl: './nuevo-restaurante.component.html',
  styleUrls: ['./nuevo-restaurante.component.css']
})
export class NuevoRestauranteComponent implements OnInit {

  private imagen: any;
  private Nomrbreimagen: any;

  constructor(private perfilService: PerfilService) { }

  public newResForm = new FormGroup({
    id: new FormControl (''),
    nombreRestaurante: new FormControl ('', Validators.required),  
    tipoRestaurante: new FormControl('', Validators.required),
    capacidadRestaurante: new FormControl('', Validators.required),
    horarioRestaurante: new FormControl('', Validators.required),
    direccionRestaurante: new FormControl('', Validators.required),
    fotoRes: new FormControl('', Validators.required)
  });

  ngOnInit() {
  }

  addRestaurante(datosRes: Perfil){
    console.log("Nuevo Restaurante: ", datosRes);
    this.perfilService.subirRestauranteconImagen(datosRes, this.imagen);
    
  }

  seleccionar(event: any){
    this.imagen = event.target.files[0];
    this.Nomrbreimagen = event.target.files[0].name;
    console.log(this.Nomrbreimagen);
  }

}
