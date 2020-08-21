import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from  '@angular/fire/auth';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class NologinGuard implements CanActivate {

  constructor(private AFauth: AngularFireAuth, private router:Router){

  }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const rol = localStorage.getItem('rol');
      
      return this.AFauth.authState.pipe(map(auth => {
        if(isNullOrUndefined(auth)){
          return true
        }else{
          if(rol === 'dueño'){
          this.router.navigate(['dueño/perfil'])
          }else if (rol === 'admin'){
          this.router.navigate(['admin/perfil'])
          }
          return false
        }
      }))
    }
} 