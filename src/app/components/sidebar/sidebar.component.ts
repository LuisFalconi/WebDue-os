import { Component, OnInit, OnDestroy } from '@angular/core';
import { Menu } from '../../_model/menu';
import { Subject } from 'rxjs';
import { LoginService } from '../../_service/login.service';
import { MenuService } from '../../_service/menu.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    rol:string;

}
export const ROUTES: RouteInfo[] = [
  // { path: '/dueño/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '', rol:'dueño' },
  { path: '/dueño/restaurante', title: 'Mi restaurante',  icon:'restaurant', class: '',rol:'dueño' },
  { path: '/dueño/miMenu', title: 'Mi menú',  icon:'menu_book', class: '',rol:'dueño' },
  { path: '/dueño/listaPromociones', title: 'Promociones',  icon:'food_bank', class: '',rol:'dueño' },
  { path: '/dueño/afiliados', title: 'Afiliados',  icon:'person', class: '',rol:'dueño' },
  { path: '/dueño/noAfiliados', title: 'Clientes',  icon:'supervisor_account', class: '',rol:'dueño' },
  { path: '/dueño/perfil', title: 'Perfil',  icon:'account_circle', class: '',rol:'dueño' },
  { path: '/admin/listaU', title: 'Usuarios',  icon:'person', class: '',rol:'admin' },
  { path: '/admin/listaR', title: 'Restaurantes',  icon:'restaurant', class: '',rol:'admin' },
  // { path: '/admin/verificacionR', title: 'Validación de Restaurantes',  icon:'assignment_turned_in', class: '',rol:'admin' },
  { path: '/admin/verificacionDoc', title: 'Validación de Restaurantes',  icon:'assignment_turned_in', class: '',rol:'admin' },
  { path: '/admin/perfil', title: 'Contacto',  icon:'account_circle', class: '',rol:'admin' },
 // { path: '/sadmin/credenciales', title: 'Credenciales',  icon:'assignment_ind', class: '',rol:'super' },

 
 
 /*
 { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
 { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
 { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
 { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
 { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },*/
 
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  menuItems: any[];
  rol:string;
  name:string;

  menus: Menu[] = [];

  // Se crear la variable para liberar recursos
  private ngUnsubscribe: Subject<void> = new Subject();

  constructor(public loginService: LoginService, private menuService: MenuService, 
    private router: Router) { }

  ngOnInit() {

    // console.log("paso aqui");
    
    // this.menuService.menuCambio.pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
    //   this.menus = data;
    //   console.log("menus?", this.menus);
    // })

    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.rol=localStorage.getItem('rol');
    if(this.rol === 'dueño'){
        console.log("dueño");
    }else{
      console.log("admin");
    }


    //this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
