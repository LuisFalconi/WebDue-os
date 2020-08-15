import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-edit-restautante',
  templateUrl: './modal-edit-restautante.component.html',
  styleUrls: ['./modal-edit-restautante.component.css']
})
export class ModalEditRestautanteComponent implements OnInit {

  constructor(public dialog: MatDialogRef<ModalEditRestautanteComponent>,
    // tslint:disable-next-line: align
    @Inject(MAT_DIALOG_DATA) public datos: any) { }

  ngOnInit() {
  }

}
