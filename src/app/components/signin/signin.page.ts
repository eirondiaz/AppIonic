import { Component } from '@angular/core';
import { User } from 'src/app/Models/User';
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage {

  user: User = {}

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastCtrl: ToastController
    ) { }

  async createToast() {
    const toast = await this.toastCtrl.create({
      message: 'correo o contraseña invalido',
      duration: 3000
    })
    await toast.present()
  }

  signIn() {
    this.authService.signIn(this.user).subscribe(
      res => {
        if (res.msg == 'LOGGED') {
          localStorage.setItem('token', res.token)
          console.log(res)
          this.router.navigate(['/home'])
        }
        else if(res.msg == 'usuario o contraseña incorrectos') {
          this.createToast()
        }
        else {
          console.log(res.msg)
        }
      },
      err => console.log(err)
    )
  }
}
