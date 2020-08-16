import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Perfil } from '../../../_model/perfil';
import { ActivatedRoute } from '@angular/router';
import { PerfilService } from '../../../_service/perfil.service';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {

  perfil$:  Observable<Perfil>;
  constructor(private route: ActivatedRoute, private perfilSvc: PerfilService) { }

  ngOnInit() {
    const idPerfil = this.route.snapshot.params.id;
    this.perfil$ = this.perfilSvc.recibirPerfil(idPerfil);
  }

}
