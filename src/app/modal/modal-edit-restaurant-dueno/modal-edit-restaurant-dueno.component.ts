import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as L from 'leaflet';
import { coor } from '../../_model/coordenadas';
import { CoordenadasService } from '../../_service/coordenadas.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-modal-edit-restaurant-dueno',
  templateUrl: './modal-edit-restaurant-dueno.component.html',
  styleUrls: ['./modal-edit-restaurant-dueno.component.css']
})
export class ModalEditRestaurantDuenoComponent implements OnInit {

  constructor(private route: Router,
    private afa: AngularFireAuth,
    private coordenadasSvc: CoordenadasService, private coordenadasService: CoordenadasService, public dialog: MatDialogRef<ModalEditRestaurantDuenoComponent>,
    // tslint:disable-next-line: align
    @Inject(MAT_DIALOG_DATA) public datosR: any) { }

    usuarioLog: string
    

  ngOnInit() {
    let currenUser = this.afa.auth.currentUser;
    this.usuarioLog = currenUser.uid;

  //   this.map = L.map('mapa', {
  //     center: [ -0.2104022, -78.4910514 ],
  //     zoom: 17
  //   });

  //   const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //   maxZoom: 17,
  //   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  //   });

  //   tiles.addTo(this.map);
  //   this.registrar();
   }

   actualizarDireccion(){

    this.coordenadasService.listar().subscribe(data =>{
      data.forEach(element => {
        if(element.userUID === this.usuarioLog){
          this.coordenadasService.eliminar(element)
        }else{
          console.log("no elimino"); 
        }
      });
    })
    this.route.navigate(["dueño/mapa"]);
    // window.location.reload();

    // this.registrar();
  }

  // marcador(lat : number, lng : number){
  //   this.marker = L.marker([lat, lng], {draggable:true});
  //   this.marker.addTo(this.map).bindPopup('Estoy aqui');

  //   this.marker.on('drag', () =>{
  //     console.log("aver " + this.marker.getLatLng())
      
  //     })  
  // }

  // registrar(){
  //   this.marcador(-0.2104022, -78.4910514 )
  // }

  // prueba(){

  //   let cords = new coor();

  //   let x = this.marker.getLatLng()
  //   console.log("aa", x['lat']);
  //   this.latitud = x['lat'];
  //   this.longitud = x['lng'];

  //   var lati = parseFloat(this.longitud);
  //   var long = parseFloat(this.latitud);

  //   console.log(lati, long);


  //   this.coordenadasService.guardarcoordenadas(lati, long);

    
  // }

}
