import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolGuardGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
      const rol = localStorage.getItem('rol');
      console.log('Usuario rol: '+ rol)
      console.log("que es esto", next.data.role);
      
      if (rol === next.data.role){
        console.log('entro');
        return true;
      }else{
        if(rol === 'dueño'){
          console.log('dueño');
        }
        if(rol === 'admin'){
          console.log('admin');
        }
      }
      
      //navigate to not found page
      console.log('no entro');
      
      return false;
      
    }
  }
  
