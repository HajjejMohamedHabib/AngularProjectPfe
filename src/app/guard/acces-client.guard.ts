import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ResponseLogin } from '../models/responseLogin';

@Injectable({
  providedIn: 'root'
})
export class AccesClientGuard implements CanActivate {
  response:ResponseLogin=null;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.response=JSON.parse(localStorage.getItem('response'));
      if(this.response==null || this.response.autorities[0].authority=='Client'){
      return true;}
      return false;
  }
  
}
