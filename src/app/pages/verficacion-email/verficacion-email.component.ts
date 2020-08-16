import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../../_service/login.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-verficacion-email',
  templateUrl: './verficacion-email.component.html',
  styleUrls: ['./verficacion-email.component.css']
})
export class VerficacionEmailComponent implements OnInit {

  public user$ : Observable<any>

  constructor(private loginSvc: LoginService, 
              private afauth: AngularFireAuth) { }

  ngOnInit() {

    this.user$ = this.afauth.user;

  }

  reenviarEmail():void{
    this.loginSvc.enviarVerificacionEmail();    
  }

  regresar(){
    this.loginSvc.cerrarSesion2();
  }

}
