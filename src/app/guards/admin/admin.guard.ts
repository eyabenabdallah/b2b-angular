import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { UsersService } from "src/app/services/users/users.service";

@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivate {
  constructor(private usersService: UsersService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.usersService.isUserLoggedIn()) {
       if (
        this.usersService.loggedUserAuthoritiy() == "ROLE_ADMIN"
       )
        return true;
       else return this.router.createUrlTree(["/login"]);
    } else {
      return this.router.createUrlTree(["/login"]);
    }
  }
}
