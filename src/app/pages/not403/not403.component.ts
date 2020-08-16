import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../../_service/login.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-not403',
  templateUrl: './not403.component.html',
  styleUrls: ['./not403.component.css']
})
export class Not403Component implements OnInit, OnDestroy {

  usuario: string;
// Se crear la variable para liberar recursos
  private ngUnsubscribe: Subject<void> = new Subject();
  
  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.user.pipe(takeUntil(this.ngUnsubscribe)).subscribe(data =>{
      this.usuario = data.email;
    })
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
