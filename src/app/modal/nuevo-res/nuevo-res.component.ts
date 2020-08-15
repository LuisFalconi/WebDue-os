import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-nuevo-res',
  templateUrl: './nuevo-res.component.html',
  styleUrls: ['./nuevo-res.component.css']
})
export class NuevoResComponent implements OnInit {

  constructor(public dialog: MatDialogRef<NuevoResComponent>,
    // tslint:disable-next-line: align
    @Inject(MAT_DIALOG_DATA) public datos: any) { }

  ngOnInit() {
  }

}
