import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-estado-documento-modal',
  templateUrl: './edit-estado-documento-modal.component.html',
  styleUrls: ['./edit-estado-documento-modal.component.css']
})
export class EditEstadoDocumentoModalComponent implements OnInit {

  constructor(public dialog: MatDialogRef<EditEstadoDocumentoModalComponent>,
    // tslint:disable-next-line: align
    @Inject(MAT_DIALOG_DATA) public datos: any) { }

  ngOnInit(): void {
  }

}
