import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ResponseLogin } from '../models/responseLogin';
import { LoginService } from '../services/login.service';
import { MyVarService } from '../services/myVarServices';

@Injectable({
  providedIn: 'root'
})
export class AccesAdminGuard implements CanActivate {
  myVar: any;
 destroyer$: Subject<void> = new Subject();
  constructor(){
  }
  response:ResponseLogin;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.response=JSON.parse(localStorage.getItem('response'));
      if(this.response.autorities[0].authority=='Admin'){
      return true;}
      return false;
  }
  
  
}
