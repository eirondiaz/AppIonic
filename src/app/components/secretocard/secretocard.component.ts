import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Secreto } from 'src/app/Models/Secreto'

@Component({
  selector: 'app-secretocard',
  templateUrl: './secretocard.component.html',
  styleUrls: ['./secretocard.component.scss'],
})
export class SecretocardComponent {

  @Input() secre: Secreto

  @Output() borrar = new EventEmitter<number>()
  
  constructor() { }

  Borrar(id) {
    this.borrar.emit(id)
  }
}
