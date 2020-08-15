import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-edit-restaurant-dueno',
  templateUrl: './modal-edit-restaurant-dueno.component.html',
  styleUrls: ['./modal-edit-restaurant-dueno.component.css']
})
export class ModalEditRestaurantDuenoComponent implements OnInit {

  constructor(public dialog: MatDialogRef<ModalEditRestaurantDuenoComponent>,
    // tslint:disable-next-line: align
    @Inject(MAT_DIALOG_DATA) public datosR: any) { }

  ngOnInit() {
  }

}
