import { Injectable, inject } from '@angular/core';
import { CanLoad, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  router = inject(Router);
  user = environment.user;

  canLoad(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let data = sessionStorage.getItem(this.user);
    if (data != null && +data > 0)
      return true;
    else {
      this.router.navigateByUrl('main');
      return false;
    }
  }
}
