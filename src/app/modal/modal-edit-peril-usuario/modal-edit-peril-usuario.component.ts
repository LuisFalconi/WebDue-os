import { Component, OnInit, Inject } from '@angular/core';
import { ModalEditarDesayunoComponent } from '../modal-editar-desayuno/modal-editar-desayuno.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-edit-peril-usuario',
  templateUrl: './modal-edit-peril-usuario.component.html',
  styleUrls: ['./modal-edit-peril-usuario.component.css']
})
export class ModalEditPerilUsuarioComponent implements OnInit {

  constructor(public dialog: MatDialogRef<ModalEditarDesayunoComponent>,
    // tslint:disable-next-line: align
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
