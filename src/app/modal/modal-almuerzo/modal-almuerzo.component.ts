import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-almuerzo',
  templateUrl: './modal-almuerzo.component.html',
  styleUrls: ['./modal-almuerzo.component.css']
})
export class ModalAlmuerzoComponent implements OnInit {

  constructor(public dialog: MatDialogRef<ModalAlmuerzoComponent>,
    // tslint:disable-next-line: align
    @Inject(MAT_DIALOG_DATA) public datos: any) { }

  ngOnInit() {
  }

}
