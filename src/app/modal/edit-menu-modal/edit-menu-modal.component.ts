import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-menu-modal',
  templateUrl: './edit-menu-modal.component.html',
  styleUrls: ['./edit-menu-modal.component.css']
})
export class EditMenuModalComponent implements OnInit {

  constructor(public dialog: MatDialogRef<EditMenuModalComponent>,
    // tslint:disable-next-line: align
    @Inject(MAT_DIALOG_DATA) public datos: any) { }

  ngOnInit() {
  }

}
