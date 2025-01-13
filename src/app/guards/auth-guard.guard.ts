import { ActivatedRouteSnapshot, CanActivateFn, RedirectCommand, Router, RouterStateSnapshot } from '@angular/router';
import { NewsService } from '../news.service';
import { inject } from '@angular/core';

export const authGuardGuard: CanActivateFn = (
  route : ActivatedRouteSnapshot, 
  state : RouterStateSnapshot) => {

  const router = inject(Router);
  const newsService= inject(NewsService);
  const isLogin=newsService.getStorage();
  /* if(isLogin){
    console.log("daniel");
    return true;
  }
  else{
    router.navigate(["/login"]);
    return false;
  } */
   return true;
  
}

export const loginAccess: CanActivateFn = (
  route : ActivatedRouteSnapshot, 
  state : RouterStateSnapshot) => {

  const router = inject(Router);
  const newsService= inject(NewsService);
  const isLogin=newsService.getStorage();
  
 /*  if(!isLogin){
    return true;
  }
  else{
    router.navigate(["/main"]);
    return false;
  }  */

    return true;
}


