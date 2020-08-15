import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Menu } from '../_model/menu';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  // Variable reactiva que reaccione a un cambio
  menuCambio = new Subject<Menu[]>();

  constructor(private afs: AngularFirestore) { }

  listar(){
    return this.afs.collection<Menu>('menus').valueChanges();
  }
}
