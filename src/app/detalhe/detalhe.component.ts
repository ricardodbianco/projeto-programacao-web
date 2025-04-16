import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Produto } from '../model/produto';

@Component({
  selector: 'app-detalhe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalhe.component.html',
  styleUrl: './detalhe.component.css'
})
export class DetalheComponent implements OnInit {
  public obj: Produto = new Produto();
  public mensagem: String = "";
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      let json = localStorage.getItem("produto");
      if (json == null) {
        this.mensagem = "Produto não encontrado! verifique";
      } else {
        this.obj = JSON.parse(json);
      }
    } else {
      // No lado do servidor, mostramos uma mensagem de carregamento
      this.mensagem = "Carregando detalhes do produto...";
    }
  }
}
