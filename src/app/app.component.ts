import { Component, OnDestroy, OnInit } from '@angular/core';
import { Menu } from './_model/menu';
import { Subject } from 'rxjs';
import { LoginService } from './_service/login.service';
import { MenuService } from './_service/menu.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  menus: Menu[] = [];

  // Se crear la variable para liberar recursos
  private ngUnsubscribe: Subject<void> = new Subject();

  constructor(public loginService: LoginService, private menuService: MenuService, 
    private router: Router){

}

ngOnInit(){
    this.menuService.menuCambio.pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
      this.menus = data;
      console.log("aaaa", this.menus);
      
    });

}



ngOnDestroy(){
  this.ngUnsubscribe.next();
  this.ngUnsubscribe.complete();
  }

}
