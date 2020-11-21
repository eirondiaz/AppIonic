import { Component, OnInit } from '@angular/core';
import { Secreto } from 'src/app/Models/Secreto';
import { User } from 'src/app/Models/User';
import { SecretoService } from 'src/app/services/secreto.service';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController, AlertController } from '@ionic/angular';
import { MiperfilPage } from '../miperfil/miperfil.page'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  secret: Secreto[] = []
  user: User = {}

  constructor(
    private secretoService: SecretoService,
    private authService: AuthService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit(): void {
    this.getSecretos()
    this.getUser()
  }

  ionViewDidEnter() {
    this.getSecretos()
    this.getUser()
  }

  async showModal() {
    const modal = await this.modalCtrl.create({
      component: MiperfilPage,
      componentProps: this.user
    })
    await modal.present()
  }

  getUser() {
    this.authService.getUser(localStorage.getItem('token')).subscribe(
      res => this.user = res,
      err => console.log(err)
    )
  }

  getSecretos() {
    this.secretoService.getSecretos().subscribe(
      res => {
        this.secret = res.secretos
        console.log(this.secret)
      },
      err => console.log(err)
    )
  }

  async delete(id) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar Secreto',
      message: 'Deseas eliminar ese secreto?',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel'
      }, {
        text: 'Ok',
        handler: () => {
          console.log(id)
          this.del(id)
        }
      }]
    })
    await alert.present()
  }

  del(id) {
    this.secretoService.deleteSecreto(id).subscribe(
        res => this.getSecretos(),
        err => console.log(err)
    )
  }
}
