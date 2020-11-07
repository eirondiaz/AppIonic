import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearsecretosPageRoutingModule } from './crearsecretos-routing.module';

import { CrearsecretosPage } from './crearsecretos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearsecretosPageRoutingModule
  ],
  declarations: [CrearsecretosPage]
})
export class CrearsecretosPageModule {}
