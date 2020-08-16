import { Component, OnInit } from '@angular/core';
import { PromocionService } from '../../../_service/promocion.service';
import { Promocion } from '../../../_model/promocion';
import { Plato } from '../../../_model/plato';
import { Perfil } from '../../../_model/perfil';
import { PlatoService } from '../../../_service/plato.service';
import { PerfilService } from '../../../_service/perfil.service';

@Component({
  selector: 'app-promociones-inicio',
  templateUrl: './promociones-inicio.component.html',
  styleUrls: ['./promociones-inicio.component.css']
})
export class PromocionesInicioComponent implements OnInit {

  promocion: Promocion[];
  restaurante: Perfil[];
  menu: Plato[];

  constructor(private PromocionSvc: PromocionService,
              private platoService: PlatoService, 
              private PerfilService: PerfilService,) { }

  ngOnInit() {

    this.PromocionSvc.recuperarDatos().subscribe(data =>{
      this.promocion = data;
    });
    
    this.PerfilService.recuperarDatos().subscribe( data =>{
      this.restaurante = data;
    });

    this.platoService.recuperarMenus().subscribe(data =>{
      this.menu = data;
    });

  }

}
