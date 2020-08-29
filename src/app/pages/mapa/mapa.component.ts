import { Component, OnInit } from '@angular/core';
import { coor } from '../../_model/coordenadas';
import * as L from 'leaflet';
import { CoordenadasService } from '../../_service/coordenadas.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  private map
  marker: any;
  latitud: any;
  longitud: any;

  constructor(private coordenadasService : CoordenadasService, private db: AngularFirestore) { }

  ngOnInit(): void {

    const container = document.getElementById('mapa')
    if(container){
      this.map = L.map('mapa', {
        center: [ -0.2104022, -78.4910514 ],
        zoom: 17
      });
  
      const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 17,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });
  
      tiles.addTo(this.map);
      this.registrar();
    }
  }

  marcador(lat : number, lng : number){
    this.marker = L.marker([lat, lng], {draggable:true});
    this.marker.addTo(this.map).bindPopup('Estoy aqui');

    this.marker.on('drag', () =>{
      console.log("aver " + this.marker.getLatLng())
      
      //for(let x of this.cor.coordenadas){
      //  console.log("sera " + x[0])
      //}
      //this.coordenadasService.registrar(this.cor.coordenadas);
      
      })

      /*

      let searchControl = L.esri.Geocoding.geosearch().addTo(this.map);
      let results = L.layerGroup().addTo(this.map);

      searchControl.on('results', function (data) {
        results.clearLayers();
        for (var i = data.results.length - 1; i >= 0; i--) {
          results.addLayer(L.marker(data.results[i].latlng));
        }
      });
      */

    
  }

  registrar(){
    this.marcador(-0.2104022, -78.4910514 )
  }

  guardarDireccion(){
    
  }

  prueba(){

    let cords = new coor();

    let x = this.marker.getLatLng()
    console.log("aa", x['lat']);
    this.latitud = x['lat'];
    this.longitud = x['lng'];

    var lati = parseFloat(this.longitud);
    var long = parseFloat(this.latitud);

    console.log(lati, long);


    this.coordenadasService.guardarcoordenadas(lati, long);

    
  }

}
