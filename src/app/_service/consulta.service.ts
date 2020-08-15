import { AngularFireStorage } from '@angular/fire/storage';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  constructor(private afs: AngularFireStorage) { }

  listar(fecha: Date){
    let inicio =  moment(fecha).toISOString(); // IsoDate
    let fin = moment(inicio).add(1, 'days').toISOString();
    
    console.log(inicio);
    console.log(fin);

    //return this.afs.collection('consumos', ref=> ref.where('fechaPedido', '>=', new Date(inicio)));

  }
}
