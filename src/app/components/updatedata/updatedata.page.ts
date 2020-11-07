import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service';
import { AlertController, ToastController } from '@ionic/angular'


@Component({
  selector: 'app-updatedata',
  templateUrl: './updatedata.page.html',
  styleUrls: ['./updatedata.page.scss'],
})
export class UpdatedataPage implements OnInit{

  updateForm: FormGroup
  updated: boolean = false
  errorUpdated: boolean = false

  idUser = ''

  constructor(
    private _builder: FormBuilder,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {
    this.updateForm = this._builder.group({
      correo: ['', Validators.compose([Validators.required, Validators.email])],
      nombre: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.getUser()
  }

  async createToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000
    })
    await toast.present()
  }

  async onSubmit(values) {
    const alert = await this.alertCtrl.create({
      header: 'Modificar datos',
      message: 'Estas seguro que deseas modificar los datos?',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel'
      }, {
        text: 'Ok',
        handler: () => {
          this.cambData(values)
        }
      }]
    })
    await alert.present()
  }

  getUser() {
    this.authService.getUser(localStorage.getItem('token')).subscribe(
      res => this.idUser = res.id,
      err => console.log(err)
    )
  }

  cambData(values) {
    this.authService.upData(this.idUser, values).subscribe(
      res => {
        if(res.msg == 'actualizado') {
          this.createToast('Datos modificados')
          this.updateForm.reset()
        }
        else {
          console.log(res)
          this.createToast('Error')
        }
      },
      err => {
        console.log(err)
        this.createToast('Error')
      }
    )
  }
}
