import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ResponseLogin } from '../models/responseLogin';

@Injectable({
  providedIn: 'root'
})

export class ShareAdminVendeurGuard implements CanActivate {
  response:ResponseLogin;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.response=JSON.parse(localStorage.getItem('response'));
      if(this.response.autorities[0].authority=='Admin' || this.response.autorities[0].authority=='Vendeur'){
      return true;}
      return false;
  }
  
}
