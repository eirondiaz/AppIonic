import { Component } from '@angular/core';
import { Secreto } from 'src/app/Models/Secreto'
import { SecretoService } from 'src/app/services/secreto.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular'

@Component({
  selector: 'app-crearsecretos',
  templateUrl: './crearsecretos.page.html',
  styleUrls: ['./crearsecretos.page.scss'],
})
export class CrearsecretosPage {

  today = new Date()
  date = `${this.today.getDate()}/${this.today.getMonth()}/${this.today.getFullYear()}`

  secret: Secreto = {
    fecha: this.date,
    token: localStorage.getItem('token')
  }

  constructor(
    private secretoService: SecretoService,
    private router: Router,
    private toastCtrl: ToastController
  ) { }

  async createToast() {
    const toast = await this.toastCtrl.create({
      message: 'Secreto creado',
      duration: 1500
    })
    await toast.present()
  }

  create() {
    this.secretoService.createSecreto(this.secret).subscribe(
      res => {
        if (res.msg == 'secreto registrado') {
          this.createToast()
          this.router.navigate(['/home'])
        }
      },
      err => console.log(err)
    )
  }
}
