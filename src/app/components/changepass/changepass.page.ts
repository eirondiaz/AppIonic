import { Component } from '@angular/core';
import { User } from 'src/app/Models/User'
import { AuthService } from 'src/app/services/auth.service'
import { AlertController, ToastController } from '@ionic/angular'
import { Router } from '@angular/router'

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.page.html',
  styleUrls: ['./changepass.page.scss'],
})
export class ChangepassPage {

  newp: User = {}
  repnewpass: string = ''
  claveUpdated: boolean = false
  noMatch: boolean = false
  current: boolean = false

  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController,
    private router: Router
  ) { }

  async changePass() {
    const alert = await this.alertCtrl.create({
      header: 'Cambiar clave',
      message: 'Deseas cambiar la clave?',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel'
      }, {
        text: 'Ok',
        handler: () => {
          this.chaPass()
          //console.log(this.newp)
        } 
      }]
    })
    await alert.present()
  }

  chaPass() {
    if (this.newp.newpass === this.repnewpass) {
      this.authService.updatePass(this.newp).subscribe(
        res => {
          if (res.msg == 'clave actualizada') {
            this.claveUpdated = true
            this.noMatch = false
            this.current = false
            setTimeout(() => {
              this.claveUpdated = false
            }, 7000)
            //this.router.navigate(['/home'])
          }
          else {
            this.noMatch = false
            this.current = true
          }
        },
        err => console.log(err)
      )
    }
    else {
      this.noMatch = true
    }
  }
}
