import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-editar-merienda',
  templateUrl: './modal-editar-merienda.component.html',
  styleUrls: ['./modal-editar-merienda.component.css']
})
export class ModalEditarMeriendaComponent implements OnInit {

  constructor(public dialog: MatDialogRef<ModalEditarMeriendaComponent>,
    // tslint:disable-next-line: align
    @Inject(MAT_DIALOG_DATA) public datos: any) { }

  ngOnInit() {
  }

}
