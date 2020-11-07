import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authServise: AuthService, 
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authServise.loggedIn()) {
      return true
    }

    this.router.navigate(['/signin'])
    return false
  } 
}
