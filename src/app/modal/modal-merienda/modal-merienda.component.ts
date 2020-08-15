import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-merienda',
  templateUrl: './modal-merienda.component.html',
  styleUrls: ['./modal-merienda.component.css']
})
export class ModalMeriendaComponent implements OnInit {

  constructor(public dialog: MatDialogRef<ModalMeriendaComponent>,
    // tslint:disable-next-line: align
    @Inject(MAT_DIALOG_DATA) public datos: any) { }

  ngOnInit() {
  }

}
