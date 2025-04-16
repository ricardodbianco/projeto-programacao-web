import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { Cesta } from '../model/cesta';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cesta',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cesta.component.html',
  styleUrl: './cesta.component.css'
})
export class CestaComponent implements OnInit {
  public mensagem: String = "";
  public obj: Cesta = new Cesta();
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      let json = localStorage.getItem("cesta");
      if (json == null) {
        this.mensagem = "Cesta vazia.";
      } else {
        this.obj = JSON.parse(json);
      }
    } else {
      // No lado do servidor, iniciamos com uma cesta vazia
      this.mensagem = "Carregando cesta...";
    }
  }

  limparCesta() {
    this.obj = new Cesta();
    if (this.isBrowser) {
      localStorage.removeItem("cesta");
    }
    this.mensagem = "Sua cesta foi limpa, não tem mais itens!";
  }
}
