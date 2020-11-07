import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {
  
  constructor(
    private authServise: AuthService, 
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authServise.loggedIn()) {
      this.router.navigate(['/home'])
      return false
    }

    return true
  } 
}
