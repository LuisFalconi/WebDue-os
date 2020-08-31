import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { PlatoDesayuno } from '../_model/platoDesayuno';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginService } from './login.service';
import { Ingredientes } from '../_model/ingredientes';

@Injectable({
  providedIn: 'root'
})
export class PlatoDesayunoService {


  private platoCollection: AngularFirestoreCollection<PlatoDesayuno>;
  private ingCollection: AngularFirestoreCollection<Ingredientes>;
  private usuarioLogeado: string;


  constructor(private afs: AngularFirestore,
              private loginService: LoginService) {

    this.loginService.user.subscribe(data =>{
      if(typeof data === 'undefined'){
        console.log('Data no definida');
      }else{
        this.usuarioLogeado = data.uid;
      }
    });

    this.platoCollection = afs.collection<PlatoDesayuno>('platoDesayuno');
    this.ingCollection = afs.collection<Ingredientes>('ingredientes');

   }

   recuperarMenus(): Observable<PlatoDesayuno[]>{
    return this.afs
      .collection('platoDesayuno')
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a =>{
          const data = a.payload.doc.data() as PlatoDesayuno;
          const id = a.payload.doc.id;
          return {id, ...data}; //SPREAD OPERATOR
        }))
      );
  }

  recuperarIngredientes(): Observable<PlatoDesayuno[]>{
    return this.afs
      .collection('platoDesayuno')
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a =>{
          const data = a.payload.doc.data() as PlatoDesayuno;
          const id = a.payload.doc.id;
          return {id, ...data}; //SPREAD OPERATOR
        }))
      );
  }

  

  listar() {
    return this.afs.collection<PlatoDesayuno>('platoDesayuno').valueChanges();
  }


  modificar(platoDes: PlatoDesayuno){
    return this.afs.collection('platoDesayuno').doc(platoDes.id).set(Object.assign({}, platoDes));	
  }

  leer(documentId: string){
    return this.afs.collection<PlatoDesayuno>('platoDesayuno').doc(documentId).valueChanges(); 
  }

  eliminar(plato: PlatoDesayuno){
  return this.afs.collection('platoDesayuno').doc(plato.id).delete();
  }

  editarMenu(platoDes: PlatoDesayuno){
    return this.platoCollection.doc(platoDes.id).update(platoDes);
  }

  subirMenu(menusDes: PlatoDesayuno): void{
    this.guardarDesayuno(menusDes);
  }

  subirIng(ingrediente: Ingredientes): void{
    this.guardarIngrediente(ingrediente);
  }


  private guardarDesayuno(platoDes: PlatoDesayuno) {

    //this.idRes =perfil.id;
    let idExiste = platoDes.id;
    if(idExiste){
      const menuDesObj = {
        id: idExiste,
        userUID: this.usuarioLogeado,
        platoDesayuno: platoDes.platoDesayuno,
        detalleDesayuno: platoDes.detalleDesayuno,
        precioDesayuno: platoDes.precioDesayuno,
        ingredientes: platoDes.ingredientes,
      };
      return this.platoCollection.doc(platoDes.id).update(menuDesObj);      
    }else{      
      let idPlato = this.afs.createId();
      platoDes.id = idPlato;
      this.afs.collection('platoDesayuno').doc(idPlato).set({
        id: platoDes.id,
        userUID: this.usuarioLogeado,
        platoDesayuno: platoDes.platoDesayuno,
        detalleDesayuno: platoDes.detalleDesayuno,
        precioDesayuno: platoDes.precioDesayuno, 
        ingredientes: platoDes.ingredientes,

      });
    }
  }

  private guardarIngrediente(ing: Ingredientes) {

    //this.idRes =perfil.id;
    let idExiste = ing.uid;
    if(idExiste){
      const menuDesObj = {
        //id: perfil.id,
        userUID: this.usuarioLogeado,
        ingredientes: ing.ingredientes
      };
      return this.ingCollection.doc(ing.uid).update(menuDesObj);      
    }else{      
      let idIng = this.afs.createId();
      ing.uid = idIng;
      this.afs.collection('ingredientes').doc(idIng).set({
        id: ing.uid,
        userUID: this.usuarioLogeado,
        ingredientes: ing.ingredientes
      });
    }
  }


}
