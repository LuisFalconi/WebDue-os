import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-desayuno',
  templateUrl: './modal-desayuno.component.html',
  styleUrls: ['./modal-desayuno.component.css']
})
export class ModalDesayunoComponent implements OnInit {

  constructor(public dialog: MatDialogRef<ModalDesayunoComponent>,
    // tslint:disable-next-line: align
    @Inject(MAT_DIALOG_DATA) public datos: any) { }

  ngOnInit() {
  }

}
