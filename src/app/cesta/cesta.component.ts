import { Component } from '@angular/core';
import { Cesta } from '../model/cesta';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cesta',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cesta.component.html',
  styleUrls: ['./cesta.component.css']
})
export class CestaComponent {
  public mensagem: String = "";
  public obj: Cesta = new Cesta();

  constructor() {
  
    let json = localStorage.getItem("cesta");
    if (json == null) {
      this.mensagem = "Cesta vazia.";
    } else {
      this.obj = JSON.parse(json);
    }
  }

  limparCesta() {
    this.obj = new Cesta();
    localStorage.removeItem("cesta");
    this.mensagem = "Sua cesta foi limpa, não tem mais itens!";
  }
}
