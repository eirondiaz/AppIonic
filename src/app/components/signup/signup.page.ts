import { Component } from '@angular/core';
import { User } from 'src/app/Models/User';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {

  user: User = {}
  reppass: string = ''

  constructor(
    private router: Router, 
    private authService: AuthService,
    private toastCtrl: ToastController
  ) { }

  async createToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000
    })
    await toast.present()
  }

  signUp() {
    if (this.user.clave === this.reppass) {
      this.authService.signUp(this.user).subscribe(
        res => {
          if (res.status === 200) {
            this.router.navigate(['/signin']) 
            this.createToast('Usuario registrado')          
          }
        },
        err => {
          console.log(err)
          this.createToast('Ha ocurrido un error') 
        }
      )
    }
    else {
      this.createToast('las contraseñas no coinciden') 
    }
  }
}
