import { Component, OnInit, Input } from '@angular/core';
import { Perfil } from '../../_model/perfil';
import { PerfilService } from '../../_service/perfil.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-estado-documento',
  templateUrl: './edit-estado-documento.component.html',
  styleUrls: ['./edit-estado-documento.component.css']
})
export class EditEstadoDocumentoComponent implements OnInit {

  private imagen: any;
  private imagenOriginal: any;

  // Lo que nos va pasar el modal
  @Input() perfil: Perfil;

  constructor(private perfilSvc: PerfilService) { }

  public editResForm = new FormGroup({
    id: new FormControl (''),
    nombreRestaurante: new FormControl ({value: '', disabled: true },Validators.required),  
    estadoDocumento: new FormControl ('', Validators.required)
  });

  ngOnInit() {
    this.imagen = this.perfil.imagenRes;
    this.imagenOriginal = this.perfil.imagenRes;
    this.iniciarForm();
  }

  editPerfil(perfil: Perfil){
        this.perfilSvc.editarPerfil(perfil);
    

  }

  seleccionar(event: any): void{
    this.imagen = event.target.files[0];
  }

  // Metodo que va recibir lo que tenga en el form @input = perfil
  private iniciarForm():void{
    this.editResForm.patchValue({
      id: this.perfil.id,
      nombreRestaurante: this.perfil.nombreRestaurante,
      estadoDocumento: this.perfil.estadoDocumento
      //fotoRes: this.perfil.imagenRes
    });
  } 

  deshabilitarTexto() {
    //your condition, in this case textarea will be disbaled.
    return true; 
  }

}
