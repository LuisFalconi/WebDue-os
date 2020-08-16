//import { LoginGuardService } from './login-guard.service';
import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { LoginService } from './login.service';
import { MenuService } from './menu.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Menu } from '../_model/menu';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate{

  constructor(private loginService: LoginService, private router: Router, private menuService: MenuService, private afa: AngularFireAuth) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Verificando si el usuario esta activo, nunca en los guards tener un Suscribe
    // return this.afa.authState
    //   .pipe(map(authState => !!authState))
    //   .pipe(switchMap((auntenticado: boolean) => {
    //     if (!auntenticado) {
    //       this.router.navigate(['/login']);
    //       return of(false);
    //     } else {
  
    //         //los menus de una persona vs la URL que quiere acceder
    //         let cont = 0;
    //         if (cont > 0) {
    //           return true;
    //         }else{
    //           this.router.navigate(['not-403']);
    //           return false;
    //         }

    //       }
        
    //   }
    // }


    return this.afa.authState
    .pipe(take(1))
    .pipe(map(authState => !!authState))
    .pipe(tap(auth=>{
    	if(!auth){
    		this.router.navigate(['/login'])
    	}
    }))
    ;
  }
}
