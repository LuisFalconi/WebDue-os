import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-coordenadas-modal',
  templateUrl: './edit-coordenadas-modal.component.html',
  styleUrls: ['./edit-coordenadas-modal.component.css']
})
export class EditCoordenadasModalComponent implements OnInit {

  constructor(public dialog: MatDialogRef<EditCoordenadasModalComponent>,
    // tslint:disable-next-line: align
    @Inject(MAT_DIALOG_DATA) public datos: any) { }

  ngOnInit() {
  }

}
