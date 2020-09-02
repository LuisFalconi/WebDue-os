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
      // const rol2 = localStorage.getItem('rol');

      // Existe un error al ingresar con un rol admin y despues con un rol dueño   (NOTA: Comparar el rol desde la propia base de datos)
      console.log('Usuario rol: ' +  rol);
      console.log("que es esto", next.data.role);
      
      if (rol === next.data.role){
        console.log('entro'); 
        return true;
      }else if(rol){
        if(rol.toString() === 'dueño'){
          console.log('dueño');
        }
        if(rol.toString() === 'admin'){
          console.log('admin');
        }
      }
      
      //navigate to not found page
      console.log('no entro');
      
      return false;
      
    }
  }
  
