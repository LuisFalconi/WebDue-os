//import { LoginGuardService } from './login-guard.service';
import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { LoginService } from './login.service';
import { MenuService } from './menu.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Menu } from '../_model/menu';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate{

  constructor(private loginService: LoginService, private router: Router, private menuService: MenuService, private afa: AngularFireAuth) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Verificando si el usuario esta activo, nunca en los guards tener un Suscribe
    return this.afa.authState
      .pipe(map(authState => !!authState))
      .pipe(switchMap((auntenticado: boolean) => {
        if (!auntenticado) {
          this.router.navigate(['/inicio']);
          return of(false);
        } else {
          // verifica que rol tiene el usuario logueado
      let url = state.url;
      return this.menuService.listar().pipe(switchMap((menus) => {
        //para pintar los menus que le corresponden al usuario
        return this.loginService.user.pipe(map(data => {
          if (data) {
            let user_roles: string[] = data.roles;
            let final_menus: Menu[] = [];

            for (let menu of menus) {
              n2: for (let rol of menu.roles) {
                for (let urol of user_roles) {
                  if (rol === urol) {
                    let m = new Menu();
                    m.nombre = menu.nombre;
                    m.icono = menu.icono;
                    m.url = menu.url;
                    final_menus.push(m);
                    break n2;
                  }
                }
              }
            }

            //console.log(final_menus);
            this.menuService.menuCambio.next(final_menus);

            //los menus de una persona vs la URL que quiere acceder
            let cont = 0;
            for (let m of final_menus) {
              if (m.url === url) {
                cont++;
                break;
              }
            }

            if (cont > 0) {
              return true;
            }else{
              this.router.navigate(['not-403']);
              return false;
            }

          }
        }));
      }));
    }
  }));
}
}
