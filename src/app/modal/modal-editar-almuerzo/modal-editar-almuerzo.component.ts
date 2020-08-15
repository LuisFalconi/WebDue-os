import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-editar-almuerzo',
  templateUrl: './modal-editar-almuerzo.component.html',
  styleUrls: ['./modal-editar-almuerzo.component.css']
})
export class ModalEditarAlmuerzoComponent implements OnInit {

  constructor(public dialog: MatDialogRef<ModalEditarAlmuerzoComponent>,
    // tslint:disable-next-line: align
    @Inject(MAT_DIALOG_DATA) public datos: any) { }

  ngOnInit() {
  }

}
