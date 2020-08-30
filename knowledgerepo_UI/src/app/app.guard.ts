import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot,Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {StorageService} from './shared/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate {
  isAuth:boolean=false;
  constructor(private _storage: StorageService, private router: Router)
  {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

     this.isAuth=this._storage.getSession('isAuthenticated') || false;
      if(this.isAuth){
        return true;
      }
      else{
        return this.router.parseUrl("/login");
      }
  }  
}
