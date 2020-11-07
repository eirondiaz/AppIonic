import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular'
import { AlertController } from '@ionic/angular'
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.page.html',
  styleUrls: ['./miperfil.page.scss'],
})
export class MiperfilPage {

  @Input() nombre: string
  @Input() correo: string

  constructor(
    private authService: AuthService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router
    ) { }

  async close() {
    await this.modalCtrl.dismiss()
  }

  async logOut() {
    const alert = await this.alertCtrl.create({
      header: 'Cerrar Sesión',
      message: '¿Estas seguro que deseas cerrar sesión?',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel'
      }, {
        text: 'OK',
        handler: () => {
          this.authService.logOut()
          this.close()
        }
      }]
    })
    await alert.present()
  }
}
